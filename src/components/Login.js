import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromCookie = Cookies.get('userId');
    if (userIdFromCookie) {
      navigate('/user-info');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
        expiresInMins: 60,
      });

      Cookies.set('userId', response.data.id, { expires: 1 / 24 });
      Cookies.set('token', response.data.token, { expires: 1 / 24 });

      dispatch({ type: 'LOGIN', payload: response.data });
      navigate('/user-info');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-holder">
        <h2>Login</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
