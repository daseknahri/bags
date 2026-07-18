import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import { api } from '../api';
import './Home.css';

const Home = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [seo, setSeo] = useState({
        defaultTitle: 'PuaFeli Bags | Premium Handbags in Morocco',
        defaultDescription: 'Shop elegant bags and accessories in Morocco.'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, settingsData] = await Promise.all([
                    api.getProducts(),
                    api.getSettings()
                ]);
                setProducts(productsData);
                if (settingsData?.seo) setSeo(settingsData.seo);
            } catch (err) {
                console.error('Error fetching home data:', err);
            }
        };

        fetchData();
    }, []);

    const categories = useMemo(() => {
        const values = new Set(['All']);
        products.forEach((product) => {
            if (product.specs?.Category) values.add(product.specs.Category);
        });
        return Array.from(values);
    }, [products]);

    const visibleProducts = activeCategory === 'All'
        ? products.slice(0, 6)
        : products.filter((product) => product.specs?.Category === activeCategory).slice(0, 6);

    return (
        <div className="home-page">
            <Helmet>
                <title>{seo.defaultTitle}</title>
                <meta name="description" content={seo.defaultDescription} />
            </Helmet>

            <section className="hero">
                <div className="hero-media" aria-hidden="true">
                    <img src="/assets/bags/canvas-tote-set.png" alt="" />
                </div>
                <div className="hero-copy animate-fade-in">
                    <p className="hero-kicker">New collection</p>
                    <h1>{t('hero.welcome')}</h1>
                    <p className="hero-subtitle">{t('hero.subtitle')}</p>
                    <div className="hero-actions">
                        <Link to="/catalog" className="btn-primary">
                            {t('hero.shopNow')} <ArrowRight size={18} />
                        </Link>
                        <Link to="/promotions" className="btn-secondary">{t('hero.viewPromos')}</Link>
                    </div>
                </div>
            </section>

            <section className="assurance-band">
                <div className="container assurance-grid">
                    <div><Sparkles size={20} /><span>Curated finishes</span></div>
                    <div><Truck size={20} /><span>Delivery across Morocco</span></div>
                    <div><ShieldCheck size={20} /><span>Warranty on every piece</span></div>
                </div>
            </section>

            <section className="catalog-section container">
                <div className="section-header">
                    <p className="section-kicker">Shop by silhouette</p>
                    <h2>{t('catalog.featured')}</h2>
                    <div className="category-filters" aria-label="Filter featured products">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category === 'All' ? t('catalog.all') : category}
                            </button>
                        ))}
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="loading-state">Loading collection...</div>
                ) : (
                    <div className="product-grid">
                        {visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            <section className="story-strip">
                <div className="container story-grid">
                    <div>
                        <p className="section-kicker">Material first</p>
                        <h2>Quiet pieces that carry the whole day.</h2>
                    </div>
                    <p>
                        PuaFeli focuses on shape, texture, and practical details: easy closures, polished hardware,
                        comfortable straps, and colors that move cleanly between work, travel, and evening plans.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
