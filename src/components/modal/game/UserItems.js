import React, { useContext } from 'react';
import { HeroContext } from '../../../context/Hero';
import Card from '../../game/item/Card';

const UserItems = ({ show, setModalUserItems }) => {
  const { hero, setHero } = useContext(HeroContext);

  const handleUse = data => {
    // remove item da lista ao utilizar
    const newItems = hero.items.filter(i => i.id !== data.id);
    setHero({ ...hero, items: newItems });
  };

  return (
    <div className={`modal-container ${show ? 'active' : ''}`}>
      <div className={`modal ${show ? 'active' : ''}`}>
        <button onClick={() => setModalUserItems(false)}>fechar a loja</button>

        <h1>Loja</h1>

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
