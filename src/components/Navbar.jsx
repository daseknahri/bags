import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, ChevronDown } from 'lucide-react';
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
const LANG_NAMES = { fr: 'Français', en: 'English', ar: 'العربية' };

// Inline SVG flags so they render consistently on every platform (incl. Windows).
const FLAGS = {
    fr: (
        <svg viewBox="0 0 60 40" className="lang-flag" aria-hidden="true">
            <rect width="20" height="40" x="0" fill="#0055A4" />
            <rect width="20" height="40" x="20" fill="#F5F5F5" />
            <rect width="20" height="40" x="40" fill="#EF4135" />
        </svg>
    ),
    en: (
        <svg viewBox="0 0 60 40" className="lang-flag" aria-hidden="true">
            <rect width="60" height="40" fill="#012169" />
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#ffffff" strokeWidth="8" />
            <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3" />
            <path d="M30,0 V40 M0,20 H60" stroke="#ffffff" strokeWidth="12" />
            <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7" />
        </svg>
    ),
    ar: (
        <svg viewBox="0 0 60 40" className="lang-flag" aria-hidden="true">
            <rect width="60" height="40" fill="#c1272d" />
            <path d="M30,10 L35.9,28.1 L20.5,16.9 L39.5,16.9 L24.1,28.1 Z" fill="none" stroke="#006233" strokeWidth="1.8" />
        </svg>
    ),
};

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef(null);
    const { totalItems } = useCart();
    const location = useLocation();

    useEffect(() => {
        if (!langOpen) return undefined;
        const onDocClick = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [langOpen]);

    if (location.pathname.startsWith('/admin')) return null;

    const currentLang = LANGS.find((l) => i18n.language?.startsWith(l)) || 'fr';
    const selectLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLangOpen(false);
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
                        <div className="lang-select" ref={langRef}>
                            <button
                                type="button"
                                className="lang-trigger"
                                aria-label="Change language"
                                aria-haspopup="listbox"
                                aria-expanded={langOpen}
                                onClick={() => setLangOpen((open) => !open)}
                            >
                                {FLAGS[currentLang]}
                                <ChevronDown size={14} className={`lang-caret ${langOpen ? 'open' : ''}`} />
                            </button>
                            {langOpen && (
                                <ul className="lang-menu" role="listbox">
                                    {LANGS.map((lng) => (
                                        <li key={lng}>
                                            <button
                                                type="button"
                                                role="option"
                                                aria-selected={lng === currentLang}
                                                className={`lang-option ${lng === currentLang ? 'active' : ''}`}
                                                onClick={() => selectLanguage(lng)}
                                            >
                                                {FLAGS[lng]}
                                                <span>{LANG_NAMES[lng]}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
