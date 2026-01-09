import React, { useState } from 'react';
import { Search, AlertCircle, Filter, Sparkles } from 'lucide-react';
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
                <div className="loading-spinner"></div>
                <p>Curating the best finds...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container glass">
                <AlertCircle size={48} className="error-icon" />
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button onClick={clearError} className="btn-primary retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="home-feed animate-fade-in">
            {/* Premium Header Section */}
            <header className="feed-header-section">
                <div className="feed-header-content">
                    <h1 className="feed-title">
                        Discover & Trade <br />
                        <span className="text-gradient">Campus Treasures</span>
                    </h1>

                    <div className="search-wrapper glass">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            className="search-input-transparent"
                            placeholder="What are you looking for today?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="clear-search" onClick={() => setSearchQuery('')}>
                                ×
                            </button>
                        )}
                    </div>

                    <div className="categories-wrapper">
                        <div className="categories-scroll">
                            <button
                                onClick={() => setActiveCategory('All')}
                                className={`category-pill ${activeCategory === 'All' ? 'active' : ''}`}
                            >
                                <Sparkles size={14} /> All Items
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Results Section */}
            <div className="feed-content container">
                <div className="results-header">
                    <h2 className="section-title">
                        {activeCategory === 'All' ? 'Fresh Finds' : `${activeCategory}`}
                        <span className="count-badge">{filteredProducts.length}</span>
                    </h2>
                    <button className="filter-btn">
                        <Filter size={16} /> Sort & Filter
                    </button>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="empty-state glass">
                        <div className="empty-icon-wrapper">
                            <Search size={40} />
                        </div>
                        <h3>No items found</h3>
                        <p>
                            We couldn't find any matches for "{searchQuery}" in {activeCategory}.
                            <br />Try adjusting your search or category.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('All');
                            }}
                            className="btn-primary view-all-btn"
                        >
                            View All Items
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                {...product}
                                style={{ animationDelay: `${index * 50}ms` }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
