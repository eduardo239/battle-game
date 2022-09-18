import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { URL_UNK } from '../utils/constants';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import { isObjectEmpty } from '../utils';
import CardWeapon from '../components/game/card/Weapon';

const SelectWeapon = () => {
  const { weapons } = useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const handleSelectThis = data => {
    // adicionar o item aos items do heroi
    setHero({
      ...hero,
      weapons: [data],
      equipped: {
        weapon: data,
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
          {weapons.length > 0 ? (
            weapons
              .map(weapon => (
                <CardWeapon
                  key={weapon.id}
                  data={weapon}
                  handleClick={() => handleSelect(weapon)}
                  type="shop"
                />
              ))
              .splice(0, 3)
          ) : (
            <span>Nada encontrado aqui</span>
          )}
        </div>

        {/* menu */}
        <div className="menu-select">
          <Link to="/select-item">
            <button className="btn btn-primary">voltar</button>
          </Link>
          <Link to="/select-map">
            <button
              className="btn btn-primary"
              disabled={isObjectEmpty(hero && hero.equipped.weapon)}
            >
              próximo
            </button>
          </Link>
        </div>

        {/* mostrar o heroi selecionado */}
        <div className="card-grid">
          {hero && hero.equipped && !isObjectEmpty(hero.equipped.weapon) ? (
            <CardWeapon
              key={hero.equipped.weapon.id}
              data={hero.equipped.weapon}
            />
          ) : (
            <CardWeapon data={{ name: 'Nada selecionado', poster: URL_UNK }} />
          )}
        </div>
      </div>
    </div>
  );
};
export default SelectWeapon;
