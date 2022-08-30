import React from 'react';

const Turn = ({ fight }) => {
  return (
    <>
      <div>
        <small>Rodada: {fight.round || 0}</small>
      </div>
      <div>
        <small>
          Vez de jogar:{' '}
          {fight.turn === 0
            ? 'Vez do Herói de jogar'
            : 'O Inimigo está atacando ....'}
        </small>
      </div>
    </>
  );
};

export default Turn;
