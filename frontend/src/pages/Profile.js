import React, { useState } from 'react';
import './Profile.css';

const defaultUser = {
  name: 'User',
  email: 'user@example.com',
  avatar: '🧑‍💻',
  joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
};

const avatarOptions = ['🧑‍💻', '👩‍💻', '🧑‍🎨', '👩‍🎨', '🧑‍🔬', '🧑‍💼', '🦸', '🧙', '🐱', '🐶', '🦊', '🐸'];

export default function Profile({ stats }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('taskflow_user')) || defaultUser; }
    catch { return defaultUser; }
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const save = () => {
    setUser(form);
    localStorage.setItem('taskflow_user', JSON.stringify(form));
    setEditing(false);
    setShowAvatarPicker(false);
  };

  const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const achievements = [
    { icon: '🎯', label: 'First Task', earned: stats.total >= 1 },
    { icon: '🔥', label: '5 Tasks Done', earned: stats.completed >= 5 },
    { icon: '⚡', label: '10 Tasks Total', earned: stats.total >= 10 },
    { icon: '🏆', label: '100% Complete', earned: percent === 100 && stats.total > 0 },
    { icon: '🌟', label: 'Super Productive', earned: stats.completed >= 20 },
    { icon: '💎', label: 'Power User', earned: stats.total >= 50 },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Your personal task manager profile</p>
      </div>

      {/* Avatar & Name */}
      <div className="profile-card card">
        <div className="profile-top">
          <div className="avatar-wrap" onClick={() => editing && setShowAvatarPicker(!showAvatarPicker)}>
            <span className="avatar">{user.avatar}</span>
            {editing && <span className="avatar-edit-hint">✏️</span>}
          </div>
          <div className="profile-info">
            {editing ? (
              <>
                <input
                  className="form-input"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                  style={{ marginBottom: 8 }}
                />
                <input
                  className="form-input"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="Email"
                  type="email"
                />
              </>
            ) : (
              <>
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
                <div className="profile-joined">Member since {user.joined}</div>
              </>
            )}
          </div>
        </div>

        {showAvatarPicker && (
          <div className="avatar-picker slide-up">
            <div className="divider" />
            <p className="avatar-picker-label">Choose your avatar</p>
            <div className="avatar-grid">
              {avatarOptions.map((av) => (
                <button
                  key={av}
                  className={`avatar-option ${form.avatar === av ? 'selected' : ''}`}
                  onClick={() => setForm(p => ({ ...p, avatar: av }))}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="divider" />
        <div className="profile-actions">
          {editing ? (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(false); setForm(user); setShowAvatarPicker(false); }}>
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={save}>
                💾 Save Changes
              </button>
            </>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="section-title-wrap">
        <h2 className="section-title-text">📊 Statistics</h2>
      </div>
      <div className="profile-stats-grid">
        {[
          { label: 'Total Tasks', value: stats.total, icon: '📋', color: 'var(--text-primary)' },
          { label: 'Completed',   value: stats.completed, icon: '✅', color: 'var(--success)' },
          { label: 'Pending',     value: stats.pending, icon: '⏳', color: 'var(--accent-light)' },
          { label: 'Due Today',   value: stats.today, icon: '📅', color: 'var(--warning)' },
          { label: 'Completion %', value: `${percent}%`, icon: '🎯', color: 'var(--accent-light)' },
        ].map(s => (
          <div key={s.label} className="profile-stat-item card">
            <span className="profile-stat-icon">{s.icon}</span>
            <span className="profile-stat-value" style={{ color: s.color }}>{s.value}</span>
            <span className="profile-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="section-title-wrap">
        <h2 className="section-title-text">🏅 Achievements</h2>
      </div>
      <div className="achievements-grid">
        {achievements.map(a => (
          <div key={a.label} className={`achievement-item card ${a.earned ? 'earned' : 'locked'}`}>
            <span className="achievement-icon">{a.earned ? a.icon : '🔒'}</span>
            <span className="achievement-label">{a.label}</span>
            {a.earned && <span className="achievement-badge">✓</span>}
          </div>
        ))}
      </div>

      {/* App info */}
      <div className="app-info card">
        <div className="app-info-row">
          <span>⚡ App</span>
          <span>TaskFlow</span>
        </div>
        <div className="app-info-row">
          <span>📦 Version</span>
          <span>1.0.0</span>
        </div>
        <div className="app-info-row">
          <span>🛠 Stack</span>
          <span>React + Node + MongoDB</span>
        </div>
      </div>
    </div>
  );
}
