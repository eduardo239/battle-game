import React from 'react';
import { URL_IMG_GH } from '../../../utils/constants';

const Map = ({ data, handleClick, type = 'none' }) => {
  if (data)
    return (
      <div className="card">
        {type === 'shop' && <span>{data.price}</span>}

        <div className="card-image">
          <img src={URL_IMG_GH + data.poster} alt={data.name} />
        </div>

        <div className="card-content">
          <span>NA: {data.name}</span>
          <span>TY: {data.type}</span>
          <span>LV: {data.level}</span>
          <span>SZ: {data.size}</span>
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

export default Map;
