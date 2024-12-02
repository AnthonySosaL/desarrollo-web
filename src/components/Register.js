import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Mantén tu archivo CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

// Dentro de Register.js
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden');
    return;
  }

  // Aquí hacemos la solicitud al backend para registrar al usuario
  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  
  if (response.ok) {
    console.log('Usuario registrado con éxito:', data);
    navigate('/login'); // Redirige al login si el registro es exitoso
  } else {
    setError(data.message || 'Error en el registro'); // Muestra el error
  }
};



  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="register-card shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Regístrate</h2>
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirme su contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
        <div className="mt-3 text-center">
          <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
