import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="center-center">
      <Link to="/select-hero">
        <button>
          iniciar{' '}
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </Link>
    </div>
  );
};

export default Start;
