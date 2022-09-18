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
          <h3>Magias</h3>
          <h5 className="color-dark">
            Mana disponível: {(hero && hero.mana) || 0}
          </h5>
          <button
            className="btn btn-primary"
            onClick={() => setModalUserMagic(false)}
          >
            fechar
          </button>
        </div>

        <div className="grid-container">
          {hero && hero.magic && hero.magic.length > 0 ? (
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
