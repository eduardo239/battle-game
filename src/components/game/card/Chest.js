import React from 'react';
import { URL_IMG_GH } from '../../../utils/constants';

const Card = ({
  data,
  handleClick,
  setPassword,
  password,
  attempt,
  type = 'none',
}) => {
  return (
    <div className="card">
      {type === 'shop' && <span className="price">${data.price}</span>}
      <div className="card-image">
        <img src={URL_IMG_GH + data.poster} alt={data.name} />
      </div>
      <div className="card-content">
        <span>NA: {data.name}</span>
      </div>

      {type === 'key' && (
        <>
          <input
            autoFocus="autoFocus"
            className="card-password"
            type="text"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <button
            className="btn btn-primary"
            disabled={attempt}
            onClick={handleClick}
          >
            abrir
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
