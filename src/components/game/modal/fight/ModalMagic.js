import React from 'react';
import CardMagic from '../../card/Magic';

const ModalMagic = ({
  modalUserMagic,
  setModalUserMagic,
  hero,
  handleUseMagic,
}) => {
  return (
    <div className={`modal-container ${modalUserMagic ? 'active' : ''}`}>
      <div className={`modal ${modalUserMagic ? 'active' : ''}`}>
        <div className="modal-header">
          <h1>Magias</h1>
          <h3 className="color-warning ">
            Mana disponível: {(hero && hero.mana) || 0}
          </h3>
          <button onClick={() => setModalUserMagic(false)}>fechar</button>
        </div>

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
