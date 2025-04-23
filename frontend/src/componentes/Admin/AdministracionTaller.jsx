import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Common/Modal';
import './Admin.css';

const AdministracionTaller = ({ usuario }) => {
  const [taller, setTaller] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tallerForm, setTallerForm] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    horario: ''
  });
  
  useEffect(() => {
    // Verificar que el usuario es maestro
    if (!usuario || usuario.rol !== 'maestro') {
      return;
    }
    
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const tallerData = {
        id: 1,
        nombre: 'Taller de Electrónica',
        descripcion: 'Equipos y componentes electrónicos para prácticas de circuitos, microcontroladores y sistemas digitales.',
        encargado: usuario.nombre,
        totalArticulos: 120,
        imagen: 'electronica.jpg',
        ubicacion: 'Edificio A, Planta Baja',
        horario: 'Lunes a Viernes 8:00 - 18:00'
      };
      
      const estadisticasData = {
        totalArticulos: 120,
        articulosDisponibles: 98,
        articulosNoDisponibles: 22,
        peticionesPendientes: 15,
        peticionesAprobadas: 28,
        peticionesRechazadas: 5,
        articulosMasSolicitados: [
          { id: 1, nombre: 'Multímetro Digital', solicitudes: 45 },
          { id: 2, nombre: 'Arduino UNO', solicitudes: 38 },
          { id: 3, nombre: 'Osciloscopio', solicitudes: 32 },
          { id: 4, nombre: 'Protoboard', solicitudes: 30 },
          { id: 5, nombre: 'Kit de Resistencias', solicitudes: 25 }
        ]
      };
      
      setTaller(tallerData);
      setEstadisticas(estadisticasData);
      setTallerForm({
        nombre: tallerData.nombre,
        descripcion: tallerData.descripcion,
        ubicacion: tallerData.ubicacion,
        horario: tallerData.horario
      });
      setLoading(false);
    }, 1000);
  }, [usuario]);
  
  const handleEditClick = () => {
    setShowModal(true);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTallerForm({
      ...tallerForm,
      [name]: value
    });
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // En producción, esto sería una llamada a la API
    console.log('Actualización de taller:', tallerForm);
    
    // Simular actualización exitosa
    setTaller({
      ...taller,
      ...tallerForm
    });
    setShowModal(false);
    alert('Información del taller actualizada correctamente');
  };
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <div className="admin-container">
      <h1 className="admin-title">Administración de Mi Taller</h1>
      
      <div className="admin-grid">
        <div className="admin-main">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Información del Taller</h2>
              <button className="btn btn-outline" onClick={handleEditClick}>
                <i className="fas fa-edit"></i> Editar
              </button>
            </div>
            <div className="taller-info-admin">
              <div className="taller-info-item">
                <span className="info-label">Nombre:</span>
                <span className="info-value">{taller.nombre}</span>
              </div>
              <div className="taller-info-item">
                <span className="info-label">Descripción:</span>
                <span className="info-value">{taller.descripcion}</span>
              </div>
              <div className="taller-info-item">
                <span className="info-label">Encargado:</span>
                <span className="info-value">{taller.encargado}</span>
              </div>
              <div className="taller-info-item">
                <span className="info-label">Ubicación:</span>
                <span className="info-value">{taller.ubicacion}</span>
              </div>
              <div className="taller-info-item">
                <span className="info-label">Horario:</span>
                <span className="info-value">{taller.horario}</span>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Resumen de Inventario</h2>
              <Link to="/admin/articulos" className="btn btn-outline">
                <i className="fas fa-boxes"></i> Gestionar Artículos
              </Link>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-boxes"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{estadisticas.totalArticulos}</span>
                  <span className="stat-label">Artículos Totales</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon disponible">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{estadisticas.articulosDisponibles}</span>
                  <span className="stat-label">Artículos Disponibles</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon no-disponible">
                  <i className="fas fa-times-circle"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{estadisticas.articulosNoDisponibles}</span>
                  <span className="stat-label">Artículos No Disponibles</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Resumen de Peticiones</h2>
              <Link to="/admin/peticiones" className="btn btn-outline">
                <i className="fas fa-clipboard-list"></i> Gestionar Peticiones
              </Link>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon pendiente">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{estadisticas.peticionesPendientes}</span>
                  <span className="stat-label">Peticiones Pendientes</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon aprobada">
                  <i className="fas fa-check"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{estadisticas.peticionesAprobadas}</span>
                  <span className="stat-label">Peticiones Aprobadas</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon rechazada">
                  <i className="fas fa-times"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-value">{estadisticas.peticionesRechazadas}</span>
                  <span className="stat-label">Peticiones Rechazadas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="admin-sidebar">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Artículos Más Solicitados</h2>
            </div>
            <ul className="ranking-list">
              {estadisticas.articulosMasSolicitados.map((articulo, index) => (
                <li key={articulo.id} className="ranking-item">
                  <div className="ranking-number">{index + 1}</div>
                  <div className="ranking-content">
                    <span className="ranking-title">{articulo.nombre}</span>
                    <span className="ranking-subtitle">{articulo.solicitudes} solicitudes</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Acciones Rápidas</h2>
            </div>
            <div className="quick-actions-list">
              <Link to="/admin/articulos" className="quick-action-btn">
                <i className="fas fa-plus-circle"></i>
                <span>Añadir Nuevo Artículo</span>
              </Link>
              <Link to="/admin/peticiones" className="quick-action-btn">
                <i className="fas fa-bell"></i>
                <span>Ver Peticiones Pendientes</span>
              </Link>
              <button className="quick-action-btn">
                <i className="fas fa-file-export"></i>
                <span>Exportar Inventario</span>
              </button>
              <button className="quick-action-btn">
                <i className="fas fa-sync-alt"></i>
                <span>Actualizar Disponibilidad</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <Modal
          title="Editar Información del Taller"
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre del Taller</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={tallerForm.nombre}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={tallerForm.descripcion}
                onChange={handleFormChange}
                rows={3}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Ubicación</label>
              <input
                type="text"
                className="form-control"
                name="ubicacion"
                value={tallerForm.ubicacion}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Horario</label>
              <input
                type="text"
                className="form-control"
                name="horario"
                value={tallerForm.horario}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="modal-buttons">
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdministracionTaller;