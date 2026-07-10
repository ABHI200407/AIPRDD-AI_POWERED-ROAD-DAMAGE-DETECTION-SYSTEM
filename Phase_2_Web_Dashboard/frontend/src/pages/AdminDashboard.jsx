import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('priority'); // priority, map, clusters, verify
  const [inspecting, setInspecting] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/reports');
      // Mix real data with priority scoring
      const scored = res.data.map(r => {
        let score = 0;
        if (r.severity_level === 'high') score += 50;
        if (r.severity_level === 'med') score += 20;
        if (r.traffic_density === 'High') score += 30;
        
        // Aging calculation
        const daysOld = Math.floor((new Date() - new Date(r.report_date)) / (1000 * 60 * 60 * 24));
        score += daysOld * 5;
        
        return { ...r, priorityScore: score, daysOld };
      }).sort((a, b) => b.priorityScore - a.priorityScore);

      setReports(scored);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status, assignee = null) => {
    try {
      await axios.patch(`http://localhost:8000/api/reports/${id}`, { 
        status, 
        assigned_to: assignee 
      });
      fetchReports();
    } catch (err) {
      alert("Action failed");
    }
  };

  const bulkAction = async (status) => {
    try {
      await axios.post('http://localhost:8000/api/reports/bulk-update', {
        ids: selectedIds,
        status
      });
      setSelectedIds([]);
      fetchReports();
    } catch (err) {
      alert("Bulk action failed");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const uploadResolution = async (id, file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      await axios.post(`http://localhost:8000/api/reports/${id}/resolve`, formData);
      fetchReports();
      setInspecting(null);
    } catch (err) {
      alert("Verification upload failed");
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="ah-left">
          <h1>Municipal Authority Command</h1>
          <div className="ah-meta">
            <span className="live-dot"></span> System Live: {reports.length} Open Issues
          </div>
        </div>
        <div className="ah-right">
           <button className="btn-bulk" disabled={selectedIds.length === 0} onClick={() => bulkAction('fixed')}>
              ✅ Resolve Selected ({selectedIds.length})
           </button>
           <button className="btn-bulk secondary" disabled={selectedIds.length === 0} onClick={() => bulkAction('assigned')}>
              🛠️ Assign Selected
           </button>
        </div>
      </header>

      <div className="admin-grid">
        {/* Main Feed */}
        <div className="admin-feed">
          <div className="feed-nav">
             <button className={view === 'priority' ? 'on' : ''} onClick={() => setView('priority')}>📊 Top Priority</button>
             <button className={view === 'clusters' ? 'on' : ''} onClick={() => setView('clusters')}>📦 Smart Clusters</button>
             <button className={view === 'verify' ? 'on' : ''} onClick={() => setView('verify')}>🔍 Verify Fixes</button>
          </div>

          <div className="issue-list">
            {view === 'verify' ? (
               reports.filter(r => r.status === 'fixed' || r.assigned_to).map(r => (
                  <div key={r.id} className="issue-card" onClick={() => setInspecting(r)}>
                     <div className="ic-img">
                        <img src={`http://localhost:8000${r.image_url}`} alt="Before" />
                        <div className="v-tag">BEFORE</div>
                     </div>
                     <div className="ic-content">
                        <div className="ic-title">{r.road_name}</div>
                        <div className="ic-sub">Assigned to: {r.assigned_to || 'N/A'}</div>
                        <div className={`v-status ${r.status}`}>STATUS: {r.status.toUpperCase()}</div>
                     </div>
                     <button className="btn-mini" onClick={(e) => { e.stopPropagation(); setInspecting(r); }}>Compare & Audit →</button>
                  </div>
               ))
            ) : (
               reports.filter(r => r.status !== 'fixed').map(r => (
                  <div key={r.id} className={`issue-card ${selectedIds.includes(r.id) ? 'selected' : ''} ${r.daysOld > 3 && r.status !== 'fixed' ? 'urgent' : ''}`}>
                    <div className="ic-check" onClick={(e) => { e.stopPropagation(); toggleSelect(r.id); }}>
                       {selectedIds.includes(r.id) ? '☑️' : '⬜'}
                    </div>
                    
                    <div className="ic-img">
                       <img src={`http://localhost:8000${r.image_url}`} alt="Pothole" />
                       {r.daysOld > 3 && <div className="aging-alert">⚠️ {r.daysOld} DAYS PENDING</div>}
                    </div>

                    <div className="ic-content">
                      <div className="ic-header">
                        <div className="ic-title">{r.road_name}</div>
                        <div className="ic-priority">Priority: {r.priorityScore}</div>
                      </div>
                      <div className="ic-sub">{r.area} · {r.damage_type}</div>
                      
                      <div className="ic-actions" onClick={(e) => e.stopPropagation()}>
                         <button className="act-resolve" onClick={() => updateStatus(r.id, 'fixed')}>Resolve Now</button>
                         <button className="act-assign" onClick={() => updateStatus(r.id, 'assigned', 'Team Alpha')}>Assign Alpha Crew</button>
                      </div>
                    </div>

                    <div className="ic-details-btn">
                       <div className="ic-badge" style={{background: r.severity_level === 'high' ? 'var(--danger)' : 'var(--warning)'}}>
                         {r.severity_level}
                       </div>
                       <button className="btn-mini" onClick={() => setInspecting(r)}>Orders →</button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Action Sidebar */}
        <aside className="admin-side">
           <div className="side-card">
              <h3>⚡ Work Order Summary</h3>
              <div className="work-order-prev">
                 <p><strong>Crew:</strong> Unassigned</p>
                 <p><strong>Tasks:</strong> {selectedIds.length} Selected</p>
                 <p><strong>Est. Time:</strong> {selectedIds.length * 45} mins</p>
                 {selectedIds.length > 0 && (
                    <div className="order-auto-gen">
                       <div className="auto-tag">PRE-FILLED</div>
                       <pre>
Location: Multiple ({selectedIds.length})
Status: High Priority
Route: Optimized for {reports[0]?.road_name}
                       </pre>
                    </div>
                 )}
              </div>
           </div>

           <div className="side-card map-mini">
              <h3>🗺️ Repair Route Map</h3>
              <div className="route-viz">
                 <div className="route-point">A</div>
                 <div className="route-line"></div>
                 <div className="route-point">B</div>
                 <div className="route-line dashed"></div>
                 <div className="route-point ghost">C</div>
              </div>
              <p className="route-tip">AI suggests: Fix Cluster A (Jubilee Hills) first to save 22% travel time.</p>
           </div>
        </aside>
      </div>

      {inspecting && (
         <div className="inspect-overlay" onClick={() => setInspecting(null)}>
            <div className="inspect-modal" onClick={e => e.stopPropagation()}>
               <div className="im-header">
                  <h3>Audit & Verify: {inspecting.road_name}</h3>
                  <button className="im-close" onClick={() => setInspecting(null)}>×</button>
               </div>
               <div className="im-grid">
                  <div className="im-col">
                     <div className="im-label">BEFORE (Reported)</div>
                     <img src={`http://localhost:8000${inspecting.image_url}`} alt="Before" />
                  </div>
                  <div className="im-col">
                     <div className="im-label">AFTER (Fixed)</div>
                     {inspecting.resolved_image_url ? (
                        <div className="after-placeholder">
                           <img src={`http://localhost:8000${inspecting.resolved_image_url}`} alt="After" />
                           <div className="verified-stamp">VERIFIED ✅</div>
                        </div>
                     ) : (
                        <div className="after-missing">
                           <span>⏳ Pending Verification</span>
                           <div className="upload-res-btn">
                             <input 
                               type="file" 
                               id="res-upload" 
                               hidden 
                               onChange={(e) => uploadResolution(inspecting.id, e.target.files[0])} 
                             />
                             <label htmlFor="res-upload" className="act-resolve">📷 Upload Resolution Photo</label>
                           </div>
                           <p style={{fontSize:'10px', marginTop:'8px'}}>Worker must upload fix evidence to resolve.</p>
                        </div>
                     )}
                  </div>
               </div>
               <div className="im-meta-grid">
                  <div><strong>Damage:</strong> {inspecting.damage_type}</div>
                  <div><strong>Severity:</strong> {inspecting.severity_level} ({(inspecting.severity_score * 100).toFixed(0)}%)</div>
                  <div><strong>Area:</strong> {inspecting.area}</div>
                  <div><strong>Pincode:</strong> {inspecting.pincode}</div>
               </div>
               <div className="im-actions">
                  <button className="btn-bulk" onClick={() => setInspecting(null)}>Close Audit</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdminDashboard;
