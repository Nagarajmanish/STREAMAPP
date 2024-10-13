import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function LoginPage() {
  return (
    <div className="container">
      <form className="form">
        <h2>Login</h2>
        <input type="text" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <button type="submit" className="button">Log In</button>
        
        {/* Forgot Password Link */}
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
