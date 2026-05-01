import React from 'react';
import './Navbar.css';

const pageIcons = {
  home: '⚡',
  tasks: '✅',
  profile: '👤',
};

const pageTitles = {
  home: 'TaskFlow',
  tasks: 'My Tasks',
  profile: 'Profile',
};

export default function Navbar({ page, setPage }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-name">TaskFlow</span>
        </div>
        <nav className="navbar-links">
          {['home', 'tasks', 'profile'].map((p) => (
            <button
              key={p}
              className={`nav-link ${page === p ? 'active' : ''}`}
              onClick={() => setPage(p)}
            >
              <span>{pageIcons[p]}</span>
              <span>{pageTitles[p]}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
