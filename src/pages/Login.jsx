import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import '../styles/Login.css';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await login();
            navigate('/feed');
        } catch (error) {
            const msg = (error && error.message) ? error.message : 'Login failed. Please try again.';
            setErrorMsg(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card animate-fade-in">
                <div className="login-header">
                    <div className="login-logo">
                        <span className="logo-symbol">F</span>
                    </div>
                    <h1>Welcome to FindHub</h1>
                    <p>The exclusive marketplace for our campus community</p>
                </div>

                <div className="login-content">
                    {errorMsg && (
                        <div className="login-error-banner">
                            {errorMsg}
                        </div>
                    )}
                    <button 
                        className={`google-login-btn ${isLoading ? 'loading' : ''}`}
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            alt="Google G" 
                            className="google-icon"
                        />
                        <span>
                            {isLoading ? 'Signing in...' : 'Sign in with Google'}
                        </span>
                    </button>
                    
                    <p className="login-note">
                        Please sign in with your university email address to access the marketplace.
                    </p>
                </div>
                
                <div className="login-footer">
                    <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </div>
        </div>
    );
}
