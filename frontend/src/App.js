import React from 'react';
import Overview from './pages/Overview';
import BinMap from './pages/BinMap';
import AlertsPage from './pages/AlertsPage';
import Analytics from './pages/Analytics';
import RoutesPage from './pages/RoutesPage';
import DigitalTwin from './pages/DigitalTwin';
import Reports from './pages/Reports';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🚮 Smart Waste Management System</h1>
        <p>7-Screen Dashboard</p>
      </header>
      <div className="screen-selector">
        <a href="#overview" className="screen-link active">Overview</a>
        <a href="#map" className="screen-link">Map</a>
        <a href="#alerts" className="screen-link">Alerts</a>
        <a href="#analytics" className="screen-link">Analytics</a>
        <a href="#routes" className="screen-link">Routes</a>
        <a href="#digital-twin" className="screen-link">Digital Twin</a>
        <a href="#reports" className="screen-link">Reports</a>
      </div>
      <Overview />
    </div>
  );
}

export default App;



