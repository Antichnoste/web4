import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Header from './components/Header';
import './index.css'; // Глобальные стили (можно просто import './index.css')

// Компонент для защиты приватных маршрутов
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/main" 
              element={
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              } 
            />
            {/* Редирект по умолчанию */}
            <Route path="*" element={<Navigate to="/main" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;