import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import { api } from '../api';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Catalog.css';

const Catalog = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: 'All',
        brand: 'All',
        priceSort: 'default'
    });

    const [categories, setCategories] = useState(['All']);
    const [brands, setBrands] = useState(['All']);

    useEffect(() => {
        api.getProducts().then(productsData => {
            setProducts(productsData);

            const uniqueCats = new Set(['All']);
            const uniqueBrands = new Set(['All']);

            productsData.forEach(p => {
                if (p.specs?.Category) uniqueCats.add(p.specs.Category);
                if (p.specs?.Brand) uniqueBrands.add(p.specs.Brand);
            });

            setCategories(Array.from(uniqueCats));
            setBrands(Array.from(uniqueBrands));
        });
    }, []);

    // Filter Logic
    let filteredProducts = products.filter(p => {
        const matchCategory = filters.category === 'All' || p.specs?.Category === filters.category;
        const matchBrand = filters.brand === 'All' || p.specs?.Brand === filters.brand;
        return matchCategory && matchBrand;
    });

    // Sort Logic (naive parsing of "10,000 DHs" string)
    if (filters.priceSort === 'lowToHigh') {
        filteredProducts.sort((a, b) => {
            const pA = parseInt((a.discountPrice || a.price).replace(/[^\d]/g, '')) || 0;
            const pB = parseInt((b.discountPrice || b.price).replace(/[^\d]/g, '')) || 0;
            return pA - pB;
        });
    } else if (filters.priceSort === 'highToLow') {
        filteredProducts.sort((a, b) => {
            const pA = parseInt((a.discountPrice || a.price).replace(/[^\d]/g, '')) || 0;
            const pB = parseInt((b.discountPrice || b.price).replace(/[^\d]/g, '')) || 0;
            return pB - pA;
        });
    }

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    return (
        <div className="catalog-page container animate-fade-in">
            <Helmet>
                <title>Catalog | PC Paradise</title>
                <meta name="description" content="Browse our complete catalog of premium laptops, phones, and accessories." />
            </Helmet>

            <div className="catalog-header">
                <h1>{t('catalog.fullCatalog')}</h1>
                <p>{t('catalog.explore')}</p>
            </div>

            <div className="catalog-layout">
                <aside className="catalog-sidebar glass-panel">
                    <div className="sidebar-header">
                        <Filter size={20} className="accent" />
                        <h2>{t('catalog.filters')}</h2>
                    </div>

                    <div className="filter-group">
                        <h3>{t('catalog.category')}</h3>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="filter-select"
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>{t('catalog.brand')}</h3>
                        <select
                            value={filters.brand}
                            onChange={(e) => handleFilterChange('brand', e.target.value)}
                            className="filter-select"
                        >
                            {brands.map(b => <option key={b} value={b}>{b === 'All' ? t('catalog.all') : b}</option>)}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>{t('catalog.sortPrice')}</h3>
                        <select
                            value={filters.priceSort}
                            onChange={(e) => handleFilterChange('priceSort', e.target.value)}
                            className="filter-select"
                        >
                            <option value="default">{t('catalog.sortDefault')}</option>
                            <option value="lowToHigh">{t('catalog.sortLowHigh')}</option>
                            <option value="highToLow">{t('catalog.sortHighLow')}</option>
                        </select>
                    </div>
                </aside>

                <main className="catalog-main">
                    <div className="results-count">
                        {t('catalog.showing', { count: filteredProducts.length })}
                    </div>

                    <div className="catalog-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="no-results glass-panel">
                            <h2>{t('catalog.noProducts')}</h2>
                            <p>{t('catalog.adjustFilters')}</p>
                            <button
                                className="btn-secondary mt-4"
                                onClick={() => setFilters({ category: 'All', brand: 'All', priceSort: 'default' })}
                            >
                                {t('catalog.resetFilters')}
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Catalog;
