import React from 'react';
import { URL_IMG_GH } from '../../../utils/constants';

const Card = ({ data, handleClick, setPassword, password, type = 'none' }) => {
  return (
    <div className="card">
      {type === 'shop' && <span className="price">${data.price}</span>}
      <div className="card-image">
        <img src={URL_IMG_GH + data.poster} alt={data.name} />
      </div>
      <div className="card-content">
        <span>NA: {data.name}</span>
        <span>TY: {data.type}</span>
        <span>RA: {data.rarity}</span>
        <span>VL: {data.value}</span>
      </div>

      {type === 'key' && (
        <form>
          <input
            autoFocus="autoFocus"
            className="card-password"
            type="text"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <button className="width100" onClick={handleClick}>
            abrir
          </button>
        </form>
      )}
    </div>
  );
};

export default Card;
