import React from 'react';

const ModalTrap = ({ show, setModalTrap }) => {
  return (
    <div className={`modal-container ${show ? 'active' : ''}`}>
      <div className={`modal ${show ? 'active' : ''}`}>
        <button onClick={() => setModalTrap(false)}>fechar</button>
        <div>Random Trap</div>
      </div>
    </div>
  );
};

export default ModalTrap;
