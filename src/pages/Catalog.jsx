import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import { api } from '../api';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Catalog.css';

const getPriceValue = (product) => {
    const value = product.discountPrice || product.price || '';
    return parseFloat(value.replace(/[^\d.]/g, '')) || 0;
};

const Catalog = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: 'All',
        brand: 'All',
        priceSort: 'default'
    });

    useEffect(() => {
        api.getProducts().then(setProducts).catch((err) => {
            console.error('Error fetching catalog:', err);
        });
    }, []);

    const categories = useMemo(() => {
        const values = new Set(['All']);
        products.forEach((product) => {
            if (product.specs?.Category) values.add(product.specs.Category);
        });
        return Array.from(values);
    }, [products]);

    const brands = useMemo(() => {
        const values = new Set(['All']);
        products.forEach((product) => {
            if (product.specs?.Brand) values.add(product.specs.Brand);
        });
        return Array.from(values);
    }, [products]);

    const filteredProducts = useMemo(() => {
        const next = products.filter((product) => {
            const matchCategory = filters.category === 'All' || product.specs?.Category === filters.category;
            const matchBrand = filters.brand === 'All' || product.specs?.Brand === filters.brand;
            return matchCategory && matchBrand;
        });

        if (filters.priceSort === 'lowToHigh') {
            return [...next].sort((a, b) => getPriceValue(a) - getPriceValue(b));
        }

        if (filters.priceSort === 'highToLow') {
            return [...next].sort((a, b) => getPriceValue(b) - getPriceValue(a));
        }

        return next;
    }, [filters, products]);

    const handleFilterChange = (type, value) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };

    return (
        <div className="catalog-page container animate-fade-in">
            <Helmet>
                <title>Shop Bags | Kago Bags</title>
                <meta name="description" content="Browse Kago Bags totes, crossbody bags, backpacks, clutches, and accessories." />
            </Helmet>

            <div className="catalog-header">
                <p className="catalog-kicker">Kago Bags collection</p>
                <h1>{t('catalog.fullCatalog')}</h1>
                <p>{t('catalog.explore')}</p>
            </div>

            <div className="catalog-layout">
                <aside className="catalog-sidebar">
                    <div className="sidebar-header">
                        <Filter size={20} />
                        <h2>{t('catalog.filters')}</h2>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="category-filter">{t('catalog.category')}</label>
                        <select
                            id="category-filter"
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="filter-select"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>{category === 'All' ? t('catalog.all') : category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="brand-filter">{t('catalog.brand')}</label>
                        <select
                            id="brand-filter"
                            value={filters.brand}
                            onChange={(e) => handleFilterChange('brand', e.target.value)}
                            className="filter-select"
                        >
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>{brand === 'All' ? t('catalog.all') : brand}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-filter">{t('catalog.sortPrice')}</label>
                        <select
                            id="sort-filter"
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
                    <div className="results-count">{t('catalog.showing', { count: filteredProducts.length })}</div>

                    <div className="catalog-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="no-results">
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
