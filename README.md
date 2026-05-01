# ⚡ TaskFlow — Full-Stack To-Do App

A beautiful, responsive full-stack to-do list application built with **React**, **Node.js + Express**, and **MongoDB**.

---

## 📁 Project Structure

```
todo-app/
├── backend/                  # Node.js + Express API
│   ├── models/
│   │   └── Task.js           # Mongoose Task schema
│   ├── routes/
│   │   └── tasks.js          # REST API routes
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── server.js             # Express server entry
│
├── frontend/                 # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js/css         # Top navigation bar
│   │   │   ├── BottomNav.js/css      # Mobile bottom navigation
│   │   │   ├── TaskForm.js/css       # Add task form
│   │   │   ├── TaskItem.js/css       # Single task card
│   │   │   ├── StatsCard.js/css      # Dashboard stats
│   │   │   └── Toast.js/css          # Notification toasts
│   │   ├── pages/
│   │   │   ├── Home.js/css           # Home dashboard
│   │   │   ├── Tasks.js/css          # All tasks with filters
│   │   │   └── Profile.js/css        # User profile & achievements
│   │   ├── App.js            # Root component + state
│   │   ├── App.css           # Shared styles
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global CSS variables & base styles
│   └── package.json
│
└── README.md
```

---

## 🚀 Prerequisites

Make sure you have installed:
- **Node.js** v18+ → https://nodejs.org
- **MongoDB** (local) → https://www.mongodb.com/try/download/community
  OR use **MongoDB Atlas** (free cloud) → https://cloud.mongodb.com

---

## ⚙️ Setup & Run

### Step 1 — Clone / Extract project
```bash
cd todo-app
```

### Step 2 — Setup Backend
```bash
cd backend
npm install
```

Edit `.env` if needed:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todoapp
```

> For MongoDB Atlas, replace MONGO_URI with your connection string:
> `MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/todoapp`

Start the backend:
```bash
npm run dev       # development (with auto-reload)
# OR
npm start         # production
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 3 — Setup Frontend
Open a **new terminal** tab:
```bash
cd frontend
npm install
npm start
```

The app opens at: **http://localhost:3000**

---

## 🔌 REST API Reference

| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| GET    | /api/tasks        | Get all tasks           |
| GET    | /api/tasks?date=  | Filter tasks by date    |
| GET    | /api/tasks/:id    | Get single task         |
| POST   | /api/tasks        | Create new task         |
| PUT    | /api/tasks/:id    | Update task             |
| DELETE | /api/tasks/:id    | Delete single task      |
| DELETE | /api/tasks        | Delete all completed    |
| GET    | /api/health       | Health check            |

### POST /api/tasks — Request body
```json
{
  "title": "Buy groceries",
  "date": "2025-06-15",
  "time": "14:30",
  "priority": "high",
  "category": "Shopping",
  "notes": "Don't forget milk"
}
```

---

## ✨ Features

### Home Page
- Greeting based on time of day
- Stats overview (total, pending, done, today)
- Progress bar
- Today's tasks
- Upcoming tasks preview

### Tasks Page
- Full task list with all tasks
- 🔍 Search by title/notes
- 📅 Filter by date
- Filter by status (all / pending / completed)
- Filter by priority (high / medium / low)
- Filter by category
- Sort by date / priority / title
- Clear all completed tasks

### Task Features
- Add with title, date, time, priority, category, notes
- Tap to expand for full details
- Mark as complete / undo
- Delete task
- Visual status badges (Pending / Done / Overdue)
- Priority color indicators

### Profile Page
- Editable name, email, avatar (12 emoji options)
- Full stats display
- 6 Achievement badges based on usage
- App info section

### Mobile / Responsive
- Bottom navigation bar on mobile
- Top navbar on desktop
- Fully responsive layout
- Touch-friendly buttons
- PWA-ready meta tags

---

## 🛠 Tech Stack

| Layer     | Technology            |
|-----------|-----------------------|
| Frontend  | React 18, Axios       |
| Styling   | Plain CSS + Variables |
| Backend   | Node.js, Express 4    |
| Database  | MongoDB + Mongoose    |
| Dev Tools | nodemon, react-scripts |

---

## 🐞 Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB service is running: `sudo systemctl start mongod` (Linux) or open MongoDB Compass
- Check your MONGO_URI in `.env`

**Port already in use?**
- Backend: Change `PORT=5000` in `.env`
- Frontend: Press `Y` when React asks to use another port

**CORS errors?**
- Backend has CORS enabled for all origins
- Frontend uses proxy (`"proxy": "http://localhost:5000"`) in package.json
