import React, { useState } from 'react';
import axios from 'axios';
import videoBg from './video.mp4';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    try {
     
      const response = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);

      if (response.data.length === 0) {
        throw new Error('Invalid email or password');
      }

      
      const user = response.data[0];
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
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}
        <div className="extra-links">
          <a href="/register">Register</a>
          <span> | </span>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
