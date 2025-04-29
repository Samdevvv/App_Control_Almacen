import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import ConfirmationModal from '../Common/ConfirmationModal';
import './AdminDashboard.css';
import '../Peticiones/Peticiones.css';
import '../../global.css';

const AdminDashboard = ({ usuario }) => {
  const [users, setUsers] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [peticiones, setPeticiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [showPeticionModal, setShowPeticionModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationConfig, setConfirmationConfig] = useState({
    title: '',
    message: '',
    type: 'confirm', // 'confirm', 'success', or 'error'
    onConfirm: () => {},
  });
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [peticionSeleccionada, setPeticionSeleccionada] = useState(null);
  const [userForm, setUserForm] = useState({
    nombre: '',
    email: '',
    rol: 'estudiante',
    password: '',
    curso: '',
    numero: '',
    isActive: true,
  });
  const [workshopForm, setWorkshopForm] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    horario: '',
    encargados: [],
    isActive: true,
  });
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [workshopFormError, setWorkshopFormError] = useState('');

  useEffect(() => {
    if (!usuario || usuario.rol !== 'admin') {
      return;
    }

    setTimeout(() => {
      const usersData = [
        { id: 1, nombre: 'Admin Principal', email: 'admin@escuela.edu', rol: 'admin', isActive: true },
        { id: 2, nombre: 'Profesor Juan Pérez', email: 'juan.perez@escuela.edu', rol: 'maestro', isActive: true },
        { id: 3, nombre: 'Profesora Ana Gómez', email: 'ana.gomez@escuela.edu', rol: 'maestro', isActive: true },
        { id: 4, nombre: 'Profesor Miguel Sánchez', email: 'miguel.sanchez@escuela.edu', rol: 'maestro', isActive: true },
        { id: 5, nombre: 'Profesora Laura Torres', email: 'laura.torres@escuela.edu', rol: 'maestro', isActive: true },
        { id: 6, nombre: 'Estudiante María López', email: 'maria.lopez@escuela.edu', rol: 'estudiante', curso: '3º Semestre', numero: '2023-0123', isActive: true },
        { id: 7, nombre: 'Estudiante Carlos Ramírez', email: 'carlos.ramirez@escuela.edu', rol: 'estudiante', curso: '5º Semestre', numero: '2021-0456', isActive: true },
        { id: 8, nombre: 'Estudiante Andrea Vargas', email: 'andrea.vargas@escuela.edu', rol: 'estudiante', curso: '1º Semestre', numero: '2024-0789', isActive: true },
        { id: 9, nombre: 'Estudiante Roberto Méndez', email: 'roberto.mendez@escuela.edu', rol: 'estudiante', curso: '7º Semestre', numero: '2020-0321', isActive: true },
        { id: 10, nombre: 'Estudiante Elena Castro', email: 'elena.castro@escuela.edu', rol: 'estudiante', curso: '3º Semestre', numero: '2023-0654', isActive: true },
      ];

      const workshopsData = [
        {
          id: 1,
          nombre: 'Taller de Electrónica',
          descripcion: 'Equipos y componentes electrónicos',
          ubicacion: 'Edificio A, Planta Baja',
          horario: 'Lunes a Viernes 8:00 - 18:00',
          encargados: [
            { id: 2, nombre: 'Profesor Juan Pérez' },
            { id: 3, nombre: 'Profesora Ana Gómez' },
          ],
          isActive: true,
        },
        {
          id: 2,
          nombre: 'Taller de Robótica',
          descripcion: 'Programación y construcción de robots',
          ubicacion: 'Edificio B, Aula 203',
          horario: 'Martes y Jueves 14:00 - 17:00',
          encargados: [{ id: 3, nombre: 'Profesora Ana Gómez' }],
          isActive: true,
        },
        {
          id: 3,
          nombre: 'Laboratorio de Informática',
          descripcion: 'Desarrollo de software y aplicaciones',
          ubicacion: 'Edificio C, Aula 105',
          horario: 'Lunes, Miércoles y Viernes 9:00 - 13:00',
          encargados: [{ id: 4, nombre: 'Profesor Miguel Sánchez' }],
          isActive: true,
        },
        {
          id: 4,
          nombre: 'Taller de Mecánica',
          descripcion: 'Diseño y construcción de componentes mecánicos',
          ubicacion: 'Edificio D, Sótano',
          horario: 'Jueves y Viernes 14:00 - 19:00',
          encargados: [
            { id: 2, nombre: 'Profesor Juan Pérez' },
            { id: 5, nombre: 'Profesora Laura Torres' },
          ],
          isActive: true,
        },
      ];

      const peticionesData = [
        {
          id: 1,
          articulo: {
            id: 1,
            nombre: 'Multímetro Digital',
            categoria: 'Instrumentos de Medición',
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica',
          },
          fechaSolicitud: '2023-05-10T14:30:00',
          fechaRequerida: '2023-05-15',
          fechaDevolucion: '2023-05-20',
          estado: 'aprobada',
          nota: 'Necesito el multímetro para un proyecto de la clase de Circuitos.',
          respuesta: 'Aprobado. Puedes pasar a recogerlo el día 15 de mayo a partir de las 9:00 am.',
          fechaRespuesta: '2023-05-11T10:15:00',
        },
        {
          id: 2,
          articulo: {
            id: 2,
            nombre: 'Arduino UNO',
            categoria: 'Microcontroladores',
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica',
          },
          fechaSolicitud: '2023-05-09T11:20:00',
          fechaRequerida: '2023-05-14',
          fechaDevolucion: '2023-05-21',
          estado: 'pendiente',
          nota: '',
          respuesta: '',
          fechaRespuesta: null,
        },
        {
          id: 3,
          articulo: {
            id: 3,
            nombre: 'Osciloscopio',
            categoria: 'Instrumentos de Medición',
          },
          taller: {
            id: 1,
            nombre: 'Taller de Electrónica',
          },
          fechaSolicitud: '2023-05-08T09:45:00',
          fechaRequerida: '2023-05-12',
          fechaDevolucion: '2023-05-19',
          estado: 'rechazada',
          nota: 'Lo necesito para un experimento de física.',
          respuesta: 'Lo siento, no está disponible para la fecha solicitada. Ya hay 3 reservas previas.',
          fechaRespuesta: '2023-05-09T14:30:00',
        },
      ];

      setUsers(usersData);
      setWorkshops(workshopsData);
      setPeticiones(peticionesData);
      setLoading(false);
    }, 1000);
  }, [usuario]);

  // User form handlers
  const handleUserFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserForm({ ...userForm, [name]: type === 'checkbox' ? checked : value });
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    const userData = { ...userForm };

    if (userData.rol !== 'estudiante') {
      delete userData.curso;
      delete userData.numero;
    }

    if (modalMode === 'add') {
      const newUser = {
        id: users.length + 1,
        ...userData,
      };
      setUsers([...users, newUser]);
      setConfirmationConfig({
        title: 'Éxito',
        message: 'Usuario agregado correctamente',
        type: 'success',
        onConfirm: () => {},
      });
      setShowConfirmationModal(true);
    } else {
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id ? { ...u, ...userData } : u
      );
      setUsers(updatedUsers);
      setConfirmationConfig({
        title: 'Éxito',
        message: 'Usuario actualizado correctamente',
        type: 'success',
        onConfirm: () => {},
      });
      setShowConfirmationModal(true);
    }
    setShowUserModal(false);
    setUserForm({ nombre: '', email: '', rol: 'estudiante', password: '', curso: '', numero: '', isActive: true });
  };

  const handleAddUserClick = () => {
    setModalMode('add');
    setUserForm({ nombre: '', email: '', rol: 'estudiante', password: '', curso: '', numero: '', isActive: true });
    setShowUserModal(true);
  };

  const handleEditUserClick = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setUserForm({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      password: '',
      curso: user.curso || '',
      numero: user.numero || '',
      isActive: user.isActive,
    });
    setShowUserModal(true);
  };

  const handleDeleteUserClick = (userId) => {
    const user = users.find((u) => u.id === userId);
    setConfirmationConfig({
      title: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar a ${user.nombre}?`,
      type: 'confirm',
      onConfirm: () => {
        setUsers(users.filter((u) => u.id !== userId));
        setConfirmationConfig({
          title: 'Éxito',
          message: 'Usuario eliminado correctamente',
          type: 'success',
          onConfirm: () => {},
        });
        setShowConfirmationModal(true);
      },
    });
    setShowConfirmationModal(true);
  };

  const handleToggleUserActive = (userId) => {
    const user = users.find((u) => u.id === userId);
    setConfirmationConfig({
      title: 'Confirmar Acción',
      message: `¿Estás seguro de que deseas ${user.isActive ? 'inactivar' : 'activar'} a ${user.nombre}?`,
      type: 'confirm',
      onConfirm: () => {
        const updatedUsers = users.map((u) =>
          u.id === userId ? { ...u, isActive: !u.isActive } : u
        );
        setUsers(updatedUsers);
        setConfirmationConfig({
          title: 'Éxito',
          message: `Usuario ${user.isActive ? 'inactivado' : 'activado'} correctamente`,
          type: 'success',
          onConfirm: () => {},
        });
        setShowConfirmationModal(true);
      },
    });
    setShowConfirmationModal(true);
  };

  // Workshop form handlers
  const handleWorkshopFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkshopForm({ ...workshopForm, [name]: type === 'checkbox' ? checked : value });
    setWorkshopFormError('');
  };

  const handleEncargadosChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    const selectedTeachers = users
      .filter((u) => u.rol === 'maestro' && selectedIds.includes(u.id))
      .map((u) => ({ id: u.id, nombre: u.nombre }));
    setWorkshopForm({ ...workshopForm, encargados: selectedTeachers });
    setWorkshopFormError('');
  };

  const handleWorkshopFormSubmit = (e) => {
    e.preventDefault();
    if (workshopForm.encargados.length === 0) {
      setWorkshopFormError('Debes asignar al menos un encargado.');
      return;
    }

    if (modalMode === 'add') {
      const newWorkshop = {
        id: workshops.length + 1,
        ...workshopForm,
      };
      setWorkshops([...workshops, newWorkshop]);
      setConfirmationConfig({
        title: 'Éxito',
        message: 'Taller agregado correctamente',
        type: 'success',
        onConfirm: () => {},
      });
      setShowConfirmationModal(true);
    } else {
      const updatedWorkshops = workshops.map((w) =>
        w.id === selectedWorkshop.id ? { ...w, ...workshopForm } : w
      );
      setWorkshops(updatedWorkshops);
      setConfirmationConfig({
        title: 'Éxito',
        message: 'Taller actualizado correctamente',
        type: 'success',
        onConfirm: () => {},
      });
      setShowConfirmationModal(true);
    }
    setShowWorkshopModal(false);
    setWorkshopForm({ nombre: '', descripcion: '', ubicacion: '', horario: '', encargados: [], isActive: true });
    setWorkshopFormError('');
  };

  const handleAddWorkshopClick = () => {
    setModalMode('add');
    setWorkshopForm({ nombre: '', descripcion: '', ubicacion: '', horario: '', encargados: [], isActive: true });
    setShowWorkshopModal(true);
    setWorkshopFormError('');
  };

  const handleEditWorkshopClick = (workshop) => {
    setModalMode('edit');
    setSelectedWorkshop(workshop);
    setWorkshopForm({
      nombre: workshop.nombre,
      descripcion: workshop.descripcion,
      ubicacion: workshop.ubicacion,
      horario: workshop.horario,
      encargados: workshop.encargados,
      isActive: workshop.isActive,
    });
    setShowWorkshopModal(true);
    setWorkshopFormError('');
  };

  const handleDeleteWorkshopClick = (workshopId) => {
    const workshop = workshops.find((w) => w.id === workshopId);
    setConfirmationConfig({
      title: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar el taller ${workshop.nombre}?`,
      type: 'confirm',
      onConfirm: () => {
        setWorkshops(workshops.filter((w) => w.id !== workshopId));
        setConfirmationConfig({
          title: 'Éxito',
          message: 'Taller eliminado correctamente',
          type: 'success',
          onConfirm: () => {},
        });
        setShowConfirmationModal(true);
      },
    });
    setShowConfirmationModal(true);
  };

  const handleToggleWorkshopActive = (workshopId) => {
    const workshop = workshops.find((w) => w.id === workshopId);
    setConfirmationConfig({
      title: 'Confirmar Acción',
      message: `¿Estás seguro de que deseas ${workshop.isActive ? 'inactivar' : 'activar'} el taller ${workshop.nombre}?`,
      type: 'confirm',
      onConfirm: () => {
        const updatedWorkshops = workshops.map((w) =>
          w.id === workshopId ? { ...w, isActive: !w.isActive } : w
        );
        setWorkshops(updatedWorkshops);
        setConfirmationConfig({
          title: 'Éxito',
          message: `Taller ${workshop.isActive ? 'inactivado' : 'activado'} correctamente`,
          type: 'success',
          onConfirm: () => {},
        });
        setShowConfirmationModal(true);
      },
    });
    setShowConfirmationModal(true);
  };

  // Peticiones handlers
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

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
      case 'cancelada':
        return 'status-canceled';
      default:
        return 'status-pending';
    }
  };

  const peticionesFiltradas = filtroEstado
    ? peticiones.filter((p) => p.estado === filtroEstado)
    : peticiones;

  const handleFiltroChange = (e) => {
    setFiltroEstado(e.target.value);
  };

  const handleCancelClick = (peticion) => {
    setPeticionSeleccionada(peticion);
    setShowPeticionModal(true);
  };

  const handleMotivoChange = (e) => {
    setMotivoCancelacion(e.target.value);
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    console.log('Cancelación de petición:', {
      peticionId: peticionSeleccionada.id,
      motivo: motivoCancelacion,
    });

    const nuevasPeticiones = peticiones.map((p) =>
      p.id === peticionSeleccionada.id ? { ...p, estado: 'cancelada' } : p
    );

    setPeticiones(nuevasPeticiones);
    setShowPeticionModal(false);
    setMotivoCancelacion('');
    setConfirmationConfig({
      title: 'Éxito',
      message: `La petición para ${peticionSeleccionada.articulo.nombre} ha sido cancelada`,
      type: 'success',
      onConfirm: () => {},
    });
    setShowConfirmationModal(true);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-title">Panel de Administración</h1>

      <div className="admin-grid">
        <div className="admin-main">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Gestión de Usuarios</h2>
              <button className="btn btn-primary" onClick={handleAddUserClick}>
                <i className="fas fa-plus"></i> Añadir Usuario
              </button>
            </div>
            <div className="admin-table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Curso</th>
                    <th>Número</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className={!user.isActive ? 'inactive-row' : ''}>
                      <td>{user.nombre}</td>
                      <td>{user.email}</td>
                      <td>{user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}</td>
                      <td>{user.rol === 'estudiante' ? user.curso : '-'}</td>
                      <td>{user.rol === 'estudiante' ? user.numero : '-'}</td>
                      <td>{user.isActive ? 'Activo' : 'Inactivo'}</td>
                      <td className="actions-cell">
                        <button
                          className="btn-icon edit"
                          onClick={() => handleEditUserClick(user)}
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                          <span className="sr-only">Editar</span>
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteUserClick(user.id)}
                          title="Eliminar"
                        >
                          <i className="fas fa-trash"></i>
                          <span className="sr-only">Eliminar</span>
                        </button>
                        <button
                          className={`btn-icon toggle ${!user.isActive ? 'inactive' : ''}`}
                          onClick={() => handleToggleUserActive(user.id)}
                          title={user.isActive ? 'Inactivar' : 'Activar'}
                        >
                          <i className={user.isActive ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i>
                          <span className="sr-only">{user.isActive ? 'Inactivar' : 'Activar'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Gestión de Talleres</h2>
              <button className="btn btn-primary" onClick={handleAddWorkshopClick}>
                <i className="fas fa-plus"></i> Añadir Taller
              </button>
            </div>
            <div className="admin-table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Ubicación</th>
                    <th>Horario</th>
                    <th>Encargados</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {workshops.map((workshop) => (
                    <tr key={workshop.id} className={!workshop.isActive ? 'inactive-row' : ''}>
                      <td>{workshop.nombre}</td>
                      <td>{workshop.ubicacion}</td>
                      <td>{workshop.horario}</td>
                      <td>{workshop.encargados.map((e) => e.nombre).join(', ')}</td>
                      <td>{workshop.isActive ? 'Activo' : 'Inactivo'}</td>
                      <td className="actions-cell">
                        <button
                          className="btn-icon edit"
                          onClick={() => handleEditWorkshopClick(workshop)}
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                          <span className="sr-only">Editar</span>
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteWorkshopClick(workshop.id)}
                          title="Eliminar"
                        >
                          <i className="fas fa-trash"></i>
                          <span className="sr-only">Eliminar</span>
                        </button>
                        <button
                          className={`btn-icon toggle ${!workshop.isActive ? 'inactive' : ''}`}
                          onClick={() => handleToggleWorkshopActive(workshop.id)}
                          title={workshop.isActive ? 'Inactivar' : 'Activar'}
                        >
                          <i className={workshop.isActive ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i>
                          <span className="sr-only">{workshop.isActive ? 'Inactivar' : 'Activar'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Mis Peticiones</h2>
              <div className="peticiones-tools">
                <div className="filter-group">
                  <label className="filter-label">Filtrar por estado:</label>
                  <select className="filter-select" value={filtroEstado} onChange={handleFiltroChange}>
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
            <div className="peticiones-list">
              {peticionesFiltradas.length === 0 ? (
                <div className="no-results">
                  <i className="fas fa-clipboard-list no-results-icon"></i>
                  <p>No tienes peticiones {filtroEstado && `con estado "${filtroEstado}"`}</p>
                </div>
              ) : (
                peticionesFiltradas.map((peticion) => (
                  <div key={peticion.id} className="peticion-card">
                    <div className="peticion-header">
                      <div className="peticion-title">
                        <h3>{peticion.articulo.nombre}</h3>
                        <span className={`status-badge ${getStatusClass(peticion.estado)}`}>
                          {peticion.estado.charAt(0).toUpperCase() + peticion.estado.slice(1)}
                        </span>
                      </div>
                      <div className="peticion-actions">
                        <a href={`/articulo/${peticion.articulo.id}`} className="btn btn-outline btn-sm">
                          <i className="fas fa-eye"></i> Ver Artículo
                        </a>
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
                        <h4>Nota del administrador:</h4>
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showUserModal && (
        <Modal
          title={modalMode === 'add' ? 'Añadir Nuevo Usuario' : 'Editar Usuario'}
          onClose={() => setShowUserModal(false)}
        >
          <form onSubmit={handleUserFormSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={userForm.nombre}
                onChange={handleUserFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userForm.email}
                onChange={handleUserFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Rol</label>
              <select
                name="rol"
                className="form-control"
                value={userForm.rol}
                onChange={handleUserFormChange}
                required
              >
                <option value="admin">Administrador</option>
                <option value="maestro">Maestro</option>
                <option value="estudiante">Estudiante</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Contraseña {modalMode === 'edit' && '(Dejar en blanco para no cambiar)'}
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={userForm.password}
                onChange={handleUserFormChange}
                required={modalMode === 'add'}
              />
            </div>
            {userForm.rol === 'estudiante' && (
              <>
                <div className="form-group">
                  <label className="form-label">Curso / Semestre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="curso"
                    value={userForm.curso}
                    onChange={handleUserFormChange}
                    placeholder="Ej: 3º Semestre"
                    required={userForm.rol === 'estudiante'}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Número de Estudiante</label>
                  <input
                    type="text"
                    className="form-control"
                    name="numero"
                    value={userForm.numero}
                    onChange={handleUserFormChange}
                    placeholder="Ej: 2023-0123"
                    required={userForm.rol === 'estudiante'}
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={userForm.isActive}
                  onChange={handleUserFormChange}
                />
                 Usuario Activo
              </label>
            </div>
            <div className="modal-buttons">
              <button type="button" className="btn btn-outline" onClick={() => setShowUserModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {modalMode === 'add' ? 'Añadir Usuario' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showWorkshopModal && (
        <Modal
          title={modalMode === 'add' ? 'Añadir Nuevo Taller' : 'Editar Taller'}
          onClose={() => setShowWorkshopModal(false)}
        >
          <form onSubmit={handleWorkshopFormSubmit}>
            {workshopFormError && (
              <div className="alert alert-danger">{workshopFormError}</div>
            )}
            <div className="form-group">
              <label className="form-label">Nombre del Taller</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={workshopForm.nombre}
                onChange={handleWorkshopFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={workshopForm.descripcion}
                onChange={handleWorkshopFormChange}
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
                value={workshopForm.ubicacion}
                onChange={handleWorkshopFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Horario</label>
              <input
                type="text"
                className="form-control"
                name="horario"
                value={workshopForm.horario}
                onChange={handleWorkshopFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Encargados (Selecciona al menos uno)</label>
              <select
                multiple
                className="form-control"
                value={workshopForm.encargados.map((e) => e.id)}
                onChange={handleEncargadosChange}
                required
              >
                {users
                  .filter((u) => u.rol === 'maestro')
                  .map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.nombre}
                    </option>
                  ))}
              </select>
              <small>Usa Ctrl/Cmd para seleccionar múltiples encargados</small>
            </div>
            <div className="form-group">
              <label className="form-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={workshopForm.isActive}
                  onChange={handleWorkshopFormChange}
                />
                 Taller Activo
              </label>
            </div>
            <div className="modal-buttons">
              <button type="button" className="btn btn-outline" onClick={() => setShowWorkshopModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {modalMode === 'add' ? 'Añadir Taller' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showPeticionModal && peticionSeleccionada && (
        <Modal
          title={`Cancelar petición: ${peticionSeleccionada.articulo.nombre}`}
          onClose={() => setShowPeticionModal(false)}
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
              <button type="button" className="btn btn-outline" onClick={() => setShowPeticionModal(false)}>
                Volver
              </button>
              <button type="submit" className="btn btn-danger">
                Confirmar Cancelación
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          title={confirmationConfig.title}
          message={confirmationConfig.message}
          type={confirmationConfig.type}
          onConfirm={confirmationConfig.onConfirm}
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;