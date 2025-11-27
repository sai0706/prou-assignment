import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', assignedTo: '', status: 'Pending', dueDate: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}/tasks`);
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}/employees`);
            setEmployees(res.data);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${config.apiUrl}/tasks/${editingId}`, formData);
            } else {
                await axios.post(`${config.apiUrl}/tasks`, formData);
            }
            setFormData({ title: '', description: '', assignedTo: '', status: 'Pending', dueDate: '' });
            setEditingId(null);
            fetchTasks();
        } catch (error) {
            console.error("Error saving task", error);
        }
    };

    const handleEdit = (task) => {
        setFormData({
            title: task.title,
            description: task.description,
            assignedTo: task.assignedTo ? task.assignedTo._id : '',
            status: task.status,
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
        });
        setEditingId(task._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`${config.apiUrl}/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error("Error deleting task", error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#4caf50';
            case 'In Progress': return '#ff9800';
            default: return '#f44336';
        }
    };

    return (
        <div className="page-container">
            <h2>Tasks</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required style={{ padding: '0.5rem' }} />
                <input placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ padding: '0.5rem' }} />
                <select value={formData.assignedTo} onChange={e => setFormData({ ...formData, assignedTo: e.target.value })} style={{ padding: '0.5rem' }}>
                    <option value="">Unassigned</option>
                    {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                </select>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ padding: '0.5rem' }}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
                <input type="date" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} style={{ padding: '0.5rem' }} />
                <button type="submit">{editingId ? 'Update' : 'Add'} Task</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', assignedTo: '', status: 'Pending', dueDate: '' }) }}>Cancel</button>}
            </form>

            <div className="task-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map(task => (
                    <div key={task._id} style={{ padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', textAlign: 'left', borderLeft: `5px solid ${getStatusColor(task.status)}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>{task.title} <span style={{ fontSize: '0.8em', opacity: 0.7 }}>({task.status})</span></h3>
                            <div>
                                <button onClick={() => handleEdit(task)} style={{ marginRight: '0.5rem' }}>Edit</button>
                                <button onClick={() => handleDelete(task._id)} style={{ backgroundColor: '#ff4444' }}>Delete</button>
                            </div>
                        </div>
                        <p>{task.description}</p>
                        <p style={{ fontSize: '0.9em', color: '#aaa' }}>
                            Assigned to: {task.assignedTo ? task.assignedTo.name : 'Unassigned'} | Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
