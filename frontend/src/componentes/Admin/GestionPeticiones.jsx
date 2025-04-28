import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Common/Modal';
import './Admin.css';
import '../../global.css'

const GestionPeticiones = ({ usuario }) => {
  const [peticiones, setPeticiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('responder'); // 'responder' o 'ver'
  const [peticionSeleccionada, setPeticionSeleccionada] = useState(null);
  const [respuestaForm, setRespuestaForm] = useState({
    estado: 'aprobada',
    respuesta: '',
  });
  
  useEffect(() => {
    // Verificar que el usuario es maestro
    if (!usuario || usuario.rol !== 'maestro') {
      return;
    }
    
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const peticionesData = [
        {
          id: 1,
          estudiante: {
            id: 1,
            nombre: 'Carlos Pérez',
            email: 'carlos.perez@estudiantes.edu'
          },
          articulo: {
            id: 1,
            nombre: 'Multímetro Digital',
            categoria: 'Instrumentos de Medición'
          },
          fechaSolicitud: '2023-05-10T14:30:00',
          fechaRequerida: '2023-05-15',
          fechaDevolucion: '2023-05-20',
          estado: 'pendiente',
          nota: 'Necesito el multímetro para un proyecto de la clase de Circuitos.',
          respuesta: '',
          fechaRespuesta: null
        },
        {
          id: 2,
          estudiante: {
            id: 2,
            nombre: 'Ana López',
            email: 'ana.lopez@estudiantes.edu'
          },
          articulo: {
            id: 2,
            nombre: 'Arduino UNO',
            categoria: 'Microcontroladores'
          },
          fechaSolicitud: '2023-05-09T11:20:00',
          fechaRequerida: '2023-05-14',
          fechaDevolucion: '2023-05-21',
          estado: 'pendiente',
          nota: 'Para el proyecto final de programación de sistemas embebidos.',
          respuesta: '',
          fechaRespuesta: null
        },
        {
          id: 3,
          estudiante: {
            id: 3,
            nombre: 'Javier García',
            email: 'javier.garcia@estudiantes.edu'
          },
          articulo: {
            id: 3,
            nombre: 'Osciloscopio',
            categoria: 'Instrumentos de Medición'
          },
          fechaSolicitud: '2023-05-08T09:45:00',
          fechaRequerida: '2023-05-12',
          fechaDevolucion: '2023-05-19',
          estado: 'aprobada',
          nota: 'Lo necesito para un experimento de física.',
          respuesta: 'Aprobado. Puedes pasar a recogerlo el día 12 de mayo a partir de las 9:00 am.',
          fechaRespuesta: '2023-05-09T14:30:00'
        },
        {
          id: 4,
          estudiante: {
            id: 4,
            nombre: 'María Rodríguez',
            email: 'maria.rodriguez@estudiantes.edu'
          },
          articulo: {
            id: 4,
            nombre: 'Kit de Resistencias',
            categoria: 'Componentes Electrónicos'
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
          estudiante: {
            id: 5,
            nombre: 'Roberto Sánchez',
            email: 'roberto.sanchez@estudiantes.edu'
          },
          articulo: {
            id: 5,
            nombre: 'Protoboard',
            categoria: 'Herramientas'
          },
          fechaSolicitud: '2023-05-05T10:30:00',
          fechaRequerida: '2023-05-11',
          fechaDevolucion: '2023-05-18',
          estado: 'rechazada',
          nota: 'Para el laboratorio de electrónica digital.',
          respuesta: 'Lo siento, no hay protoboards disponibles para la fecha solicitada.',
          fechaRespuesta: '2023-05-06T09:20:00'
        }
      ];
      
      setPeticiones(peticionesData);
      setLoading(false);
    }, 1000);
  }, [usuario]);
  
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
  
  const handleResponderClick = (peticion) => {
    setModalMode('responder');
    setPeticionSeleccionada(peticion);
    setRespuestaForm({
      estado: 'aprobada',
      respuesta: '',
    });
    setShowModal(true);
  };
  
  const handleVerRespuestaClick = (peticion) => {
    setModalMode('ver');
    setPeticionSeleccionada(peticion);
    setShowModal(true);
  };
  
  const handleRespuestaChange = (e) => {
    const { name, value } = e.target;
    setRespuestaForm({
      ...respuestaForm,
      [name]: value
    });
  };
  
  const handleRespuestaSubmit = (e) => {
    e.preventDefault();
    // En producción, esto sería una llamada a la API
    
    // Simular respuesta exitosa y actualizar la lista
    const nuevasPeticiones = peticiones.map(p => 
      p.id === peticionSeleccionada.id ? {
        ...p,
        estado: respuestaForm.estado,
        respuesta: respuestaForm.respuesta,
        fechaRespuesta: new Date().toISOString()
      } : p
    );
    
    setPeticiones(nuevasPeticiones);
    setShowModal(false);
    alert(`La petición de ${peticionSeleccionada.estudiante.nombre} ha sido ${respuestaForm.estado}`);
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
      <div className="admin-header">
        <div className="admin-title-section">
          <h1 className="admin-title">Gestión de Peticiones</h1>
          <Link to="/admin/taller" className="btn-back">
            <i className="fas fa-arrow-left"></i> Volver a Administración
          </Link>
        </div>
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
          </select>
        </div>
      </div>
      
      {peticionesFiltradas.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-clipboard-list no-results-icon"></i>
          <p>No hay peticiones {filtroEstado && `con estado "${filtroEstado}"`}</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Artículo</th>
                <th>Fecha Solicitud</th>
                <th>Fecha Requerida</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {peticionesFiltradas.map((peticion) => (
                <tr key={peticion.id} className={peticion.estado === 'pendiente' ? 'row-highlight' : ''}>
                  <td>{peticion.estudiante.nombre}</td>
                  <td>{peticion.articulo.nombre}</td>
                  <td>{formatDate(peticion.fechaSolicitud)}</td>
                  <td>{formatDate(peticion.fechaRequerida)}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(peticion.estado)}`}>
                      {peticion.estado.charAt(0).toUpperCase() + peticion.estado.slice(1)}
                    </span>
                  </td>
                  <td className="actions-cell">
                    {peticion.estado === 'pendiente' ? (
                      <button className="btn btn-primary btn-sm" onClick={() => handleResponderClick(peticion)}>
                        Responder
                      </button>
                    ) : (
                      <button className="btn btn-outline btn-sm" onClick={() => handleVerRespuestaClick(peticion)}>
                        Ver Respuesta
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showModal && peticionSeleccionada && (
        <Modal
          title={modalMode === 'responder' ? 'Responder Petición' : 'Detalle de Respuesta'}
          onClose={() => setShowModal(false)}
        >
          <div className="peticion-detalle">
            <div className="peticion-detalle-header">
              <h3>{peticionSeleccionada.articulo.nombre}</h3>
              <span className={`status-badge ${getStatusClass(peticionSeleccionada.estado)}`}>
                {peticionSeleccionada.estado.charAt(0).toUpperCase() + peticionSeleccionada.estado.slice(1)}
              </span>
            </div>
            
            <div className="peticion-detalle-info">
              <div className="info-grupo">
                <div className="info-item">
                  <span className="info-label">Estudiante:</span>
                  <span className="info-value">{peticionSeleccionada.estudiante.nombre}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{peticionSeleccionada.estudiante.email}</span>
                </div>
              </div>
              
              <div className="info-grupo">
                <div className="info-item">
                  <span className="info-label">Fecha de Solicitud:</span>
                  <span className="info-value">{formatDateTime(peticionSeleccionada.fechaSolicitud)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Fecha Requerida:</span>
                  <span className="info-value">{formatDate(peticionSeleccionada.fechaRequerida)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Fecha de Devolución:</span>
                  <span className="info-value">{formatDate(peticionSeleccionada.fechaDevolucion)}</span>
                </div>
              </div>
            </div>
            
            {peticionSeleccionada.nota && (
              <div className="peticion-detalle-nota">
                <h4>Nota del estudiante:</h4>
                <p>{peticionSeleccionada.nota}</p>
              </div>
            )}
            
            {modalMode === 'responder' ? (
              <form onSubmit={handleRespuestaSubmit}>
                <div className="form-group">
                  <label className="form-label">Estado de la petición</label>
                  <select 
                    name="estado" 
                    className="form-control" 
                    value={respuestaForm.estado}
                    onChange={handleRespuestaChange}
                    required
                  >
                    <option value="aprobada">Aprobar</option>
                    <option value="rechazada">Rechazar</option>
                    <option value="pospuesta">Posponer</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Respuesta</label>
                  <textarea
                    name="respuesta"
                    className="form-control"
                    value={respuestaForm.respuesta}
                    onChange={handleRespuestaChange}
                    placeholder="Escribe una respuesta para el estudiante..."
                    rows={4}
                    required
                  ></textarea>
                </div>
                
                <div className="modal-buttons">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Enviar Respuesta
                  </button>
                </div>
              </form>
            ) : (
              <div className="peticion-detalle-respuesta">
                <h4>Respuesta:</h4>
                <p>{peticionSeleccionada.respuesta}</p>
                <small>Respondido el {formatDateTime(peticionSeleccionada.fechaRespuesta)}</small>
                
                <div className="modal-buttons">
                  <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GestionPeticiones;