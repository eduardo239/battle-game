import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../../context/Game';
import { isObjectEmpty } from '../../../utils';
import { messageHandler } from '../../../utils/game';
import {
  CHEST,
  CHEST_HAS_BEEN_OPENED,
  ERROR,
  PASSWORD_IS_INCORRECT,
  SUCCESS,
} from '../../../utils/constants';
import Toast from '../../ui/Toast';
import CardChest from '../card/Chest';

const Chest = ({ show, setModalChest }) => {
  const { randomChest, getRandomItem } = useContext(GameContext);

  const [password, setPassword] = useState('');
  const [attempt, setAttempt] = useState(false);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleGet = data => {
    if (data.code === password) {
      messageHandler(SUCCESS, CHEST_HAS_BEEN_OPENED, setMessage);
    } else {
      messageHandler(ERROR, PASSWORD_IS_INCORRECT, setMessage);
    }
    setAttempt(true);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && !randomChest) getRandomItem(CHEST);
    return () => {
      mounted = false;
    };
  }, [randomChest]);

  if (!isObjectEmpty(randomChest))
    return (
      <>
        <div className={`modal-container ${show ? 'active' : ''}`}>
          <div className={`modal ${show ? 'active' : ''}`}>
            <div className="modal-header">
              <h3>Baú</h3>
              <button
                className="btn btn-primary"
                onClick={() => setModalChest(false)}
              >
                fechar
              </button>{' '}
            </div>

            <div className="flex-justify-center">
              <CardChest
                attempt={attempt}
                key={Math.random()}
                data={randomChest}
                handleClick={() => handleGet(randomChest)}
                type="key"
                password={password}
                setPassword={setPassword}
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

export default Chest;
