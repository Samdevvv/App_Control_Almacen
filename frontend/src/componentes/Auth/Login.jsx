import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulated user database
      const users = [
        {
          id: 1,
          nombre: 'Admin Demo',
          email: 'admin@escuela.edu',
          password: 'admin123',
          rol: 'admin',
        },
        {
          id: 2,
          nombre: 'Profesor Demo',
          email: 'profesor@escuela.edu',
          password: 'profesor123',
          rol: 'maestro',
          tallerAsignado: {
            id: 1,
            nombre: 'Taller de Electrónica',
          },
        },
        {
          id: 3,
          nombre: 'Estudiante Demo',
          email: 'estudiante@escuela.edu',
          password: 'estudiante123',
          rol: 'estudiante',
        },
      ];

      // Find user
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      // Simulate API delay
      setTimeout(() => {
        onLogin(user);
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