import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }
  
      const data = await response.json();
      console.log('Datos recibidos del servidor:', data); // Depuración del servidor
  
      // Guardar en localStorage
      const user = { username: data.username };
      localStorage.setItem('user', JSON.stringify(user));
      console.warn('Usuario guardado en localStorage:', user); // Añadido console.warn
  
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Usuario o contraseña incorrectos');
    }
  };
  
  

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        </form>
        <div className="mt-3 text-center">
          <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
