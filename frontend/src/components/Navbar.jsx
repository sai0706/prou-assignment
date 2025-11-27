import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            padding: '1rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            marginBottom: '2rem'
        }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
            <Link to="/employees" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Employees</Link>
            <Link to="/tasks" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Tasks</Link>
        </nav>
    );
};

export default Navbar;
