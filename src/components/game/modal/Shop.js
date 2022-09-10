import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import { messageHandler } from '../../../utils/game';
import CardItem from '../card/Item';
import CardWeapon from '../card/Weapon';
import Toast from '../../ui/Toast';
import { SUCCESS, WARNING } from '../../../utils/constants';
import { isObjectEmpty } from '../../../utils';

const Shop = ({ show, setModalShop }) => {
  const { items, weapons, magics } = useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleBuy = data => {
    if (!isObjectEmpty(hero)) {
      if (hero.gold >= data.price) {
        // compra de item e adiciona a lista do heroi
        let newGold = hero.gold - data.price;
        let i = { ...data, id: uuidv4() };
        let newItems = [...hero.items, i];

        setHero({ ...hero, items: newItems, gold: newGold });
        messageHandler(SUCCESS, 'Item comprado com sucesso!', setMessage);
      } else {
        messageHandler(WARNING, 'Sem ouro suficiente para compra!', setMessage);
      }
    } else {
      messageHandler(WARNING, 'O herói não foi selecionado!', setMessage);
    }
  };

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <div className="modal-header">
            <h1>Loja</h1>
            <h3 className="color-warning ">
              Saldo do herói: ${(hero && hero.gold) || 0}
            </h3>
            <button onClick={() => setModalShop(false)}>fechar</button>
          </div>

          <h3>Itens</h3>
          <div className="card-container">
            {items.length > 0 ? (
              items.map(item => (
                <CardItem
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

          {/* armas */}
          <h3>Armas</h3>
          <div className="card-container">
            {weapons.length > 0 ? (
              weapons.map(weapon => (
                <CardWeapon
                  key={weapon.id}
                  data={weapon}
                  handleClick={() => handleBuy(weapon)}
                  type="shop"
                />
              ))
            ) : (
              <span>Nada encontrado aqui</span>
            )}
          </div>

          {/* magicas */}
          <h3>Mágicas</h3>
          <div className="card-container">
            {magics.length > 0 ? (
              magics.map(magic => (
                <CardWeapon
                  key={magic.id}
                  data={magic}
                  handleClick={() => handleBuy(magic)}
                  type="shop"
                />
              ))
            ) : (
              <span>Nada encontrado aqui</span>
            )}
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

export default Shop;
