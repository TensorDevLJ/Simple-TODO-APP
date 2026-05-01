import React, { useState } from 'react';
import './TaskItem.css';

const priorityConfig = {
  high:   { label: 'High',   emoji: '🔴', color: '#ff6584' },
  medium: { label: 'Medium', emoji: '🟡', color: '#fbbf24' },
  low:    { label: 'Low',    emoji: '🟢', color: '#22d3a0' },
};

const categoryEmoji = {
  General:  '📦', Work: '💼', Personal: '🙋',
  Health:   '💪', Shopping: '🛒', Finance: '💰',
};

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  const date = new Date(y, m - 1, d);
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  if (dateStr === today.toISOString().split('T')[0]) return 'Today';
  if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour < 12 ? 'AM' : 'PM'}`;
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const catEmoji = categoryEmoji[task.category] || '📦';
  const isOverdue = !task.completed && task.date < new Date().toISOString().split('T')[0];

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task._id);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${deleting ? 'deleting' : ''}`}>
      <div className="task-main" onClick={() => setExpanded(!expanded)}>
        <button
          className={`task-check ${task.completed ? 'checked' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggle(task._id, task.completed); }}
          title={task.completed ? 'Mark Pending' : 'Mark Complete'}
        >
          {task.completed && <span className="check-mark">✓</span>}
        </button>

        <div className="task-info">
          <div className="task-title">{task.title}</div>
          <div className="task-meta">
            <span className="meta-chip">
              📅 {formatDate(task.date)}
            </span>
            <span className="meta-chip">
              🕐 {formatTime(task.time)}
            </span>
            <span className="meta-chip" style={{ color: priority.color }}>
              {priority.emoji} {priority.label}
            </span>
          </div>
        </div>

        <div className="task-badges">
          <span className="cat-badge">{catEmoji}</span>
          <span className={`status-badge ${task.completed ? 'status-done' : isOverdue ? 'status-overdue' : 'status-pending'}`}>
            {task.completed ? 'Done' : isOverdue ? 'Overdue' : 'Pending'}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="task-expanded slide-up">
          <div className="divider" />
          {task.notes && (
            <p className="task-notes">📝 {task.notes}</p>
          )}
          <div className="task-expanded-meta">
            <span>Category: {catEmoji} {task.category}</span>
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="task-actions">
            <button
              className={`btn btn-sm ${task.completed ? 'btn-ghost' : 'btn-success'}`}
              onClick={(e) => { e.stopPropagation(); onToggle(task._id, task.completed); }}
            >
              {task.completed ? '↩ Undo' : '✓ Complete'}
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={deleting}>
              {deleting ? '...' : '🗑 Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
