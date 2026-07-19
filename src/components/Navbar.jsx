import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import './Navbar.css';
import './CartDrawer.css';

const navItems = [
    ['/', 'nav.home'],
    ['/catalog', 'nav.catalog'],
    ['/promotions', 'nav.promotion'],
    ['/blog', 'nav.blog'],
    ['/about', 'nav.about'],
    ['/location', 'nav.location']
];

const LANGS = ['fr', 'en', 'ar'];
const LANG_LABEL = { fr: 'FR', en: 'EN', ar: 'ع' };

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    if (location.pathname.startsWith('/admin')) return null;

    const currentLang = LANGS.find((l) => i18n.language?.startsWith(l)) || 'fr';
    const nextLang = LANGS[(LANGS.indexOf(currentLang) + 1) % LANGS.length];
    const cycleLanguage = () => {
        i18n.changeLanguage(nextLang);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container container">
                    <Link to="/" className="navbar-logo" aria-label="Kago Bags home">
                        <img className="logo-image" src="/assets/brand/kago-logo.png" alt="" />
                        <span className="logo-text">Kago Bags</span>
                    </Link>

                    <div className="navbar-menu">
                        {navItems.map(([href, label]) => (
                            <Link
                                key={href}
                                to={href}
                                className={`nav-link ${location.pathname === href ? 'active' : ''}`}
                            >
                                {t(label)}
                            </Link>
                        ))}
                    </div>

                    <div className="navbar-actions">
                        <Link className="icon-btn" aria-label="Search collection" title="Search collection" to="/catalog">
                            <Search size={19} />
                        </Link>
                        <button className="lang-switch" aria-label="Change language" title={`Change language → ${LANG_LABEL[nextLang]}`} onClick={cycleLanguage}>
                            {LANG_LABEL[nextLang]}
                        </button>
                        <button
                            className="icon-btn cart-btn"
                            aria-label="Open cart"
                            title="Open cart"
                            onClick={() => setCartOpen(true)}
                        >
                            <ShoppingCart size={20} />
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </button>

                        <button
                            className="icon-btn mobile-menu-btn"
                            aria-label="Open menu"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="mobile-menu animate-fade-in">
                        {navItems.map(([href, label]) => (
                            <Link key={href} to={href} className="nav-link" onClick={() => setIsOpen(false)}>
                                {t(label)}
                            </Link>
                        ))}
                        <button
                            className="mobile-cart-link"
                            onClick={() => {
                                setIsOpen(false);
                                setCartOpen(true);
                            }}
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
