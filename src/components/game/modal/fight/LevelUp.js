import React, { useEffect, useState } from 'react';

const LevelUp = ({ hero }) => {
  const [activeClass, setActiveClass] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (hero.level > 1) {
        setActiveClass(true);

        setTimeout(() => {
          setActiveClass(false);
        }, 1000);
      }
    }

    return () => {
      mounted = false;
    };
  }, [hero.level]);

  return (
    <div className={`level-up ${activeClass ? 'active' : ''}`}>
      <span>
        Subiu para o nível: {` `}
        <b>{hero.level || 0}</b>
      </span>
    </div>
  );
};

export default LevelUp;
