import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Toast from './components/Toast';

const API = axios.create({ baseURL: '/api' });

export default function App() {
  const [page, setPage] = useState('home');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/tasks');
      setTasks(data.tasks);
    } catch (err) {
      showToast('Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      const { data } = await API.post('/tasks', taskData);
      setTasks(prev => [...prev, data.task]);
      showToast('Task added successfully!', 'success');
      return true;
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to add task', 'error');
      return false;
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, { completed: !completed });
      setTasks(prev => prev.map(t => t._id === id ? data.task : t));
      showToast(!completed ? 'Task completed! 🎉' : 'Task marked pending', 'success');
    } catch (err) {
      showToast('Failed to update task', 'error');
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
      showToast('Task deleted', 'info');
    } catch (err) {
      showToast('Failed to delete task', 'error');
    }
  };

  const clearCompleted = async () => {
    try {
      await API.delete('/tasks');
      setTasks(prev => prev.filter(t => !t.completed));
      showToast('Completed tasks cleared', 'info');
    } catch (err) {
      showToast('Failed to clear tasks', 'error');
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    today: tasks.filter(t => t.date === new Date().toISOString().split('T')[0]).length,
  };

  const commonProps = { tasks, loading, addTask, toggleComplete, deleteTask, clearCompleted, stats, showToast };

  return (
    <div className="app-wrapper">
      <Navbar page={page} setPage={setPage} />
      <main className="main-content">
        {page === 'home' && <Home {...commonProps} setPage={setPage} />}
        {page === 'tasks' && <Tasks {...commonProps} />}
        {page === 'profile' && <Profile stats={stats} />}
      </main>
      <BottomNav page={page} setPage={setPage} />
      {toast && <Toast key={toast.id} toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
