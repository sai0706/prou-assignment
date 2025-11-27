import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import EmployeeList from './pages/EmployeeList'
import TaskList from './pages/TaskList'

function App() {
    return (
        <Router>
            <div className="app-container">
                <h1>Employee Task Manager</h1>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/tasks" element={<TaskList />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
