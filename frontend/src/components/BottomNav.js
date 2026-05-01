import React from 'react';
import './BottomNav.css';

const navItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'tasks', label: 'Tasks', icon: '✅' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

export default function BottomNav({ page, setPage }) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-item ${page === item.id ? 'active' : ''}`}
          onClick={() => setPage(item.id)}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
          {page === item.id && <span className="bottom-nav-dot" />}
        </button>
      ))}
    </nav>
  );
}
