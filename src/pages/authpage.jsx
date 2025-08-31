import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';
import './autpage.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [view, setView] = useState("signIn");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(`${API_URL}/find-email`, { email });
      if (!data.exists) {
        setError("Email not found. Please sign up.");
        return;
      }
      setShowPasswordInput(true);
      if (password) {
        const { data: data2 } = await axios.post(`${API_URL}/signin`, { email, password });
        if (data2.success && data2.token) {
          login(data2.user, data2.token);
          navigate("/");
        } else {
          setError(data2.error || "Invalid password");
        }
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(`${API_URL}/find-email`, { email });
      if (data.exists) {
        setError("Email already exists. Please sign in.");
        return;
      }
      const { data: data2 } = await axios.post(`${API_URL}/signup`, { email, password });
      if (data2.success && data2.token) {
        login(data2.user, data2.token);
        navigate("/");
      } else {
        setError(data2.error || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(`${API_URL}/find-email`, { email });
      if (!data.exists) {
        setError("Email not found. Please sign up.");
        return;
      }
      setShowOtpInput(true);
      if (otp.length === 4) {
        const { data: data2 } = await axios.post(`${API_URL}/verify-otp`, { email, otp });
        if (data2.success && data2.token) {
          login(data2.user, data2.token);
          navigate("/");
        } else {
          setError(data2.error || "Invalid OTP");
        }
      } else {
        await axios.post(`${API_URL}/send-otp`, { email });
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const renderForm = () => {
    switch (view) {
      case 'signUp':
        return (
          <form className="auth-form" onSubmit={handleSignUp}>
            <h2 className="form-title">Sign Up</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-input" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" className="form-input" placeholder="Confirm your password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
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
            {error && <div className="auth-error">{error}</div>}
          </form>
        );
      case 'otpLogin':
        return (
          <form className="auth-form" onSubmit={handleOtpLogin}>
            <h2 className="form-title">Login with OTP</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {showOtpInput && (
              <div className="form-group">
                <label htmlFor="otp">OTP</label>
                <input type="text" id="otp" className="form-input" maxLength={4} placeholder="Enter OTP" required value={otp} onChange={e => setOtp(e.target.value)} />
              </div>
            )}
            <button type="submit" className="primary-btn">Verify</button>
            <div className="link-group">
              <button type="button" className="switch-link" onClick={() => setView('signIn')}>Sign In</button>
              <span className="link-separator">|</span>
              <button type="button" className="switch-link" onClick={() => setView('signUp')}>Sign Up</button>
            </div>
            {error && <div className="auth-error">{error}</div>}
          </form>
        );
      case 'signIn':
      default:
        return (
          <form className="auth-form" onSubmit={handleSignIn}>
            <h2 className="form-title">Sign In</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className="form-input" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {showPasswordInput && (
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-input" placeholder="Enter your password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            )}
            <button type="submit" className="primary-btn">Sign In</button>
            <div className="link-group">
              <button type="button" className="switch-link" onClick={() => setView('otpLogin')}>Login with OTP</button>
              <span className="link-separator">|</span>
              <button type="button" className="switch-link" onClick={() => setView('signUp')}>Sign Up</button>
            </div>
            {error && <div className="auth-error">{error}</div>}
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