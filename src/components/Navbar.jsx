import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import './Navbar.css';
import './CartDrawer.css';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    const isAdmin = location.pathname.startsWith('/admin');
    if (isAdmin) return null; // Don't show navbar on admin panel

    return (
        <>
            <nav className="navbar glass-panel">
                <div className="navbar-container container">
                    <Link to="/" className="navbar-logo">
                        <span className="logo-text">PC<span className="accent">Paradise</span></span>
                    </Link>

                    <div className="navbar-menu">
                        <Link to="/" className="nav-link">{t('nav.home')}</Link>
                        <Link to="/catalog" className="nav-link">{t('nav.catalog')}</Link>
                        <Link to="/promotions" className="nav-link">{t('nav.promotion')}</Link>
                        <Link to="/blog" className="nav-link">{t('nav.blog')}</Link>
                        <Link to="/about" className="nav-link">{t('nav.about')}</Link>
                        <Link to="/location" className="nav-link">{t('nav.location')}</Link>
                    </div>

                    <div className="navbar-actions">
                        <button className="icon-btn" aria-label="Search">
                            <Search size={20} />
                        </button>
                        <button
                            className="icon-btn tag-lang-switch"
                            aria-label="Change Language"
                            onClick={() => {
                                const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
                                i18n.changeLanguage(newLang);
                                document.documentElement.lang = newLang; // update html tag
                            }}
                        >
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid var(--accent)', padding: '2px 6px', borderRadius: '4px' }}>
                                {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
                            </span>
                        </button>
                        <button
                            className="icon-btn cart-btn"
                            aria-label="Cart"
                            onClick={() => setCartOpen(true)}
                        >
                            <ShoppingCart size={20} />
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </button>

                        <button
                            className="icon-btn mobile-menu-btn"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="mobile-menu glass-panel animate-fade-in">
                        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
                        <Link to="/catalog" className="nav-link" onClick={() => setIsOpen(false)}>{t('nav.catalog')}</Link>
                        <Link to="/promotions" className="nav-link" onClick={() => setIsOpen(false)}>{t('nav.promotion')}</Link>
                        <Link to="/blog" className="nav-link" onClick={() => setIsOpen(false)}>{t('nav.blog')}</Link>
                        <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
                        <Link to="/location" className="nav-link" onClick={() => setIsOpen(false)}>{t('nav.location')}</Link>
                        <button
                            className="nav-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}
                            onClick={() => { setIsOpen(false); setCartOpen(true); }}
                        >
                            <ShoppingCart size={18} /> {t('nav.cart')} {totalItems > 0 && `(${totalItems})`}
                        </button>
                    </div>
                )}
            </nav>

            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
};

export default Navbar;
