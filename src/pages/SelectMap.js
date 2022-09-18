import React, { useContext } from 'react';
import { GameContext } from '../context/Game';
import { generatePositions } from '../utils/game';
import { Link, useNavigate } from 'react-router-dom';
import CardMap from '../components/game/card/Map';
import { URL_UNK } from '../utils/constants';

const SelectMap = () => {
  const navigate = useNavigate();
  const {
    items,
    enemies,
    map,
    maps,
    traps,
    setMap,
    game,
    setGame,
    resetGame,
    resetFight,
  } = useContext(GameContext);

  const initGame = () => {
    // resetando
    resetGame();
    resetFight();

    // configurar o jogo
    setGame({ ...game, map: map });

    // gerar as posicoes
    try {
      let positions = generatePositions(map, enemies, items, traps);
      setGame({
        ...game,
        map: map,
        mapPositions: positions,
        mapLength: positions.length,
        heroPosition: 0,
      });

      // redirecionar e iniciar o jogo
      navigate('/start-game');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="center-center">
      <div>
        {/* loop pelos herois da api */}
        <div className="card-grid">
          {maps.length > 0 ? (
            maps.map(data => (
              <CardMap
                key={Math.random()}
                data={data}
                handleClick={() => setMap(data)}
                type="select"
              />
            ))
          ) : (
            <span>Nada encontrado aqui</span>
          )}
        </div>

        {/* menu */}
        <div className="menu-select">
          <Link to="/select-weapon">
            <button className="btn btn-primary">voltar</button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={initGame}
            disabled={!map}
          >
            começar
          </button>
        </div>

        {/* mostrar o heroi selecionado */}
        <div className="card-grid">
          {map != null ? (
            <CardMap key={Math.random()} data={map}></CardMap>
          ) : (
            <CardMap data={{ name: 'Nada selecionado', poster: URL_UNK }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectMap;
