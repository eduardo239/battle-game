import React from 'react';

const Play = ({
  fight,
  flee,
  hero,
  hit,
  setModalUserMagic,
  setModalInventory,
}) => {
  return (
    <div className="game-fight-menu">
      <button disabled={fight.end || fight.turn === 1} onClick={hit}>
        lutar
      </button>
      <button
        disabled={fight.end || fight.turn === 1 || hero.mana <= 0}
        onClick={() => setModalUserMagic(true)}
      >
        mágica
      </button>
      <button
        disabled={fight.end || fight.turn === 1}
        onClick={() => setModalInventory(true)}
      >
        inventário
      </button>
      <button disabled={fight.turn === 1 && !fight.end} onClick={flee}>
        {fight.end && fight.winner === 0
          ? 'sair'
          : fight.end && fight.winner === 1
          ? 'fim'
          : 'fugir'}
      </button>
    </div>
  );
};

export default Play;
