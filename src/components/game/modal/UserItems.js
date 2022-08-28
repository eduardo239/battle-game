import React, { useContext } from 'react';
import { HeroContext } from '../../../context/Hero';
import { MANA, HEALTH } from '../../../utils/constants';
import Card from '../card/Item';

const UserItems = ({ show, setModalItems }) => {
  const { hero, setHero } = useContext(HeroContext);

  const handleUse = data => {
    // remove item da lista ao utilizar
    const newItems = hero.items.filter(i => i.id !== data.id);

    switch (data.type) {
      case MANA:
        // TODO: validar mana maxima
        setHero({ ...hero, items: newItems, mana: hero.mana + data.value });
        break;
      case HEALTH:
        // TODO: validar vida maxima
        setHero({ ...hero, items: newItems, health: hero.health + data.value });
        break;
      default:
        break;
    }
  };

  return (
    <div className={`modal-container ${show ? 'active' : ''}`}>
      <div className={`modal ${show ? 'active' : ''}`}>
        <button onClick={() => setModalItems(false)}>fechar</button>

        <h1>Inventário</h1>

        <div className="grid-container">
          {hero && hero.items.length > 0 ? (
            hero.items.map(item => (
              <Card
                key={Math.random()}
                data={item}
                handleClick={() => handleUse(item)}
                type="use"
              />
            ))
          ) : (
            <span>Nada encontrado aqui</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserItems;
