import React from 'react';

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
            {fight.turn === 0
              ? ' Vez do Herói de jogar'
              : ' O Inimigo está atacando ....'}
          </small>
        ) : (
          <small>
            Fim da luta:
            {fight.winner === 0 ? ' O herói venceu !' : ' O Inimigo venceu !'}
          </small>
        )}
      </div>
    </>
  );
};

export default Turn;
