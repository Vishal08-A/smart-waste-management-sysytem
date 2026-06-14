import React, { useState } from 'react';
import { Map, Truck, Clock, Optimize } from 'lucide-react';

const RoutesPage = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: 'Morning Route A',
      bins: ['BIN101', 'BIN102', 'BIN105'],
      distance: '12.5km',
      time: '45min',
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: 2,
      name: 'Afternoon Route B',
      bins: ['BIN103', 'BIN104'],
      distance: '8.2km',
      time: '30min',
      priority: 'medium',
      status: 'pending'
    }
  ]);

  const optimizeRoute = () => {
    // Simulate optimization
    const optimized = routes.map(r => ({
      ...r,
      status: 'optimized',
      distance: (Math.random() * 2 + parseFloat(r.distance)).toFixed(1) + 'km'
    }));
    setRoutes(optimized);
  };

  const routeColor = (priority) => {
    if (priority === 'high') return '#ef4444';
    if (priority === 'medium') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="routes-page">
      <div className="page-header">
        <h1>🛣️ Route Optimization</h1>
        <p>AI-optimized collection routes</p>
        <button onClick={optimizeRoute} className="optimize-btn">
          <Optimize size={20} />
          Optimize All Routes
        </button>
      </div>

      <div className="routes-grid">
        {routes.map((route) => (
          <div 
            key={route.id} 
            className={`route-card ${route.status}`}
            onClick={() => setSelectedRoute(route.id === selectedRoute ? null : route.id)}
          >
            <div className="route-header">
              <h3>{route.name}</h3>
              <span className={`priority-badge`} style={{ background: routeColor(route.priority) }}>
                {route.priority.toUpperCase()}
              </span>
            </div>
            <div className="route-stats">
              <div className="stat">
                <Truck size={20} />
                <span>{route.bins.length} bins</span>
              </div>
              <div className="stat">
                <span>{route.distance}</span>
              </div>
              <div className="stat">
                <Clock size={20} />
                <span>{route.time}</span>
              </div>
            </div>
            <div className={`route-status ${route.status}`}>
              {route.status}
            </div>
            {route.bins.map((bin, i) => (
              <div key={i} className="bin-tag">{bin}</div>
            ))}
          </div>
        ))}
      </div>

      {selectedRoute && (
        <div className="route-detail-overlay">
          <h3>Detailed Route Plan</h3>
          <p>Interactive map + sequence coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default RoutesPage;

