import React, { useContext, useState } from 'react';
import { random } from '../utils';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/Game';
import { HeroContext } from '../context/Hero';
import Hero from '../components/game/card/HeroInline';
import Position from '../components/game/position/Position';
import ModalShop from '../components/game/modal/Shop';
import ModalItem from '../components/game/modal/ModalItem';
import ModalTrap from '../components/game/modal/Trap';
import ModalFight from '../components/game/modal/ModalFight';
import ModalUserItems from '../components/game/modal/UserItems';
import { BOSS, ENEMY, ITEM, NULL, TRAP } from '../utils/constants';

const Game = () => {
  const navigate = useNavigate();
  const { game, setGame, setEnemy, setFightLog, resetGame } =
    useContext(GameContext);
  const { hero } = useContext(HeroContext);

  const [modalShop, setModalShop] = useState(false);
  const [modalItems, setModalItems] = useState(false);

  // abre o modal de acordo com a posicao
  const [modalFight, setModalFight] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalTrap, setModalTrap] = useState(false);

  // insere o objeto da posicao atual no estado
  const [data, setData] = useState(null);

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
            setData(actualPosition);
            break;
          case TRAP:
            setModalTrap(true);
            setData(actualPosition);
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
      <ModalUserItems show={modalItems} setModalItems={setModalItems} />

      {/* game modal luta */}
      <ModalFight
        show={modalFight}
        setModalFight={setModalFight}
        setData={setData}
      />
      {/* game modal item */}
      <ModalItem
        show={modalItem}
        setModalItem={setModalItem}
        setData={setData}
        data={data || {}}
      />
      {/* game modal trap */}
      <ModalTrap
        show={modalTrap}
        setModalTrap={setModalTrap}
        setData={setData}
        data={data || {}}
      />
      {/* game modal boss */}

      {/* game menu */}
      <div className="game-menu">
        <button onClick={() => play()}>jogar</button>
        <button onClick={() => setModalShop(!modalShop)}>shop</button>
        <button onClick={() => setModalItems(!modalItems)}>inventário</button>
        <button onClick={() => reset()}>reiniciar</button>
        <button>salvar</button>
      </div>
    </div>
  );
};

export default Game;
