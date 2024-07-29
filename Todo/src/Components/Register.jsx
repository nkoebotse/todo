import React, { useState } from 'react';
import videoBg from './video.mp4';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    try {
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

     
      const user = { id: 2, email: email, name: 'New User' };
      localStorage.setItem('user', JSON.stringify(user));

      
      window.location.href = '/employee'; 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="video-background">
      <video autoPlay muted loop id="video-bg">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="container">
        <h1>Res Tech Solutions</h1>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        {error && <p className="error-message">{error}</p>}
        <div className="extra-links">
          <a href="/login">Login</a>
          <span> | </span>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
