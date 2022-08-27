import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import Card from '../components/game/item/Card';

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

      {/* mostrar o heroi selecionado */}
      <div className="card-grid">
        {hero && hero.items && hero.items.length > 0 ? (
          hero.items.map(item => <Card key={Math.random()} data={item}></Card>)
        ) : (
          <span>Nada encontrado aqui</span>
        )}
      </div>

      {/* menu */}
      <Link to="/select-hero">
        <button>selecionoar herói</button>
      </Link>
      <Link to="/select-map">
        <button disabled={!hero || hero.items.length === 0}>
          selecionar map
        </button>
      </Link>
    </div>
  );
};

export default SelectItem;
