import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../api';
import './About.css';

const About = () => {
    const { t } = useTranslation();
    const [aboutUs, setAboutUs] = useState({
        mainImage: '/assets/bags/canvas-tote-set.png',
        description: ''
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
                <p className="about-kicker">{t('about.kicker')}</p>
                <h1>{t('about.title')}</h1>
                <p>{t('about.subtitle')}</p>
            </div>

            <div className="about-content">
                <div className="about-text">
                    <h2>{t('about.povTitle')}</h2>
                    <p>{aboutUs.description || t('about.description')}</p>
                    <p>{t('about.para2')}</p>
                </div>

                <div className="about-image">
                    <img
                        src={api.resolveMediaUrl(aboutUs.mainImage)}
                        alt="Kago canvas tote and accessories"
                    />
                </div>
            </div>

            <div className="values-grid">
                <div className="value-card">
                    <h3>{t('about.value1Title')}</h3>
                    <p>{t('about.value1Body')}</p>
                </div>
                <div className="value-card">
                    <h3>{t('about.value2Title')}</h3>
                    <p>{t('about.value2Body')}</p>
                </div>
                <div className="value-card">
                    <h3>{t('about.value3Title')}</h3>
                    <p>{t('about.value3Body')}</p>
                </div>
            </div>
        </div>
    );
};

export default About;
