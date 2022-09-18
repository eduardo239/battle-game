import React from 'react';

const Play = ({ fight, flee, hero, hit, setModalUserMagic, setModalItem }) => {
  return (
    <div className="game-fight-menu">
      <button
        className="btn btn-primary"
        disabled={fight.end || fight.turn === 1}
        onClick={hit}
      >
        lutar
      </button>
      <button
        className="btn btn-primary"
        disabled={fight.end || fight.turn === 1 || hero.mana <= 0}
        onClick={() => setModalUserMagic(true)}
      >
        mágica
      </button>
      <button
        className="btn btn-primary"
        disabled={fight.end || fight.turn === 1}
        onClick={() => setModalItem(true)}
      >
        inventário
      </button>

      <button
        className="btn btn-primary"
        disabled={fight.turn === 1 && !fight.end}
        onClick={flee}
      >
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
