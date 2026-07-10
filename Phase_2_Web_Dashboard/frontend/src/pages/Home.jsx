import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [stats, setStats] = useState({ reports: 0, fixed: 0, citizens: 0, accuracy: 94.5 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/stats');
        const data = res.data;
        setStats({
          reports: data.total_reports,
          fixed: data.potholes_fixed,
          citizens: data.active_citizens,
          accuracy: data.ai_accuracy
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    
    // Live update interval
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page visible">
      <div className="home-hero">
        <div className="hero-badge">
          <span className="ldot"></span> Live · Hyderabad Citizen Platform
        </div>
        <h1 className="hero-title">
          Spot a Pothole?<br />
          <span>Report It in 60 Seconds.</span>
        </h1>
        <p className="hero-sub">
          Upload a photo, pin the exact GPS location, and submit directly to the Roads & Buildings Department. 
          Track your report from detection to repair.
        </p>
        <div className="hero-actions">
          <Link to="/report" className="btn-primary">
            <span>📸</span> Report a Pothole
          </Link>
          <Link to="/community-map" className="btn-outline">
            🗺️ View Community Map
          </Link>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hstat-num">{stats.reports}</div>
            <div className="hstat-lbl">Reports Submitted</div>
          </div>
          <div style={{ width: '1px', background: 'var(--dune)', alignSelf: 'stretch' }}></div>
          <div>
            <div className="hstat-num">{stats.fixed}</div>
            <div className="hstat-lbl">Potholes Fixed</div>
          </div>
          <div style={{ width: '1px', background: 'var(--dune)', alignSelf: 'stretch' }}></div>
          <div>
            <div className="hstat-num">{stats.citizens}</div>
            <div className="hstat-lbl">Active Citizens</div>
          </div>
          <div style={{ width: '1px', background: 'var(--dune)', alignSelf: 'stretch' }}></div>
          <div>
            <div className="hstat-num">{stats.accuracy}%</div>
            <div className="hstat-lbl">AI Accuracy</div>
          </div>
        </div>
      </div>

      <div className="feat-grid">
        <Link to="/report" className="feat-card">
          <div className="feat-icon" style={{ background: 'rgba(90,159,194,.12)' }}>📸</div>
          <div className="feat-title">Photo or Camera Report</div>
          <div className="feat-desc">Upload images or use your live device camera. AI instantly scores damage severity using YOLOv8.</div>
          <div className="feat-arrow">Start Reporting →</div>
        </Link>
        <Link to="/report" className="feat-card">
          <div className="feat-icon" style={{ background: 'rgba(37,144,85,.1)' }}>📍</div>
          <div className="feat-title">GPS Auto-Location</div>
          <div className="feat-desc">One tap to detect your GPS. Drag the map pin to set the exact pothole spot for accurate dispatch.</div>
          <div className="feat-arrow">Pin My Location →</div>
        </Link>
        <Link to="/my-reports" className="feat-card">
          <div className="feat-icon" style={{ background: 'rgba(192,122,24,.1)' }}>📋</div>
          <div className="feat-title">Track Every Report</div>
          <div className="feat-desc">Follow your report through Submitted → Reviewed → Assigned → Under Repair → Fixed with live updates.</div>
          <div className="feat-arrow">My Reports →</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
