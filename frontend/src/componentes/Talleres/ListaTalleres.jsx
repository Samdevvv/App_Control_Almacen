import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Talleres.css';

const ListaTalleres = () => {
  const [talleres, setTalleres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  
  useEffect(() => {
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const talleresData = [
        { 
          id: 1, 
          nombre: 'Taller de Electrónica', 
          descripcion: 'Equipos y componentes electrónicos para prácticas de circuitos, microcontroladores y sistemas digitales.',
          encargado: 'Ing. Carlos Ruiz',
          totalArticulos: 120, 
          imagen: 'electronica.jpg',
          ubicacion: 'Edificio A, Planta Baja',
          horario: 'Lunes a Viernes 8:00 - 18:00'
        },
        { 
          id: 2, 
          nombre: 'Taller de Mecánica', 
          descripcion: 'Herramientas y equipos mecánicos para prácticas de manufactura, ajuste y montaje de piezas.',
          encargado: 'Ing. Roberto Méndez',
          totalArticulos: 85, 
          imagen: 'mecanica.jpg',
          ubicacion: 'Edificio B, Planta Baja',
          horario: 'Lunes a Viernes 8:00 - 16:00'
        },
        { 
          id: 3, 
          nombre: 'Taller de Informática', 
          descripcion: 'Equipos de cómputo y periféricos para prácticas de programación, redes y sistemas operativos.',
          encargado: 'Ing. Ana López',
          totalArticulos: 95, 
          imagen: 'informatica.jpg',
          ubicacion: 'Edificio C, Primer Piso',
          horario: 'Lunes a Viernes 9:00 - 19:00'
        },
        { 
          id: 4, 
          nombre: 'Laboratorio de Química', 
          descripcion: 'Instrumentos y materiales de laboratorio para prácticas de química general, analítica y orgánica.',
          encargado: 'Dr. Miguel Sánchez',
          totalArticulos: 110, 
          imagen: 'quimica.jpg',
          ubicacion: 'Edificio D, Segundo Piso',
          horario: 'Lunes a Viernes 8:00 - 17:00'
        },
        { 
          id: 5, 
          nombre: 'Taller de Automatización', 
          descripcion: 'Equipos y sistemas para prácticas de automatización industrial, PLC y control de procesos.',
          encargado: 'Ing. Patricia Gómez',
          totalArticulos: 75, 
          imagen: 'automatizacion.jpg',
          ubicacion: 'Edificio A, Segundo Piso',
          horario: 'Lunes a Viernes 8:00 - 18:00'
        },
        { 
          id: 6, 
          nombre: 'Laboratorio de Física', 
          descripcion: 'Instrumentos y equipos para prácticas de física general, mecánica, electricidad y magnetismo.',
          encargado: 'Dr. Felipe Rodríguez',
          totalArticulos: 90, 
          imagen: 'fisica.jpg',
          ubicacion: 'Edificio E, Planta Baja',
          horario: 'Lunes a Viernes 9:00 - 18:00'
        }
      ];
      
      setTalleres(talleresData);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filtrar talleres según búsqueda
  const talleresFiltrados = talleres.filter(taller => 
    taller.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    taller.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );
  
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  
  return (
    <div className="talleres-container">
      <div className="talleres-header">
        <h1>Talleres Disponibles</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar taller..."
            value={busqueda}
            onChange={handleBusquedaChange}
            className="form-control"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>
      
      {talleresFiltrados.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-search no-results-icon"></i>
          <p>No se encontraron talleres que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="talleres-grid">
          {talleresFiltrados.map((taller) => (
            <div key={taller.id} className="taller-card-large">
              <div className="taller-image-large" style={{ backgroundColor: getTallerColor(taller.id) }}>
                <div className="taller-overlay-large">
                  <span>{taller.totalArticulos} artículos</span>
                </div>
              </div>
              <div className="taller-info-large">
                <h3>{taller.nombre}</h3>
                <p className="taller-description">{taller.descripcion}</p>
                
                <div className="taller-details">
                  <div className="taller-detail">
                    <i className="fas fa-user-tie"></i>
                    <span>{taller.encargado}</span>
                  </div>
                  <div className="taller-detail">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{taller.ubicacion}</span>
                  </div>
                  <div className="taller-detail">
                    <i className="fas fa-clock"></i>
                    <span>{taller.horario}</span>
                  </div>
                </div>
                
                <Link to={`/taller/${taller.id}`} className="btn btn-primary taller-btn">
                  Ver Inventario
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Función para asignar colores a los talleres
const getTallerColor = (id) => {
  const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
  return colors[(id - 1) % colors.length];
};

export default ListaTalleres;