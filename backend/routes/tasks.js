const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /api/tasks — get all tasks (with optional date filter)
router.get('/', async (req, res) => {
  try {
    const { date, completed, priority, category } = req.query;
    const filter = {};

    if (date) filter.date = date;
    if (completed !== undefined) filter.completed = completed === 'true';
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const tasks = await Task.find(filter).sort({ date: 1, time: 1 });
    res.json({ success: true, count: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/tasks/:id — get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/tasks — create a new task
router.post('/', async (req, res) => {
  try {
    const { title, date, time, priority, category, notes } = req.body;

    if (!title || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Title, date, and time are required fields',
      });
    }

    const task = new Task({ title, date, time, priority, category, notes });
    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/tasks/:id — update task (mark complete, edit fields)
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    res.json({ success: true, task });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/tasks — delete all completed tasks
router.delete('/', async (req, res) => {
  try {
    const result = await Task.deleteMany({ completed: true });
    res.json({
      success: true,
      message: `${result.deletedCount} completed tasks deleted`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
