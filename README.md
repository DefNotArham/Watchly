# Watchly 🎥

A real-time YouTube watch party application that allows users to create rooms, watch videos together, and stay synchronized.

## Features

* 🎬 Create and join watch rooms
* ▶️ Real-time video synchronization
* 💬 Real-time chat
* 👥 Multiple users in the same room
* 🔄 Live room updates using Socket.IO

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Zustand
* Vite

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Socket.IO

### Deployment

* Docker
* Google Cloud Run

## How to Run Locally

### Clone the repository

```bash
git clone https://github.com/DefNotArham/Watchly-yt-watch-party.git
cd Watchly-yt-watch-party
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=8000
MONGO_URI=your_mongodb_connection
FRONTEND=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Project Purpose

Watchly was built as a learning project to explore real-time communication, WebSockets, database design, and full-stack application development.

## Author

Arham Kabir
GitHub: https://github.com/DefNotArham
