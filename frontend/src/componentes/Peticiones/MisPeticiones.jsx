import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Common/Modal';
import './Peticiones.css';
import '../../global.css'

const MisPeticiones = ({ usuario }) => {
  const [peticiones, setPeticiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [peticionSeleccionada, setPeticionSeleccionada] = useState(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  
  useEffect(() => {
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const peticionesData = [
        {
          id: 1,
          articulo: {
            id: 1,
            nombre: 'Multímetro Digital',
            categoria: 'Instrumentos de Medición'
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica'
          },
          fechaSolicitud: '2023-05-10T14:30:00',
          fechaRequerida: '2023-05-15',
          fechaDevolucion: '2023-05-20',
          estado: 'aprobada',
          nota: 'Necesito el multímetro para un proyecto de la clase de Circuitos.',
          respuesta: 'Aprobado. Puedes pasar a recogerlo el día 15 de mayo a partir de las 9:00 am.',
          fechaRespuesta: '2023-05-11T10:15:00'
        },
        {
          id: 2,
          articulo: {
            id: 2,
            nombre: 'Arduino UNO',
            categoria: 'Microcontroladores'
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica'
          },
          fechaSolicitud: '2023-05-09T11:20:00',
          fechaRequerida: '2023-05-14',
          fechaDevolucion: '2023-05-21',
          estado: 'pendiente',
          nota: '',
          respuesta: '',
          fechaRespuesta: null
        },
        {
          id: 3,
          articulo: {
            id: 3,
            nombre: 'Osciloscopio',
            categoria: 'Instrumentos de Medición'
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica'
          },
          fechaSolicitud: '2023-05-08T09:45:00',
          fechaRequerida: '2023-05-12',
          fechaDevolucion: '2023-05-19',
          estado: 'rechazada',
          nota: 'Lo necesito para un experimento de física.',
          respuesta: 'Lo siento, no está disponible para la fecha solicitada. Ya hay 3 reservas previas.',
          fechaRespuesta: '2023-05-09T14:30:00'
        },
        {
          id: 4,
          articulo: {
            id: 4,
            nombre: 'Kit de Resistencias',
            categoria: 'Componentes Electrónicos'
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica'
          },
          fechaSolicitud: '2023-05-07T16:15:00',
          fechaRequerida: '2023-05-13',
          fechaDevolucion: '2023-05-16',
          estado: 'pospuesta',
          nota: 'Necesito las resistencias para un circuito divisor de voltaje.',
          respuesta: 'Tu solicitud ha sido pospuesta, podrás recogerlo el día 14 de mayo en lugar del 13.',
          fechaRespuesta: '2023-05-08T11:10:00'
        },
        {
          id: 5,
          articulo: {
            id: 5,
            nombre: 'Protoboard',
            categoria: 'Herramientas'
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica'
          },
          fechaSolicitud: '2023-05-05T10:30:00',
          fechaRequerida: '2023-05-11',
          fechaDevolucion: '2023-05-18',
          estado: 'completada',
          nota: '',
          respuesta: 'Aprobado.',
          fechaRespuesta: '2023-05-06T09:20:00'
        }
      ];
      
      setPeticiones(peticionesData);
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
      case 'completada':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };
  
  // Filtrar peticiones según el estado seleccionado
  const peticionesFiltradas = filtroEstado
    ? peticiones.filter(p => p.estado === filtroEstado)
    : peticiones;
  
  const handleFiltroChange = (e) => {
    setFiltroEstado(e.target.value);
  };
  
  const handleCancelClick = (peticion) => {
    setPeticionSeleccionada(peticion);
    setShowModal(true);
  };
  
  const handleMotivoChange = (e) => {
    setMotivoCancelacion(e.target.value);
  };
  
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    // En producción, esto sería una llamada a la API
    console.log('Cancelación de petición:', {
      peticionId: peticionSeleccionada.id,
      motivo: motivoCancelacion
    });
    
    // Simular cancelación exitosa y actualizar la lista
    const nuevasPeticiones = peticiones.map(p => 
      p.id === peticionSeleccionada.id ? { ...p, estado: 'cancelada' } : p
    );
    
    setPeticiones(nuevasPeticiones);
    setShowModal(false);
    setMotivoCancelacion('');
    alert(`La petición para ${peticionSeleccionada.articulo.nombre} ha sido cancelada`);
  };
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <div className="peticiones-container">
      <div className="peticiones-header">
        <h1>Mis Peticiones</h1>
        <div className="peticiones-tools">
          <div className="filter-group">
            <label className="filter-label">Filtrar por estado:</label>
            <select 
              className="filter-select" 
              value={filtroEstado} 
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendientes</option>
              <option value="aprobada">Aprobadas</option>
              <option value="rechazada">Rechazadas</option>
              <option value="pospuesta">Pospuestas</option>
              <option value="completada">Completadas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>
        </div>
      </div>
      
      {peticionesFiltradas.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-clipboard-list no-results-icon"></i>
          <p>No tienes peticiones {filtroEstado && `con estado "${filtroEstado}"`}</p>
        </div>
      ) : (
        <div className="peticiones-list">
          {peticionesFiltradas.map((peticion) => (
            <div key={peticion.id} className="peticion-card">
              <div className="peticion-header">
                <div className="peticion-title">
                  <h3>{peticion.articulo.nombre}</h3>
                  <span className={`status-badge ${getStatusClass(peticion.estado)}`}>
                    {peticion.estado.charAt(0).toUpperCase() + peticion.estado.slice(1)}
                  </span>
                </div>
                <div className="peticion-actions">
                  <Link to={`/articulo/${peticion.articulo.id}`} className="btn btn-outline btn-sm">
                    <i className="fas fa-eye"></i> Ver Artículo
                  </Link>
                  {(peticion.estado === 'pendiente' || peticion.estado === 'aprobada') && (
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleCancelClick(peticion)}
                    >
                      <i className="fas fa-times"></i> Cancelar
                    </button>
                  )}
                </div>
              </div>
              
              <div className="peticion-details">
                <div className="peticion-detail">
                  <i className="fas fa-tools"></i>
                  <span>Taller: {peticion.taller.nombre}</span>
                </div>
                <div className="peticion-detail">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Solicitado: {formatDateTime(peticion.fechaSolicitud)}</span>
                </div>
                <div className="peticion-detail">
                  <i className="fas fa-calendar-day"></i>
                  <span>Fecha requerida: {formatDate(peticion.fechaRequerida)}</span>
                </div>
                <div className="peticion-detail">
                  <i className="fas fa-calendar-check"></i>
                  <span>Fecha devolución: {formatDate(peticion.fechaDevolucion)}</span>
                </div>
              </div>
              
              {peticion.nota && (
                <div className="peticion-nota">
                  <h4>Nota del estudiante:</h4>
                  <p>{peticion.nota}</p>
                </div>
              )}
              
              {peticion.respuesta && (
                <div className="peticion-respuesta">
                  <h4>Respuesta del encargado:</h4>
                  <p>{peticion.respuesta}</p>
                  <small>Respondido el {formatDateTime(peticion.fechaRespuesta)}</small>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {showModal && peticionSeleccionada && (
        <Modal
          title={`Cancelar petición: ${peticionSeleccionada.articulo.nombre}`}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleCancelSubmit}>
            <div className="form-group">
              <label className="form-label">Motivo de cancelación (opcional)</label>
              <textarea
                className="form-control"
                value={motivoCancelacion}
                onChange={handleMotivoChange}
                placeholder="Explica por qué estás cancelando esta petición..."
                rows={4}
              ></textarea>
            </div>
            <div className="modal-buttons">
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                Volver
              </button>
              <button type="submit" className="btn btn-danger">
                Confirmar Cancelación
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MisPeticiones;