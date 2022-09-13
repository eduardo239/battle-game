import React, { useContext, useEffect, useState } from 'react';
import { HeroContext } from '../../../context/Hero';
import {
  MANA,
  HEALTH,
  POISON,
  SUCCESS,
  WEAPON,
} from '../../../utils/constants';
import {
  logHeroEquipped,
  logHeroUsedHealing,
  logHeroUsedMana,
  logHeroUsedPoison,
} from '../../../utils/log';
import Toast from '../../ui/Toast';
import CardItem from '../card/Item';
import CardWeapon from '../card/Weapon';

const UserItems = ({
  show,
  setModalItem,
  fight,
  setFight,
  fighting = null,
}) => {
  const { hero, setHero } = useContext(HeroContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleUse = data => {
    // remove item da lista ao utilizar
    let arrItems = hero.items.filter(i => i.id !== data.id);

    switch (data.type) {
      case MANA:
        // TODO: validar mana maxima
        setHero({ ...hero, items: arrItems, mana: hero.mana + data.value });

        setMessage({
          type: SUCCESS,
          content: logHeroUsedMana(data.name, data.value),
        });
        break;
      case HEALTH:
        // TODO: validar vida maxima
        let newValue = hero.health + data.value;
        if (newValue >= hero.maxHealth) {
          setHero({
            ...hero,
            items: arrItems,
            health: hero.maxHealth,
          });
        } else {
          setHero({
            ...hero,
            items: arrItems,
            health: hero.health + data.value,
          });
        }

        setMessage({
          type: SUCCESS,
          content: logHeroUsedHealing(data.name, data.value),
        });
        break;
      case POISON:
        // TODO: Aplica condicao de envenenado ao inimigo
        setHero({
          ...hero,
          items: arrItems,
          equipped: { ...hero.equipped, poison: true },
        });

        setMessage({
          type: SUCCESS,
          content: logHeroUsedPoison(data.name, data.value),
        });
        break;
      case WEAPON:
        setHero({
          ...hero,
          equipped: { ...hero.equipped, weapon: data },
        });

        setMessage({
          type: SUCCESS,
          content: logHeroEquipped(data.name),
        });
        break;
      default:
        break;
    }

    setTimeout(() => setMessage({ type: '', content: '' }), 2000);

    if (fighting) {
      setFight({ ...fight, turn: 1 });
      setModalItem(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, [hero]);

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <div className="modal-header">
            <h2>Inventário</h2>
            <button onClick={() => setModalItem(false)}>fechar</button>
          </div>

          <p className="color-error">- Itens</p>
          <div className="grid-container">
            {hero && hero.items && hero.items.length > 0 ? (
              hero.items.map(item => (
                <CardItem
                  key={item.id}
                  data={item}
                  handleClick={() => handleUse(item)}
                  type="use"
                />
              ))
            ) : (
              <p>
                <small>O herói não possui itens.</small>
              </p>
            )}
          </div>

          <p className="color-error">- Armas</p>
          <div className="grid-container">
            {hero && hero.weapons && hero.weapons.length > 0 ? (
              hero.weapons.map(
                item =>
                  item.type === WEAPON && (
                    <CardWeapon
                      equipped={item.id === hero.equipped.weapon.id}
                      key={item.id}
                      data={item}
                      handleClick={() => handleUse(item)}
                      type="equip"
                    />
                  )
              )
            ) : (
              <p>
                <small>O herói não possui nenhuma arma.</small>
              </p>
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

export default UserItems;
