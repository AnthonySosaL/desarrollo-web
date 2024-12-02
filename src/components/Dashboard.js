import React from 'react';
import './Dashboard.css'; // Asegúrate de tener estilos personalizados

const Dashboard = () => {
  // Obtener el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  if (!user.username) {
    console.warn('No hay usuario almacenado en localStorage.');
    // Opcional: Redirigir al login si no hay usuario
    // navigate('/login');
  }
  return (
    <div className="dashboard-container">
      {/* Header del Dashboard */}
      <div className="dashboard-header bg-dark text-white py-4 text-center">
        <h1>
          Bienvenido{user?.username ? `, ${user.username}` : ''} {/* Saludo personalizado */}
        </h1>
        <p className="lead">Tu espacio personal de Lamborghini</p>
      </div>
      
      {/* Contenido del Dashboard */}
      <div className="dashboard-content container my-5">
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Explorar Modelos</h5>
                <p className="card-text">Descubre todos los modelos Lamborghini y sus configuraciones.</p>
                <button className="btn btn-primary">Explorar</button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Configuración</h5>
                <p className="card-text">Personaliza tu experiencia y configura tu perfil.</p>
                <button className="btn btn-secondary">Configurar</button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h5 className="card-title">Soporte Técnico</h5>
                <p className="card-text">¿Tienes dudas? Contáctanos para obtener ayuda inmediata.</p>
                <button className="btn btn-success">Soporte</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
