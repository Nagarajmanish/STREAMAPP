import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Topbar() {
  return (
    <div className="topbar">
      {/* Browse Page Link */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/browse" className="logo-link">
          <h1 className="logo">Browse</h1>
        </Link>

        <Link to="/create-event" className="create-event-link">
          <h2 className='event'>Create Event</h2>
        </Link>
      </div>

      {/* Search Bar */}
      <input className="search-bar" type="text" placeholder="Search" />

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-btn">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
