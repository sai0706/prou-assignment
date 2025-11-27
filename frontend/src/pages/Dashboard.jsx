import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import config from '../config';

const Dashboard = () => {
    const [stats, setStats] = useState({ employees: 0, tasks: 0, completedTasks: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empRes, taskRes] = await Promise.all([
                    axios.get(`${config.apiUrl}/employees`),
                    axios.get(`${config.apiUrl}/tasks`)
                ]);

                const completed = taskRes.data.filter(t => t.status === 'Completed').length;

                setStats({
                    employees: empRes.data.length,
                    tasks: taskRes.data.length,
                    completedTasks: completed
                });
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    const data = [
        { name: 'Employees', count: stats.employees },
        { name: 'Total Tasks', count: stats.tasks },
        { name: 'Completed', count: stats.completedTasks },
    ];

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px' }}>
                    <h3>Employees</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.employees}</p>
                </div>
                <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px' }}>
                    <h3>Tasks</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.tasks}</p>
                </div>
                <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px' }}>
                    <h3>Completed</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.completedTasks}</p>
                </div>
            </div>

            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                        <Legend />
                        <Bar dataKey="count" fill="#646cff" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
