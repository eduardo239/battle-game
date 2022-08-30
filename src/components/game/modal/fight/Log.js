import React from 'react';

const Log = ({ fightLog }) => {
  return (
    <div className="game-fight-log ">
      {fightLog.length > 0 ? (
        fightLog.map((log, index) => <p key={index}>{JSON.stringify(log)}</p>)
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Log;
