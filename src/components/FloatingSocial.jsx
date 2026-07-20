import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { api } from '../api';
import './FloatingSocial.css';

const FloatingSocial = () => {
    const location = useLocation();
    const [social, setSocial] = useState({ facebook: '', instagram: '', whatsapp: '212600000000' });

    useEffect(() => {
        api.getSettings()
            .then((s) => { if (s?.socialLinks) setSocial((prev) => ({ ...prev, ...s.socialLinks })); })
            .catch(() => undefined);
    }, []);

    if (location.pathname.startsWith('/admin')) return null;

    const waMessage = encodeURIComponent('Hello Kago Bags, I need help choosing a bag.');
    const whatsappUrl = social.whatsapp ? `https://wa.me/${social.whatsapp}?text=${waMessage}` : null;

    return (
        <div className="floating-social-stack">
            {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="floating-social-btn floating-whatsapp" aria-label="Chat with us on WhatsApp">
                    <MessageCircle size={30} />
                </a>
            )}
            {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="floating-social-btn floating-facebook" aria-label="Follow us on Facebook">
                    <Facebook size={26} />
                </a>
            )}
            {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="floating-social-btn floating-instagram" aria-label="Follow us on Instagram">
                    <Instagram size={26} />
                </a>
            )}
        </div>
    );
};

export default FloatingSocial;
