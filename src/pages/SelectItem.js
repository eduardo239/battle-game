import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import CardItem from '../components/game/card/Item';
import { URL_UNK } from '../utils/constants';

const SelectItem = () => {
  const { items, magic, weapons } = useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const handleSelectThis = data => {
    // adicionar o item aos items do heroi
    setHero({
      ...hero,
      items: [data],
      magic: [magic[0]],
      weapons: [weapons[0]],
      equipped: {
        weapon: weapons[0],
      },
    });

    // TODO: adicionar a magica e a arma ao heroi
  };

  const handleSelect = data => {
    data.id = uuidv4();
    handleSelectThis(data);
  };

  return (
    <div className="center-center">
      <div>
        {/* loop pelos herois da api */}
        <div className="card-grid">
          {items.length > 0 ? (
            items.map(item => (
              <CardItem
                key={Math.random()}
                data={item}
                handleClick={() => handleSelect(item)}
                type="select"
              />
            ))
          ) : (
            <span>Nada encontrado aqui</span>
          )}
        </div>

        {/* menu */}
        <div className="menu-select">
          <Link to="/select-hero">
            <button>voltar</button>
          </Link>
          <Link to="/select-map">
            <button disabled={!hero || hero.items.length === 0}>próximo</button>
          </Link>
        </div>

        {/* mostrar o heroi selecionado */}
        <div className="card-grid">
          {hero && hero.items && hero.items.length > 0 ? (
            hero.items.map(item => (
              <CardItem key={Math.random()} data={item}></CardItem>
            ))
          ) : (
            <CardItem data={{ name: 'Nada selecionado', poster: URL_UNK }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectItem;
