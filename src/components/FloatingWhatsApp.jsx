import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { api } from '../api';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
    const [whatsappNumber, setWhatsappNumber] = useState('212600000000');

    useEffect(() => {
        api.getSettings().then(s => {
            if (s?.socialLinks?.whatsapp) setWhatsappNumber(s.socialLinks.whatsapp);
        }).catch(() => { });
    }, []);

    const message = encodeURIComponent('Hello Kago Bags, I need help choosing a bag.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="Chat with us on WhatsApp">
            <MessageCircle size={32} />
        </a>
    );
};

export default FloatingWhatsApp;
