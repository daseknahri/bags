import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { api } from '../api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { t } = useTranslation();
    const { addItem } = useCart();
    const [addedToast, setAddedToast] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent accidental navigation if nested in Link
        addItem(product);
        setAddedToast(true);
        setTimeout(() => setAddedToast(false), 2000);
    };

    return (
        <div className={`product-card glass-panel animate-fade-in ${product.promotion ? 'is-promo' : ''}`}>
            <Link to={`/product/${product.id}`} className="card-image-link">
                <div className="image-container">
                    {product.promotion && (
                        <div className="promo-badge">{t('product.sale')}</div>
                    )}
                    <img
                        src={api.resolveMediaUrl(product.images?.[0]) || '/placeholder.png'}
                        alt={product.title}
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                    />
                </div>
            </Link>

            <div className="card-content">
                <h3 className="card-title">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>

                <div className="card-specs">
                    {product.specs?.CPU && (
                        <div className="spec-badge cpu">{product.specs.CPU}</div>
                    )}
                    {product.specs?.Brand && (
                        <div className="spec-badge brand">{product.specs.Brand}</div>
                    )}
                </div>

                <p className="card-desc">
                    {product.description?.substring(0, 60)}
                    {product.description?.length > 60 ? '...' : ''}
                </p>

                <div className="card-footer">
                    <div className="price-container">
                        {product.promotion ? (
                            <>
                                <span className="old-price">{product.price}</span>
                                <span className="card-price glowing-price">{product.discountPrice}</span>
                            </>
                        ) : (
                            <div className="card-price">{product.price}</div>
                        )}
                    </div>
                    <button
                        className={`icon-btn order-btn ${addedToast ? 'added' : ''}`}
                        aria-label={t('product.addToCart')}
                        onClick={handleAddToCart}
                        title={t('product.addToCart')}
                    >
                        {addedToast ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
