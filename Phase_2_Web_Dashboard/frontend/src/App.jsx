import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ReportDamage from './pages/ReportDamage';
import MyReports from './pages/MyReports';
import CommunityMap from './pages/CommunityMap';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';

const Navigation = () => {
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: 'Rahul Kumar', email: 'rahul@citizen.in', city: 'Hyderabad' });

  if (location.pathname === '/') return null; // Hide on landing

  const isLinkActive = (path) => location.pathname === path;

  return (
    <nav className="premium-nav">
      <div className="nav-container">
        <Link to="/" className="p-nav-logo">
          <div className="p-logo-icon">🛣️</div>
          <div className="p-logo-text">RoadReport</div>
        </Link>
        
        <div className="p-nav-links">
          <Link to="/" className={`p-nlink ${isLinkActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/my-reports" className={`p-nlink ${isLinkActive('/my-reports') ? 'active' : ''}`}>My Reports</Link>
          <Link to="/community-map" className={`p-nlink ${isLinkActive('/community-map') ? 'active' : ''}`}>Community Map</Link>
        </div>

        <div className="p-nav-right">
          <div style={{position: 'relative'}}>
            <button className="p-icon-btn" onClick={() => setShowNotif(!showNotif)}>🔔</button>
            {showNotif && (
              <div className="notif-dropdown">
                <div className="nd-header">Notifications</div>
                <div className="nd-item">🛠️ Your report on Jubilee Hills has been assigned.</div>
                <div className="nd-item">✅ Pothole near Meta Lab has been fixed!</div>
                <div className="nd-item">🤖 AI completed scan of Gachibowli area.</div>
              </div>
            )}
          </div>

          <div className="p-avatar" onClick={() => setShowProfile(true)}>RK</div>
          
          <Link to="/report" className="p-cta-btn">
            <span>+</span> Report Now
          </Link>
        </div>
      </div>

      {showProfile && (
        <div className="inspect-overlay" onClick={() => setShowProfile(false)}>
           <div className="inspect-modal" onClick={e => e.stopPropagation()} style={{maxWidth: '400px'}}>
              <div className="im-header">
                 <h3>Edit Profile</h3>
                 <button className="im-close" onClick={() => setShowProfile(false)}>×</button>
              </div>
              <div className="profile-form">
                 <div className="pform-group">
                    <label>Full Name</label>
                    <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
                 </div>
                 <div className="pform-group">
                    <label>Email Address</label>
                    <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
                 </div>
                 <div className="pform-group">
                    <label>Primary City</label>
                    <input type="text" value={user.city} onChange={e => setUser({...user, city: e.target.value})} />
                 </div>
              </div>
              <div className="im-actions" style={{marginTop: '20px'}}>
                 <button className="btn-bulk" onClick={() => setShowProfile(false)}>Save Changes</button>
              </div>
           </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Decorative Blobs */}
        <div className="blob" style={{ left: '3%', width: '70px', height: '70px', animationDuration: '22s' }}></div>
        <div className="blob" style={{ left: '55%', width: '90px', height: '90px', animationDuration: '27s', animationDelay: '9s' }}></div>
        <div className="blob" style={{ left: '91%', width: '80px', height: '80px', animationDuration: '25s', animationDelay: '7s' }}></div>

        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/citizen" element={<Home />} />
            <Route path="/report" element={<ReportDamage />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/community-map" element={<CommunityMap />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/success" element={
              <div className="page visible" style={{textAlign:'center', padding: '100px 20px'}}>
                <h1 className="hero-title">Report Successful! 🚀</h1>
                <p className="hero-sub">Our AI has analyzed the damage and submitted it to the Roads Department.</p>
                <Link to="/my-reports" className="btn-primary">Track Progress</Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
