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

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { totalItems } = useCart();
    const location = useLocation();

    if (location.pathname.startsWith('/admin')) return null;

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
        document.documentElement.lang = newLang;
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container container">
                    <Link to="/" className="navbar-logo" aria-label="PuaFeli home">
                        <span className="logo-mark">PF</span>
                        <span className="logo-text">PuaFeli</span>
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
                        <button className="lang-switch" aria-label="Change language" onClick={toggleLanguage}>
                            {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
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
