import React from 'react';

const Hero = ({ data }) => {
  return (
    <div className="hero">
      <p>{data.name}</p>
      <p>{data.type}</p>
      <p>{data.items.length || 0}</p>
      <p>{}</p>
      <p>{}</p>
    </div>
  );
};

export default Hero;
