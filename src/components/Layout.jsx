import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, Plus, MessageCircle, User, MapPin, ShoppingCart, LogIn, LogOut, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import { useTheme } from '../context/ThemeContext';
import '../styles/Layout.css';

export default function Layout({ onSellClick, onCartClick }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { getCartItemCount } = useCart();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const isLanding = location.pathname === '/';

    if (isLanding) return <Outlet />;

    const handleSellClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            onSellClick();
        }
    };

    return (
        <div className="layout-wrapper">
            {/* Premium Glassmorphism Header */}
            <header className="header-glass">
                <div className="container header-container">
                    <div className="logo-section">
                        <div className="logo-icon">
                            <span className="logo-symbol">F</span>
                        </div>
                        <div className="brand-info">
                            <h1 className="brand-title">FindHub</h1>
                            <p className="brand-subtitle">Campus Marketplace</p>
                        </div>
                    </div>

                    <div className="header-actions">
                        {/* Desktop Nav Items */}
                        <div className="desktop-nav">
                            <NavLink to="/feed" className="nav-link">Home</NavLink>
                        </div>

                        <div className="campus-badge">
                            <MapPin size={14} />
                            <span className="campus-text">{user?.campus || 'Campus'}</span>
                        </div>

                        <div className="desktop-nav">
                            <button onClick={toggleTheme} className="icon-btn-desktop theme-toggle" title={theme === 'dark' ? "Light Mode" : "Dark Mode"}>
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button onClick={onCartClick} className="icon-btn-desktop">
                                <div className="cart-badge-wrapper">
                                    <ShoppingCart size={22} />
                                    {getCartItemCount() > 0 && (
                                        <span className="cart-count-badge-desktop">
                                            {getCartItemCount()}
                                        </span>
                                    )}
                                </div>
                            </button>

                            <button onClick={handleSellClick} className="btn-primary sell-btn-desktop">
                                + Sell
                            </button>

                            {user ? (
                                <div className="user-profile-menu">
                                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                                    <button onClick={logout} className="logout-btn" title="Logout">
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => navigate('/login')} className="btn-secondary login-btn-desktop">
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="container main-content">
                <Outlet />
            </main>

            {/* Modern Floating Mobile Navigation */}
            <nav className="mobile-nav">
                <NavLink to="/feed" className="mobile-nav-item">
                    {({ isActive }) => (
                        <>
                            <Home size={24} strokeWidth={isActive ? 2.5 : 2} className="mobile-nav-icon" />
                            <span>Home</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/categories" className="mobile-nav-item">
                    {({ isActive }) => (
                        <>
                            <Grid size={24} strokeWidth={isActive ? 2.5 : 2} className="mobile-nav-icon" />
                            <span>Browse</span>
                        </>
                    )}
                </NavLink>

                <div className="mobile-nav-item" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun size={24} className="mobile-nav-icon" /> : <Moon size={24} className="mobile-nav-icon" />}
                    <span>Theme</span>
                </div>

                <button onClick={handleSellClick} className="sell-fab">
                    <Plus size={32} />
                </button>

                <div className="mobile-nav-item" onClick={onCartClick}>
                    <div className="cart-badge-container">
                        <ShoppingCart size={24} strokeWidth={2} className="mobile-nav-icon" />
                        {getCartItemCount() > 0 && (
                            <span className="cart-count-badge">
                                {getCartItemCount()}
                            </span>
                        )}
                    </div>
                    <span>Cart</span>
                </div>

                <NavLink to="/profile" className="mobile-nav-item">
                    {({ isActive }) => (
                        <>
                            <User size={24} strokeWidth={isActive ? 2.5 : 2} className="mobile-nav-icon" />
                            <span>Profile</span>
                        </>
                    )}
                </NavLink>
            </nav>
        </div>
    );
}
