import React from 'react';

const Card = ({ data, handleClick, type = 'none' }) => {
  return (
    <div className="relative">
      {type === 'shop' && <span className="price">{data.price}</span>}
      <div className="card">
        <span>{data.name}</span>
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
