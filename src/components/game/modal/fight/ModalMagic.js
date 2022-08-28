import React from 'react';
import CardMagic from '../../card/Magic';

const ModalMagic = ({
  modalUserMagic,
  setModalUserMagic,
  hero,
  handleUseMagic,
}) => {
  return (
    <div
      className={`modal-inventory-container ${modalUserMagic ? 'active' : ''}`}
    >
      <div className={`modal-inventory ${modalUserMagic ? 'active' : ''}`}>
        <button onClick={() => setModalUserMagic(false)}>fechar</button>

        <h1>Magias</h1>
        <div className="grid-container">
          {hero && hero.magic.length > 0 ? (
            hero.magic
              .map(item => (
                <CardMagic
                  key={Math.random()}
                  data={item}
                  handleClick={() => handleUseMagic(item)}
                  type="use"
                  disabled={item.mana > hero.mana}
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

export default ModalMagic;
