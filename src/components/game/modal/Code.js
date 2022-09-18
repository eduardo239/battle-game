import React, { useContext } from 'react';
import { GameContext } from '../../../context/Game';
import { isObjectEmpty } from '../../../utils';

import CardCode from '../card/Code';

const Code = ({ show, setModalCode }) => {
  const { randomChest } = useContext(GameContext);

  const handleGet = data => {
    console.log(data);
  };

  if (!isObjectEmpty(randomChest))
    return (
      <>
        <div className={`modal-container ${show ? 'active' : ''}`}>
          <div className={`modal ${show ? 'active' : ''}`}>
            <div className="modal-header">
              <h3>História</h3>
              <button
                className="btn btn-primary"
                onClick={() => setModalCode(false)}
              >
                fechar
              </button>{' '}
            </div>

            <div className="flex-justify-center">
              <CardCode
                key={randomChest.id}
                data={randomChest}
                handleClick={() => handleGet(randomChest)}
                type="select"
              />
            </div>
          </div>
        </div>
      </>
    );
};

export default Code;
