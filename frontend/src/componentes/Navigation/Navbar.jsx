import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ usuario, onLogout }) => {
  const location = useLocation();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const notificationsPanelRef = useRef(null);
  const notificationButtonRef = useRef(null);

  // Detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar panel de notificaciones al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showNotifications &&
        notificationsPanelRef.current &&
        !notificationsPanelRef.current.contains(event.target) &&
        !notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  // Simulación de notificaciones
  useEffect(() => {
    const demoNotifications = [
      {
        id: 1,
        message: 'Nuevo usuario registrado: Estudiante Demo',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        type: 'success',
      },
      {
        id: 2,
        message: 'Taller de Electrónica actualizado',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: false,
        type: 'info',
      },
      {
        id: 3,
        message: 'Usuario eliminado: Estudiante Antiguo',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
        type: 'danger',
      },
    ];

    setNotifications(demoNotifications);
    setUnreadNotifications(demoNotifications.filter((n) => !n.read).length);
  }, []);

  // Manejar clic en notificaciones
  const handleNotificationClick = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);

    if (!showNotifications) {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      setUnreadNotifications(0);
    }
  };

  // Cerrar panel de notificaciones
  const handleCloseNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(false);
  };

  // Formatear timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Renderizar links de navegación según rol de usuario
  const renderNavLinks = () => {
    // Links comunes
    const commonLinks = [
      { to: '/dashboard', label: 'Inicio', icon: 'fas fa-home' },
      { to: '/talleres', label: 'Talleres', icon: 'fas fa-tools' },
    ];

    // Links para no-admin
    const nonAdminLinks = [
      { to: '/mis-peticiones', label: 'Mis Peticiones', icon: 'fas fa-clipboard-list' },
    ];

    // Links para maestros
    const teacherLinks = [
      { to: '/admin/taller', label: 'Mi Taller', icon: 'fas fa-warehouse' },
      { to: '/admin/articulos', label: 'Gestionar Artículos', icon: 'fas fa-boxes' },
      { to: '/admin/peticiones', label: 'Peticiones Recibidas', icon: 'fas fa-inbox' },
    ];

    // Links para admin
    const adminLinks = [
      { to: '/dashboard', label: 'Panel Admin', icon: 'fas fa-cog' },
    ];

    return (
      <>
        {commonLinks.map((link) => (
          <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
            <Link to={link.to} title={isMobile ? link.label : ''}>
              <i className={link.icon}></i>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}

        {usuario && usuario.rol !== 'admin' && (
          <>
            {nonAdminLinks.map((link) => (
              <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
                <Link to={link.to} title={isMobile ? link.label : ''}>
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </>
        )}

        {usuario && usuario.rol === 'maestro' && (
          <>
            <li className="nav-divider">Administración</li>
            {teacherLinks.map((link) => (
              <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
                <Link to={link.to} title={isMobile ? link.label : ''}>
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </>
        )}

        {usuario && usuario.rol === 'admin' && (
          <>
            <li className="nav-divider">Admin</li>
            {adminLinks.map((link) => (
              <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
                <Link to={link.to} title={isMobile ? link.label : ''}>
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>Sistema Almacén</h3>
      </div>

      <div className="user-info">
        <div className="user-avatar" title={isMobile ? usuario.nombre : ''}>
          {usuario && usuario.nombre.charAt(0).toUpperCase()}
        </div>
        <div className="user-details">
          <h4>{usuario.nombre}</h4>
          <span
            className={`user-role ${
              usuario.rol === 'maestro' ? 'teacher' : usuario.rol === 'admin' ? 'admin' : 'student'
            }`}
          >
            {usuario.rol === 'maestro'
              ? 'Maestro'
              : usuario.rol === 'admin'
              ? 'Administrador'
              : 'Estudiante'}
          </span>
        </div>
      </div>

      <ul className="nav-links">{renderNavLinks()}</ul>

      <div className="sidebar-footer">
        <div className="notification-container">
          <button
            className="notification-badge"
            data-count={unreadNotifications > 0 ? unreadNotifications : ''}
            onClick={handleNotificationClick}
            ref={notificationButtonRef}
            title={isMobile ? 'Notificaciones' : ''}
          >
            <i className="fas fa-bell"></i>
          </button>

          {showNotifications && (
            <div className="notifications-panel" ref={notificationsPanelRef}>
              <div className="notifications-header">
                <h4>Notificaciones</h4>
                <button className="close-notifications" onClick={handleCloseNotifications}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="notifications-body">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.type} ${
                        !notification.read ? 'unread' : ''
                      }`}
                    >
                      <p>{notification.message}</p>
                      <small>{formatTime(notification.timestamp)}</small>
                    </div>
                  ))
                ) : (
                  <p className="no-notifications">No hay notificaciones</p>
                )}
              </div>
            </div>
          )}
        </div>

        <button className="logout-btn" onClick={onLogout} title={isMobile ? 'Cerrar sesión' : ''}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;