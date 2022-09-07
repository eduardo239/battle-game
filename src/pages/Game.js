import React, { useContext, useEffect, useState } from 'react';
import { diceAnimation } from '../utils';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import Hero from '../components/game/card/HeroInline';
import GameMenu from '../components/game/GameMenu';
import Timeline from '../components/game/position/Timeline';
import ModalShop from '../components/game/modal/Shop';
import ModalTrap from '../components/game/modal/Trap';
import ModalFight from '../components/game/modal/Fight';
import ModalGiftItem from '../components/game/modal/Gift';
import ModalUserItems from '../components/game/modal/UserItems';
import ModalCode from '../components/game/modal/Code';
import ModalChest from '../components/game/modal/Chest';
import { BOSS, CHEST, CODE, ENEMY, ITEM, NULL, TRAP } from '../utils/constants';

const Game = () => {
  const navigate = useNavigate();

  const { hero, setHero } = useContext(HeroContext);
  const { dice, setDice, game, setGame, setEnemy, setFightLog, resetGame } =
    useContext(GameContext);

  // modal shop
  const [modalShop, setModalShop] = useState(false);

  // abre o modal de acordo com a posicao
  const [modalFight, setModalFight] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalGiftItem, setModalGiftItem] = useState(false);
  const [modalTrap, setModalTrap] = useState(false);
  const [modalCode, setModalCode] = useState(false);
  const [modalChest, setModalChest] = useState(false);

  // validar se os dados estao sendo atualizados
  const [updatedDice, setUpdatedDice] = useState(false);

  const reset = () => {
    resetGame();
    setHero(null);
    setTimeout(() => navigate('/'), 5);
  };

  useEffect(() => {
    let mounted = true;
    // movimenta para proxima posicao apos animacao dos dados
    if (updatedDice && mounted) {
      playUpdateStats();
    }

    return () => {
      mounted = false;
      setUpdatedDice(false);
    };
  }, [updatedDice]);

  const play = () => {
    if (game.mapLength === 0) {
      return;
    } else if (game.heroPosition < game.mapLength) {
      // efeito de animacao dos dados
      setGame({ ...game, playing: true });
      diceAnimation(setDice, setUpdatedDice);
    } else {
      alert('Boss');
    }
  };

  const playUpdateStats = () => {
    setGame({
      ...game,
      heroPosition: game.heroPosition + dice,
      playing: false,
    });

    setTimeout(() => {
      // verifica o tipo de posicao atual
      let actualPosition = game.mapPositions[game.heroPosition + dice];

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
          case CODE:
            setModalCode(true);
            break;
          case CHEST:
            setModalChest(true);
            break;
          case NULL:
            break;
          default:
            break;
        }
      }
    }, 1000);
  };

  return (
    <div className="game-container">
      {/* informacoes sobre o heroi*/}
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
      {/* game modal code */}
      <ModalCode show={modalCode} setModalCode={setModalCode} />
      {/* game code para o chest */}
      <ModalChest show={modalChest} setModalChest={setModalChest} />
      {/* game menu */}
      <GameMenu
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
