import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ArrowLeft, Heart, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight, X, ZoomIn, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [addedToast, setAddedToast] = useState(false);
    const { addItem } = useCart();

    useEffect(() => {
        api.getProduct(id).then(foundProduct => {
            if (foundProduct) {
                setProduct(foundProduct);
                setMainImage(foundProduct.images[0] || '');
            }
        });
    }, [id]);

    const images = product?.images?.filter(Boolean) || [];

    const openLightbox = (idx) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const prevImage = useCallback(() => {
        setLightboxIndex(i => (i - 1 + images.length) % images.length);
    }, [images.length]);

    const nextImage = useCallback(() => {
        setLightboxIndex(i => (i + 1) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxOpen) return;
        const handler = (e) => {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxOpen, prevImage, nextImage]);

    if (!product) return (
        <div className="loading-state container">
            <div className="loading-spinner" />
            Loading product…
        </div>
    );

    return (
        <div className="product-detail-page container animate-fade-in">
            <Helmet>
                <title>{product.title} | PC Paradise</title>
                <meta name="description" content={product.description?.substring(0, 160)} />
                <meta property="og:title" content={product.title} />
                <meta property="og:image" content={mainImage} />
            </Helmet>

            <Link to="/catalog" className="back-link">
                <ArrowLeft size={16} /> {t('product.backToCatalog')}
            </Link>

            <div className="product-detail-grid">
                {/* ─── Gallery ─── */}
                <div className="product-gallery">
                    <div className="main-image-container glass-panel" onClick={() => openLightbox(images.indexOf(mainImage))}>
                        {product.promotion && (
                            <div className="detail-promo-badge">{t('product.promo')}</div>
                        )}
                        <img
                            src={mainImage}
                            alt={product.title}
                            onError={e => { e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                        />
                        <div className="zoom-hint"><ZoomIn size={18} /> {t('product.clickToZoom')}</div>
                    </div>

                    {images.length > 1 && (
                        <div className="thumbnail-list">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`thumbnail-btn glass-panel ${mainImage === img ? 'active' : ''}`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`view ${idx + 1}`}
                                        onError={e => { e.target.src = 'https://placehold.co/100x80?text=NA'; }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ─── Product Info ─── */}
                <div className="product-info glass-panel">
                    <div className="product-header">
                        {product.specs?.Brand && <span className="brand-badge">{product.specs.Brand}</span>}
                        {product.specs?.Category && <span className="category-badge">{product.specs.Category}</span>}
                        <h1 className="product-title">{product.title}</h1>

                        <div className="price-block">
                            {product.promotion && product.discountPrice ? (
                                <>
                                    <span className="price-original">{product.price}</span>
                                    <span className="price-discounted detail-glowing-price">{product.discountPrice}</span>
                                    <span className="promo-label">{t('product.sale')}</span>
                                </>
                            ) : (
                                <span className="price-main">{product.price}</span>
                            )}
                        </div>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="action-buttons">
                        <button className={`btn-primary main-action ${addedToast ? 'added' : ''}`} onClick={() => {
                            addItem(product);
                            setAddedToast(true);
                            setTimeout(() => setAddedToast(false), 2500);
                        }}>
                            {addedToast ? <><Check size={20} /> {t('product.added')}</> : <><ShoppingCart size={20} /> {t('product.addToCart')}</>}
                        </button>
                        <button className="icon-btn wishlist-btn" title="Add to Wishlist">
                            <Heart size={24} />
                        </button>
                    </div>

                    <div className="feature-list">
                        <div className="feature-item"><Shield size={18} className="feature-icon" /><span>1 Year Warranty</span></div>
                        <div className="feature-item"><Truck size={18} className="feature-icon" /><span>Free Delivery in Morocco</span></div>
                        <div className="feature-item"><RotateCcw size={18} className="feature-icon" /><span>30-Day Returns</span></div>
                    </div>

                    {/* Specs Table */}
                    {Object.keys(product.specs || {}).length > 0 && (
                        <div className="specs-section">
                            <h3>Specifications</h3>
                            <div className="specs-grid">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="spec-item">
                                        <span className="spec-label">{key}</span>
                                        <span className="spec-value">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Lightbox ─── */}
            {lightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}><X size={28} /></button>

                    {images.length > 1 && (
                        <button className="lightbox-nav prev" onClick={e => { e.stopPropagation(); prevImage(); }}>
                            <ChevronLeft size={36} />
                        </button>
                    )}

                    <div className="lightbox-img-wrapper" onClick={e => e.stopPropagation()}>
                        <img
                            src={images[lightboxIndex]}
                            alt={`${product.title} image ${lightboxIndex + 1}`}
                            onError={e => { e.target.src = 'https://placehold.co/800x600?text=No+Image'; }}
                        />
                    </div>

                    {images.length > 1 && (
                        <button className="lightbox-nav next" onClick={e => { e.stopPropagation(); nextImage(); }}>
                            <ChevronRight size={36} />
                        </button>
                    )}

                    <div className="lightbox-counter">{lightboxIndex + 1} / {images.length}</div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
