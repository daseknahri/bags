import React, { useCallback, useEffect, useState } from 'react';
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
        api.getProduct(id).then((foundProduct) => {
            if (foundProduct) {
                setProduct(foundProduct);
                setMainImage(foundProduct.images?.[0] || '');
            }
        });
    }, [id]);

    const images = product?.images?.filter(Boolean) || [];

    const openLightbox = (idx) => {
        setLightboxIndex(Math.max(0, idx));
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const prevImage = useCallback(() => {
        setLightboxIndex((i) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    const nextImage = useCallback(() => {
        setLightboxIndex((i) => (i + 1) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (!lightboxOpen) return undefined;
        const handler = (event) => {
            if (event.key === 'ArrowLeft') prevImage();
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxOpen, nextImage, prevImage]);

    if (!product) {
        return (
            <div className="loading-state container">
                <div className="loading-spinner" />
                {t('product.loading')}
            </div>
        );
    }

    const handleAdd = () => {
        addItem(product);
        setAddedToast(true);
        setTimeout(() => setAddedToast(false), 2200);
    };

    return (
        <div className="product-detail-page container animate-fade-in">
            <Helmet>
                <title>{product.title} | Kago Bags</title>
                <meta name="description" content={product.description?.substring(0, 160)} />
                <meta property="og:title" content={product.title} />
                <meta property="og:image" content={api.resolveMediaUrl(mainImage)} />
            </Helmet>

            <Link to="/catalog" className="back-link">
                <ArrowLeft size={16} /> {t('product.backToCatalog')}
            </Link>

            <div className="product-detail-grid">
                <div className="product-gallery">
                    <button className="main-image-container" onClick={() => openLightbox(images.indexOf(mainImage))}>
                        {product.promotion && <div className="detail-promo-badge">{t('product.promo')}</div>}
                        <img
                            src={api.resolveMediaUrl(mainImage)}
                            alt={product.title}
                            onError={(event) => { event.currentTarget.src = 'https://placehold.co/700x700?text=Bag'; }}
                        />
                        <span className="zoom-hint"><ZoomIn size={18} /> {t('product.clickToZoom')}</span>
                    </button>

                    {images.length > 1 && (
                        <div className="thumbnail-list">
                            {images.map((img, idx) => (
                                <button
                                    key={img}
                                    className={`thumbnail-btn ${mainImage === img ? 'active' : ''}`}
                                    onClick={() => setMainImage(img)}
                                    aria-label={`View image ${idx + 1}`}
                                >
                                    <img
                                        src={api.resolveMediaUrl(img)}
                                        alt={`${product.title} view ${idx + 1}`}
                                        onError={(event) => { event.currentTarget.src = 'https://placehold.co/100x100?text=Bag'; }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="product-info">
                    <div className="product-header">
                        <div className="badge-row">
                            {product.specs?.Brand && <span className="brand-badge">{product.specs.Brand}</span>}
                            {product.specs?.Category && <span className="category-badge">{product.specs.Category}</span>}
                        </div>
                        <h1 className="product-title">{product.title}</h1>

                        <div className="price-block">
                            {product.promotion && product.discountPrice ? (
                                <>
                                    <span className="price-original">{product.price}</span>
                                    <span className="price-discounted">{product.discountPrice}</span>
                                    <span className="promo-label">{t('product.sale')}</span>
                                </>
                            ) : (
                                <span className="price-main">{product.price}</span>
                            )}
                        </div>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="action-buttons">
                        <button className={`btn-primary main-action ${addedToast ? 'added' : ''}`} onClick={handleAdd}>
                            {addedToast ? <><Check size={20} /> {t('product.added')}</> : <><ShoppingCart size={20} /> {t('product.addToCart')}</>}
                        </button>
                        <button className="icon-btn wishlist-btn" title={t('product.addToWishlist')} aria-label={t('product.addToWishlist')}>
                            <Heart size={22} />
                        </button>
                    </div>

                    <div className="feature-list">
                        <div className="feature-item"><Shield size={18} className="feature-icon" /><span>{t('product.qualityChecked')}</span></div>
                        <div className="feature-item"><Truck size={18} className="feature-icon" /><span>{t('product.deliveryMorocco')}</span></div>
                        <div className="feature-item"><RotateCcw size={18} className="feature-icon" /><span>{t('product.exchange7days')}</span></div>
                    </div>

                    {Object.keys(product.specs || {}).length > 0 && (
                        <div className="specs-section">
                            <h3>{t('product.details')}</h3>
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

            {lightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox} aria-label="Close image">
                        <X size={28} />
                    </button>

                    {images.length > 1 && (
                        <button className="lightbox-nav prev" onClick={(event) => { event.stopPropagation(); prevImage(); }} aria-label="Previous image">
                            <ChevronLeft size={36} />
                        </button>
                    )}

                    <div className="lightbox-img-wrapper" onClick={(event) => event.stopPropagation()}>
                        <img
                            src={api.resolveMediaUrl(images[lightboxIndex])}
                            alt={`${product.title} image ${lightboxIndex + 1}`}
                            onError={(event) => { event.currentTarget.src = 'https://placehold.co/900x900?text=Bag'; }}
                        />
                    </div>

                    {images.length > 1 && (
                        <button className="lightbox-nav next" onClick={(event) => { event.stopPropagation(); nextImage(); }} aria-label="Next image">
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
