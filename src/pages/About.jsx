import React, { useEffect, useState } from 'react';
import { api } from '../api';
import './About.css';

const About = () => {
    const [aboutUs, setAboutUs] = useState({
        mainImage: '/assets/bags/canvas-tote-set.png',
        description: 'PuaFeli curates polished bags for daily movement: structured totes, compact crossbodies, refined clutches, and travel-ready accessories selected for texture, function, and quiet elegance.'
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
                <p className="about-kicker">PuaFeli studio</p>
                <h1>Designed around the way you move.</h1>
                <p>Calm silhouettes, useful capacity, and finishes that make daily outfits feel complete.</p>
            </div>

            <div className="about-content">
                <div className="about-text">
                    <h2>Our Point Of View</h2>
                    <p>{aboutUs.description}</p>
                    <p>
                        Every piece is selected for practical carry, clean construction, and easy styling.
                        We focus on bags that look polished in photos and still work hard in real life.
                    </p>
                </div>

                <div className="about-image">
                    <img
                        src={api.resolveMediaUrl(aboutUs.mainImage)}
                        alt="PuaFeli canvas tote and accessories"
                    />
                </div>
            </div>

            <div className="values-grid">
                <div className="value-card">
                    <h3>Material Led</h3>
                    <p>Canvas, raffia, satin, and pebbled textures chosen for depth and daily resilience.</p>
                </div>
                <div className="value-card">
                    <h3>Easy Ordering</h3>
                    <p>Add pieces to the cart and send a WhatsApp order for availability and delivery details.</p>
                </div>
                <div className="value-card">
                    <h3>Client Ready</h3>
                    <p>Clean product pages, local imagery, and editable admin content for a real handoff.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
