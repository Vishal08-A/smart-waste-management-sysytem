import React from 'react';

const BinStatus = ({ bin }) => {
  const getColor = (level) => {
    if (level < 50) return 'green';
    if (level < 80) return 'orange';
    return 'red';
  };

  return (
    <div className={`bin-status ${getColor(bin.fill_level)}`}>
      <h4>{bin.bin_id}</h4>
      <div className="fill-bar">
        <div 
          className="fill" 
          style={{ width: `${bin.fill_level}%` }}
        />
      </div>
      <p>{bin.fill_level}% - {bin.waste_type || 'Unknown'}</p>
    </div>
  );
};

export default BinStatus;

