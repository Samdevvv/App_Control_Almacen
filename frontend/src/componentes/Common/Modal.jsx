import React, { useEffect } from 'react';
import './Common.css';

const Modal = ({ title, children, onClose }) => {
  // Cerrar modal con escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Evitar scroll en el body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  // Evitar que los clics dentro del modal lo cierren
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={handleModalClick}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;