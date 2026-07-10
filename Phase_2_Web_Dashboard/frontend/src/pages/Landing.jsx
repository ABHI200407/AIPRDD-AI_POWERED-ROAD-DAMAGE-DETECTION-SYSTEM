import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-logo">
           <div className="p-logo-icon" style={{width: 64, height: 64, fontSize: 32}}>🛣️</div>
           <h1>AIPRDD System</h1>
           <p>AI-Powered Road Damage Detection & Management</p>
        </div>
        
        <div className="choice-container">
          <div className="choice-card citizen" onClick={() => navigate('/citizen')}>
            <div className="choice-icon">👨‍💼</div>
            <h2>Citizen Portal</h2>
            <p>Report road damage, track your submissions, and view community maps.</p>
            <button className="p-cta-btn">Enter Portal →</button>
          </div>

          <div className="choice-card authority" onClick={() => navigate('/admin')}>
            <div className="choice-icon">🏛️</div>
            <h2>Authority Command</h2>
            <p>Manage work orders, assign crews, and audit AI-detected issues.</p>
            <button className="action-btn primary">Open Dashboard →</button>
          </div>
        </div>

        <div className="landing-footer">
          © 2026 AIPRDD Civic Tech Platform · Telangana Municipal Administration
        </div>
      </div>
    </div>
  );
};

export default Landing;
