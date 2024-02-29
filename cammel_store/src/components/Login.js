import React, { useState } from 'react';
import { useAuth } from './CheckAuth';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { username, password };

    //Fråga Kai
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed. Please check your username and password.');
      }
      return response.json();
    })
    .then(data => {
      login(username);
      localStorage.setItem('jwt', data.token);
      navigate('/store'); 
    
    })
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Login Form</h2>
      <form id="loginForm" onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div id="message" style={{ color: 'red' }}>{message}</div>
    </div>
  );
}

export default Login;
