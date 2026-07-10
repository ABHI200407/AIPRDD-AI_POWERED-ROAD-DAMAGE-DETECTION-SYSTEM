import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, review: 0, fixed: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repsRes, statsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/reports'),
          axios.get('http://localhost:8000/api/stats')
        ]);
        setReports(repsRes.data);
        setStats({
          total: statsRes.data.total_reports,
          review: statsRes.data.total_reports - statsRes.data.potholes_fixed, // Simplified for demo
          fixed: statsRes.data.potholes_fixed
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredReps = reports.filter(r => filter === 'all' || r.status === filter);

  const getStatusBadge = (status) => {
    const config = {
      'fixed': { label: 'Fixed', color: 'var(--success)', icon: '✅' },
      'under-review': { label: 'Under Review', color: 'var(--warning)', icon: '⏳' },
      'assigned': { label: 'Assigned', color: 'var(--primary)', icon: '🛠️' },
      'repair': { label: 'In Progress', color: 'var(--primary)', icon: '🚧' }
    };
    const s = config[status] || { label: status, color: 'var(--text-muted)', icon: '●' };
    return (
      <span className="premium-badge" style={{ backgroundColor: s.color + '20', color: s.color }}>
        {s.icon} {s.label.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="premium-container">
      {/* 🧭 Header Section */}
      <header className="premium-header">
        <div className="header-left">
          <h1>My Reports</h1>
          <p>Track, manage, and monitor road issues in real time</p>
        </div>
        <div className="header-right header-stats">
          <div className="mini-stat-card">
            <span className="stat-icon">🧾</span>
            <div>
              <div className="stat-num">{stats.total}</div>
              <div className="stat-lbl">Total Reports</div>
            </div>
          </div>
          <div className="mini-stat-card">
            <span className="stat-icon" style={{ color: 'var(--warning)' }}>⏳</span>
            <div>
              <div className="stat-num">{stats.review}</div>
              <div className="stat-lbl">Under Review</div>
            </div>
          </div>
          <div className="mini-stat-card">
            <span className="stat-icon" style={{ color: 'var(--success)' }}>✅</span>
            <div>
              <div className="stat-num">{stats.fixed}</div>
              <div className="stat-lbl">Fixed</div>
            </div>
          </div>
        </div>
      </header>

      {/* 🎛️ Filter Bar */}
      <div className="premium-filter-bar">
        <div className="filter-scroll">
          {['all', 'under-review', 'assigned', 'fixed'].map(f => (
            <button
              key={f}
              className={`filter-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              <span className="chip-icon">{f === 'all' ? '🧾' : (f === 'fixed' ? '✅' : (f === 'assigned' ? '🛠️' : '⏳'))}</span>
              {f.replace('-', ' ').toUpperCase()}
            </button>
          ))}
          <div className="filter-indicator" style={{
            left: filter === 'all' ? '0' : (filter === 'under-review' ? '100px' : (filter === 'assigned' ? '240px' : '360px'))
          }} />
        </div>
      </div>

      <div className="premium-content-grid">
        {/* 🔥 LEFT: Report Feed */}
        <div className="report-feed">
          {loading ? (
            <div className="loading-state">
              <div className="ldot" style={{ width: 32, height: 32 }}></div>
              <p>Loading your reports...</p>
            </div>
          ) : filteredReps.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: '64px' }}>🏜️</div>
              <h3>No reports found</h3>
              <p>Try changing your filter or submit a new report.</p>
              <Link to="/report" className="btn-primary" style={{ marginTop: '20px' }}>+ Report Now</Link>
            </div>
          ) : (
            filteredReps.map((r, i) => (
              <div key={r.id || i} className="premium-card">
                <div className="card-image-section">
                  {r.image_url ? (
                    <img src={`http://localhost:8000${r.image_url}`} alt="Damage" />
                  ) : (
                    <div className="image-placeholder">🕳️</div>
                  )}
                  <div className="badge-overlay-tl">
                    <span className="severity-badge" style={{
                      background: r.severity_level === 'high' ? 'var(--danger)' : (r.severity_level === 'med' ? 'var(--warning)' : 'var(--success)')
                    }}>
                      {r.severity_level?.toUpperCase()} SEVERITY
                    </span>
                  </div>
                  <div className="badge-overlay-tr">
                    {getStatusBadge(r.status)}
                  </div>
                </div>

                <div className="card-info-section">
                  <div className="info-main">
                    <div className="info-header">
                      <h3>{r.road_name || 'Unnamed Road (Auto-detected)'}</h3>
                      <div className="location-tag">📍 {r.area}</div>
                    </div>
                    <div className="damage-tag">🧩 {r.damage_type || 'Road Damage'}</div>

                    <div className="ai-layer">
                      <div className="ai-meta">
                        <div className="ai-label">AI CONFIDENCE</div>
                        <div className="ai-value">{(r.severity_score * 100).toFixed(0)}%</div>
                      </div>
                      <div className="ai-meta">
                        <div className="ai-label">DETECTION TYPE</div>
                        <div className="ai-value">{r.damage_type} Pattern</div>
                      </div>
                    </div>

                    <div className="status-timeline">
                      <div className={`t-node ${r.status !== '' ? 'active' : ''}`}>
                        <div className="t-dot"></div>
                        <div className="t-lbl">Submitted</div>
                      </div>
                      <div className="t-line"></div>
                      <div className={`t-node ${r.status !== 'under-review' ? 'active' : ''}`}>
                        <div className="t-dot"></div>
                        <div className="t-lbl">Review</div>
                      </div>
                      <div className="t-line"></div>
                      <div className={`t-node ${r.status === 'fixed' ? 'active' : ''}`}>
                        <div className="t-dot"></div>
                        <div className="t-lbl">Fixed</div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="date-meta">
                      📅 {new Date(r.report_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <button className="btn-details" onClick={() => setSelectedReport(r)}>View Details</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 🗺️ RIGHT Panel */}
        <aside className="premium-sidebar">
          <div className="sidebar-card map-card">
            <div className="sidebar-title">Live Preview</div>
            <div className="mini-map-placeholder">
              <div className="radar"></div>
              <div style={{ zIndex: 1, position: 'relative', textAlign: 'center' }}>
                <div style={{ fontSize: '24px' }}>📍</div>
                <div style={{ fontSize: '10px', color: '#fff', fontWeight: 800 }}>Hyderbad Civic Lab</div>
              </div>
            </div>
          </div>

          <div className="sidebar-card insights-card">
            <div className="sidebar-title">Analytics Insight</div>
            <div className="insight-item">
              <div className="insight-icon">🔥</div>
              <div>
                <div className="insight-lbl">Most reported area</div>
                <div className="insight-val">{reports.length > 0 ? reports[0].area : 'Scanning...'}</div>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">⚡</div>
              <div>
                <div className="insight-lbl">Avg. resolution time</div>
                <div className="insight-val">{stats.fixed > 0 ? '2.4 days' : 'Tracking...'}</div>
              </div>
            </div>
          </div>

          <div className="sidebar-card actions-card">
            <div className="sidebar-title">Quick Actions</div>
            <Link to="/report" className="action-btn primary">+ New Report</Link>
            <button className="action-btn" onClick={() => alert("Exporting reports as CSV...")}>📤 Export Reports</button>
            <button className="action-btn" onClick={() => alert("Analytics module is currently in beta.")}>📊 View Analytics</button>
          </div>
        </aside>
      </div>

      {selectedReport && (
        <div className="inspect-overlay" onClick={() => setSelectedReport(null)}>
            <div className="inspect-modal" onClick={e => e.stopPropagation()}>
                <div className="im-header">
                  <h3>Report Analysis: {selectedReport.road_name}</h3>
                  <button className="im-close" onClick={() => setSelectedReport(null)}>×</button>
                </div>
                <div className="im-grid">
                  <div className="im-col">
                      <div className="im-label">REPORTED (BEFORE)</div>
                      <img src={`http://localhost:8000${selectedReport.image_url}`} alt="Before" />
                  </div>
                  <div className="im-col">
                      <div className="im-label">FIXED (AFTER)</div>
                      {selectedReport.resolved_image_url ? (
                        <img src={`http://localhost:8000${selectedReport.resolved_image_url}`} alt="After" />
                      ) : (
                        <div className="res-placeholder">
                            <div className="radar mini"></div>
                            <span>Repair in Progress</span>
                        </div>
                      )}
                  </div>
                </div>
                <div className="im-meta-grid">
                  <div><strong>Damage:</strong> {selectedReport.damage_type}</div>
                  <div><strong>Severity:</strong> {selectedReport.severity_level} ({(selectedReport.severity_score * 100).toFixed(0)}%)</div>
                  <div><strong>Area:</strong> {selectedReport.area}</div>
                  <div><strong>Status:</strong> {selectedReport.status?.toUpperCase()}</div>
                </div>
                <div className="im-actions">
                  <button className="btn-bulk" onClick={() => setSelectedReport(null)}>Close View</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default MyReports;
