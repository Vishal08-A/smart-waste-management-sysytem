import React from 'react';

const Alerts = ({ alerts }) => {
  return (
    <div className="alerts-panel">
      <h3>🔔 Alerts ({alerts.length})</h3>
      {alerts.length === 0 ? (
        <p>No active alerts</p>
      ) : (
        alerts.map((alert, i) => (
          <div key={i} className="alert-item">
            <strong>{alert.bin_id}</strong>: {alert.message || `${alert.current}% fill - ${alert.action}`}
          </div>
        ))
      )}
    </div>
  );
};

export default Alerts;

