import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BinStatus from './BinStatus';
import Alerts from './Alerts';
import WasteChart from './WasteChart';

const Dashboard = () => {
  const [bins, setBins] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [binsRes, alertsRes] = await Promise.all([
        axios.get('/api/waste'),
        axios.get('/api/alerts')
      ]);
      setBins(binsRes.data);
      setAlerts(alertsRes.data.alerts || []);
    } catch (err) {
      console.log('Backend not ready, simulation mode');
      // Fallback simulation data
      setBins([
        { bin_id: 'BIN101', fill_level: 45, waste_type: 'general' },
        { bin_id: 'BIN102', fill_level: 82, waste_type: 'bio' },
        { bin_id: 'BIN103', fill_level: 23, waste_type: 'metal' }
      ]);
      setAlerts([{ bin_id: 'BIN102', message: 'Almost full' }]);
    }
  };

  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat">
          <h3>Total Bins</h3>
          <p>{bins.length}</p>
        </div>
        <div className="stat">
          <h3>Critical Alerts</h3>
          <p>{alerts.filter(a => a.current > 90).length}</p>
        </div>
      </div>
      
      <div className="grid">
        <div className="bins">
          <h2>Bin Status</h2>
          {bins.map(bin => (
            <BinStatus key={bin.bin_id} bin={bin} />
          ))}
        </div>
        <div className="charts">
          <WasteChart data={bins} />
          <Alerts alerts={alerts} />
        </div>
      </div>
      
      <div className="digital-twin">
        <iframe 
          src="../simulation-3d/threejs_scene.html" 
          width="100%" 
          height="400"
          title="Digital Twin"
        />
      </div>
    </div>
  );
};

export default Dashboard;

