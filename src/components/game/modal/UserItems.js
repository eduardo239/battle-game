import React, { useContext, useState } from 'react';
import { HeroContext } from '../../../context/Hero';
import { MANA, HEALTH, POISON, SUCCESS } from '../../../utils/constants';
import Toast from '../../ui/Toast';
import Card from '../card/Item';

const UserItems = ({ show, setModalItem }) => {
  const { hero, setHero } = useContext(HeroContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleUse = data => {
    // remove item da lista ao utilizar
    let arrItems = hero.items.filter(i => i.id !== data.id);
    let _itx = '';

    console.log(data);
    console.log(hero.items);
    switch (data.type) {
      case MANA:
        // TODO: validar mana maxima
        setHero({ ...hero, items: arrItems, mana: hero.mana + data.value });
        _itx =
          'O Herói usou ' +
          data.name +
          ' e aumentou ' +
          data.value +
          ' de mana.';
        setMessage({ type: SUCCESS, content: _itx });
        break;
      case HEALTH:
        // TODO: validar vida maxima
        setHero({ ...hero, items: arrItems, health: hero.health + data.value });
        _itx =
          'O Herói usou ' +
          data.name +
          ' e curou ' +
          data.value +
          ' de sua vida.';
        setMessage({ type: SUCCESS, content: _itx });
        break;
      case POISON:
        // TODO: validar vida maxima
        // Aplicar condicao de envenenado ao inimigo
        setHero({
          ...hero,
          items: arrItems,
          equipped: { ...hero.equipped, poison: true },
        });
        _itx =
          'O Herói usou ' +
          data.name +
          ' e envenenou ' +
          data.value +
          ' o inimigo.';
        setMessage({
          type: SUCCESS,
          content: _itx,
        });
        break;
      default:
        break;
    }
    setTimeout(() => setMessage({ type: '', content: '' }), 2000);
  };

  return (
    <div className={`modal-container ${show ? 'active' : ''}`}>
      <div className={`modal ${show ? 'active' : ''}`}>
        <Toast message={message.content} type={message.type} />
        <div className="flex-justify-between">
          <h1>Inventário</h1>
          <button onClick={() => setModalItem(false)}>fechar</button>
        </div>

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
