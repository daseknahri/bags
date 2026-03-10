import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { api } from '../api';
import { Tag, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Promotions.css';

const Promotions = () => {
    const { t } = useTranslation();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const data = await api.getProducts();
                const promoItems = data.filter(p => p.promotion === true);
                setPromotions(promoItems);
            } catch (err) {
                console.error("Error fetching promotions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPromos();
    }, []);

    return (
        <div className="promotions-page container animate-fade-in">
            <div className="promotions-hero glass-panel">
                <div className="promo-badge">
                    <Tag size={24} />
                    <span>{t('promo.specialOffers')}</span>
                </div>
                <h1>{t('promo.exclusive')} <span className="accent">{t('promo.deals')}</span></h1>
                <p>{t('promo.desc')}</p>
            </div>

            {loading ? (
                <div className="admin-loading"><Loader2 className="animate-spin" /> {t('common.loading')}...</div>
            ) : (
                <>
                    <div className="promotions-grid">
                        {promotions.map(product => (
                            <div key={product.id} className="promo-card-wrapper">
                                <div className="discount-badge">{t('promo.saleBadge')}</div>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {promotions.length === 0 && (
                        <div className="no-promos glass-panel">
                            <h2>{t('promo.empty')}</h2>
                            <p>{t('promo.emptyDesc')}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Promotions;
