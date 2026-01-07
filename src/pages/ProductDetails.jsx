import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Calendar, ShoppingCart, MessageCircle, Phone, Mail } from 'lucide-react';
import { useProducts } from '../context/useProducts';
import { useCart } from '../context/useCart';
import '../styles/ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products } = useProducts();
    const { addToCart, isInCart } = useCart();

    const product = products.find(p => p.id === parseInt(id) || p.id === id);

    if (!product) {
        return (
            <div className="loading-container">
                Product not found
            </div>
        );
    }

    const { title, price, image, branch, location, postedAt, condition, description, status, phone, email } = product;
    const fmtPrice = new Intl.NumberFormat('en-IN').format(price);
    const isSold = status === 'sold';

    const handleWhatsApp = () => {
        if (phone) {
            const message = `Hi, I'm interested in your listing "${title}" on FindHub. Is it still available?`;
            window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
        }
    };

    const handleEmail = () => {
        if (email) {
            const subject = `Inquiry about: ${title}`;
            const body = `Hi, I saw your listing for "${title}" on FindHub and I'm interested.`;
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    };

    const timeAgo = (dateStr) => {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - d) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    return (
        <div className="product-details-container animate-fade-in">
            <button onClick={() => navigate(-1)} className="back-button">
                <ArrowLeft size={20} />
                Back to Feed
            </button>

            <div className="product-details-grid">
                <div className="details-image-container">
                    {image ? (
                        <img src={image} alt={title} className="details-image" />
                    ) : (
                        <div className="no-image-placeholder">
                            <span>No Image Available</span>
                        </div>
                    )}
                </div>

                <div className="details-content">
                    <h1 className="details-title">{title}</h1>
                    
                    <div className="details-meta">
                        <div className="details-meta-item">
                            <User size={16} />
                            <span>{branch}</span>
                        </div>
                        <div className="details-meta-item">
                            <MapPin size={16} />
                            <span>{location}</span>
                        </div>
                        <div className="details-meta-item">
                            <Calendar size={16} />
                            <span>{timeAgo(postedAt)}</span>
                        </div>
                        <div className="details-meta-item">
                            <span className="condition-badge">
                                {condition?.replace('_', ' ')}
                            </span>
                        </div>
                    </div>

                    <div className="details-price">₹{fmtPrice}</div>

                    <div className="details-description">
                        <h3>Description</h3>
                        <p>{description}</p>
                    </div>

                    <div className="details-actions">
                        {!isSold && (
                            <button 
                                onClick={() => addToCart(product)}
                                disabled={isInCart(product.id)}
                                className={`add-cart-btn ${isInCart(id) ? 'added' : ''}`}
                            >
                                <ShoppingCart size={20} />
                                {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                        )}
                        <div className="contact-actions">
                            {phone && (
                                <button onClick={handleWhatsApp} className="contact-btn whatsapp">
                                    <MessageCircle size={20} />
                                    WhatsApp
                                </button>
                            )}
                            {email && (
                                <button onClick={handleEmail} className="contact-btn email">
                                    <Mail size={20} />
                                    Email
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
