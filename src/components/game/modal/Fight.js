import React, { useContext, useState, useEffect } from 'react';
import { getNextLevel, random } from '../../../utils';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import Log from './fight/Log';
import Turn from './fight/Turn';
import Play from './fight/Play';
import Fight from './fight/Fight';
import LevelUp from './fight/LevelUp';
import ModalItems from './UserItems';
import ModalMagic from './fight/Magic';
import Toast from '../../ui/Toast';
import { messageHandler } from '../../../utils/game';
import {
  ERROR,
  HERO_HAS_BEEN_DEFEATED,
  ENEMY_HAS_BEEN_DEFEATED,
} from '../../../utils/constants';
import {
  logHeroMagic,
  logHeroDamage,
  logEnemyDamage,
  logGoldRemoved,
  logGoldRemovedAndExp,
} from '../../../utils/log';

const ModalFight = ({ show, setModalFight }) => {
  const { hero, setHero } = useContext(HeroContext);
  const {
    game,
    fight,
    enemy,
    setGame,
    setFight,
    setEnemy,
    fightLog,
    setFightLog,
    resetFight,
  } = useContext(GameContext);
  const [modalItem, setModalItem] = useState(false);
  const [modalUserMagic, setModalUserMagic] = useState(false);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  /**
   * Causa um dano aleatório ao herói
   */
  const enemyTurn = () => {
    // TODO: ajustar dano do heroi
    let randomDamage = random(5, 15);
    let message = logEnemyDamage(randomDamage);

    setTimeout(() => {
      setHero({ ...hero, health: hero.health - randomDamage });
      setFight({
        ...fight,
        turn: 0,
        round: fight.round + 1,
      });
      setFightLog([...fightLog, message]);
    }, 1000);
  };

  /**
   * Causa dano ao inimigo de acordo com uma escolha
   * aleatória, entre o dano mínimo e máximo da arma
   * equipada
   */
  const hit = () => {
    let equippedWeapon = hero.equipped.weapon;
    let weaponDamage = random(equippedWeapon.min, equippedWeapon.max);
    let message = logHeroDamage(weaponDamage);

    setFightLog([...fightLog, message]);
    setEnemy({ ...enemy, health: enemy.health - weaponDamage });
    setFight({ ...fight, turn: 1 });
  };

  /**
   *
   * @param {Object} data Magic Item
   */
  const handleUseMagic = data => {
    let magicDamage = random(data.min, data.max);
    let message = logHeroMagic(data.name, magicDamage);

    if (data.mana <= hero.mana) {
      setFightLog([...fightLog, message]);
      setEnemy({ ...enemy, health: enemy.health - magicDamage });
      setHero({ ...hero, mana: hero.mana - data.mana });
      setFight({ ...fight, turn: 1 });
      setModalUserMagic(false);
    }
  };

  /**
   * Herói foge da batalha, perdendo uma parte do gold
   * e de experiência se houver experiência
   */
  const flee = () => {
    // TODO: desativar botaos ao sair
    if (fight.end) {
      // sair sem prejuizo
      setModalFight(false);
    } else {
      // sair com prejuizo
      let expHero = hero.exp;
      let expBase = 15;
      let goldBase = 15;
      if (expHero < expBase) {
        setHero({ ...hero, gold: hero.gold - goldBase, exp: 0 });
        messageHandler(ERROR, logGoldRemoved(goldBase), setMessage);
      } else {
        setHero({
          ...hero,
          gold: hero.gold - goldBase,
          exp: hero.exp - expBase,
        });
        messageHandler(
          ERROR,
          logGoldRemovedAndExp(goldBase, expBase),
          setMessage
        );
      }

      setModalFight(false);
    }
    resetFight();
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && fight && enemy && hero) {
      if (fight.end) {
        // TODO: fim do jogo
        return;
      } else if (fight.turn === 0 && hero.health > 0) {
        // TODO: fazer nada, vez do heroi
      } else if (fight.turn === 1 && enemy.health > 0) {
        enemyTurn();
      } else if (hero.health <= 0) {
        setFightLog([...fightLog, HERO_HAS_BEEN_DEFEATED]);
        setFight({ ...fight, winner: 1, end: true });
        setGame({ ...game, end: true });
      } else if (enemy.health <= 0) {
        setFightLog([...fightLog, ENEMY_HAS_BEEN_DEFEATED]);
        setFight({ ...fight, winner: 0, end: true });

        // validar o exp atual e realizar a evolucao do heroi
        // TODO: configurar a quantidade de exp que o herói recebe
        let baseExp = 55;
        let goldBase = 45;
        let nextExp = Math.floor(baseExp + hero.nextLevel / (hero.level * 10));
        if (hero.exp + nextExp > hero.nextLevel) {
          // calcular a quantidade de experiencia para o proximo nivel
          let _nxt = getNextLevel(hero.level + 1);
          let _exl = hero.exp + nextExp - hero.nextLevel;
          // let _nxl = Math.floor(hero.nextLevel + hero.nextLevel / 2);
          // evolução do herói
          setHero({
            ...hero,
            gold: hero.gold + goldBase,
            exp: _exl,
            victories: hero.victories + 1,
            level: hero.level + 1,
            nextLevel: _nxt,
          });
        } else {
          setHero({
            ...hero,
            gold: hero.gold + goldBase,
            exp: hero.exp + baseExp,
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
            <Fight hero={hero} enemy={enemy} fight={fight} />

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
        <ModalItems
          show={modalItem}
          setModalItem={setModalItem}
          setFight={setFight}
          fight={fight}
          fighting={true}
        />

        {/* magia */}
        <ModalMagic
          modalUserMagic={modalUserMagic}
          setModalUserMagic={setModalUserMagic}
          hero={hero}
          handleUseMagic={handleUseMagic}
        />

        <Toast
          show={message && message.content}
          type={message.type}
          message={message.content}
        />
      </>
    );
};

export default ModalFight;
