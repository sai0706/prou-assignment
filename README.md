# Employee Task Manager

A full-stack web application for managing employees and tasks with a modern React frontend and Express/MongoDB backend.

## Features

- 👥 Employee Management (Create, Read, Update, Delete)
- ✅ Task Management with status tracking
- 📊 Dashboard with statistics and charts
- 🎨 Modern, responsive UI
- 🔄 Real-time data synchronization

## Tech Stack

**Frontend:**
- React 18
- Vite
- Axios
- React Router
- Recharts

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- CORS enabled

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd employee-task-manager
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   echo "PORT=5000" > .env
   echo "MONGODB_URI=mongodb://localhost:27017/employee-task-db" >> .env
   
   # Start backend
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Render.

## Project Structure

```
employee-task-manager/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── config.js    # API configuration
│   │   └── App.jsx      # Main app component
│   └── package.json
└── render.yaml          # Render deployment config
```

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## License

MIT
