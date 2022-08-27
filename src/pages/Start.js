import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      <Link to="/select-hero">
        <button>iniciar</button>
      </Link>
    </div>
  );
};

export default Start;
