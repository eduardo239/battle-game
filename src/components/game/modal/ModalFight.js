import React, { useContext, useState, useEffect } from 'react';
import { random } from '../../../utils';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import ModalItems from './UserItems';
import ModalMagic from './fight/ModalMagic';
import Log from './fight/Log';
import Play from './fight/Play';
import Fight from './fight/Fight';
import Turn from './fight/Turn';
import LevelUp from './fight/LevelUp';

const ModalFight = ({ show, setModalFight }) => {
  const { hero, setHero } = useContext(HeroContext);
  const {
    fight,
    enemy,
    setFight,
    setEnemy,
    fightLog,
    setFightLog,
    resetFight,
  } = useContext(GameContext);
  const [modalItem, setModalItem] = useState(false);
  const [modalUserMagic, setModalUserMagic] = useState(false);

  const enemyTurn = () => {
    let _rxn = random(5, 15);
    let _sta = 'O Inimigo provocou ' + _rxn + ' de dano.';

    setTimeout(() => {
      setHero({ ...hero, health: hero.health - _rxn });
      setFight({
        ...fight,
        turn: 0,
        round: fight.round + 1,
      });

      setFightLog([...fightLog, _sta]);
    }, 1000);
  };

  const hit = () => {
    let _rnd = random(65, 255);
    let _stq = 'O Herói atacou, provocando ' + _rnd + ' de dano.';

    setFightLog([...fightLog, _stq]);
    setEnemy({ ...enemy, health: enemy.health - _rnd });
    setFight({
      ...fight,
      turn: 1,
    });
  };

  const handleUseMagic = data => {
    let _mpp = random(data.min, data.max);
    let _itx = 'O Herói usou ' + data.name + ' e causou ' + _mpp + ' de dano.';

    if (data.mana > hero.mana) {
      console.log('Mana insuficiente');
    } else {
      setFightLog([...fightLog, _itx]);
      setEnemy({ ...enemy, health: enemy.health - _mpp });
      setHero({ ...hero, mana: hero.mana - data.mana });
      setFight({
        ...fight,
        turn: 1,
      });
      setModalUserMagic(false);
    }
  };

  const flee = () => {
    if (fight.end) {
      // sair sem prejuizo
      setModalFight(false);
    } else {
      // sair com prejuizo
      let expHero = hero.exp;
      let expBase = 15;
      if (expHero < expBase) {
        setHero({ ...hero, gold: hero.gold - 15, exp: 0 });
      } else {
        setHero({ ...hero, gold: hero.gold - 15, exp: hero.exp - 15 });
      }
      setModalFight(false);
    }
    resetFight();
  };

  console.log(fight);

  useEffect(() => {
    let mounted = true;

    if (mounted && fight && enemy && hero) {
      if (fight.end) {
        console.log('Fim do jogo');
      } else if (fight.turn === 0 && hero.health > 0) {
        console.log('Vez do heroi');
      } else if (fight.turn === 1 && enemy.health > 0) {
        console.log('Vez do inimigo');
        enemyTurn();
      } else if (hero.health <= 0) {
        console.log('Heroi perdeu');
        let _ini = 'O herói foi derrotado!';
        setFightLog([...fightLog, _ini]);
        setFight({
          ...fight,
          winner: 1,
          end: true,
        });
      } else if (enemy.health <= 0) {
        let _itx = 'O inimigo foi derrotado';
        setFightLog([...fightLog, _itx]);
        setFight({
          ...fight,
          winner: 0,
          end: true,
        });

        // validar o exp atual e realizar a evolucao do heroi
        let _pex = Math.floor(55 + hero.nextLevel / (hero.level * 10));
        if (hero.exp + _pex > hero.nextLevel) {
          console.log('evoluiu!!!');
          let _nxo = hero.exp + _pex - hero.nextLevel;
          let _dpp = Math.floor(hero.nextLevel + hero.nextLevel / 2);
          // evoluiu
          setHero({
            ...hero,
            gold: hero.gold + 65,
            exp: _nxo,
            victories: hero.victories + 1,
            level: hero.level + 1,
            nextLevel: _dpp,
          });
        } else {
          setHero({
            ...hero,
            gold: hero.gold + 55,
            exp: hero.exp + 55,
            victories: hero.victories + 1,
          });
        }
      }
    }

    return () => {
      mounted = false;
    };
  }, [enemy, hero, fight]);

  if (hero)
    return (
      <>
        {/*  */}
        <div className={`modal-container ${show ? 'active' : ''}`}>
          <div className={`modal ${show ? 'active' : ''}`}>
            <LevelUp hero={hero} />

            {/*  */}
            <h3>Luta</h3>

            {/*  */}
            <Turn fight={fight} />

            {/*  */}
            <Fight hero={hero} enemy={enemy} />

            {/*  */}
            <Play
              fight={fight}
              flee={flee}
              hero={hero}
              hit={hit}
              setModalUserMagic={setModalUserMagic}
              setModalItem={setModalItem}
            />

            {/*  */}
            <Log fightLog={fightLog} />

            {/*  */}
          </div>
        </div>

        {/* inventario */}
        <ModalItems show={modalItem} setModalItem={setModalItem} />

        {/* magia */}
        <ModalMagic
          modalUserMagic={modalUserMagic}
          setModalUserMagic={setModalUserMagic}
          hero={hero}
          handleUseMagic={handleUseMagic}
        />
      </>
    );
};

export default ModalFight;
