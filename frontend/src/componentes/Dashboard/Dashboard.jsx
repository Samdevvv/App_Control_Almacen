import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ usuario }) => {
  const [talleres, setTalleres] = useState([]);
  const [peticionesRecientes, setPeticionesRecientes] = useState([]);
  const [actividadReciente, setActividadReciente] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const talleresData = [
        { id: 1, nombre: 'Taller de Electrónica', descripcion: 'Equipos y componentes electrónicos', totalArticulos: 120, imagen: 'electronica.jpg' },
        { id: 2, nombre: 'Taller de Mecánica', descripcion: 'Herramientas y equipos mecánicos', totalArticulos: 85, imagen: 'mecanica.jpg' },
        { id: 3, nombre: 'Taller de Informática', descripcion: 'Equipos de cómputo y periféricos', totalArticulos: 95, imagen: 'informatica.jpg' },
        { id: 4, nombre: 'Laboratorio de Química', descripcion: 'Instrumentos y materiales de laboratorio', totalArticulos: 110, imagen: 'quimica.jpg' }
      ];
      
      const peticionesData = [
        { id: 1, articulo: 'Multímetro Digital', taller: 'Taller de Electrónica', fecha: '2023-05-10', estado: 'aprobada' },
        { id: 2, articulo: 'Arduino Mega', taller: 'Taller de Electrónica', fecha: '2023-05-09', estado: 'pendiente' },
        { id: 3, articulo: 'Osciloscopio', taller: 'Taller de Electrónica', fecha: '2023-05-08', estado: 'rechazada' }
      ];
      
      const actividadData = [
        { id: 1, mensaje: 'Se ha añadido un nuevo Arduino UNO al Taller de Electrónica', fecha: '2023-05-10T14:30:00' },
        { id: 2, mensaje: 'Tu petición para "Multímetro Digital" ha sido aprobada', fecha: '2023-05-10T10:15:00' },
        { id: 3, mensaje: 'El Taller de Mecánica ha actualizado su inventario', fecha: '2023-05-09T16:45:00' },
        { id: 4, mensaje: 'Se han añadido 5 nuevos artículos al Laboratorio de Química', fecha: '2023-05-08T11:20:00' }
      ];
      
      setTalleres(talleresData);
      setPeticionesRecientes(peticionesData);
      setActividadReciente(actividadData);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Formatear fecha y hora para mostrar
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };
  
  // Obtener clase CSS según estado de la petición
  const getStatusClass = (estado) => {
    switch (estado) {
      case 'aprobada':
        return 'status-approved';
      case 'rechazada':
        return 'status-rejected';
      case 'pospuesta':
        return 'status-postponed';
      default:
        return 'status-pending';
    }
  };
  
  // Renderizar contenido específico según rol de usuario
  const renderRoleSpecificContent = () => {
    if (usuario.rol === 'maestro') {
      return (
        <div className="card teacher-dashboard">
          <div className="card-header">
            <h3 className="card-title">Mi Taller: {usuario.tallerAsignado.nombre}</h3>
            <Link to="/admin/taller" className="btn btn-outline">Administrar</Link>
          </div>
          <div className="card-body">
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-value">25</div>
                <div className="stat-label">Peticiones Pendientes</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">120</div>
                <div className="stat-label">Artículos Totales</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">15</div>
                <div className="stat-label">Préstamos Activos</div>
              </div>
            </div>
            <div className="quick-actions">
              <h4>Acciones Rápidas</h4>
              <div className="quick-actions-buttons">
                <Link to="/admin/articulos" className="btn btn-primary">Gestionar Artículos</Link>
                <Link to="/admin/peticiones" className="btn btn-secondary">Ver Peticiones</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bienvenido, {usuario.nombre}</h1>
      
      {renderRoleSpecificContent()}
      
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Talleres Disponibles</h3>
              <Link to="/talleres" className="btn btn-outline">Ver todos</Link>
            </div>
            <div className="talleres-grid">
              {talleres.map((taller) => (
                <Link to={`/taller/${taller.id}`} key={taller.id} className="taller-card">
                  <div className="taller-image">
                    <div className="taller-overlay">
                      <span>{taller.totalArticulos} artículos</span>
                    </div>
                  </div>
                  <div className="taller-info">
                    <h4>{taller.nombre}</h4>
                    <p>{taller.descripcion}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Mis Peticiones Recientes</h3>
              <Link to="/mis-peticiones" className="btn btn-outline">Ver todas</Link>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Artículo</th>
                  <th>Taller</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {peticionesRecientes.map((peticion) => (
                  <tr key={peticion.id}>
                    <td>{peticion.articulo}</td>
                    <td>{peticion.taller}</td>
                    <td>{formatDate(peticion.fecha)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(peticion.estado)}`}>
                        {peticion.estado.charAt(0).toUpperCase() + peticion.estado.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Actividad Reciente</h3>
            </div>
            <div className="activity-feed">
              {actividadReciente.map((actividad) => (
                <div key={actividad.id} className="activity-item">
                  <p>{actividad.mensaje}</p>
                  <small>{formatDateTime(actividad.fecha)}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;