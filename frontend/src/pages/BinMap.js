import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, Trash2 } from 'lucide-react';

const BinMap = () => {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const res = await axios.get('/api/waste');
      setBins(res.data || []);
    } catch (err) {
      setBins([
        { bin_id: 'BIN101', fill_level: 45, location: { lat: 12.9716, lng: 77.5946 }, waste_type: 'general' },
        { bin_id: 'BIN102', fill_level: 82, location: { lat: 12.9775, lng: 77.5951 }, waste_type: 'bio' },
        { bin_id: 'BIN103', fill_level: 23, location: { lat: 12.9654, lng: 77.6004 }, waste_type: 'metal' }
      ]);
    }
  };

  const getMarkerColor = (fill) => {
    if (fill < 50) return '#10b981';
    if (fill < 80) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bin-map-page">
      <div className="page-header">
        <h1>📍 Bin Locations Map</h1>
        <p>Real-time bin status on interactive map</p>
      </div>

      <div className="map-container">
        <div className="map-placeholder" id="map">
          <div className="map-no-lib">
            <MapPin size={64} />
            <p>Map Placeholder (Leaflet not installed)</p>
            <small>Bin locations shown below</small>
          </div>
        </div>
      </div>

      <div className="legend">
        <h3>Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="marker" style={{ backgroundColor: '#10b981' }} />
            <span>Normal ({"<"}50%)</span>
          </div>
          <div className="legend-item">
            <div className="marker" style={{ backgroundColor: '#f59e0b' }} />
            <span>Warning (50-80%)</span>
          </div>
          <div className="legend-item">
            <div className="marker" style={{ backgroundColor: '#ef4444' }} />
            <span>Critical ({">"}80%)</span>
          </div>

        </div>
      </div>

      <div className="bins-table">
        <h3>Nearby Bins</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Fill</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bins.map((bin) => (
              <tr key={bin.bin_id}>
                <td>{bin.bin_id}</td>
                <td>{bin.location ? `${bin.location.lat.toFixed(4)}, ${bin.location.lng.toFixed(4)}` : 'N/A'}</td>
                <td>
                  <div className="fill-indicator">
                    <div className="fill-bar" style={{ width: `${bin.fill_level}%`, background: getMarkerColor(bin.fill_level) }}></div>
                    {bin.fill_level}%
                  </div>
                </td>
                <td>
                  <span className={`type-badge ${bin.waste_type}`}>{bin.waste_type}</span>
                </td>
                <td>
                  <span className={`status ${bin.fill_level > 80 ? 'critical' : bin.fill_level > 50 ? 'warning' : 'normal'}`}>
                    {bin.fill_level > 80 ? 'Critical' : bin.fill_level > 50 ? 'Warning' : 'Normal'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BinMap;

