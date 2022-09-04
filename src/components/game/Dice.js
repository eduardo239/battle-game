import React, { useContext } from 'react';
import { GameContext } from '../../context/Game';
import { isObjectEmpty } from '../../utils';

const Dice = () => {
  const { game, dice } = useContext(GameContext);

  if (!isObjectEmpty(game))
    return (
      <div className="dices">
        <div className={`dice ${dice === 1 ? 'active' : ''}`}>1</div>
        <div className={`dice ${dice === 2 ? 'active' : ''}`}>2</div>
        <div className={`dice ${dice === 3 ? 'active' : ''}`}>3</div>
        <div className={`dice ${dice === 4 ? 'active' : ''}`}>4</div>
        <div className={`dice ${dice === 5 ? 'active' : ''}`}>5</div>
        <div className={`dice ${dice === 6 ? 'active' : ''}`}>6</div>
      </div>
    );
};

export default Dice;
