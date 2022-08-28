import React from 'react';

const Toast = ({ message, type }) => {
  return (
    <div
      className={`message ${
        type === 'success'
          ? 'success'
          : type === 'warning'
          ? 'warning'
          : type === 'error'
          ? 'error'
          : ''
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
