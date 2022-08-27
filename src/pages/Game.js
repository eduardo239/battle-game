import React, { useContext, useState } from 'react';
import { random } from '../utils';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import Hero from '../components/game/hero/Hero';
import Position from '../components/game/position/Position';
import ModalShop from '../components/modal/game/Shop';
import ModalUserItems from '../components/modal/game/UserItems';
import {
  BOSS,
  ENEMY,
  ITEM,
  LEVEL_EASY,
  NULL,
  TRAP,
  INIT,
} from '../utils/constants';

const Game = () => {
  const navigate = useNavigate();
  const { game, setGame, resetGame } = useContext(GameContext);
  const { hero } = useContext(HeroContext);

  const [modalShop, setModalShop] = useState(false);
  const [modalItems, setModalItems] = useState(false);

  const reset = () => {
    resetGame();
    setTimeout(() => navigate('/'), 400);
  };

  const play = () => {
    if (game.heroPosition < game.mapLength) {
      let randomInt = random(1, 6);
      setGame({ ...game, heroPosition: game.heroPosition + randomInt });

      // verifica o tipo de posicao atual
      let actualPosition = game.mapPositions[game.heroPosition + randomInt];
      console.log(actualPosition);

      // verifica o tipo da posicao do mapa
      let actualMapPosition = Object.keys(actualPosition)[0];
      console.log(actualMapPosition);

      // abre o modal de acordo com o tipo de posicao
      switch (actualMapPosition) {
        case ENEMY:
          console.log('modal enemy');
          break;
        case ITEM:
          console.log('modal item');
          break;
        case TRAP:
          console.log('modal trap');
          break;
        case BOSS:
          console.log('modal boss');
          break;
        case NULL:
          console.log('modal null');
          break;
        default:
          break;
      }
    } else {
      alert('Boss');
    }
  };

  console.log(game);

  return (
    <div>
      <h1>game</h1>

      <div className="game-menu">
        <button onClick={() => play()}>jogar</button>
        <button onClick={() => setModalShop(!modalShop)}>shop</button>
        <button onClick={() => setModalItems(!modalItems)}>inventário</button>
        <button onClick={() => reset()}>reiniciar</button>
        <button>salvar</button>
      </div>

      {/* hero */}
      {hero && <Hero data={hero} />}

      {/* timeline */}
      {game.map ? (
        game.mapPositions.map((position, index) => (
          <Position
            key={position.id}
            data={position}
            index={index}
            heroPosition={game.heroPosition}
          />
        ))
      ) : (
        <span>Nenhuma informação encontrada</span>
      )}

      {/* modal shop */}
      <ModalShop show={modalShop} setModalShop={setModalShop} />

      {/* modal itens do ususario */}
      <ModalUserItems show={modalItems} setModalUserItems={setModalItems} />

      {/* save game */}
    </div>
  );
};

export default Game;
