import React, { useContext, useState } from 'react';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import { v4 as uuidv4 } from 'uuid';
import Card from '../card/Item';
import Toast from '../../ui/Toast';
import { SUCCESS, WARNING } from '../../../utils/constants';
import { messageHandler } from '../../../utils/game';

const Shop = ({ show, setModalShop }) => {
  const { items } = useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleBuy = data => {
    if (hero.gold > data.price) {
      if (hero) {
        // compra de item e adiciona a lista do heroi
        let newGold = hero.gold - data.price;
        let i = { ...data, id: uuidv4() };
        let newItems = [...hero.items, i];

        setHero({ ...hero, items: newItems, gold: newGold });
        messageHandler(SUCCESS, 'Item comprado com sucesso!', setMessage);
      }
    } else {
      messageHandler(WARNING, 'Sem ouro suficiente para compra!', setMessage);
    }
  };

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <button onClick={() => setModalShop(false)}>fechar</button>

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

      {message && message.content && (
        <Toast type={message.type} message={message.content} />
      )}
    </>
  );
};

export default Shop;
