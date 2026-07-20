import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import './Footer.css';

const navItems = [
    ['/', 'nav.home'],
    ['/catalog', 'nav.catalog'],
    ['/promotions', 'nav.promotion'],
    ['/blog', 'nav.blog'],
    ['/about', 'nav.about'],
    ['/location', 'nav.location']
];

const Footer = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [social, setSocial] = useState({ facebook: '', instagram: '', whatsapp: '' });

    useEffect(() => {
        api.getSettings()
            .then((s) => { if (s?.socialLinks) setSocial(s.socialLinks); })
            .catch(() => undefined);
    }, []);

    if (location.pathname.startsWith('/admin')) return null;

    const waHref = social.whatsapp ? `https://wa.me/${social.whatsapp}` : null;
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <span className="footer-logo">Kago Bags</span>
                    <p>{t('footer.tagline')}</p>
                </div>

                <div className="footer-col">
                    <h4>{t('footer.quickLinks')}</h4>
                    <nav className="footer-links">
                        {navItems.map(([href, label]) => (
                            <Link key={href} to={href}>{t(label)}</Link>
                        ))}
                    </nav>
                </div>

                <div className="footer-col">
                    <h4>{t('footer.follow')}</h4>
                    <div className="footer-social">
                        {social.instagram && (
                            <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                        )}
                        {social.facebook && (
                            <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                        )}
                        {waHref && (
                            <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <MessageCircle size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <span>© {year} Kago Bags. {t('footer.rights')}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
