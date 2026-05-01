import React from 'react';
import StatsCard from '../components/StatsCard';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import './Home.css';

export default function Home({ tasks, loading, addTask, toggleComplete, deleteTask, stats, setPage }) {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.date === today).sort((a, b) => a.time.localeCompare(b.time));
  const upcomingTasks = tasks.filter(t => t.date > today && !t.completed).slice(0, 3);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning ☀️';
    if (h < 17) return 'Good afternoon 🌤';
    return 'Good evening 🌙';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">{greeting()}</h1>
        <p className="page-subtitle">
          {stats.pending > 0
            ? `You have ${stats.pending} pending task${stats.pending > 1 ? 's' : ''}`
            : stats.total > 0 ? 'All tasks completed! 🎉' : 'No tasks yet. Add one below!'}
        </p>
      </div>

      <StatsCard stats={stats} />
      <TaskForm onAdd={addTask} />

      {/* Today's tasks */}
      <div className="section-header">
        <h2 className="section-title">📅 Today's Tasks</h2>
        <button className="btn btn-ghost btn-sm" onClick={() => setPage('tasks')}>
          View all →
        </button>
      </div>

      {loading ? (
        <div className="loading-wrap">
          <div className="spinner" style={{ width: 28, height: 28 }} />
        </div>
      ) : todayTasks.length === 0 ? (
        <div className="card empty-state">
          <span className="emoji">📭</span>
          <p>No tasks for today</p>
          <p style={{ fontSize: '0.8rem', marginTop: 4 }}>Use the form above to add your first task!</p>
        </div>
      ) : (
        <div>
          {todayTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {/* Upcoming */}
      {upcomingTasks.length > 0 && (
        <>
          <div className="section-header" style={{ marginTop: 24 }}>
            <h2 className="section-title">🔮 Upcoming</h2>
          </div>
          {upcomingTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </>
      )}
    </div>
  );
}
