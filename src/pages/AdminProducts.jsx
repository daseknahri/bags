import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Plus, Edit2, Trash2, X, Image, Tag, Check } from 'lucide-react';
import './AdminProducts.css';

const EMPTY_FORM = {
    title: '',
    price: '',
    discountPrice: '',
    description: '',
    promotion: false,
    images: [''],
    specs: [{ key: 'Brand', value: 'PuaFeli' }, { key: 'Category', value: 'Tote Bags' }, { key: 'Material', value: '' }],
};

// Helper: convert specs array [{key,value}] <-> object {Brand:'HP'}
const specsArrayToObj = (arr) =>
    arr.reduce((acc, { key, value }) => {
        if (key.trim()) acc[key.trim()] = value;
        return acc;
    }, {});

const specsObjToArray = (obj) =>
    Object.entries(obj || {}).map(([key, value]) => ({ key, value }));

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [searchTerm, setSearchTerm] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const fetchProducts = async () => {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleTogglePromo = async (product) => {
        if (product.promotion) {
            // Revert to normal price
            if (window.confirm(`Turn off promotion for "${product.title}"?`)) {
                await api.updateProduct(product.id, { ...product, promotion: false, discountPrice: '' });
                showToast('Promotion removed!');
                fetchProducts();
            }
        } else {
            // Ask for new promo price
            const newPrice = window.prompt(`Enter the promotional price for "${product.title}"\n(Original price: ${product.price}):`);
            if (newPrice && newPrice.trim()) {
                await api.updateProduct(product.id, { ...product, promotion: true, discountPrice: newPrice.trim() });
                showToast('Promotion applied!');
                fetchProducts();
            }
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingId(product.id);
            setFormData({
                ...product,
                images: product.images && product.images.length > 0 ? product.images : [''],
                specs: specsObjToArray(product.specs),
            });
        } else {
            setEditingId(null);
            setFormData(EMPTY_FORM);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => { setIsModalOpen(false); setEditingId(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, specs: specsArrayToObj(formData.specs) };
        if (editingId) {
            await api.updateProduct(editingId, payload);
            showToast('Product updated successfully!');
        } else {
            await api.createProduct({ ...payload, id: 'pf-' + Date.now() });
            showToast('Product created successfully!');
        }
        handleCloseModal();
        fetchProducts();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this product permanently?')) {
            await api.deleteProduct(id);
            showToast('Product deleted!');
            fetchProducts();
        }
    };

    /* Image helpers */
    const [uploadingImage, setUploadingImage] = useState(false);

    const addImage = () => setFormData(f => ({ ...f, images: [...f.images, ''] }));
    const removeImage = (i) => setFormData(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
    const updateImage = (i, val) =>
        setFormData(f => ({ ...f, images: f.images.map((img, idx) => idx === i ? val : img) }));

    const handleFileUpload = async (i, file) => {
        if (!file) return;
        setUploadingImage(true);
        try {
            const url = await api.uploadImage(file);
            updateImage(i, url);
            showToast('Image uploaded!');
        } catch (err) {
            console.error(err);
            alert('Failed to upload image. Ensure backend server is running.');
        } finally {
            setUploadingImage(false);
        }
    };

    /* Spec helpers */
    const addSpec = () => setFormData(f => ({ ...f, specs: [...f.specs, { key: '', value: '' }] }));
    const removeSpec = (i) => setFormData(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));
    const updateSpec = (i, field, val) =>
        setFormData(f => ({ ...f, specs: f.specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }));

    const filtered = products.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specs?.Category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="admin-loading">Loading catalog...</div>;

    return (
        <div className="admin-products animate-fade-in">
            {toastMessage && (
                <div className="admin-toast">
                    <Check size={18} /> {toastMessage}
                </div>
            )}
            <div className="admin-header-row">
                <h2>Products</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={16} /> Add Product
                </button>
            </div>

            <input
                className="admin-search"
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            {/* Product cards for mobile / table for desktop */}
            <div className="products-card-grid">
                {filtered.map(p => (
                    <div key={p.id} className="product-admin-card glass-panel">
                        <img
                            src={api.resolveMediaUrl(p.images?.[0]) || 'https://placehold.co/80x60?text=No+Image'}
                            alt={p.title}
                            className="product-admin-thumb"
                        />
                        <div className="product-admin-info">
                            <div className="product-admin-title">{p.title}</div>
                            <div className="product-admin-meta">
                                <span className="admin-badge">{p.specs?.Category || 'General'}</span>
                                {p.promotion && <span className="admin-badge promo">Promo</span>}
                                <span className="price-tag">{p.price}</span>
                                <span className="img-count"><Image size={12} /> {p.images?.length || 0} image(s)</span>
                            </div>
                        </div>
                        <div className="product-admin-actions">
                            <button
                                className={`action-btn ${p.promotion ? 'active-promo' : 'inactive-promo'}`}
                                title={p.promotion ? "Remove Promotion" : "Set Promotion"}
                                onClick={() => handleTogglePromo(p)}
                            >
                                <Tag size={16} />
                            </button>
                            <button className="action-btn edit" title="Edit" onClick={() => handleOpenModal(p)}><Edit2 size={16} /></button>
                            <button className="action-btn delete" title="Delete" onClick={() => handleDelete(p.id)}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <p style={{ color: 'var(--text-main)' }}>No products found.</p>}
            </div>

            {/* Edit / Add Modal */}
            {isModalOpen && (
                <div className="admin-modal-overlay" onClick={(e) => { if (e.target.className === 'admin-modal-overlay') handleCloseModal(); }}>
                    <div className="admin-modal glass-panel product-modal">
                        <div className="modal-header">
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {editingId ? <><Edit2 size={24} /> Edit Product</> : <><Plus size={24} /> New Product</>}
                            </h2>
                            <button className="icon-btn" onClick={handleCloseModal}><X size={22} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form">
                            {/* Basic Info */}
                            <div className="form-section">
                                <h3 className="form-section-title">Basic Details</h3>
                                <div className="form-group">
                                    <label>Product Title *</label>
                                    <input required className="admin-input" type="text" placeholder="e.g. PuaFeli Canvas Tote"
                                        value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Description *</label>
                                    <textarea required className="admin-textarea" rows="3" placeholder="Describe the product..."
                                        value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                            </div>

                            {/* Images */}
                            <div className="form-section">
                                <div className="form-section-header">
                                    <h3 className="form-section-title"><Image size={18} /> Product Images</h3>
                                    <button type="button" className="btn-add-row" onClick={addImage}>+ Add Image</button>
                                </div>
                                <p className="form-hint">Upload image files directly from your device.</p>
                                {formData.images.map((img, i) => (
                                    <div key={i} className="image-row">
                                        <div className="image-preview-thumb">
                                            {img ? <img src={api.resolveMediaUrl(img)} alt="" onError={e => e.target.style.display = 'none'} /> : <span>No img</span>}
                                        </div>
                                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <input
                                                className="admin-input file-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={e => handleFileUpload(i, e.target.files[0])}
                                                disabled={uploadingImage}
                                            />
                                            {img && <small style={{ color: 'var(--accent)', wordBreak: 'break-all', fontSize: '10px' }}>{img}</small>}
                                        </div>
                                        {formData.images.length > 1 && (
                                            <button type="button" className="action-btn delete" title="Remove image" onClick={() => removeImage(i)}><X size={14} /></button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="form-section">
                                <h3 className="form-section-title">Pricing</h3>
                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label>Price *</label>
                                        <input required className="admin-input" type="text" placeholder="e.g. 10,500.00 DHs"
                                            value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input type="checkbox" checked={formData.promotion}
                                                onChange={e => setFormData({ ...formData, promotion: e.target.checked })} />
                                            {' '}On Promotion
                                        </label>
                                        {formData.promotion && (
                                            <input className="admin-input" type="text" placeholder="Discounted price"
                                                value={formData.discountPrice} onChange={e => setFormData({ ...formData, discountPrice: e.target.value })} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Specs */}
                            <div className="form-section">
                                <div className="form-section-header">
                                    <h3 className="form-section-title"><Tag size={18} /> Specifications</h3>
                                    <button type="button" className="btn-add-row" onClick={addSpec}>+ Add Spec</button>
                                </div>
                                <p className="form-hint">Add as many specs as you want (e.g. Material, Color, Strap, Closure).</p>
                                <div className="specs-list">
                                    {formData.specs.map((spec, i) => (
                                        <div key={i} className="spec-row">
                                            <input
                                                className="admin-input spec-key"
                                                type="text"
                                                placeholder="Spec name (e.g. RAM)"
                                                value={spec.key}
                                                onChange={e => updateSpec(i, 'key', e.target.value)}
                                            />
                                            <input
                                                className="admin-input"
                                                type="text"
                                                placeholder="Value (e.g. 16GB)"
                                                value={spec.value}
                                                onChange={e => updateSpec(i, 'value', e.target.value)}
                                            />
                                            <button type="button" className="action-btn delete" title="Remove spec" onClick={() => removeSpec(i)}><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
