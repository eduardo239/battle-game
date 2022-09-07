import React from 'react';
import { URL_IMG_GH } from '../../../utils/constants';

const HeroInline = ({ data }) => {
  if (data)
    return (
      <div className="hero-inline-container">
        <div
          className={`card-image ${data.health <= 0 ? 'filter-grayscale' : ''}`}
        >
          <img src={URL_IMG_GH + data.poster} alt={data.name} />
        </div>
        <div className="flex-1">
          <div className="hero-inline">
            <span>
              <b>HERÓI</b>
            </span>
            <span>
              <b>VIDA</b>
            </span>
            <span>
              <b>MANA</b>
            </span>
            <span>
              <b>GOLD</b>
            </span>
            <span>
              <b>EXP</b>
            </span>
            <span>
              <b>NIVEL</b>
            </span>
          </div>
          <div className="hero-inline">
            <span>{data.name}</span>
            <span>{data.health}</span>
            <span>{data.mana}</span>
            <span>${data.gold}</span>
            <span>
              {data.exp}/{data.nextLevel}
            </span>
            <span>{data.level}</span>
          </div>
        </div>
      </div>
    );
};

export default HeroInline;
