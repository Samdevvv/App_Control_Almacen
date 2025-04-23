import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'estudiante' // Por defecto, estudiante
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // En producción, esto sería una llamada a la API de autenticación
      // Por ahora simulamos una respuesta exitosa después de 1 segundo
      setTimeout(() => {
        // Datos simulados para desarrollo
        const userData = {
          id: 1,
          nombre: formData.userType === 'estudiante' ? 'Estudiante Demo' : 'Profesor Demo',
          email: formData.email,
          rol: formData.userType,
          // Si es maestro, asignamos un taller
          ...(formData.userType === 'maestro' && { 
            tallerAsignado: {
              id: 1,
              nombre: 'Taller de Electrónica'
            }
          })
        };

        onLogin(userData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sistema de Administración de Almacén</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Tipo de Usuario</label>
            <div className="user-type-selector">
              <label className={`user-type-option ${formData.userType === 'estudiante' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="estudiante"
                  checked={formData.userType === 'estudiante'}
                  onChange={handleChange}
                />
                <span className="user-type-text">Estudiante</span>
              </label>
              
              <label className={`user-type-option ${formData.userType === 'maestro' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="maestro"
                  checked={formData.userType === 'maestro'}
                  onChange={handleChange}
                />
                <span className="user-type-text">Maestro</span>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary login-btn" 
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>¿Olvidaste tu contraseña? Contacta al administrador del sistema.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;