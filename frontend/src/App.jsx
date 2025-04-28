import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Componentes
import Login from './componentes/Auth/Login';
import Navbar from './componentes/Navigation/Navbar';
import Dashboard from './componentes/Dashboard/Dashboard';
import InventarioTaller from './componentes/Inventario/InventarioTaller';
import ListaTalleres from './componentes/Talleres/ListaTalleres';
import DetalleArticulo from './componentes/Articulos/DetalleArticulo';
import MisPeticiones from './componentes/Peticiones/MisPeticiones';
import AdministracionTaller from './componentes/Admin/AdministracionTaller';
import GestionArticulos from './componentes/Admin/GestionArticulos';
import GestionPeticiones from './componentes/Admin/GestionPeticiones';
import NotFound from './componentes/Common/NotFound';
import AdminDashboard from './componentes/Admin/AdminDashboard';



function App() {
  const [usuario, setUsuario] = useState(null);
  
  // Verificar si el usuario está autenticado
  const isAuthenticated = !!usuario;
  
  // Proteger rutas
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Proteger rutas específicas para maestros
  const TeacherRoute = ({ children }) => {
    if (!isAuthenticated || usuario.rol !== 'maestro') {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  // Proteger rutas específicas para admins
  const AdminRoute = ({ children }) => {
    if (!isAuthenticated || usuario.rol !== 'admin') {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  return (
    <Router>
      <div className={`app-container ${!isAuthenticated ? 'no-sidebar' : ''}`}>
        {isAuthenticated && <Navbar usuario={usuario} onLogout={handleLogout} />}
        <div className="content-container">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                {usuario && usuario.rol === 'admin' ? (
                  <AdminDashboard usuario={usuario} />
                ) : (
                  <Dashboard usuario={usuario} />
                )}
              </ProtectedRoute>
            } />
            
            <Route path="/talleres" element={
              <ProtectedRoute>
                <ListaTalleres />
              </ProtectedRoute>
            } />
            
            <Route path="/taller/:id" element={
              <ProtectedRoute>
                <InventarioTaller usuario={usuario} />
              </ProtectedRoute>
            } />
            
            <Route path="/articulo/:id" element={
              <ProtectedRoute>
                <DetalleArticulo usuario={usuario} />
              </ProtectedRoute>
            } />
            
            <Route path="/mis-peticiones" element={
              <ProtectedRoute>
                <MisPeticiones usuario={usuario} />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/taller" element={
              <TeacherRoute>
                <AdministracionTaller usuario={usuario} />
              </TeacherRoute>
            } />
            
            <Route path="/admin/articulos" element={
              <TeacherRoute>
                <GestionArticulos usuario={usuario} />
              </TeacherRoute>
            } />
            
            <Route path="/admin/peticiones" element={
              <TeacherRoute>
                <GestionPeticiones usuario={usuario} />
              </TeacherRoute>
            } />
            
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;