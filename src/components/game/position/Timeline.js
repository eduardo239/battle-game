import React from 'react';
import { NO_INFORMATION_AVAILABLE } from '../../../utils/constants';
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
          <span>{NO_INFORMATION_AVAILABLE}</span>
        </div>
      )}
    </>
  );
};

export default Timeline;
