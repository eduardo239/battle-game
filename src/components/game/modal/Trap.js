import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import { messageHandler } from '../../../utils/game';
import { ERROR, BOMB, TRAP } from '../../../utils/constants';
import Toast from '../../ui/Toast';
import CardTrap from '../card/Trap';
import { random } from '../../../utils';

const Trap = ({ show, setModalTrap }) => {
  const { randomTrap, getRandomItem, resetRandomItem, game, setGame } =
    useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleTrap = data => {
    let type = data.type;
    let damage = 0;
    switch (type) {
      case BOMB:
        damage = random(data.min, data.max);
        setHero({ ...hero, health: (hero.health -= damage) });
        messageHandler(ERROR, `O herói sofreu ${damage} de dano`, setMessage);

        if (hero.health <= 0) {
          messageHandler(ERROR, `GAME OVER`, setMessage, 5000);
          setGame({ ...game, end: true });
        }
        break;

      default:
        alert('[Trap.js] - Erro ao escolher o tipo de dano');
        break;
    }

    setModalTrap(false);
    resetRandomItem();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && !randomTrap) getRandomItem(TRAP);
    return () => {
      mounted = false;
    };
  }, [randomTrap]);

  if (randomTrap)
    return (
      <>
        <div className={`modal-container ${show ? 'active' : ''}`}>
          <div className={`modal ${show ? 'active' : ''}`}>
            <div className="modal-header">
              <h3>Armadilha</h3>
            </div>
            <div className="flex-justify-center">
              <CardTrap
                key={Math.random()}
                data={randomTrap}
                handleClick={() => handleTrap(randomTrap)}
                type="select"
              />
            </div>
          </div>
        </div>

        <Toast
          show={message && message.content}
          type={message.type}
          message={message.content}
        />
      </>
    );
};

export default Trap;
