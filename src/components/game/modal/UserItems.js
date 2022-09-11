import React, { useContext, useState } from 'react';
import { HeroContext } from '../../../context/Hero';
import {
  MANA,
  HEALTH,
  POISON,
  SUCCESS,
  WEAPON,
} from '../../../utils/constants';
import Toast from '../../ui/Toast';
import CardItem from '../card/Item';
import CardWeapon from '../card/Weapon';

const UserItems = ({ show, setModalItem }) => {
  const { hero, setHero } = useContext(HeroContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleUse = data => {
    // remove item da lista ao utilizar
    let arrItems = hero.items.filter(i => i.id !== data.id);
    let text = '';

    switch (data.type) {
      case MANA:
        // TODO: validar mana maxima
        setHero({ ...hero, items: arrItems, mana: hero.mana + data.value });
        text =
          'O Herói usou ' +
          data.name +
          ' e aumentou ' +
          data.value +
          ' de mana.';
        setMessage({ type: SUCCESS, content: text });
        break;
      case HEALTH:
        // TODO: validar vida maxima
        setHero({ ...hero, items: arrItems, health: hero.health + data.value });
        text =
          'O Herói usou ' +
          data.name +
          ' e curou ' +
          data.value +
          ' de sua vida.';
        setMessage({ type: SUCCESS, content: text });
        break;
      case POISON:
        // TODO: validar vida maxima
        // Aplicar condicao de envenenado ao inimigo
        setHero({
          ...hero,
          items: arrItems,
          equipped: { ...hero.equipped, poison: true },
        });
        text =
          'O Herói usou ' +
          data.name +
          ' e envenenou ' +
          data.value +
          ' o inimigo.';
        setMessage({
          type: SUCCESS,
          content: text,
        });
        break;
      case WEAPON:
        setHero({
          ...hero,
          equipped: { ...hero.equipped, weapon: data },
        });
        text = 'O Herói equipou ' + data.name + '.';
        setMessage({
          type: SUCCESS,
          content: text,
        });
        break;
      default:
        break;
    }

    setTimeout(() => setMessage({ type: '', content: '' }), 2000);

    // TODO: alternar turno da batalha ao utilizar o item dentro da batalha
    setModalItem(false);
  };

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
              hero.items.map(
                item =>
                  item.type === HEALTH && (
                    <CardItem
                      key={item.id}
                      data={item}
                      handleClick={() => handleUse(item)}
                      type="use"
                    />
                  )
              )
            ) : (
              <p>
                <small>O herói não possui itens.</small>
              </p>
            )}
          </div>

          <p className="color-error">- Armas</p>
          <div className="grid-container">
            {hero && hero.weapons.length > 0 ? (
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
