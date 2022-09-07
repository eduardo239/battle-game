import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../../context/Game';
import { CHEST } from '../../../utils/constants';
import Toast from '../../ui/Toast';
import CardItem from '../card/Item';

let data = {
  id: 1,
  name: 'chest',
};
const Chest = ({ show, setModalChest }) => {
  const { randomChest, getRandomItem } = useContext(GameContext);

  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleGet = data => {
    console.log(data);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && !randomChest) getRandomItem(CHEST);
    return () => {
      mounted = false;
    };
  }, [randomChest]);

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <div className="modal-header">
            <h1>Baú</h1>
            <button onClick={() => setModalChest(false)}>fechar</button>{' '}
          </div>

          <div className="flex-justify-center">
            <CardItem
              key={Math.random()}
              data={data}
              handleClick={() => handleGet(data)}
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

export default Chest;
