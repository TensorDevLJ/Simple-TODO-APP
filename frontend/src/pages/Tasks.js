import React, { useState, useMemo } from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import './Tasks.css';

export default function Tasks({ tasks, loading, addTask, toggleComplete, deleteTask, clearCompleted }) {
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filtered = useMemo(() => {
    let list = [...tasks];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q) || t.notes?.toLowerCase().includes(q));
    }
    if (filterDate) list = list.filter(t => t.date === filterDate);
    if (filterStatus === 'completed') list = list.filter(t => t.completed);
    if (filterStatus === 'pending') list = list.filter(t => !t.completed);
    if (filterPriority !== 'all') list = list.filter(t => t.priority === filterPriority);
    if (filterCategory !== 'all') list = list.filter(t => t.category === filterCategory);

    list.sort((a, b) => {
      if (sortBy === 'date') return `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`);
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    return list;
  }, [tasks, search, filterDate, filterStatus, filterPriority, filterCategory, sortBy]);

  const hasFilters = filterDate || filterStatus !== 'all' || filterPriority !== 'all' || filterCategory !== 'all' || search;

  const clearFilters = () => {
    setFilterDate('');
    setFilterStatus('all');
    setFilterPriority('all');
    setFilterCategory('all');
    setSearch('');
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Tasks</h1>
        <p className="page-subtitle">{filtered.length} task{filtered.length !== 1 ? 's' : ''} shown</p>
      </div>

      <TaskForm onAdd={addTask} />

      {/* Filters */}
      <div className="filters-card card">
        <div className="filters-header">
          <span className="filters-title">🔍 Filter & Sort</span>
          {hasFilters && (
            <button className="btn btn-ghost btn-sm" onClick={clearFilters}>Clear all</button>
          )}
        </div>

        <div className="filter-row">
          <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
            <input
              className="form-input"
              type="text"
              placeholder="🔍 Search tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <input
              className="form-input"
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              title="Filter by date"
            />
          </div>
        </div>

        <div className="filter-chips-row">
          {/* Status */}
          {['all', 'pending', 'completed'].map(s => (
            <button
              key={s}
              className={`filter-chip ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              {s === 'all' ? 'All' : s === 'pending' ? '⏳ Pending' : '✅ Done'}
            </button>
          ))}
          <div className="chip-divider" />
          {/* Priority */}
          {['all', 'high', 'medium', 'low'].map(p => (
            <button
              key={p}
              className={`filter-chip ${filterPriority === p ? 'active' : ''}`}
              onClick={() => setFilterPriority(p)}
            >
              {p === 'all' ? '🎯 All Priority' : p === 'high' ? '🔴 High' : p === 'medium' ? '🟡 Med' : '🟢 Low'}
            </button>
          ))}
        </div>

        <div className="filter-row" style={{ marginTop: 10, alignItems: 'center' }}>
          <select className="form-input" style={{ flex: 1 }} value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="all">📦 All Categories</option>
            <option value="General">📦 General</option>
            <option value="Work">💼 Work</option>
            <option value="Personal">🙋 Personal</option>
            <option value="Health">💪 Health</option>
            <option value="Shopping">🛒 Shopping</option>
            <option value="Finance">💰 Finance</option>
          </select>
          <select className="form-input" style={{ flex: 1 }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">Sort: Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="title">Sort: Title</option>
          </select>
        </div>
      </div>

      {/* Task list */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <div className="spinner" style={{ width: 28, height: 28 }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card empty-state">
          <span className="emoji">{hasFilters ? '🔍' : '📭'}</span>
          <p>{hasFilters ? 'No tasks match your filters' : 'No tasks yet'}</p>
          {hasFilters && (
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div>
          {filtered.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {/* Clear completed */}
      {completedCount > 0 && (
        <div className="clear-section">
          <button className="btn btn-danger btn-sm" onClick={clearCompleted}>
            🗑 Clear {completedCount} completed task{completedCount > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
}
