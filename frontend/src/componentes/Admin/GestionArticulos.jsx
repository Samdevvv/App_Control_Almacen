import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Common/Modal';
import './Admin.css';
import '../../global.css'

const GestionArticulos = ({ usuario }) => {
  const [articulos, setArticulos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' o 'edit'
  const [selectedArticulo, setSelectedArticulo] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [vistaActual, setVistaActual] = useState('tarjetas'); // 'tarjetas' o 'tabla'
  const [articuloForm, setArticuloForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    cantidad: 0,
    especificaciones: []
  });
  
  useEffect(() => {
    // Verificar que el usuario es maestro
    if (!usuario || usuario.rol !== 'maestro') {
      return;
    }
    
    // Simulación de carga de datos - en producción esto sería una llamada a la API
    setTimeout(() => {
      // Datos simulados para desarrollo
      const articulosData = [
        {
          id: 1,
          nombre: 'Multímetro Digital',
          descripcion: 'Multímetro digital para medición de voltaje, corriente y resistencia.',
          categoria: 'Instrumentos de Medición',
          disponible: true,
          cantidad: 15,
          imagen: 'multimetro.jpg',
          especificaciones: [
            { nombre: 'Marca', valor: 'Fluke' },
            { nombre: 'Modelo', valor: '117' },
            { nombre: 'Rango Voltaje', valor: '0-600V' }
          ]
        },
        {
          id: 2,
          nombre: 'Arduino UNO',
          descripcion: 'Placa Arduino UNO Rev3 basada en microcontrolador ATmega328P.',
          categoria: 'Microcontroladores',
          disponible: true,
          cantidad: 20,
          imagen: 'arduino.jpg',
          especificaciones: [
            { nombre: 'Microcontrolador', valor: 'ATmega328P' },
            { nombre: 'Voltaje', valor: '5V' },
            { nombre: 'Pines Digitales', valor: '14' }
          ]
        },
        {
          id: 3,
          nombre: 'Osciloscopio',
          descripcion: 'Osciloscopio de 100 MHz con dos canales para análisis de señales.',
          categoria: 'Instrumentos de Medición',
          disponible: false,
          cantidad: 0,
          imagen: 'osciloscopio.jpg',
          especificaciones: [
            { nombre: 'Marca', valor: 'Tektronix' },
            { nombre: 'Modelo', valor: 'TBS1052B' },
            { nombre: 'Ancho de banda', valor: '100 MHz' }
          ]
        }
      ];
      
      // Extraer categorías únicas de los artículos
      const categoriasList = [...new Set(articulosData.map(a => a.categoria))];
      
      setArticulos(articulosData);
      setCategorias(categoriasList);
      setLoading(false);
    }, 1000);
  }, [usuario]);
  
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
  
  const handleAddClick = () => {
    setModalMode('add');
    setArticuloForm({
      nombre: '',
      descripcion: '',
      categoria: '',
      cantidad: 0,
      especificaciones: [{ nombre: '', valor: '' }]
    });
    setShowModal(true);
  };
  
  const handleEditClick = (articulo) => {
    setModalMode('edit');
    setSelectedArticulo(articulo);
    setArticuloForm({
      nombre: articulo.nombre,
      descripcion: articulo.descripcion,
      categoria: articulo.categoria,
      cantidad: articulo.cantidad,
      especificaciones: [...articulo.especificaciones]
    });
    setShowModal(true);
  };
  
  const handleDeleteClick = (articuloId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      // En producción, esto sería una llamada a la API
      const nuevosArticulos = articulos.filter(a => a.id !== articuloId);
      setArticulos(nuevosArticulos);
      alert('Artículo eliminado correctamente');
    }
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setArticuloForm({
      ...articuloForm,
      [name]: value
    });
  };
  
  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setArticuloForm({
      ...articuloForm,
      cantidad: value
    });
  };
  
  const handleEspecificacionChange = (index, campo, valor) => {
    const nuevasEspecificaciones = [...articuloForm.especificaciones];
    nuevasEspecificaciones[index] = {
      ...nuevasEspecificaciones[index],
      [campo]: valor
    };
    
    setArticuloForm({
      ...articuloForm,
      especificaciones: nuevasEspecificaciones
    });
  };
  
  const handleAddEspecificacion = () => {
    setArticuloForm({
      ...articuloForm,
      especificaciones: [...articuloForm.especificaciones, { nombre: '', valor: '' }]
    });
  };
  
  const handleRemoveEspecificacion = (index) => {
    const nuevasEspecificaciones = [...articuloForm.especificaciones];
    nuevasEspecificaciones.splice(index, 1);
    
    setArticuloForm({
      ...articuloForm,
      especificaciones: nuevasEspecificaciones
    });
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      // Simulación de agregar artículo - en producción esto sería una llamada a la API
      const nuevoArticulo = {
        id: articulos.length + 1,
        ...articuloForm,
        disponible: articuloForm.cantidad > 0,
        imagen: 'default.jpg'
      };
      
      setArticulos([...articulos, nuevoArticulo]);
      
      // Actualizar categorías si se añade una nueva
      if (!categorias.includes(articuloForm.categoria)) {
        setCategorias([...categorias, articuloForm.categoria]);
      }
      
      alert('Artículo agregado correctamente');
    } else {
      // Simulación de editar artículo
      const nuevosArticulos = articulos.map(a => 
        a.id === selectedArticulo.id ? {
          ...a,
          ...articuloForm,
          disponible: articuloForm.cantidad > 0
        } : a
      );
      
      setArticulos(nuevosArticulos);
      
      // Actualizar categorías si se añade una nueva
      if (!categorias.includes(articuloForm.categoria)) {
        setCategorias([...categorias, articuloForm.categoria]);
      }
      
      alert('Artículo actualizado correctamente');
    }
    
    setShowModal(false);
  };
  
  const toggleVista = () => {
    setVistaActual(vistaActual === 'tarjetas' ? 'tabla' : 'tarjetas');
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
          <h1 className="admin-title">Gestión de Artículos</h1>
          <Link to="/admin/taller" className="btn-back">
            <i className="fas fa-arrow-left"></i> Volver a Administración
          </Link>
        </div>
        <div className="admin-actions">
          <button className="btn btn-outline btn-view-toggle" onClick={toggleVista}>
            {vistaActual === 'tarjetas' ? (
              <><i className="fas fa-table"></i> Vista de Tabla</>
            ) : (
              <><i className="fas fa-th-large"></i> Vista de Tarjetas</>
            )}
          </button>
          <button className="btn btn-primary" onClick={handleAddClick}>
            <i className="fas fa-plus"></i> Añadir Artículo
          </button>
        </div>
      </div>
      
      <div className="filter-bar">
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
      ) : vistaActual === 'tarjetas' ? (
        <div className="articulos-grid">
          {articulosFiltrados.map((articulo) => (
            <div key={articulo.id} className="articulo-card">
              <div className="articulo-card-header">
                <div className="articulo-card-category">{articulo.categoria}</div>
                <div className={`articulo-status ${articulo.disponible ? 'disponible' : 'no-disponible'}`}>
                  {articulo.disponible ? 'Disponible' : 'No disponible'}
                </div>
              </div>
              <div className="articulo-card-body">
                <h3 className="articulo-card-title">{articulo.nombre}</h3>
                <p className="articulo-card-description">{articulo.descripcion}</p>
                <div className="articulo-card-details">
                  <div className="articulo-card-quantity">
                    <i className="fas fa-box"></i> Cantidad: <span className="quantity-value">{articulo.cantidad}</span>
                  </div>
                  <div className="articulo-card-specs">
                    {articulo.especificaciones.slice(0, 2).map((spec, index) => (
                      <div key={index} className="spec-item">
                        <span className="spec-name">{spec.nombre}:</span> {spec.valor}
                      </div>
                    ))}
                    {articulo.especificaciones.length > 2 && (
                      <div className="spec-more">+{articulo.especificaciones.length - 2} más</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="articulo-card-actions">
                <button className="btn-icon" onClick={() => handleEditClick(articulo)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="btn-icon delete" onClick={() => handleDeleteClick(articulo.id)}>
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articulosFiltrados.map((articulo) => (
                <tr key={articulo.id}>
                  <td>{articulo.nombre}</td>
                  <td>{articulo.categoria}</td>
                  <td className="descripcion-cell">{articulo.descripcion}</td>
                  <td>{articulo.cantidad}</td>
                  <td>
                    <span className={`status-badge ${articulo.disponible ? 'status-approved' : 'status-rejected'}`}>
                      {articulo.disponible ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-icon" onClick={() => handleEditClick(articulo)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-icon delete" onClick={() => handleDeleteClick(articulo.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showModal && (
        <Modal
          title={modalMode === 'add' ? 'Añadir Nuevo Artículo' : 'Editar Artículo'}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre del Artículo</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={articuloForm.nombre}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={articuloForm.descripcion}
                onChange={handleFormChange}
                rows={3}
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group form-group-half">
                <label className="form-label">Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoria"
                  value={articuloForm.categoria}
                  onChange={handleFormChange}
                  list="categorias-list"
                  required
                />
                <datalist id="categorias-list">
                  {categorias.map((cat, index) => (
                    <option key={index} value={cat} />
                  ))}
                </datalist>
                <small>Escribe una categoría existente o crea una nueva</small>
              </div>
              
              <div className="form-group form-group-half">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  name="cantidad"
                  value={articuloForm.cantidad}
                  onChange={handleCantidadChange}
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Especificaciones</label>
              {articuloForm.especificaciones.map((spec, index) => (
                <div key={index} className="especificacion-row">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre (ej. Marca)"
                    value={spec.nombre}
                    onChange={(e) => handleEspecificacionChange(index, 'nombre', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Valor (ej. Sony)"
                    value={spec.valor}
                    onChange={(e) => handleEspecificacionChange(index, 'valor', e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="btn-icon delete" 
                    onClick={() => handleRemoveEspecificacion(index)}
                    disabled={articuloForm.especificaciones.length <= 1}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="btn btn-outline btn-sm mt-2" 
                onClick={handleAddEspecificacion}
              >
                <i className="fas fa-plus"></i> Añadir Especificación
              </button>
            </div>
            
            <div className="modal-buttons">
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {modalMode === 'add' ? 'Añadir Artículo' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default GestionArticulos;