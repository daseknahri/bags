import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { api } from '../api';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const { cart, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
    const [whatsappNumber, setWhatsappNumber] = useState('212600000000');

    useEffect(() => {
        api.getSettings().then((settings) => {
            if (settings?.socialLinks?.whatsapp) setWhatsappNumber(settings.socialLinks.whatsapp);
        }).catch(() => { });
    }, []);

    const buildWhatsAppMessage = () => {
        if (cart.length === 0) return '';
        let message = '*New PuaFeli order request*\n\n';
        cart.forEach((item, index) => {
            message += `*${index + 1}. ${item.title}*\n`;
            message += `Qty: ${item.qty} | Price: ${item.price}\n\n`;
        });
        message += `Total: ${totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} DHs\n`;
        message += 'Please confirm availability, delivery city, and payment method.';
        return encodeURIComponent(message);
    };

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`;

    return (
        <>
            {isOpen && <div className="cart-overlay" onClick={onClose} />}

            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <div className="cart-title">
                        <ShoppingBag size={22} />
                        <h2>{t('cart.title')} ({totalItems})</h2>
                    </div>
                    <button className="icon-btn" onClick={onClose} aria-label="Close cart"><X size={22} /></button>
                </div>

                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <ShoppingBag size={56} className="empty-icon" />
                        <h3>{t('cart.empty')}</h3>
                        <p>Save your favorite PuaFeli pieces here before sending the order.</p>
                        <Link to="/catalog" className="btn-primary" onClick={onClose}>
                            {t('cart.browse')}
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img
                                        src={api.resolveMediaUrl(item.image) || 'https://placehold.co/80x80?text=Bag'}
                                        alt={item.title}
                                        className="cart-item-img"
                                        onError={(event) => { event.currentTarget.src = 'https://placehold.co/80x80?text=Bag'; }}
                                    />
                                    <div className="cart-item-info">
                                        <div className="cart-item-title">{item.title}</div>
                                        <div className="cart-item-price">{item.price}</div>
                                        <div className="cart-item-controls">
                                            <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <button className="cart-remove" onClick={() => removeItem(item.id)} aria-label="Remove item">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>{t('cart.total')}</span>
                                <span className="total-amount">{totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} DHs</span>
                            </div>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                                onClick={onClose}
                            >
                                <MessageCircle size={20} />
                                {t('cart.confirmOrder')}
                            </a>

                            <button className="clear-cart-btn" onClick={clearCart}>
                                <Trash2 size={14} /> {t('cart.clear')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
