import React from 'react';
import Dice from './Dice';
import GameButtons from './GameButtons';

const GameMenu = ({
  game,
  play,
  reset,
  modalShop,
  modalItem,
  setModalItem,
  setModalShop,
}) => {
  return (
    <div className="game-menu">
      <Dice />

      <GameButtons
        game={game}
        play={play}
        reset={reset}
        modalShop={modalShop}
        modalItem={modalItem}
        setModalShop={setModalShop}
        setModalItem={setModalItem}
      />
    </div>
  );
};

export default GameMenu;
