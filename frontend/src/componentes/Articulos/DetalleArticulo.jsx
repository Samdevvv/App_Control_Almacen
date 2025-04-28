import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from '../Common/Modal';
import '../../global.css'

const DetalleArticulo = ({ usuario }) => {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [notificacionForm, setNotificacionForm] = useState({
    email: usuario?.email || '',
  });
  
  useEffect(() => {
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const articuloData = {
        id: parseInt(id),
        nombre: 'Osciloscopio',
        descripcion: 'Osciloscopio de 100 MHz con dos canales para análisis de señales. Este equipo permite visualizar y analizar señales eléctricas en tiempo real, midiendo amplitud, frecuencia y forma de onda. Ideal para prácticas de electrónica analógica y digital.',
        categoria: 'Instrumentos de Medición',
        disponible: false,
        cantidad: 0,
        cantidadTotal: 5,
        fechaDisponible: '2023-06-15',
        taller: {
          id: 1,
          nombre: 'Taller de Electrónica'
        },
        listaEspera: 3,
        especificaciones: [
          { nombre: 'Marca', valor: 'Tektronix' },
          { nombre: 'Modelo', valor: 'TBS1052B' },
          { nombre: 'Ancho de banda', valor: '100 MHz' },
          { nombre: 'Canales', valor: '2' },
          { nombre: 'Frecuencia de muestreo', valor: '1 GS/s' }
        ]
      };
      
      setArticulo(articuloData);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleNotificacionChange = (e) => {
    const { name, value } = e.target;
    setNotificacionForm({
      ...notificacionForm,
      [name]: value
    });
  };
  
  const handleNotificacionSubmit = (e) => {
    e.preventDefault();
    // En producción, esto sería una llamada a la API
    console.log('Notificación configurada:', notificacionForm);
    
    // Simular envío exitoso y mostrar mensaje
    alert(`Te notificaremos cuando ${articulo.nombre} esté disponible`);
    setShowModal(false);
  };
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  
  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="detalle-articulo-container">
      <div className="detalle-articulo-header">
        <Link to={`/taller/${articulo.taller.id}`} className="inventario-back">
          <i className="fas fa-arrow-left"></i>
          Volver a {articulo.taller.nombre}
        </Link>
      </div>
      
      <div className="detalle-articulo-content">
        <div className="detalle-articulo-imagen">
          <i className={`fas fa-${getArticuloIcon(articulo.categoria)} articulo-icon`}></i>
        </div>
        
        <div className="detalle-articulo-info">
          <h1 className="detalle-articulo-titulo">{articulo.nombre}</h1>
          <p className="detalle-articulo-descripcion">{articulo.descripcion}</p>
          
          <div className="detalle-articulo-meta">
            <div className="detalle-articulo-meta-item">
              <span className="meta-label">Categoría</span>
              <span className="meta-value">{articulo.categoria}</span>
            </div>
            <div className="detalle-articulo-meta-item">
              <span className="meta-label">Taller</span>
              <span className="meta-value">{articulo.taller.nombre}</span>
            </div>
            <div className="detalle-articulo-meta-item">
              <span className="meta-label">Cantidad Total</span>
              <span className="meta-value">{articulo.cantidadTotal} unidades</span>
            </div>
            <div className="detalle-articulo-meta-item">
              <span className="meta-label">En Lista de Espera</span>
              <span className="meta-value">{articulo.listaEspera} personas</span>
            </div>
          </div>
          
          <div className={`detalle-articulo-disponibilidad ${articulo.disponible ? 'disponible' : 'no-disponible'}`}>
            <i className={`fas fa-${articulo.disponible ? 'check-circle' : 'times-circle'}`}></i>
            {articulo.disponible ? (
              <span>Disponible ({articulo.cantidad} unidades)</span>
            ) : (
              <span>No disponible actualmente. Fecha estimada: {formatDate(articulo.fechaDisponible)}</span>
            )}
          </div>
          
          <div className="detalle-articulo-actions">
            {articulo.disponible ? (
              <button className="btn btn-primary">
                <i className="fas fa-clipboard-list"></i> Solicitar Artículo
              </button>
            ) : (
              <button className="btn btn-outline" onClick={() => setShowModal(true)}>
                <i className="fas fa-bell"></i> Notificarme cuando esté disponible
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="lista-espera">
        <h2 className="lista-espera-titulo">
          <i className="fas fa-info-circle"></i>
          Información de Disponibilidad
        </h2>
        
        <div className="lista-espera-info">
          {articulo.disponible ? (
            <p>Este artículo está disponible para solicitud. Una vez enviada tu petición, el encargado del taller la revisará para su aprobación.</p>
          ) : (
            <>
              <p>Este artículo no está disponible actualmente. Hay {articulo.listaEspera} personas en lista de espera.</p>
              <p>Fecha estimada de disponibilidad: <strong>{formatDate(articulo.fechaDisponible)}</strong></p>
              <p>Puedes configurar una notificación para cuando el artículo esté disponible.</p>
            </>
          )}
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Especificaciones Técnicas</h2>
        </div>
        <table className="table">
          <tbody>
            {articulo.especificaciones.map((spec, index) => (
              <tr key={index}>
                <td><strong>{spec.nombre}</strong></td>
                <td>{spec.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showModal && (
        <Modal
          title="Configurar Notificación"
          onClose={() => setShowModal(false)}
        >
          <p>Te enviaremos una notificación cuando {articulo.nombre} esté disponible.</p>
          <form onSubmit={handleNotificacionSubmit}>
            <div className="form-group">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={notificacionForm.email}
                onChange={handleNotificacionChange}
                placeholder="tu@correo.com"
                required
              />
              <small>Utilizaremos este correo para notificarte.</small>
            </div>
            <div className="modal-buttons">
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Configurar Notificación
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Función para asignar iconos según la categoría
const getArticuloIcon = (categoria) => {
  switch (categoria) {
    case 'Instrumentos de Medición':
      return 'tachometer-alt';
    case 'Microcontroladores':
      return 'microchip';
    case 'Componentes Electrónicos':
      return 'memory';
    case 'Herramientas':
      return 'tools';
    case 'Cables y Conectores':
      return 'plug';
    default:
      return 'cube';
  }
};

export default DetalleArticulo;