import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="topnav">
      <NavLink to="/" className="nav-logo">
        <div className="nav-logo-icon">🛣️</div>
        <div>
          <div className="nav-logo-text">AIPRDD</div>
          <div className="nav-logo-sub">AI Road Intelligence</div>
        </div>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nlink ${isActive ? 'active' : ''}`} end>Home</NavLink>
        <NavLink to="/community-map" className={({ isActive }) => `nlink ${isActive ? 'active' : ''}`}>Community Map</NavLink>
        <NavLink to="/my-reports" className={({ isActive }) => `nlink ${isActive ? 'active' : ''}`}>My Reports</NavLink>
      </div>

      <NavLink to="/report" className="nav-cta">
        Report Damage
      </NavLink>

      <div className="nav-avatar">JD</div>
    </nav>
  );
};

export default Navbar;
