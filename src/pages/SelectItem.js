import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import Card from '../components/game/card/Item';

const SelectItem = () => {
  const { items } = useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const handleSelectThis = data => {
    // adicionar o item aos items do heroi
    setHero({ ...hero, items: [data] });
  };

  const handleSelect = data => {
    data.id = uuidv4();
    handleSelectThis(data);
  };

  return (
    <div>
      {/* loop pelos herois da api */}
      <div className="card-grid">
        {items.length > 0 ? (
          items.map(item => (
            <Card
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
          hero.items.map(item => <Card key={Math.random()} data={item}></Card>)
        ) : (
          <Card data={{ name: 'Nada selecionado' }} />
        )}
      </div>
    </div>
  );
};

export default SelectItem;
