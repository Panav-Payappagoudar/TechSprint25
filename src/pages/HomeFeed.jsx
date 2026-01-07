import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useProducts } from '../context/useProducts';
import ProductCard from '../components/ProductCard';
import '../styles/HomeFeed.css';

export default function HomeFeed() {
    const { products, categories, loading, error, clearError } = useProducts();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const isActive = p.status !== 'sold'; // Only show active products
        return matchesCategory && matchesSearch && isActive;
    });

    if (loading) {
        return (
            <div className="loading-container">
                <div>Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <AlertCircle size={24} className="error-icon" />
                <h3>Error Loading Products</h3>
                <p>{error}</p>
                <button 
                    onClick={clearError}
                    className="retry-button"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            {/* Search Header */}
            <div className="feed-header">
                <h2 className="feed-title">
                    Find what you need <br />
                    <span>on campus.</span>
                </h2>

                <div className="search-container">
                    <input
                        type="text"
                        className="input-field search-input"
                        placeholder="Search cycles, books, electronics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={20} className="search-icon" />
                </div>

                {/* Categories Carousel */}
                <div className="categories-container">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`category-button ${activeCategory === cat ? 'active' : 'inactive'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="section-header">
                <h3 className="section-title">Fresh Finds ({filteredProducts.length})</h3>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon-container">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="empty-state-icon">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>
                    <h3 className="empty-title">
                        No items found
                    </h3>
                    <p className="empty-description">
                        {searchQuery 
                            ? `No items match "${searchQuery}" in ${activeCategory}.`
                            : `No items available in ${activeCategory}.`
                        }
                    </p>
                    <button 
                        onClick={() => {
                            setSearchQuery('');
                            setActiveCategory('All');
                        }}
                        className="view-all-button"
                    >
                        View All Items
                    </button>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} id={product.id} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
}
