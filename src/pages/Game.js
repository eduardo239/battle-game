import React, { useContext, useState } from 'react';
import { random } from '../utils';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import Hero from '../components/game/card/HeroInline';
import ModalShop from '../components/game/modal/Shop';
import ModalGiftItem from '../components/game/modal/ModalItem';
import ModalTrap from '../components/game/modal/Trap';
import ModalFight from '../components/game/modal/ModalFight';
import ModalUserItems from '../components/game/modal/UserItems';
import Timeline from '../components/game/position/Timeline';
import { BOSS, ENEMY, ITEM, NULL, TRAP } from '../utils/constants';
import GameButtons from '../components/game/GameButtons';

const Game = () => {
  const navigate = useNavigate();

  const { game, setGame, setEnemy, setFightLog, resetGame } =
    useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  // modal shop
  const [modalShop, setModalShop] = useState(false);

  // abre o modal de acordo com a posicao
  const [modalFight, setModalFight] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalGiftItem, setModalGiftItem] = useState(false);
  const [modalTrap, setModalTrap] = useState(false);

  const reset = () => {
    resetGame();
    setHero(null);
    setTimeout(() => navigate('/'), 0);
  };

  const play = () => {
    if (game.mapLength === 0) {
      // TODO: EMPTY MAP
      return;
    } else if (game.heroPosition < game.mapLength) {
      let _apd = random(1, 6);
      setGame({ ...game, heroPosition: game.heroPosition + _apd });

      // verifica o tipo de posicao atual
      let actualPosition = game.mapPositions[game.heroPosition + _apd];

      // verifica o tipo da posicao do mapa
      if (!actualPosition) {
        // TODO: BOSS
        return;
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
            setModalGiftItem(true);
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
      <ModalGiftItem show={modalGiftItem} setModalGiftItem={setModalGiftItem} />
      {/* game modal trap */}
      <ModalTrap show={modalTrap} setModalTrap={setModalTrap} />
      {/* game modal boss */}

      {/* game menu */}
      <GameButtons
        game={game}
        play={play}
        reset={reset}
        modalShop={modalShop}
        modalItem={modalItem}
        setModalShop={setModalShop}
        setModalItem={setModalItem}
      />
    </div>
  );
};

export default Game;
