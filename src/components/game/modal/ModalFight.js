import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import { random } from '../../../utils';
import Card from '../card/Hero';

const ModalFight = ({ show, setModalFight }) => {
  const { hero, setHero } = useContext(HeroContext);
  const {
    fight,
    setFight,
    enemy,
    setEnemy,
    fightLog,
    setFightLog,
    resetFight,
  } = useContext(GameContext);
  const [modalInventory, setModalInventory] = useState(false);

  const hit = () => {
    let _rou = fight.round === 0 ? 1 : 0;
    let _nam = fight.round === 0 ? 'inimigo' : 'herói';
    let _rnd = random(35, 55);

    setFightLog([...fightLog, { [_nam]: 'Dano: ' + _rnd }]);

    if (enemy) {
      setEnemy({ ...enemy, health: enemy.health - _rnd });
      setFight({
        ...fight,
        turn: fight.turn + 1,
        round: _rou,
      });
    }

    console.log('vez do inimigo...');

    if (enemy.health > 0) {
      enemyTurn();
    }
  };

  const enemyTurn = () => {
    let _rxn = random(5, 15);
    setHero({ ...hero, health: hero.health - _rxn });
  };

  const flee = () => {
    if (fight.end) {
      // sair sem prejuizo
      setModalFight(false);
    } else {
      // sair com prejuizo
      setHero({ ...hero, gold: hero.gold - 15, exp: hero.exp - 15 });
      setModalFight(false);
    }
    resetFight();
  };

  const handleUseItem = item => {
    console.log(item);
  };

  console.log(fightLog);
  console.log(enemy);
  console.log(fight);
  console.log(hero);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (enemy && enemy.health <= 0) {
        setFight({ ...fight, winner: 0, end: true });
        setHero({ ...hero, gold: hero.gold + 55, exp: hero.exp + 55 });
        console.log('derrota do inimigo');
      }
      if (hero && hero.health <= 0) {
        console.log('derrota do heroi');
        setFight({ ...fight, winner: 1, end: true });
      }
    }

    return () => {
      mounted = false;
    };
  }, [enemy]);

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <button onClick={() => setModalFight(false)}>fechar</button>
          <h3>Luta</h3>
          <div>
            <small>Rodada: {fight.turn || 0}</small>
          </div>
          <div>
            <small>Vez de jogar: {fight.round || 0}</small>
          </div>
          <div className="game-fight">
            <div className="text-center">
              <h4>Herói</h4>
              <Card data={hero}></Card>
            </div>

            <h1>vs</h1>

            <div className="text-center">
              <h4>Inimigo</h4>
              {enemy && <Card data={enemy}></Card>}
            </div>
          </div>
          <div className="game-fight-menu">
            <button disabled={fight.end} onClick={hit}>
              lutar
            </button>
            <button
              disabled={fight.end}
              onClick={() => setModalInventory(true)}
            >
              inventário
            </button>
            <button onClick={flee}>{fight.end ? 'sair' : 'fugir'}</button>
          </div>
          {/*  */}
          <div>
            {fightLog.length > 0 ? (
              fightLog.map((log, index) => (
                <small key={index}>{JSON.stringify(log)}</small>
              ))
            ) : (
              <small>:</small>
            )}
          </div>
        </div>
      </div>

      {/* inventario */}
      <div
        className={`modal-inventory-container ${
          modalInventory ? 'active' : ''
        }`}
      >
        <div className={`modal-inventory ${modalInventory ? 'active' : ''}`}>
          <button onClick={() => setModalInventory(false)}>fechar</button>

          <h1>Inventário</h1>
          <div className="grid-container">
            {hero && hero.items.length > 0 ? (
              hero.items.map(item => (
                <Card
                  key={Math.random()}
                  data={item}
                  handleClick={() => handleUseItem(item)}
                  type="use"
                />
              ))
            ) : (
              <span>Nada encontrado aqui</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFight;
