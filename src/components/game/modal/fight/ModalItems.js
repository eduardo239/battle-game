import React from 'react';
import CardHero from '../../card/Hero';

const ModalItems = ({
  modalInventory,
  setModalInventory,
  hero,
  handleUseItem,
}) => {
  return (
    <div
      className={`modal-inventory-container ${modalInventory ? 'active' : ''}`}
    >
      <div className={`modal-inventory ${modalInventory ? 'active' : ''}`}>
        <button onClick={() => setModalInventory(false)}>fechar</button>

        <h1>Inventário</h1>
        <div className="grid-container">
          {hero && hero.items.length > 0 ? (
            hero.items
              .map(item => (
                <CardHero
                  key={Math.random()}
                  data={item}
                  handleClick={() => handleUseItem(item)}
                  type="use"
                />
              ))
              .reverse()
          ) : (
            <span>Nada encontrado aqui</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalItems;
