import React from 'react';

const Card = ({ data, handleClick, type = 'none' }) => {
  if (data)
    return (
      <div>
        {type === 'shop' && <span>{data.price}</span>}
        <div className="card">
          <span>NA: {data.name}</span>
          <span>TY: {data.type}</span>
          <span>HE: {data.health}</span>
          <span>MA: {data.mana}</span>
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
