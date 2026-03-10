import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './About.css';

const About = () => {
    const [aboutUs, setAboutUs] = useState({
        mainImage: 'https://images.unsplash.com/photo-1531297172864-dd34cce46ad9?auto=format&fit=crop&q=80&w=800',
        description: 'PC Paradise was founded with a singular vision: to curate the best premium technology products and provide an unparalleled shopping experience.'
    });

    useEffect(() => {
        api.getSettings().then((settings) => {
            if (settings?.aboutUs) {
                setAboutUs((current) => ({
                    ...current,
                    ...settings.aboutUs
                }));
            }
        }).catch(() => { });
    }, []);

    return (
        <div className="about-page container animate-fade-in">
            <div className="about-hero">
                <h1>About <span className="accent">PC Paradise</span></h1>
                <p>Elevating your technology experience since 2018.</p>
            </div>

            <div className="about-content">
                <div className="about-text glass-panel">
                    <h2>Our Story</h2>
                    <p>
                        {aboutUs.description}
                    </p>
                    <p>
                        We believe that the devices you use every day should be beautiful, powerful, and reliable.
                        That's why we meticulously select every laptop, phone, and accessory in our catalog, ensuring
                        they meet strict standards of quality and design.
                    </p>
                </div>

                <div className="about-image glass-panel">
                    <img
                        src={api.resolveMediaUrl(aboutUs.mainImage)}
                        alt="Inside PC Paradise Store"
                    />
                </div>
            </div>

            <div className="values-grid">
                <div className="value-card glass-panel">
                    <h3>Premium Quality</h3>
                    <p>We source only original, top-tier products from world-renowned brands.</p>
                </div>
                <div className="value-card glass-panel">
                    <h3>Expert Advice</h3>
                    <p>Our team of tech specialists is always ready to help you find the perfect device.</p>
                </div>
                <div className="value-card glass-panel">
                    <h3>Secure Shopping</h3>
                    <p>Enjoy peace of mind with our secure checkout and comprehensive warranties.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
