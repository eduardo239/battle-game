import React, { useContext, useState } from 'react';
import { random } from '../utils';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import Hero from '../components/game/card/HeroInline';
import ModalShop from '../components/game/modal/Shop';
import ModalItem from '../components/game/modal/UserItems';
import ModalTrap from '../components/game/modal/Trap';
import ModalFight from '../components/game/modal/ModalFight';
import ModalUserItems from '../components/game/modal/UserItems';
import { BOSS, ENEMY, ITEM, NULL, TRAP } from '../utils/constants';
import Timeline from '../components/game/position/Timeline';

const Game = () => {
  const navigate = useNavigate();
  const { game, setGame, setEnemy, setFightLog, resetGame } =
    useContext(GameContext);
  const { hero } = useContext(HeroContext);

  const [modalShop, setModalShop] = useState(false);

  // abre o modal de acordo com a posicao
  const [modalFight, setModalFight] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalTrap, setModalTrap] = useState(false);

  const reset = () => {
    resetGame();
    setTimeout(() => navigate('/'), 100);
  };

  const play = () => {
    if (game.mapLength === 0) {
      console.log('select map hero item');
    } else if (game.heroPosition < game.mapLength) {
      let randomInt = random(1, 6);
      setGame({ ...game, heroPosition: game.heroPosition + randomInt });

      // verifica o tipo de posicao atual
      let actualPosition = game.mapPositions[game.heroPosition + randomInt];

      // verifica o tipo da posicao do mapa
      if (!actualPosition) {
        console.log('fim do mapa Boss');
      } else {
        let actualMapPosition = Object.keys(actualPosition)[0];

        // abre o modal de acordo com o tipo de posicao
        switch (actualMapPosition) {
          case ENEMY:
            setEnemy({ ...actualPosition.enemy });
            setModalFight(true);
            setFightLog([]);
            break;
          case ITEM:
            setModalItem(true);

            break;
          case TRAP:
            setModalTrap(true);

            break;
          case BOSS:
            break;
          case NULL:
            break;
          default:
            break;
        }
      }
    } else {
      alert('Boss');
    }
  };
  console.log(game);
  return (
    <div className="game-container">
      {/* hero */}
      {hero && <Hero data={hero} />}
      {/* timeline */}
      <Timeline game={game} />
      {/* modal shop */}
      <ModalShop show={modalShop} setModalShop={setModalShop} />
      {/* modal itens do ususario */}
      <ModalUserItems show={modalItem} setModalItem={setModalItem} />
      {/* game modal luta */}
      <ModalFight show={modalFight} setModalFight={setModalFight} />
      {/* game modal item */}
      <ModalItem show={modalItem} setModalItem={setModalItem} />
      {/* game modal trap */}
      <ModalTrap show={modalTrap} setModalTrap={setModalTrap} />
      {/* game modal boss */}

      {/* game menu */}
      <div className="game-menu">
        <button onClick={() => play()}>jogar</button>
        <button onClick={() => setModalShop(!modalShop)}>loja</button>
        <button onClick={() => setModalItem(!modalItem)}>inventário</button>
        <button onClick={() => reset()}>reiniciar</button>
        <button>salvar</button>
      </div>
    </div>
  );
};

export default Game;
