import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, FileText, LogOut, Tag } from 'lucide-react';
import AdminProducts from './AdminProducts';
import AdminSettings from './AdminSettings';
import AdminBlogs from './AdminBlogs';
import AdminPromotions from './AdminPromotions';
import { api } from '../api';
import './AdminPanel.css';
import './AdminProducts.css';

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let active = true;

        const syncSession = async () => {
            try {
                const session = await api.getAdminSession();
                if (!active) return;
                setIsAuthenticated(Boolean(session?.authenticated));
            } catch {
                if (!active) return;
                setIsAuthenticated(false);
            } finally {
                if (active) setAuthChecked(true);
            }
        };

        const handleAuthRequired = () => {
            setIsAuthenticated(false);
            navigate('/admin');
        };

        window.addEventListener('kago-admin-auth-required', handleAuthRequired);
        void syncSession();

        return () => {
            active = false;
            window.removeEventListener('kago-admin-auth-required', handleAuthRequired);
        };
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await api.login(username, password);
            if (res.ok) {
                setIsAuthenticated(true);
            }
        } catch {
            setLoginError('Invalid username or password');
        }
    };

    const handleLogout = async () => {
        await api.logout().catch(() => undefined);
        setIsAuthenticated(false);
        navigate('/admin');
    };

    if (!authChecked) {
        return (
            <div className="admin-login-wrapper">
                <div className="glass-panel admin-login-card">
                    <h2>Checking session...</h2>
                    <p>Please wait while the admin session is verified.</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="admin-login-wrapper">
                <form onSubmit={handleLogin} className="glass-panel admin-login-card">
                    <h2>Admin Access</h2>
                    <p>Please enter your credentials to manage site content.</p>
                    {loginError && <div style={{ color: '#ff7676', marginBottom: '1rem', fontSize: '0.9rem' }}>{loginError}</div>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="admin-input"
                        autoFocus
                        style={{ marginBottom: '1rem' }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="admin-input"
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Login
                    </button>
                </form>
            </div>
        );
    }

    const navLinks = [
        { path: '/admin/products', name: 'Products', icon: <Package size={20} /> },
        { path: '/admin/promotions', name: 'Promotions', icon: <Tag size={20} /> },
        { path: '/admin/blogs', name: 'Blog Posts', icon: <FileText size={20} /> },
        { path: '/admin/settings', name: 'Site Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar glass-panel">
                <div className="admin-brand">
                    <LayoutDashboard size={24} className="accent" />
                    <h2>Admin Panel</h2>
                </div>

                <nav className="admin-nav">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`admin-nav-item ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.icon}
                            <span className="nav-text">{link.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <button
                        className="admin-nav-item text-danger"
                        onClick={handleLogout}
                        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                        <LogOut size={20} />
                        Logout to Site
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Routes>
                    <Route path="/" element={<div className="admin-welcome"><h2>Welcome to Kago Bags Admin</h2><p>Select a category from the sidebar to start managing your products, offers, journal, and settings.</p></div>} />
                    <Route path="/products" element={<AdminProducts />} />
                    <Route path="/promotions" element={<AdminPromotions />} />
                    <Route path="/blogs" element={<AdminBlogs />} />
                    <Route path="/settings" element={<AdminSettings />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminPanel;
