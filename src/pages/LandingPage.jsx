import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, ShoppingCart, Star } from 'lucide-react';
import '../styles/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate login
        navigate('/feed');
    };

    const features = [
        { 
            icon: <Shield size={24} />, 
            title: 'Secure Platform', 
            description: 'Trusted by thousands of students on campus'
        },
        { 
            icon: <Users size={24} />, 
            title: 'Student-Only', 
            description: 'Connect with verified campus community'
        },
        { 
            icon: <ShoppingCart size={24} />, 
            title: 'Easy Trading', 
            description: 'Buy and sell with ease'
        },
        { 
            icon: <Star size={24} />, 
            title: 'Quality Items', 
            description: 'Curated marketplace for students'
        }
    ];

    return (
        <div className="landing-page">
            {/* Background pattern */}
            <div className="landing-background-pattern" />
            
            <div className="landing-content">
                <div className="landing-hero">
                    <div className="landing-logo">
                        <span>FH</span>
                    </div>
                    <h1 className="landing-title">FindHub</h1>
                    <p className="landing-subtitle">
                        The trusted campus marketplace for students to buy, sell, and trade.
                    </p>
                </div>
                <button
                    onClick={handleLogin}
                    className="landing-button"
                >
                    Get Started
                </button>

                <div className="landing-footer">
                    Join thousands of students who trust FindHub for their campus needs
                </div>

                {/* Features Section */}
                <div className="landing-features">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
