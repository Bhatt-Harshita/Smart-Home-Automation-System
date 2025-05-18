import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="center-container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
        <p
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', color: 'green', marginTop: '1rem' }}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;
