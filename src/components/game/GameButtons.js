import React, { useState } from 'react';
import ConfirmModal from '../ui/ConfirmModal';

const GameButtons = ({
  play,
  reset,
  game,
  setModalItem,
  setModalShop,
  modalShop,
  modalItem,
}) => {
  const [resetModal, setResetModal] = useState(false);

  return (
    <>
      <ConfirmModal
        onClick={reset}
        active={resetModal}
        cancel={setResetModal}
        message="Tem certeza que deseja reiniciar o jogo?"
      />

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
        <button disabled={game.playing} onClick={() => setResetModal(true)}>
          reiniciar
        </button>
        <button disabled={game.playing}>salvar</button>
      </div>
    </>
  );
};

export default GameButtons;
