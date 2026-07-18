import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Tag, Trash2, Search, Plus, Check, Loader2 } from 'lucide-react';
import './AdminProducts.css'; // Reusing some base styles

const AdminPromotions = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [promoDrafts, setPromoDrafts] = useState({});
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const fetchData = async () => {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRemovePromo = async (product) => {
        if (window.confirm(`Turn off promotion for "${product.title}"?`)) {
            try {
                await api.updateProduct(product.id, {
                    ...product,
                    promotion: false,
                    discountPrice: ''
                });
                showToast('Promotion removed!');
                fetchData();
            } catch (err) {
                console.error(err);
                alert('Error removing promotion.');
            }
        }
    };

    const handleApplyPromo = async (product, newPrice) => {
        if (!newPrice || isNaN(parseFloat(newPrice.replace(/[^0-9.]/g, '')))) {
            alert('Please enter a valid price.');
            return;
        }

        try {
            await api.updateProduct(product.id, {
                ...product,
                promotion: true,
                discountPrice: newPrice
            });
            showToast('Promotion applied!');
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Error applying promotion.');
        }
    };

    const promoProducts = products.filter(p => p.promotion);
    const nonPromoProducts = products.filter(p => !p.promotion &&
        (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.specs?.Category?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div className="admin-loading"><Loader2 className="animate-spin" /> Loading promotions...</div>;

    return (
        <div className="admin-promotions animate-fade-in" style={{ padding: '20px' }}>
            {toastMessage && (
                <div className="admin-toast">
                    <Check size={18} /> {toastMessage}
                </div>
            )}

            <div className="admin-header-row">
                <h2>Promotion Control</h2>
            </div>

            <div className="promo-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Active Promotions Column */}
                <div className="promo-column active-promos">
                    <h3>Active Promotions ({promoProducts.length})</h3>
                    <div className="promo-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                        {promoProducts.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No active promotions.</p>
                        ) : (
                            promoProducts.map(p => (
                                <div key={p.id} className="admin-promo-item glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
                                    <img src={api.resolveMediaUrl(p.images?.[0]) || 'https://placehold.co/50x50'} alt={p.title} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{p.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>{p.discountPrice} <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '4px' }}>{p.price}</span></div>
                                    </div>
                                    <button className="action-btn delete" onClick={() => handleRemovePromo(p)} title="Remove Promo">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Add Promotion Column */}
                <div className="promo-column add-promos">
                    <h3>Apply New Promotion</h3>
                    <div className="search-box" style={{ marginTop: '16px', position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            className="admin-input"
                            placeholder="Search products to discount..."
                            style={{ paddingLeft: '36px', width: '100%' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="available-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
                        {nonPromoProducts.slice(0, 10).map(p => (
                            <div key={p.id} className="admin-promo-item glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <img src={api.resolveMediaUrl(p.images?.[0]) || 'https://placehold.co/50x50'} alt={p.title} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                    <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{p.title}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                                    <div style={{ fontSize: '0.85rem' }}>Price: {p.price}</div>
                                    <div style={{ flex: 1 }}>
                                        <input
                                            type="text"
                                            className="admin-input"
                                            placeholder="Promo price (e.g. 5,000 DHs)"
                                            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                                            value={promoDrafts[p.id] || ''}
                                            onChange={(e) => setPromoDrafts(prev => ({ ...prev, [p.id]: e.target.value }))}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleApplyPromo(p, e.target.value);
                                            }}
                                        />
                                    </div>
                                    <button
                                        className="btn-primary"
                                        style={{ padding: '6px 10px' }}
                                        onClick={() => handleApplyPromo(p, promoDrafts[p.id] || '')}
                                    >
                                        <Check size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPromotions;
