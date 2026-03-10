import React, { useState, useEffect } from 'react';
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
        api.getSettings().then(s => {
            if (s?.socialLinks?.whatsapp) setWhatsappNumber(s.socialLinks.whatsapp);
        }).catch(() => { });
    }, []);

    const buildWhatsAppMessage = () => {
        if (cart.length === 0) return '';
        let msg = '🛒 *New Order from PC Paradise Website*\n\n';
        cart.forEach((item, i) => {
            msg += `*${i + 1}. ${item.title}*\n`;
            msg += `   Qty: ${item.qty}  |  Price: ${item.price}\n\n`;
        });
        msg += `─────────────────────\n`;
        msg += `*TOTAL: ${totalPrice.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} DHs*\n\n`;
        msg += `_Please confirm my order._`;
        return encodeURIComponent(msg);
    };

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`;

    return (
        <>
            {/* Overlay */}
            {isOpen && <div className="cart-overlay" onClick={onClose} />}

            {/* Drawer */}
            <div className={`cart-drawer glass-panel ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <div className="cart-title">
                        <ShoppingBag size={22} />
                        <h2>{t('cart.title')} ({totalItems})</h2>
                    </div>
                    <button className="icon-btn" onClick={onClose}><X size={22} /></button>
                </div>

                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <ShoppingBag size={60} className="empty-icon" />
                        <h3>{t('cart.empty')}</h3>
                        <p>{t('cart.browse')}</p>
                        <Link to="/catalog" className="btn-primary" onClick={onClose} style={{ marginTop: '16px', textDecoration: 'none' }}>
                            {t('cart.browse')}
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img
                                        src={item.image || 'https://placehold.co/60x60?text=IMG'}
                                        alt={item.title}
                                        className="cart-item-img"
                                        onError={e => { e.target.src = 'https://placehold.co/60x60?text=IMG'; }}
                                    />
                                    <div className="cart-item-info">
                                        <div className="cart-item-title">{item.title}</div>
                                        <div className="cart-item-price">{item.price}</div>
                                        <div className="cart-item-controls">
                                            <button onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={14} /></button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={14} /></button>
                                        </div>
                                    </div>
                                    <button className="cart-remove" onClick={() => removeItem(item.id)}><Trash2 size={16} /></button>
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
