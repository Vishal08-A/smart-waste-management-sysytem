import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Waste Management Dashboard</h1>
      </div>
      <div className="header-right">
        <button className="notification-btn">
          <Bell size={24} />
          <span className="badge">3</span>
        </button>
        <div className="user-profile">
          <User size={24} />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

