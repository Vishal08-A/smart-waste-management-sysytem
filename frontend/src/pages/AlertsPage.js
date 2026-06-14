import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, CheckCircle, Truck, RefreshCw } from 'lucide-react';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/alerts');
      setAlerts(res.data.alerts || []);
    } catch (err) {
      setAlerts([
        { bin_id: 'BIN102', current: 82, predicted: 95, action: 'Dispatch truck', timestamp: '2024-03-17T10:30:00Z' },
        { bin_id: 'BIN105', current: 91, predicted: 100, action: 'Emergency collection', timestamp: '2024-03-17T10:25:00Z' }
      ]);
    }
    setLoading(false);
  };

  const dismissAlert = async (alertId) => {
    // Backend dismiss endpoint placeholder
    setAlerts(alerts.filter(a => a._id !== alertId));
  };

  const priorityColor = (current) => {
    if (current > 90) return 'bg-red-500';
    if (current > 75) return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="alerts-page">
      <div className="page-header">
        <h1>🔔 Alerts Center</h1>
        <p>Real-time notifications and actions</p>
        <button onClick={fetchAlerts} className="refresh-btn" disabled={loading}>
          <RefreshCw size={20} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading alerts...</div>
      ) : alerts.length === 0 ? (
        <div className="no-alerts">
          <CheckCircle size={64} className="no-alerts-icon" />
          <h3>No Active Alerts</h3>
          <p>All bins operating normally</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map((alert, index) => (
            <div key={alert._id || index} className={`alert-card ${priorityColor(alert.current || 0)}`}>
              <div className="alert-header">
                <Bell size={24} />
                <div>
                  <h3>{alert.bin_id}</h3>
                  <p>{alert.action}</p>
                </div>
              </div>
              <div className="alert-details">
                <div className="detail">
                  <span>Current Fill:</span>
                  <span>{alert.current || 0}%</span>
                </div>
                <div className="detail">
                  <span>Predicted:</span>
                  <span>{alert.predicted || 0}%</span>
                </div>
                <div className="detail">
                  <span>Time:</span>
                  <span>{new Date(alert.timestamp || Date.now()).toLocaleString()}</span>
                </div>
              </div>
              <div className="alert-actions">
                <button className="btn dispatch">
                  <Truck size={18} />
                  Dispatch
                </button>
                <button onClick={() => dismissAlert(alert._id || index)} className="btn dismiss">
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPage;

