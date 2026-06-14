import React from 'react';
import { Monitor, Play, Pause } from 'lucide-react';

const DigitalTwin = () => {
  return (
    <div className="digital-twin-page">
      <div className="page-header">
        <h1>🖥️ Digital Twin</h1>
        <p>3D simulation & prediction engine</p>
      </div>

      <div className="twin-controls">
        <button className="control-btn">
          <Play size={24} />
          Play Simulation
        </button>
        <button className="control-btn">
          <Pause size={24} />
          Pause
        </button>
        <select>
          <option>Scenario 1: Normal</option>
          <option>Scenario 2: Peak Hour</option>
          <option>Scenario 3: Emergency</option>
        </select>
      </div>

      <div className="twin-viewer">
        <iframe 
          src="../simulation-3d/threejs_scene.html" 
          width="100%" 
          height="600px"
          title="3D Digital Twin"
          className="threejs-frame"
        />
      </div>

      <div className="twin-stats">
        <div className="stat-box">
          <h4>Prediction Accuracy</h4>
          <p className="big-number">97.2%</p>
        </div>
        <div className="stat-box">
          <h4>Simulated Overflow Prevention</h4>
          <p className="big-number">89%</p>
        </div>
        <div className="stat-box">
          <h4>Route Savings</h4>
          <p className="big-number">23%</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;

