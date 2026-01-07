import React, { useState, useEffect } from 'react';
import { X, MapPin, Camera, DollarSign, AlertCircle, Upload } from 'lucide-react';
import { useProducts } from '../context/useProducts';
import { useAuth } from '../context/useAuth';
import '../styles/SellModal.css';

export default function SellModal({ onClose }) {
    const { addProduct, categories, error: contextError } = useProducts();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: 'Electronics',
        condition: 'used',
        location: 'Hostel Block A',
        image: null,
        phone: '',
        email: ''
    });

    useEffect(() => {
        if (user?.email) {
            setFormData(prev => ({ ...prev, email: user.email }));
        }
    }, [user]);

    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const locations = [
        "Hostel Block A", "Hostel Block B", "Hostel Block C", "Hostel Block D",
        "Academic Block 1", "Academic Block 2", "Library",
        "Cafeteria", "Sports Complex", "Student Center"
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, image: null });
        setPreviewUrl(null);
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setSubmitError('Title is required');
            return false;
        }
        
        if (formData.title.length < 3) {
            setSubmitError('Title must be at least 3 characters');
            return false;
        }
        
        if (!formData.price || Number(formData.price) <= 0) {
            setSubmitError('Valid price is required');
            return false;
        }
        
        if (formData.price > 999999) {
            setSubmitError('Price seems too high');
            return false;
        }
        
        if (!formData.description.trim()) {
            setSubmitError('Description is required');
            return false;
        }
        
        if (formData.description.length < 10) {
            setSubmitError('Description must be at least 10 characters');
            return false;
        }

        if (!formData.phone.trim() && !formData.email.trim()) {
            setSubmitError('Either Phone Number or Email is required');
            return false;
        }
        
        setSubmitError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const imageUrl = previewUrl || "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

            await addProduct({
                title: formData.title,
                price: Number(formData.price),
                location: formData.location,
                category: formData.category,
                condition: formData.condition,
                image: imageUrl,
                description: formData.description,
                phone: formData.phone,
                email: formData.email
            });
            
            setFormData({
                title: '',
                price: '',
                description: '',
                category: 'Electronics',
                condition: 'used',
                location: 'Hostel Block A',
                image: null,
                phone: '',
                email: ''
            });
            setPreviewUrl(null);
            
            onClose();
        } catch (err) {
            setSubmitError('Failed to add product. Please try again.');
            console.error('Error adding product:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="sell-modal-overlay animate-fade-in">
            <div className="sell-modal">
                <div className="sell-modal-header">
                    <h2 className="sell-modal-title">Sell an Item</h2>
                    <button onClick={onClose} className="sell-modal-close">
                        <X size={24} />
                    </button>
                </div>

                <div className="sell-modal-body">
                    {(submitError || contextError) && (
                        <div className="error-message">
                            <AlertCircle size={20} />
                            <span>{submitError || contextError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="sell-form-grid">
                        <div className="sell-input-group">
                            <label className="sell-label">Product Title</label>
                            <input
                                type="text"
                                className="sell-input"
                                placeholder="What are you selling?"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="sell-form-row">
                            <div className="sell-input-group">
                                <label className="sell-label">Price (₹)</label>
                                <input
                                    type="number"
                                    className="sell-input"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div className="sell-input-group">
                                <label className="sell-label">Category</label>
                                <select
                                    className="sell-select"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sell-form-row">
                            <div className="sell-input-group">
                                <label className="sell-label">Condition</label>
                                <select
                                    className="sell-select"
                                    value={formData.condition}
                                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                >
                                    <option value="new">New / Like New</option>
                                    <option value="good">Good Condition</option>
                                    <option value="fair">Fair / Used</option>
                                </select>
                            </div>

                            <div className="sell-input-group">
                                <label className="sell-label">Location</label>
                                <select
                                    className="sell-select"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                >
                                    {locations.map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="sell-form-row">
                            <div className="sell-input-group">
                                <label className="sell-label">Phone Number</label>
                                <input
                                    type="tel"
                                    className="sell-input"
                                    placeholder="Your phone number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="sell-input-group">
                                <label className="sell-label">Email Address</label>
                                <input
                                    type="email"
                                    className="sell-input"
                                    placeholder="Your email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="sell-input-group">
                            <label className="sell-label">Description</label>
                            <textarea
                                className="sell-textarea"
                                rows="4"
                                placeholder="Describe your item..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="sell-input-group">
                            <label className="sell-label">Photos</label>
                            {previewUrl ? (
                                <div className="image-preview-wrapper">
                                    <img src={previewUrl} alt="Preview" className="image-preview" />
                                    <button 
                                        type="button" 
                                        onClick={removeImage}
                                        className="remove-image-btn"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            ) : (
                                <label className="image-upload-area">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden-input"
                                        onChange={handleImageChange}
                                    />
                                    <Camera size={32} color="var(--primary)" className="upload-icon" />
                                    <p className="upload-hint">Click to upload photo</p>
                                </label>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="sell-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Posting...' : 'Post Item'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
