import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/useCart';
import '../styles/ProductCard.css';

export default function ProductCard({ id, title, price, image, branch, location, postedAt, condition, description, status }) {
    const { addToCart, isInCart } = useCart();
    const navigate = useNavigate();
    // Format price
    const fmtPrice = new Intl.NumberFormat('en-IN').format(price);

    // Format relative time (e.g., "2h ago")
    const timeAgo = (dateStr) => {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - d) / 1000); // seconds
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    // Condition badge styling
    const getConditionClass = (condition) => {
        const classes = {
            'new': 'badge-new',
            'like_new': 'badge-like_new',
            'good': 'badge-good',
            'fair': 'badge-fair',
            'used': 'badge-used',
        };
        return classes[condition] || classes['used'];
    };

    const conditionClass = getConditionClass(condition);

    // Status styling
    const isSold = status === 'sold';

    const handleCardClick = (e) => {
        // Prevent navigation if clicking buttons
        if (e.target.closest('button')) return;
        navigate(`/product/${id}`);
    };

    return (
        <div 
            className={`product-card ${isSold ? 'sold' : 'active'}`}
            onClick={!isSold ? handleCardClick : undefined}
        >
            <div className="product-image-container">
                {isSold && (
                    <div className="sold-overlay">
                        SOLD
                    </div>
                )}
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="product-image"
                    />
                ) : (
                    <div className="no-image-placeholder">
                        <div className="no-image-icon">
                            <div className="no-image-icon-bg">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d={"M21 12c0 1.2-.6 2.2-1.5 2.7L16.2 18 12 14.5 7.8 18 4.5 14.7C3.6 14.2 3 13.2 3 12"} />
                                    <path d={"M3 12c0-1.2.6-2.2 1.5-2.7L7.8 6 12 9.5l4.2-3.3L19.5 9c.9.5 1.5 1.5 1.5 2.7"} />
                                </svg>
                            </div>
                            <span>No Image</span>
                        </div>
                    </div>
                )}
                <div className="product-badges">
                    <div className="badge badge-time">
                        {timeAgo(postedAt)}
                    </div>
                    <div className={`badge ${conditionClass}`}>
                        {condition?.replace('_', ' ')}
                    </div>
                </div>
            </div>

            <div className="product-content">
                <div className="product-info">
                    <h3 className="product-title">
                        {title}
                    </h3>

                    {description && (
                        <p className="product-description">
                            {description}
                        </p>
                    )}

                    <p className="product-price">
                        ₹{fmtPrice}
                    </p>
                </div>

                {status !== 'sold' && (
                    <button
                        onClick={() => addToCart({ id, title, price, image, branch, location, postedAt, condition, description, status })}
                        disabled={isInCart(id)}
                        className={`cart-button ${isInCart(id) ? 'added' : 'add'}`}
                    >
                        <ShoppingCart size={16} />
                    </button>
                )}
                <div className="product-meta">
                    <div className="meta-item">
                        <User size={14} />
                        <span className="meta-text">
                            {branch}
                        </span>
                    </div>
                    <div className="meta-item">
                        <MapPin size={12} />
                        <span>{location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
