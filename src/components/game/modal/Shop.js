import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import { messageHandler } from '../../../utils/game';
import CardItem from '../card/Item';
import CardWeapon from '../card/Weapon';
import Toast from '../../ui/Toast';
import {
  HEALTH,
  PURCHASED_ITEM,
  MANA,
  POISON,
  SUCCESS,
  WARNING,
  WEAPON,
  PURCHASED_GUN,
  INSUFFICIENT_GOLD,
  NO_HERO_WAS_SELECTED,
} from '../../../utils/constants';
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
        let newData = { ...data, id: uuidv4() };
        switch (data.type) {
          case MANA:
          case HEALTH:
          case POISON:
            let newItems = [...hero.items, newData];
            setHero({ ...hero, items: newItems, gold: newGold });
            messageHandler(SUCCESS, PURCHASED_ITEM, setMessage);

            break;
          case WEAPON:
            let newIWeapons = [...hero.weapons, newData];
            setHero({ ...hero, weapons: newIWeapons, gold: newGold });
            messageHandler(SUCCESS, PURCHASED_GUN, setMessage);

            break;

          default:
            break;
        }
      } else {
        messageHandler(WARNING, INSUFFICIENT_GOLD, setMessage);
      }
    } else {
      messageHandler(WARNING, NO_HERO_WAS_SELECTED, setMessage);
    }
  };

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <div className="modal-header">
            <h3>Loja</h3>
            <p className="color-dark">
              Saldo do herói: ${(hero && hero.gold) || 0}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setModalShop(false)}
            >
              fechar
            </button>
          </div>

          <h5 className="text-center">Itens</h5>
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
          <h5 className="text-center">Armas</h5>
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
          <h5 className="text-center">Mágicas</h5>
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
