import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', position: '', department: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

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
                await axios.put(`${config.apiUrl}/employees/${editingId}`, formData);
            } else {
                await axios.post(`${config.apiUrl}/employees`, formData);
            }
            setFormData({ name: '', email: '', position: '', department: '' });
            setEditingId(null);
            fetchEmployees();
        } catch (error) {
            console.error("Error saving employee", error);
        }
    };

    const handleEdit = (emp) => {
        setFormData({ name: emp.name, email: emp.email, position: emp.position, department: emp.department });
        setEditingId(emp._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`${config.apiUrl}/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error("Error deleting employee", error);
            }
        }
    };

    return (
        <div className="page-container">
            <h2>Employees</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '0.5rem' }} />
                <input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required style={{ padding: '0.5rem' }} />
                <input placeholder="Position" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} required style={{ padding: '0.5rem' }} />
                <input placeholder="Department" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} required style={{ padding: '0.5rem' }} />
                <button type="submit">{editingId ? 'Update' : 'Add'} Employee</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', position: '', department: '' }) }}>Cancel</button>}
            </form>

            <div className="employee-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {employees.map(emp => (
                    <div key={emp._id} style={{ padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', textAlign: 'left' }}>
                        <h3>{emp.name}</h3>
                        <p>{emp.position} at {emp.department}</p>
                        <p style={{ color: '#888' }}>{emp.email}</p>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(emp)}>Edit</button>
                            <button onClick={() => handleDelete(emp._id)} style={{ backgroundColor: '#ff4444' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;
