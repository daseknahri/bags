import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import { api } from '../api';
import './Home.css';

const Home = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [seo, setSeo] = useState({ title: 'PC Paradise', description: 'Premium Tech catalog' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, settingsData] = await Promise.all([
                    api.getProducts(),
                    api.getSettings()
                ]);

                // Sort products: promos first, then by date (assuming newer first if we had dates, else keep order)
                const sortedProducts = productsData.sort((a, b) => {
                    if (a.promotion && !b.promotion) return -1;
                    if (!a.promotion && b.promotion) return 1;
                    return 0;
                });

                setProducts(sortedProducts);
                if (settingsData?.seo) {
                    setSeo(settingsData.seo);
                }

                const brands = new Set();
                productsData.forEach(p => {
                    if (p.specs?.Brand) brands.add(p.specs.Brand);
                });
                setCategories(['All', ...Array.from(brands)]);
            } catch (err) {
                console.error("Error fetching home data:", err);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.specs?.Brand === activeCategory);

    return (
        <div className="home-page">
            <Helmet>
                <title>{seo.defaultTitle || seo.title}</title>
                <meta name="description" content={seo.defaultDescription || seo.description} />
            </Helmet>

            <section className="hero">
                <div className="hero-content container animate-fade-in">
                    <h1>{t('hero.welcome')} <span className="accent">PC Paradise</span></h1>
                    <p>{t('hero.subtitle')}</p>
                    <div className="hero-actions">
                        <Link to="/catalog">
                            <button className="btn-primary">{t('hero.shopNow')}</button>
                        </Link>
                        <Link to="/promotions">
                            <button className="btn-secondary">{t('hero.viewPromos')}</button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="catalog container">
                <div className="section-header">
                    <h2>{t('catalog.featured')}</h2>
                    <div className="category-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="loading-state">Loading products...</div>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
