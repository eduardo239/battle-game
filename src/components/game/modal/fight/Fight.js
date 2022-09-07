import React from 'react';
import CardHero from '../../card/Hero';

const Fight = ({ hero, enemy, fight }) => {
  return (
    <div className="game-fight">
      <div className="text-center">
        <h4>Herói</h4>
        <CardHero data={hero} hit={fight.enemyAttack}></CardHero>
      </div>

      <h1>vs</h1>

      <div className="text-center">
        <h4>Inimigo</h4>
        {enemy && <CardHero data={enemy} hit={fight.heroAttack}></CardHero>}
      </div>
    </div>
  );
};

export default Fight;
