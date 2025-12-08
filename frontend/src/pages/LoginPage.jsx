import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) navigate('/main');
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
        dispatch(registerUser({ username, password }));
    } else {
        dispatch(loginUser({ username, password }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => { setUsername(e.target.value); dispatch(clearError()); }}
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => { setPassword(e.target.value); dispatch(clearError()); }}
              required 
            />
          </div>
          {error && <p className="error-msg">{typeof error === 'string' ? error : 'Ошибка авторизации'}</p>}
          <button type="submit" className="btn-submit">
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>
        <p className="toggle-auth" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Регистрация'}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;