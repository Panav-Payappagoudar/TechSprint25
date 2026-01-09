import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ShoppingCart, Heart, Clock } from 'lucide-react';
import { useCart } from '../context/useCart';
import '../styles/ProductCard.css';

export default function ProductCard({ id, title, price, image, branch, location, postedAt, condition, description, status, style }) {
    const { addToCart, isInCart } = useCart();
    const navigate = useNavigate();

    // Format price
    const fmtPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);

    // Format relative time with short style
    const timeAgo = (dateStr) => {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - d) / 1000); // seconds
        if (diff < 60) return 'Now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
        return `${Math.floor(diff / 86400)}d`;
    };

    const handleCardClick = (e) => {
        // Prevent navigation if clicking buttons
        if (e.target.closest('button')) return;
        navigate(`/product/${id}`);
    };

    const isSold = status === 'sold';

    return (
        <div
            className={`product-card glass ${isSold ? 'sold' : ''}`}
            onClick={!isSold ? handleCardClick : undefined}
            style={style}
        >
            <div className="product-image-container">
                <div className="card-overlay">
                    {/* Hover Actions */}
                    {!isSold && (
                        <div className="overlay-actions">
                            <button className="action-btn">
                                <Heart size={18} />
                            </button>
                            <button
                                onClick={() => addToCart({ id, title, price, image, branch, location, postedAt, condition, description, status })}
                                disabled={isInCart(id)}
                                className={`action-btn ${isInCart(id) ? 'active' : ''}`}
                            >
                                <ShoppingCart size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {isSold && <div className="sold-badge-overlay">SOLD</div>}

                {image ? (
                    <img src={image} alt={title} className="product-image" loading="lazy" />
                ) : (
                    <div className="no-image-placeholder">
                        <div className="placeholder-icon">📷</div>
                    </div>
                )}

                <div className="product-badges-top">
                    <span className={`badge-condition ${condition}`}>
                        {condition?.replace('_', ' ')}
                    </span>
                </div>
            </div>

            <div className="product-details">
                <div className="product-header">
                    <h3 className="product-title">{title}</h3>
                    <div className="product-price">{fmtPrice}</div>
                </div>

                <div className="product-footer">
                    <div className="seller-info">
                        <div className="seller-avatar-small">
                            {branch.charAt(0)}
                        </div>
                        <span className="seller-branch">{branch}</span>
                    </div>

                    <div className="post-meta">
                        <span className="meta-item">
                            <Clock size={12} /> {timeAgo(postedAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
