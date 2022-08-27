import React from 'react';

const Position = ({ data, index, heroPosition }) => {
  return (
    <div className={`position ${heroPosition === index ? 'active' : ''}`}>
      {index} - {Object.keys(data)[0]}
    </div>
  );
};

export default Position;
