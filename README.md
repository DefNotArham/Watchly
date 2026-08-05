# Watchly 🎥

A real-time YouTube watch party application that allows users to create rooms, watch videos together, and communicate in real time.

## Features

- 🎬 Create and join watch rooms
- ▶️ Real-time YouTube video synchronization
- 💬 Real-time chat
- 👥 Multiple users per room
- 🔄 Live room updates using Socket.IO

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Zustand
- Vite

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Socket.IO

### Deployment

- Docker
- Google Cloud Run

## Setup

### Clone the repository

```bash
git clone https://github.com/DefNotArham/Watchly-yt-watch-party.git
cd Watchly-yt-watch-party
```

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
FRONTEND=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

## Project Purpose

Watchly was built as a learning project to explore real-time applications, WebSockets, database relationships, and full-stack development.

## Author

Arham Kabir
GitHub: https://github.com/DefNotArham
