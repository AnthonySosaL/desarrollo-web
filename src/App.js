import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import { FaUserAlt, FaSignInAlt } from 'react-icons/fa';
import lamborghiniLogo from './img/logo.png';
import heroImage from './img/img1.webp';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
function HomePage() {
  return (
    <>
      {/* Sección Hero */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div className="text-center">
          <h1 className="display-3 fw-bold">Lamborghini Urus</h1>
          <p className="lead">Potencia, lujo y diseño en su máxima expresión.</p>
        </div>
      </section>
    </>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
      <div className="container-fluid">
        <div className="d-flex mx-auto align-items-center">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={lamborghiniLogo} alt="Lamborghini Logo" />
            <span className="ms-1">Lamborghini</span>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    <FaSignInAlt className="me-2" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    <FaUserAlt className="me-2" /> Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <AppContent /> {/* Navbar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
