import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';
import { useCart } from '../context/useCart';
import '../styles/CartModal.css';

export default function CartModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, getCartTotal } = useCart();

    if (!isOpen) return null;

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="cart-modal">
                <button onClick={onClose} className="modal-close-btn">
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <ShoppingCart size={28} color="var(--primary)" />
                    <h2 className="modal-title">Shopping Cart</h2>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <ShoppingCart size={48} className="empty-cart-icon" />
                        <p>Your cart is empty</p>
                        <p className="empty-cart-text">
                            Add some items to get started
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items-container">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="cart-item-image" />
                                    ) : (
                                        <div className="cart-item-image">
                                            <ShoppingCart size={24} color="#9CA3AF" />
                                        </div>
                                    )}
                                    
                                    <div className="cart-item-info">
                                        <h4 className="cart-item-title">{item.title}</h4>
                                        <p className="cart-item-price">₹{new Intl.NumberFormat('en-IN').format(item.price)}</p>
                                    </div>

                                    <div className="cart-item-actions">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="qty-btn"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="cart-item-quantity">
                                            {item.quantity}
                                        </span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="qty-btn"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Total</span>
                                <span>₹{new Intl.NumberFormat('en-IN').format(getCartTotal())}</span>
                            </div>

                            <button onClick={handleCheckout} className="checkout-btn">
                                <CreditCard size={20} />
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
