import React from 'react';

const Card = ({ data, handleClick }) => {
  return (
    <div className="card" onClick={handleClick}>
      <span>{data.name}</span>
    </div>
  );
};

export default Card;
