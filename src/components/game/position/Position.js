import React from 'react';

const Position = ({ data, index, heroPosition }) => {
  return (
    <div
      className={`position ${
        heroPosition === index ? 'active' : heroPosition > index ? 'pass' : ''
      }`}
    >
      {index} - {Object.keys(data)[0]}
    </div>
  );
};

export default Position;
