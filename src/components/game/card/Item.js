import React from 'react';
import { URL_IMG_GH } from '../../../utils/constants';

const Card = ({ data, handleClick, type = 'none' }) => {
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
      {type === 'select' && (
        <button className="btn btn-primary" onClick={handleClick}>
          selecionar
        </button>
      )}
    </div>
  );
};

export default Card;
