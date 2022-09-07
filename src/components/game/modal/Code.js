import React, { useState } from 'react';
import Toast from '../../ui/Toast';
import CardCode from '../card/Code';

let data = {
  id: 1,
  name: 'code',
};

const Code = ({ show, setModalCode }) => {
  const [message, setMessage] = useState({
    type: '',
    content: '',
  });

  const handleGet = data => {
    console.log(data);
  };

  return (
    <>
      <div className={`modal-container ${show ? 'active' : ''}`}>
        <div className={`modal ${show ? 'active' : ''}`}>
          <div className="modal-header">
            <h1>Presente</h1>
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

      {message && message.content && (
        <Toast type={message.type} message={message.content} />
      )}
    </>
  );
};

export default Code;
