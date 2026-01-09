import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, ShoppingCart, Star, ArrowRight } from 'lucide-react';
import '../styles/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const features = [
        {
            icon: <Shield size={32} />,
            title: 'Secure Campus Trading',
            description: 'Verified student identities ensure every transaction is safe and trusted.'
        },
        {
            icon: <Users size={32} />,
            title: 'Exclusive Community',
            description: 'Connect directly with peers from your university. No outsiders.'
        },
        {
            icon: <ShoppingCart size={32} />,
            title: 'Easy Buying & Selling',
            description: 'List items in seconds and find amazing deals right on campus.'
        },
        {
            icon: <Star size={32} />,
            title: 'Curated Quality',
            description: 'High-quality pre-loved items, books, and gear found nearby.'
        }
    ];

    return (
        <div className="landing-page">
            <div className="landing-background-pattern" />
            <div className="landing-overlay" />

            <nav className="landing-nav glass">
                <div className="nav-logo">
                    <span className="logo-symbol">FH</span>
                    <span className="logo-text">FindHub</span>
                </div>
                <button onClick={handleLogin} className="btn-secondary nav-login-btn">
                    Sign In
                </button>
            </nav>

            <main className="landing-content">
                <section className="landing-hero animate-fade-in">
                    <div className="hero-text">
                        <div className="hero-badge animate-scale-in">
                            <span>🚀 Exclusive for Students</span>
                        </div>
                        <h1 className="landing-title">
                            The Campus <br className="mobile-break" />
                            <span className="text-gradient">Marketplace</span>
                        </h1>
                        <p className="landing-subtitle">
                            Buy, sell, and trade with confidence. The trusted platform for your university community.
                        </p>

                        <div className="hero-actions">
                            <button onClick={handleLogin} className="btn-primary hero-btn">
                                Start Exploring <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="hero-visual animate-slide-up">
                        <div className="visual-card glass">
                            <div className="visual-header">
                                <div className="dot red"></div>
                                <div className="dot yellow"></div>
                                <div className="dot green"></div>
                            </div>
                            <div className="visual-content">
                                <div className="mock-item">
                                    <div className="mock-img"></div>
                                    <div className="mock-lines">
                                        <span className="line long"></span>
                                        <span className="line short"></span>
                                    </div>
                                    <div className="mock-btn"></div>
                                </div>
                                <div className="floating-badge badge-1 glass">
                                    <span>📚 Textbooks</span>
                                </div>
                                <div className="floating-badge badge-2 glass">
                                    <span>🚲 Cycles</span>
                                </div>
                                <div className="floating-badge badge-3 glass">
                                    <span>💻 Gadgets</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="landing-features">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card glass"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </section>
            </main>

            <footer className="landing-footer">
                <p>© {new Date().getFullYear()} FindHub. Built for Students.</p>
            </footer>
        </div>
    );
}
