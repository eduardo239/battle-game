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
    <div className="game-menu-buttons">
      <button disabled={game.playing || game.end} onClick={() => play()}>
        jogar
      </button>
      <button
        disabled={game.playing || game.end}
        onClick={() => setModalShop(!modalShop)}
      >
        loja
      </button>
      <button
        disabled={game.playing || game.end}
        onClick={() => setModalItem(!modalItem)}
      >
        inventário
      </button>
      <button disabled={game.playing} onClick={() => reset()}>
        reiniciar
      </button>
      <button disabled={game.playing}>salvar</button>
    </div>
  );
};

export default GameButtons;
