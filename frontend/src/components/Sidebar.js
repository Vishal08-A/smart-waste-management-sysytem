import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Bell, BarChart3, Map, Monitor, FileText } from 'lucide-react';
import './Layout.css';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Overview' },
    { path: '/map', icon: MapPin, label: 'Bin Map' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/routes', icon: Map, label: 'Routes' },
    { path: '/digital-twin', icon: Monitor, label: 'Digital Twin' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>🚮 WasteSys</h2>
      </div>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={location.pathname === item.path ? 'nav-item active' : 'nav-item'}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

