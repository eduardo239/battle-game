import React from 'react';

const Toast = ({ show, message, type }) => {
  if (show)
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
