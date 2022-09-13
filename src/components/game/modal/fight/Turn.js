import React from 'react';
import {
  ENEMY_IS_ATTACKING,
  ENEMY_WON,
  HERO_TURN_TO_PLAY,
  HERO_WON,
} from '../../../../utils/constants';

const Turn = ({ fight }) => {
  return (
    <>
      <div>
        <small>Rodada: {fight.round || 0}</small>
      </div>
      <div>
        {!fight.end ? (
          <small>
            Vez de jogar:{' '}
            {fight.turn === 0 ? HERO_TURN_TO_PLAY : ENEMY_IS_ATTACKING}
          </small>
        ) : (
          <small>
            Fim da luta:
            {fight.winner === 0 ? HERO_WON : ENEMY_WON}
          </small>
        )}
      </div>
    </>
  );
};

export default Turn;
