import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="center-center">
      <Link to="/select-hero">
        <button>iniciar</button>
      </Link>
    </div>
  );
};

export default Start;
