import React from 'react';
import { URL_IMG_GH } from '../../../utils/constants';

const Card = ({ data, handleClick, hit, type = 'none' }) => {
  if (data)
    return (
      <div className={`card enemy-hit hero-hit ${hit ? 'activate' : ''}`}>
        {type === 'shop' && <span>{data.price}</span>}
        <div
          className={`card-image ${data.health <= 0 ? 'filter-grayscale' : ''}`}
        >
          <img src={URL_IMG_GH + data.poster} alt={data.name} />
        </div>
        <div className="card-content">
          <span>NA: {data.name}</span>
          <span>TY: {data.type}</span>
          <span className={`${data.health < 25 ? 'color-error' : ''}`}>
            HP: {data.health}
          </span>
          {data.mana && <span>MP: {data.mana}</span>}
          <span>GO: ${data.gold || 0}</span>
        </div>
        {type === 'shop' && (
          <button className="btn btn-primary" onClick={handleClick}>
            buy
          </button>
        )}
        {type === 'use' && (
          <button className="btn btn-primary" onClick={handleClick}>
            use
          </button>
        )}
        {type === 'select' && (
          <button className="btn btn-primary" onClick={handleClick}>
            selecionar
          </button>
        )}
      </div>
    );
};

export default Card;
