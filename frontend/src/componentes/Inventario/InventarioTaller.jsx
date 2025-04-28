import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Modal from '../Common/Modal';
import './Inventario.css';
import '../../global.css'

const InventarioTaller = ({ usuario }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taller, setTaller] = useState(null);
  const [articulos, setArticulos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticulo, setSelectedArticulo] = useState(null);
  const [peticionForm, setPeticionForm] = useState({
    fecha_requerida: '',
    nota: ''
  });
  
  useEffect(() => {
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const tallerData = {
        id: parseInt(id),
        nombre: 'Taller de Electrónica',
        descripcion: 'Equipos y componentes electrónicos para prácticas de circuitos, microcontroladores y sistemas digitales.',
        encargado: 'Ing. Carlos Ruiz',
        totalArticulos: 120,
        imagen: 'electronica.jpg',
        ubicacion: 'Edificio A, Planta Baja',
        horario: 'Lunes a Viernes 8:00 - 18:00'
      };
      
      const articulosData = [
        {
          id: 1,
          nombre: 'Multímetro Digital',
          descripcion: 'Multímetro digital para medición de voltaje, corriente y resistencia.',
          categoria: 'Instrumentos de Medición',
          disponible: true,
          cantidad: 15,
          imagen: 'multimetro.jpg'
        },
        {
          id: 2,
          nombre: 'Arduino UNO',
          descripcion: 'Placa Arduino UNO Rev3 basada en microcontrolador ATmega328P.',
          categoria: 'Microcontroladores',
          disponible: true,
          cantidad: 20,
          imagen: 'arduino.jpg'
        },
        {
          id: 3,
          nombre: 'Osciloscopio',
          descripcion: 'Osciloscopio de 100 MHz con dos canales para análisis de señales.',
          categoria: 'Instrumentos de Medición',
          disponible: false,
          cantidad: 0,
          imagen: 'osciloscopio.jpg'
        },
        {
          id: 4,
          nombre: 'Kit de Resistencias',
          descripcion: 'Kit de resistencias de diferentes valores, de 10 Ohm a 1 MOhm.',
          categoria: 'Componentes Electrónicos',
          disponible: true,
          cantidad: 8,
          imagen: 'resistencias.jpg'
        },
        {
          id: 5,
          nombre: 'Protoboard',
          descripcion: 'Tablero de pruebas para montaje de circuitos sin soldadura.',
          categoria: 'Herramientas',
          disponible: true,
          cantidad: 25,
          imagen: 'protoboard.jpg'
        },
        {
          id: 6,
          nombre: 'Cable Dupont',
          descripcion: 'Set de cables Dupont para conexiones en protoboard (M-M, M-H, H-H).',
          categoria: 'Cables y Conectores',
          disponible: true,
          cantidad: 30,
          imagen: 'cable-dupont.jpg'
        },
        {
          id: 7,
          nombre: 'Cautín',
          descripcion: 'Cautín de soldadura con temperatura regulable para componentes electrónicos.',
          categoria: 'Herramientas',
          disponible: true,
          cantidad: 10,
          imagen: 'cautin.jpg'
        },
        {
          id: 8,
          nombre: 'Raspberry Pi 4',
          descripcion: 'Raspberry Pi 4 Model B con 4GB de RAM para proyectos de computación.',
          categoria: 'Microcontroladores',
          disponible: false,
          cantidad: 0,
          imagen: 'raspberry.jpg'
        }
      ];
      
      // Extraer categorías únicas de los artículos
      const categoriasList = [...new Set(articulosData.map(a => a.categoria))];
      
      setTaller(tallerData);
      setArticulos(articulosData);
      setCategorias(categoriasList);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  // Filtrar artículos según búsqueda y filtros
  const articulosFiltrados = articulos.filter(articulo => {
    const coincideBusqueda = 
      articulo.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
      articulo.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCategoria = filtroCategoria ? articulo.categoria === filtroCategoria : true;
    
    const coincideDisponibilidad = 
      filtroDisponibilidad === 'disponible' ? articulo.disponible :
      filtroDisponibilidad === 'no-disponible' ? !articulo.disponible :
      true;
    
    return coincideBusqueda && coincideCategoria && coincideDisponibilidad;
  });
  
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };
  
  const handleCategoriasChange = (e) => {
    setFiltroCategoria(e.target.value);
  };
  
  const handleDisponibilidadChange = (e) => {
    setFiltroDisponibilidad(e.target.value);
  };
  
  const handleArticuloClick = (articulo) => {
    if (articulo.disponible) {
      setSelectedArticulo(articulo);
      setShowModal(true);
    } else {
      navigate(`/articulo/${articulo.id}`);
    }
  };
  
  const handlePeticionChange = (e) => {
    const { name, value } = e.target;
    setPeticionForm({
      ...peticionForm,
      [name]: value
    });
  };
  
  const handlePeticionSubmit = (e) => {
    e.preventDefault();
    // En producción, esto sería una llamada a la API
    console.log('Petición enviada:', {
      articulo: selectedArticulo,
      ...peticionForm
    });
    
    // Simular envío exitoso y mostrar mensaje
    alert(`Petición enviada para ${selectedArticulo.nombre}`);
    setShowModal(false);
    setPeticionForm({
      fecha_requerida: '',
      nota: ''
    });
  };
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <div className="inventario-title">
          <Link to="/talleres" className="inventario-back">
            <i className="fas fa-arrow-left"></i>
            Regresar
          </Link>
          <h1>{taller.nombre}</h1>
        </div>
        
        <div className="inventario-tools">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar artículo..."
              value={busqueda}
              onChange={handleBusquedaChange}
              className="form-control"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>
      </div>
      
      <div className="inventario-info">
        <div className="inventario-detail">
          <i className="fas fa-user-tie"></i>
          <span>Encargado: {taller.encargado}</span>
        </div>
        <div className="inventario-detail">
          <i className="fas fa-map-marker-alt"></i>
          <span>Ubicación: {taller.ubicacion}</span>
        </div>
        <div className="inventario-detail">
          <i className="fas fa-clock"></i>
          <span>Horario: {taller.horario}</span>
        </div>
        <div className="inventario-detail">
          <i className="fas fa-boxes"></i>
          <span>Total de artículos: {taller.totalArticulos}</span>
        </div>
      </div>
      
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Categoría:</span>
          <select 
            className="filter-select" 
            value={filtroCategoria} 
            onChange={handleCategoriasChange}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <span className="filter-label">Disponibilidad:</span>
          <select 
            className="filter-select" 
            value={filtroDisponibilidad} 
            onChange={handleDisponibilidadChange}
          >
            <option value="">Todos</option>
            <option value="disponible">Disponible</option>
            <option value="no-disponible">No disponible</option>
          </select>
        </div>
      </div>
      
      {articulosFiltrados.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-search no-results-icon"></i>
          <p>No se encontraron artículos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="articulos-grid">
          {articulosFiltrados.map((articulo) => (
            <div 
              key={articulo.id} 
              className="articulo-card" 
              onClick={() => handleArticuloClick(articulo)}
            >
              <div className="articulo-image">
                <i className={`fas fa-${getArticuloIcon(articulo.categoria)} articulo-icon`}></i>
              </div>
              <div className="articulo-content">
                <h3 className="articulo-title">{articulo.nombre}</h3>
                <p className="articulo-description">{articulo.descripcion}</p>
                <div className="articulo-footer">
                  <span className="articulo-category">{articulo.categoria}</span>
                  <span className={`articulo-status ${articulo.disponible ? 'articulo-disponible' : 'articulo-no-disponible'}`}>
                    {articulo.disponible ? `Disponible (${articulo.cantidad})` : 'No disponible'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showModal && selectedArticulo && (
        <Modal
          title={`Solicitar ${selectedArticulo.nombre}`}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handlePeticionSubmit}>
            <div className="form-group">
              <label className="form-label">Fecha requerida</label>
              <input
                type="date"
                className="form-control"
                name="fecha_requerida"
                value={peticionForm.fecha_requerida}
                onChange={handlePeticionChange}
                min={new Date().toISOString().split('T')[0]} // No permitir fechas pasadas
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nota (opcional)</label>
              <textarea
                className="form-control"
                name="nota"
                value={peticionForm.nota}
                onChange={handlePeticionChange}
                placeholder="Escribe una nota para el encargado del taller..."
                rows={4}
              ></textarea>
            </div>
            <div className="modal-buttons">
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Enviar Solicitud
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

export default InventarioTaller;