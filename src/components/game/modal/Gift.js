import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { GameContext } from '../../../context/Game';
import { HeroContext } from '../../../context/Hero';
import { v4 as uuidv4 } from 'uuid';
import { messageHandler } from '../../../utils/game';
import Toast from '../../ui/Toast';
import CardItem from '../card/Item';
import { ITEM, SUCCESS } from '../../../utils/constants';

const ModalItem = ({ show, setModalGiftItem }) => {
  const { randomItem, getRandomItem, resetRandomItem } =
    useContext(GameContext);
  const { hero, setHero } = useContext(HeroContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleGet = data => {
    let i = { ...data, id: uuidv4() };
    let _nwi = [...hero.items, i];

    setHero({ ...hero, items: _nwi });
    messageHandler(SUCCESS, 'Item adiquirido com sucesso!', setMessage);

    setModalGiftItem(false);
    resetRandomItem();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && !randomItem) getRandomItem(ITEM);
    return () => {
      mounted = false;
    };
  }, [randomItem]);

  if (randomItem)
    return (
      <>
        <div className={`modal-container ${show ? 'active' : ''}`}>
          <div className={`modal ${show ? 'active' : ''}`}>
            <div className="modal-header">
              <h2>Presente</h2>
              <button onClick={() => setModalGiftItem(false)}>
                fechar
              </button>{' '}
            </div>

            <div className="flex-justify-center">
              <CardItem
                key={Math.random()}
                data={randomItem}
                handleClick={() => handleGet(randomItem)}
                type="select"
              />
            </div>
          </div>
        </div>

        <Toast
          show={message && message.content}
          type={message.type}
          message={message.content}
        />
      </>
    );
};

export default ModalItem;
