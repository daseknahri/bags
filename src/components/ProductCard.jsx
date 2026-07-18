import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { api } from '../api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { t } = useTranslation();
    const { addItem } = useCart();
    const [addedToast, setAddedToast] = useState(false);
    const material = product.specs?.Material || product.specs?.Category;

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItem(product);
        setAddedToast(true);
        setTimeout(() => setAddedToast(false), 1800);
    };

    return (
        <article className={`product-card animate-fade-in ${product.promotion ? 'is-promo' : ''}`}>
            <Link to={`/product/${product.id}`} className="card-image-link" aria-label={`View ${product.title}`}>
                <div className="image-container">
                    {product.promotion && <div className="promo-badge">{t('product.sale')}</div>}
                    <img
                        src={api.resolveMediaUrl(product.images?.[0]) || '/placeholder.png'}
                        alt={product.title}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600?text=Bag'; }}
                    />
                </div>
            </Link>

            <div className="card-content">
                <div className="card-kicker">{product.specs?.Category}</div>
                <h3 className="card-title">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <p className="card-desc">{material}</p>

                <div className="card-footer">
                    <div className="price-container">
                        {product.promotion ? (
                            <>
                                <span className="old-price">{product.price}</span>
                                <span className="card-price">{product.discountPrice}</span>
                            </>
                        ) : (
                            <span className="card-price">{product.price}</span>
                        )}
                    </div>
                    <div className="card-actions">
                        <Link className="icon-btn details-btn" to={`/product/${product.id}`} aria-label="View details" title="View details">
                            <ArrowUpRight size={18} />
                        </Link>
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
        </article>
    );
};

export default ProductCard;
