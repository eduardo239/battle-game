import React from 'react';
import { URL_IMG_GH } from '../../../utils/constants';

const Card = ({ data, handleClick, equipped, type = 'none' }) => {
  return (
    <div className="card">
      {type === 'equip' && equipped && (
        <span className={`${equipped ? 'equipped' : ''}`}>Equipado</span>
      )}
      <div className="card-image">
        <img src={URL_IMG_GH + data.poster} alt={data.name} />
      </div>
      <div className="card-content">
        <span>NA: {data.name}</span>
        <span>RR: {data.rarity}</span>
        <span>MI: {data.min}</span>
        <span>MX: {data.max}</span>
      </div>

      {type === 'shop' && (
        <button className="btn btn-primary" onClick={handleClick}>
          comprar
        </button>
      )}
      {type === 'use' && (
        <button className="btn btn-primary" onClick={handleClick}>
          use
        </button>
      )}
      {type === 'equip' && (
        <button className="btn btn-primary" onClick={handleClick}>
          equipar
        </button>
      )}
    </div>
  );
};

export default Card;
