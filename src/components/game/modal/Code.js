import React from 'react';

import CardCode from '../card/Code';

let data = {
  id: 1,
  name: 'code',
};

const Code = ({ show, setModalCode }) => {
  const handleGet = data => {
    console.log(data);
  };

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <div className="modal-header">
            <h2>Presente</h2>
            <button onClick={() => setModalCode(false)}>fechar</button>{' '}
          </div>

          <div className="flex-justify-center">
            <CardCode
              key={Math.random()}
              data={data}
              handleClick={() => handleGet(data)}
              type="select"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Code;
