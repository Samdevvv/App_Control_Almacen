import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import './AdminDashboard.css';

const AdminDashboard = ({ usuario }) => {
  const [users, setUsers] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [userForm, setUserForm] = useState({
    nombre: '',
    email: '',
    rol: 'estudiante',
    password: '',
    curso: '',        // Campo adicional para estudiantes
    numero: '',       // Campo adicional para estudiantes
  });
  const [workshopForm, setWorkshopForm] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    horario: '',
    encargados: [], // Array of teacher objects { id, nombre }
  });
  const [workshopFormError, setWorkshopFormError] = useState('');

  useEffect(() => {
    if (!usuario || usuario.rol !== 'admin') {
      return;
    }

    // Simulate API data fetch with varied example users
    setTimeout(() => {
      const usersData = [
        { id: 1, nombre: 'Admin Principal', email: 'admin@escuela.edu', rol: 'admin' },
        { id: 2, nombre: 'Profesor Juan Pérez', email: 'juan.perez@escuela.edu', rol: 'maestro' },
        { id: 3, nombre: 'Profesora Ana Gómez', email: 'ana.gomez@escuela.edu', rol: 'maestro' },
        { id: 4, nombre: 'Profesor Miguel Sánchez', email: 'miguel.sanchez@escuela.edu', rol: 'maestro' },
        { id: 5, nombre: 'Profesora Laura Torres', email: 'laura.torres@escuela.edu', rol: 'maestro' },
        { id: 6, nombre: 'Estudiante María López', email: 'maria.lopez@escuela.edu', rol: 'estudiante', curso: '3º Semestre', numero: '2023-0123' },
        { id: 7, nombre: 'Estudiante Carlos Ramírez', email: 'carlos.ramirez@escuela.edu', rol: 'estudiante', curso: '5º Semestre', numero: '2021-0456' },
        { id: 8, nombre: 'Estudiante Andrea Vargas', email: 'andrea.vargas@escuela.edu', rol: 'estudiante', curso: '1º Semestre', numero: '2024-0789' },
        { id: 9, nombre: 'Estudiante Roberto Méndez', email: 'roberto.mendez@escuela.edu', rol: 'estudiante', curso: '7º Semestre', numero: '2020-0321' },
        { id: 10, nombre: 'Estudiante Elena Castro', email: 'elena.castro@escuela.edu', rol: 'estudiante', curso: '3º Semestre', numero: '2023-0654' },
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
        },
        {
          id: 2,
          nombre: 'Taller de Robótica',
          descripcion: 'Programación y construcción de robots',
          ubicacion: 'Edificio B, Aula 203',
          horario: 'Martes y Jueves 14:00 - 17:00',
          encargados: [{ id: 3, nombre: 'Profesora Ana Gómez' }],
        },
        {
          id: 3,
          nombre: 'Laboratorio de Informática',
          descripcion: 'Desarrollo de software y aplicaciones',
          ubicacion: 'Edificio C, Aula 105',
          horario: 'Lunes, Miércoles y Viernes 9:00 - 13:00',
          encargados: [{ id: 4, nombre: 'Profesor Miguel Sánchez' }],
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
        },
      ];

      setUsers(usersData);
      setWorkshops(workshopsData);
      setLoading(false);
    }, 1000);
  }, [usuario]);

  // User form handlers
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    const userData = { ...userForm };
    
    // Si no es estudiante, eliminamos los campos específicos de estudiantes
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
      alert('Usuario agregado correctamente');
    } else {
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id ? { ...u, ...userData } : u
      );
      setUsers(updatedUsers);
      alert('Usuario actualizado correctamente');
    }
    setShowUserModal(false);
    setUserForm({ nombre: '', email: '', rol: 'estudiante', password: '', curso: '', numero: '' });
  };

  const handleAddUserClick = () => {
    setModalMode('add');
    setUserForm({ nombre: '', email: '', rol: 'estudiante', password: '', curso: '', numero: '' });
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
      numero: user.numero || '' 
    });
    setShowUserModal(true);
  };

  const handleDeleteUserClick = (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      setUsers(users.filter((u) => u.id !== userId));
      alert('Usuario eliminado correctamente');
    }
  };

  // Workshop form handlers
  const handleWorkshopFormChange = (e) => {
    const { name, value } = e.target;
    setWorkshopForm({ ...workshopForm, [name]: value });
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
      alert('Taller agregado correctamente');
    } else {
      const updatedWorkshops = workshops.map((w) =>
        w.id === selectedWorkshop.id ? { ...w, ...workshopForm } : w
      );
      setWorkshops(updatedWorkshops);
      alert('Taller actualizado correctamente');
    }
    setShowWorkshopModal(false);
    setWorkshopForm({ nombre: '', descripcion: '', ubicacion: '', horario: '', encargados: [] });
    setWorkshopFormError('');
  };

  const handleAddWorkshopClick = () => {
    setModalMode('add');
    setWorkshopForm({ nombre: '', descripcion: '', ubicacion: '', horario: '', encargados: [] });
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
    });
    setShowWorkshopModal(true);
    setWorkshopFormError('');
  };

  const handleDeleteWorkshopClick = (workshopId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este taller?')) {
      setWorkshops(workshops.filter((w) => w.id !== workshopId));
      alert('Taller eliminado correctamente');
    }
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
                    {/* Columnas adicionales para estudiantes */}
                    <th>Curso</th>
                    <th>Número</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.nombre}</td>
                      <td>{user.email}</td>
                      <td>{user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}</td>
                      {/* Datos adicionales para estudiantes */}
                      <td>{user.rol === 'estudiante' ? user.curso : '-'}</td>
                      <td>{user.rol === 'estudiante' ? user.numero : '-'}</td>
                      <td className="actions-cell">
                        <button className="btn-icon" onClick={() => handleEditUserClick(user)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn-icon delete" onClick={() => handleDeleteUserClick(user.id)}>
                          <i className="fas fa-trash-alt"></i>
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
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {workshops.map((workshop) => (
                    <tr key={workshop.id}>
                      <td>{workshop.nombre}</td>
                      <td>{workshop.ubicacion}</td>
                      <td>{workshop.horario}</td>
                      <td>{workshop.encargados.map((e) => e.nombre).join(', ')}</td>
                      <td className="actions-cell">
                        <button className="btn-icon" onClick={() => handleEditWorkshopClick(workshop)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn-icon delete" onClick={() => handleDeleteWorkshopClick(workshop.id)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

            {/* Campos adicionales solo para estudiantes */}
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
    </div>
  );
};

export default AdminDashboard;