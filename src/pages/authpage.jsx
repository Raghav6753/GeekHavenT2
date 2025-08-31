import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';
import './autpage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('signIn'); // 'signIn', 'signUp', 'otpLogin'

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signing In...');
    // In a real app, this would handle authentication
    // navigate('/dashboard');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Signing Up...');
    // In a real app, this would handle user creation
    // navigate('/dashboard');
  };

  const handleOtpLogin = (e) => {
    e.preventDefault();
    console.log('Requesting OTP...');
    // In a real app, this would send an OTP
  };

  const renderForm = () => {
    switch (view) {
      case 'signUp':
        return (
          <form className="auth-form" onSubmit={handleSignUp}>
            <h2 className="form-title">Sign Up</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-input" placeholder="Enter your password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" className="form-input" placeholder="Confirm your password" required />
            </div>
            <div className="form-group">
              <label htmlFor="stream">Stream</label>
              <select id="stream" className="form-select" required>
                <option value="" disabled selected>Select a stream</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="primary-btn">Sign Up</button>
            <button type="button" className="switch-link" onClick={() => setView('signIn')}>Sign In</button>
          </form>
        );
      case 'otpLogin':
        return (
          <form className="auth-form" onSubmit={handleOtpLogin}>
            <h2 className="form-title">Login with OTP</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email" required />
            </div>
            <button type="submit" className="primary-btn">Verify</button>
            <div className="link-group">
              <button type="button" className="switch-link" onClick={() => setView('signIn')}>Sign In</button>
              <span className="link-separator">|</span>
              <button type="button" className="switch-link" onClick={() => setView('signUp')}>Sign Up</button>
            </div>
          </form>
        );
      case 'signIn':
      default:
        return (
          <form className="auth-form" onSubmit={handleSignIn}>
            <h2 className="form-title">Sign In</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-input" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="primary-btn">Sign In</button>
            <div className="link-group">
              <button type="button" className="switch-link" onClick={() => setView('otpLogin')}>Login with OTP</button>
              <span className="link-separator">|</span>
              <button type="button" className="switch-link" onClick={() => setView('signUp')}>Sign Up</button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left-panel">
        <div className="logo-section">
          <Box className="auth-logo-icon" />
          <h1 className="auth-logo-text">ResellerHub</h1>
        </div>
      </div>
      <div className="auth-right-panel">
        <div className="auth-card">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;