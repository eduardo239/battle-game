import React from 'react';

const ConfirmModal = ({ onClick, active, cancel, message }) => {
  return (
    <div className={`modal-confirm-container ${active ? 'active' : ''}`}>
      <div className="modal-confirm">
        <p>{message}</p>
        <div className="flex-justify-end">
          <button className="btn btn-secondary" onClick={() => cancel(false)}>
            cancelar
          </button>
          <button className="btn btn-primary" onClick={onClick}>
            confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
