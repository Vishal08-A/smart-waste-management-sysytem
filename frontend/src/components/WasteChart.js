import React from 'react';
// Placeholder for Chart.js - install already in package.json

const WasteChart = ({ data }) => {
  const avgFill = data.reduce((sum, bin) => sum + bin.fill_level, 0) / data.length || 0;
  
  return (
    <div className="chart-panel">
      <h3>📊 Fill Levels</h3>
      <div className="avg-fill">
        <h4>Average: {avgFill.toFixed(1)}%</h4>
        <div className="fill-meter">
          <div style={{ width: `${avgFill}%` }} />
        </div>
      </div>
      <ul>
        {data.slice(0, 5).map(bin => (
          <li key={bin.bin_id}>{bin.bin_id}: {bin.fill_level}%</li>
        ))}
      </ul>
    </div>
  );
};

export default WasteChart;

