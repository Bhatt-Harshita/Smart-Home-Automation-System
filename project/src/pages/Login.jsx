import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="center-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p
          onClick={() => navigate('/register')}
          style={{ cursor: 'pointer', color: 'green', marginTop: '1rem' }}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
};

export default Login;
