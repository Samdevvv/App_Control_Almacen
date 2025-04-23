import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ usuario, onLogout }) => {
  const location = useLocation();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Simular notificaciones entrantes para demostración
  useEffect(() => {
    // Datos de ejemplo - en producción esto vendría de una API
    const demoNotifications = [
      {
        id: 1,
        message: 'Tu petición para "Multímetro Digital" ha sido aprobada',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        type: 'success'
      },
      {
        id: 2,
        message: 'Tu petición para "Arduino Mega" ha sido pospuesta',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: false,
        type: 'warning'
      },
      {
        id: 3,
        message: 'Tu petición para "Cable USB" ha sido rechazada',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
        type: 'danger'
      }
    ];
    
    setNotifications(demoNotifications);
    setUnreadNotifications(demoNotifications.filter(n => !n.read).length);
    
    // Simular una nueva notificación después de 15 segundos
    const timer = setTimeout(() => {
      const newNotification = {
        id: 4,
        message: 'Nuevo artículo disponible en el Taller de Electrónica',
        timestamp: new Date().toISOString(),
        read: false,
        type: 'info'
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadNotifications(prev => prev + 1);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    
    // Marcar todas como leídas cuando se abre el panel
    if (!showNotifications) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadNotifications(0);
    }
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Determinar qué enlaces mostrar según el rol del usuario
  const renderNavLinks = () => {
    const commonLinks = [
      { to: '/dashboard', label: 'Inicio', icon: 'fas fa-home' },
      { to: '/talleres', label: 'Talleres', icon: 'fas fa-tools' },
      { to: '/mis-peticiones', label: 'Mis Peticiones', icon: 'fas fa-clipboard-list' },
    ];
    
    const teacherLinks = [
      { to: '/admin/taller', label: 'Mi Taller', icon: 'fas fa-warehouse' },
      { to: '/admin/articulos', label: 'Gestionar Artículos', icon: 'fas fa-boxes' },
      { to: '/admin/peticiones', label: 'Peticiones Recibidas', icon: 'fas fa-inbox' },
    ];
    
    return (
      <>
        {commonLinks.map((link) => (
          <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
            <Link to={link.to}>
              <i className={link.icon}></i>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
        
        {usuario && usuario.rol === 'maestro' && (
          <>
            <li className="nav-divider">Administración</li>
            {teacherLinks.map((link) => (
              <li key={link.to} className={location.pathname === link.to ? 'active' : ''}>
                <Link to={link.to}>
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
        <div className="user-avatar">
          {usuario && usuario.nombre.charAt(0).toUpperCase()}
        </div>
        <div className="user-details">
          <h4>{usuario?.nombre}</h4>
          <span className={`user-role ${usuario?.rol === 'maestro' ? 'teacher' : 'student'}`}>
            {usuario?.rol === 'maestro' ? 'Maestro' : 'Estudiante'}
          </span>
        </div>
      </div>
      
      <ul className="nav-links">
        {renderNavLinks()}
      </ul>
      
      <div className="sidebar-footer">
        <div className="notification-container">
          <button 
            className="notification-badge" 
            data-count={unreadNotifications > 0 ? unreadNotifications : ''}
            onClick={handleNotificationClick}
          >
            <i className="fas fa-bell"></i>
          </button>
          
          {showNotifications && (
            <div className="notifications-panel">
              <div className="notifications-header">
                <h4>Notificaciones</h4>
                <button className="close-notifications">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="notifications-body">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.type} ${!notification.read ? 'unread' : ''}`}>
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
        
        <button className="logout-btn" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;