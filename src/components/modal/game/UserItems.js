import React, { useContext } from 'react';
import { HeroContext } from '../../../context/Hero';
import Card from '../../game/card/Item';

const UserItems = ({ show, setModalItems }) => {
  const { hero, setHero } = useContext(HeroContext);

  const handleUse = data => {
    // remove item da lista ao utilizar
    const newItems = hero.items.filter(i => i.id !== data.id);
    setHero({ ...hero, items: newItems });
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
