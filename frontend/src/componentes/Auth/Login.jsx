import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [appear, setAppear] = useState(false);

  // Efecto de aparición al cargar
  useEffect(() => {
    setTimeout(() => {
      setAppear(true);
    }, 100);
  }, []);

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
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className={`animated-background ${appear ? 'appear' : ''}`}>
        <div className="circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
        </div>
      </div>
      
      <div className={`login-card-container ${appear ? 'appear' : ''}`}>
        <div className="login-card-wrapper">
          <div className="login-card-side logo-side">
            <div className="logo-animation">
              <div className="logo-wrapper">
                <div className="logo-icon">
                  <i className="fas fa-boxes"></i>
                </div>
                <h2 className="logo-title">ITESA</h2>
                <p className="logo-subtitle">Administraciòn De Almacen Por Talleres</p>
              </div>
              
              <div className="animated-elements">
                <div className="floating-element elem-1"><i className="fas fa-box"></i></div>
                <div className="floating-element elem-2"><i className="fas fa-tools"></i></div>
                <div className="floating-element elem-3"><i className="fas fa-microchip"></i></div>
                <div className="floating-element elem-4"><i className="fas fa-cogs"></i></div>
              </div>
            </div>
          </div>
          
          <div className="login-card-side form-side">
            <h3 className="form-title">Iniciar Sesión</h3>
            
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <div className="input-icon">
                  <i className="fas fa-user"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Correo Electrónico"
                  className="input-field"
                />
                <div className="input-line"></div>
              </div>
              
              <div className="input-group">
                <div className="input-icon">
                  <i className="fas fa-lock"></i>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Contraseña"
                  className="input-field"
                />
                <div className="input-line"></div>
              </div>
              
              <button 
                type="submit" 
                className={`login-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                ) : (
                  <>
                    <span>Iniciar Sesión</span>
                    <i className="fas fa-arrow-right"></i>
                  </>
                )}
              </button>
            </form>
            
            <div className="form-footer">
              <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;