import React from 'react';

const ModalItem = ({ show, setModalItem }) => {
  return (
    <div className={`modal-container ${show ? 'active' : ''}`}>
      <div className={`modal ${show ? 'active' : ''}`}>
        <button onClick={() => setModalItem(false)}>fechar</button>
        <div>Random Item</div>
      </div>
    </div>
  );
};

export default ModalItem;
