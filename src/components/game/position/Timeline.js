import React from 'react';
import Position from './Position';

const Timeline = ({ game }) => {
  return (
    <>
      {game.map ? (
        game.mapPositions.map((position, index) => (
          <Position
            key={position.id}
            data={position}
            index={index}
            heroPosition={game.heroPosition}
          />
        ))
      ) : (
        <div className="text-center">
          <span>Nenhuma informação encontrada</span>
        </div>
      )}
    </>
  );
};

export default Timeline;
