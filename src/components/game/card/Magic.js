import React from 'react';
import { URL_IMG } from '../../../utils/constants';

const Card = ({ data, handleClick, type = 'none', disabled }) => {
  return (
    <div className="card">
      {type === 'shop' && <span className="price">${data.price}</span>}
      <div className="card-image">
        <img src={URL_IMG + data.poster} alt={data.name} />
      </div>

      <div className="card-content">
        <span>NA: {data.name}</span>
        <span>TY: {data.type}</span>
        <span>MI: {data.min}</span>
        <span>MX: {data.max}</span>
        <span>MP: {data.mana}</span>
      </div>

      {type === 'shop' && <button onClick={handleClick}>buy</button>}
      {type === 'use' && (
        <button disabled={disabled} onClick={handleClick}>
          use
        </button>
      )}
      {type === 'select' && <button onClick={handleClick}>selecionar</button>}
    </div>
  );
};

export default Card;
