import React, { useContext } from 'react';
import Card from '../components/game/hero/Card';
import { Link } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';

const SelectHero = () => {
  const { heroes } = useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const handleSelectThis = data => {
    // adicionar o heroi
    setHero(data);
  };

  return (
    <div>
      {/* loop pelos herois da api */}
      <div className="card-grid">
        {heroes.length > 0 ? (
          heroes.map(hero => (
            <Card
              key={Math.random()}
              data={hero}
              handleClick={() => handleSelectThis(hero)}
              type="select"
            />
          ))
        ) : (
          <span>Nada encontrado aqui</span>
        )}
      </div>

      {/* mostrar o heroi selecionado */}
      <div className="card-grid">
        {hero ? (
          <Card key={Math.random()} data={hero}></Card>
        ) : (
          <span>Nada encontrado aqui</span>
        )}
      </div>

      {/* menu */}
      <Link to="/">
        <button>página inicial</button>
      </Link>
      <Link to="/select-item">
        <button disabled={!hero}>selecionar item</button>
      </Link>
    </div>
  );
};

export default SelectHero;
