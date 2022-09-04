import React from 'react';

const GameButtons = ({
  play,
  reset,
  game,
  setModalItem,
  setModalShop,
  modalShop,
  modalItem,
}) => {
  return (
    <div className="game-menu">
      <button disabled={game.end} onClick={() => play()}>
        jogar
      </button>
      <button disabled={game.end} onClick={() => setModalShop(!modalShop)}>
        loja
      </button>
      <button disabled={game.end} onClick={() => setModalItem(!modalItem)}>
        inventário
      </button>
      <button onClick={() => reset()}>reiniciar</button>
      <button>salvar</button>
    </div>
  );
};

export default GameButtons;
