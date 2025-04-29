import React, { useEffect } from 'react';
import './Common.css';

const ConfirmationModal = ({ title, message, type, onConfirm, onClose }) => {
  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Prevent modal close on content click
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal confirmation-modal ${
          type === 'error' ? 'modal-error' : type === 'success' ? 'modal-success' : ''
        }`}
        onClick={handleModalClick}
      >
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="confirmation-content">
            {type === 'error' && (
              <i className="fas fa-exclamation-circle confirmation-icon error-icon"></i>
            )}
            {type === 'success' && (
              <i className="fas fa-check-circle confirmation-icon success-icon"></i>
            )}
            {type === 'confirm' && (
              <i className="fas fa-question-circle confirmation-icon confirm-icon"></i>
            )}
            <p>{message}</p>
          </div>
          <div className="modal-buttons">
            {type === 'confirm' ? (
              <>
                <button className="btn btn-outline" onClick={onClose}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={onConfirm}>
                  Confirmar
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={onClose}>
                Aceptar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;