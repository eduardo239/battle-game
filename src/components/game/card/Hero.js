import React from 'react';
import { URL_IMG } from '../../../utils/constants';

const Card = ({ data, handleClick, type = 'none' }) => {
  if (data)
    return (
      <div className="card">
        {type === 'shop' && <span>{data.price}</span>}
        <div
          className={`card-image ${data.health <= 0 ? 'filter-grayscale' : ''}`}
        >
          <img src={URL_IMG + data.poster} alt={data.name} />
        </div>
        <div className="card-content">
          <span>NA: {data.name}</span>
          <span>TY: {data.type}</span>
          <span className={`${data.health < 25 ? 'color-error' : ''}`}>
            HP: {data.health}
          </span>
          {data.mana && <span>MP: {data.mana}</span>}
        </div>
        {type === 'shop' && (
          <button className="width100" onClick={handleClick}>
            buy
          </button>
        )}
        {type === 'use' && (
          <button className="width100" onClick={handleClick}>
            use
          </button>
        )}
        {type === 'select' && (
          <button className="width100" onClick={handleClick}>
            selecionar
          </button>
        )}
      </div>
    );
};

export default Card;
