import React, { useState } from 'react';
import './TaskForm.css';

const today = new Date().toISOString().split('T')[0];
const nowTime = new Date().toTimeString().slice(0, 5);

const defaultForm = {
  title: '',
  date: today,
  time: nowTime,
  priority: 'medium',
  category: 'General',
  notes: '',
};

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.date) errs.date = 'Date is required';
    if (!form.time) errs.time = 'Time is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const success = await onAdd(form);
    setLoading(false);
    if (success) {
      setForm(defaultForm);
      setExpanded(false);
      setErrors({});
    }
  };

  return (
    <div className="task-form-card card">
      <div className="task-form-header" onClick={() => setExpanded(!expanded)}>
        <div className="task-form-title">
          <span className="task-form-icon">➕</span>
          <span>Add New Task</span>
        </div>
        <span className={`task-form-arrow ${expanded ? 'open' : ''}`}>›</span>
      </div>

      {expanded && (
        <form className="task-form-body slide-up" onSubmit={handleSubmit}>
          <div className="divider" />

          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              maxLength={200}
              autoFocus
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          <div className="row-2">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Date *</label>
              <input
                className={`form-input ${errors.date ? 'input-error' : ''}`}
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Time *</label>
              <input
                className={`form-input ${errors.time ? 'input-error' : ''}`}
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
              />
              {errors.time && <span className="form-error">{errors.time}</span>}
            </div>
          </div>

          <div className="row-2" style={{ marginTop: 14 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Priority</label>
              <select className="form-input" name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category</label>
              <select className="form-input" name="category" value={form.category} onChange={handleChange}>
                <option value="General">📦 General</option>
                <option value="Work">💼 Work</option>
                <option value="Personal">🙋 Personal</option>
                <option value="Health">💪 Health</option>
                <option value="Shopping">🛒 Shopping</option>
                <option value="Finance">💰 Finance</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: 14 }}>
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-input"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional details..."
              rows={2}
              style={{ resize: 'vertical', minHeight: '60px' }}
            />
          </div>

          <div className="task-form-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setExpanded(false); setErrors({}); setForm(defaultForm); }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
              {loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : '➕'}
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
