import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BinStatus from '../components/BinStatus';
import WasteChart from '../components/WasteChart';
import { AlertCircle, Truck } from 'lucide-react';

const Overview = () => {
  const [bins, setBins] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [binsRes, alertsRes] = await Promise.all([
        axios.get('/api/waste'),
        axios.get('/api/alerts')
      ]);
      setBins(binsRes.data || []);
      setAlerts(alertsRes.data.alerts || []);
    } catch (err) {
      console.log('Using fallback data');
      setBins([
        { _id: '1', bin_id: 'BIN101', fill_level: 45, waste_type: 'general' },
        { _id: '2', bin_id: 'BIN102', fill_level: 82, waste_type: 'bio' },
        { _id: '3', bin_id: 'BIN103', fill_level: 23, waste_type: 'metal' }
      ]);
      setAlerts([
        { bin_id: 'BIN102', current: 82, predicted: 95, action: 'Dispatch truck' }
      ]);
    }
  };

  const avgFill = bins.reduce((sum, b) => sum + b.fill_level, 0) / bins.length || 0;

  return (
    <div className="overview">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Real-time waste management system status</p>
      </div>
      
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Total Bins</h3>
          <p className="kpi-number">{bins.length}</p>
        </div>
        <div className="kpi-card">
          <h3>Avg Fill Level</h3>
          <p className="kpi-number">{avgFill.toFixed(1)}%</p>
        </div>
        <div className="kpi-card warning">
          <h3>Active Alerts</h3>
          <p className="kpi-number">{alerts.length}</p>
        </div>
        <div className="kpi-card">
          <h3>Collections Today</h3>
          <p className="kpi-number">12</p>
        </div>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h3>Recent Bins</h3>
          <div className="bins-list">
            {bins.slice(0, 5).map((bin) => (
              <BinStatus key={bin._id || bin.bin_id} bin={bin} />
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Quick Stats</h3>
          <WasteChart data={bins} />
        </div>
      </div>

      <div className="alerts-quick">
        {alerts.slice(0, 3).map((alert, i) => (
          <div key={i} className="alert-item">
            <AlertCircle className="alert-icon" />
            <div>
              <h4>{alert.bin_id}</h4>
              <p>{alert.action}</p>
            </div>
            <Truck className="action-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;

