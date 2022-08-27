import React, { useContext } from 'react';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import { v4 as uuidv4 } from 'uuid';
import Card from '../../game/item/Card';

const Shop = ({ show, setModalShop }) => {
  const { items } = useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const handleBuy = data => {
    if (hero) {
      // compra de item e adiciona a lista do heroi
      let i = { ...data, id: uuidv4() };
      let newItems = [...hero.items, i];
      setHero({ ...hero, items: newItems });
    }
  };

  return (
    <div className={`modal-container ${show ? 'active' : ''}`}>
      <div className={`modal ${show ? 'active' : ''}`}>
        <button onClick={() => setModalShop(false)}>fechar a loja</button>

        <h1>Loja</h1>

        <div className="card-container">
          {items.length > 0 ? (
            items.map(item => (
              <Card
                key={item.id}
                data={item}
                handleClick={() => handleBuy(item)}
                type="shop"
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

export default Shop;
