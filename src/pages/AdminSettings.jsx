import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Check } from 'lucide-react';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        socialLinks: { facebook: '', instagram: '', whatsapp: '' },
        aboutUs: { mainImage: '', description: '' },
        seo: { defaultTitle: '', defaultDescription: '' },
        contactInfo: { address: '', phone1: '', phone2: '', email1: '', email2: '', hours: '', mapUrl: '' }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    useEffect(() => {
        api.getSettings().then(data => {
            if (data) setSettings(data);
            setLoading(false);
        });
    }, []);

    const handleChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.updateSettings(settings);
            showToast('Settings saved successfully!');
        } catch (err) {
            console.error(err);
            alert('Error saving settings.');
        }
        setSaving(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingImage(true);
        try {
            const url = await api.uploadImage(file);
            handleChange('aboutUs', 'mainImage', url);
            showToast('Image uploaded!');
        } catch (err) {
            console.error(err);
            alert('Failed to upload image.');
        } finally {
            setUploadingImage(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div className="admin-content-card glass-panel animate-fade-in relative-container">
            {toastMessage && (
                <div className="admin-toast">
                    <Check size={18} /> {toastMessage}
                </div>
            )}
            <div className="admin-header-row">
                <h2>Site Settings & SEO</h2>
                <button className="btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save All Settings'}
                </button>
            </div>

            <div className="settings-grid">
                <div className="settings-section">
                    <h3>Social Media Links</h3>
                    <div className="form-group">
                        <label>Facebook URL</label>
                        <input
                            type="text" className="admin-input"
                            value={settings.socialLinks.facebook}
                            onChange={e => handleChange('socialLinks', 'facebook', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Instagram URL</label>
                        <input
                            type="text" className="admin-input"
                            value={settings.socialLinks.instagram}
                            onChange={e => handleChange('socialLinks', 'instagram', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>WhatsApp Number</label>
                        <input
                            type="text" className="admin-input"
                            value={settings.socialLinks.whatsapp}
                            onChange={e => handleChange('socialLinks', 'whatsapp', e.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Global SEO Defaults</h3>
                    <div className="form-group">
                        <label>Default Page Title (Home, etc.)</label>
                        <input
                            type="text" className="admin-input"
                            value={settings.seo.defaultTitle}
                            onChange={e => handleChange('seo', 'defaultTitle', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Default Meta Description</label>
                        <textarea
                            className="admin-textarea" rows="4"
                            value={settings.seo.defaultDescription}
                            onChange={e => handleChange('seo', 'defaultDescription', e.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-section" style={{ gridColumn: '1 / -1' }}>
                    <h3>Contact Information & Location</h3>
                    <div className="form-row-2">
                        <div className="form-group">
                            <label>Store Address</label>
                            <input type="text" className="admin-input" value={settings.contactInfo?.address || ''} onChange={e => handleChange('contactInfo', 'address', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Opening Hours</label>
                            <input type="text" className="admin-input" value={settings.contactInfo?.hours || ''} onChange={e => handleChange('contactInfo', 'hours', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Primary Phone</label>
                            <input type="text" className="admin-input" value={settings.contactInfo?.phone1 || ''} onChange={e => handleChange('contactInfo', 'phone1', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Secondary Phone</label>
                            <input type="text" className="admin-input" value={settings.contactInfo?.phone2 || ''} onChange={e => handleChange('contactInfo', 'phone2', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Primary Email</label>
                            <input type="email" className="admin-input" value={settings.contactInfo?.email1 || ''} onChange={e => handleChange('contactInfo', 'email1', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Secondary Email</label>
                            <input type="email" className="admin-input" value={settings.contactInfo?.email2 || ''} onChange={e => handleChange('contactInfo', 'email2', e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group mt-2">
                        <label>Google Maps Embed URL (`src` from iframe)</label>
                        <input type="text" className="admin-input" placeholder="e.g., https://www.google.com/maps/embed?..." value={settings.contactInfo?.mapUrl || ''} onChange={e => handleChange('contactInfo', 'mapUrl', e.target.value)} />
                    </div>
                </div>

                <div className="settings-section" style={{ gridColumn: '1 / -1' }}>
                    <h3>About Us Page Content</h3>
                    <div className="form-group">
                        <label>Main Image</label>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <input
                                type="file" className="admin-input" accept="image/*"
                                onChange={handleFileUpload} disabled={uploadingImage}
                            />
                        </div>
                        {settings.aboutUs.mainImage && (
                            <img src={api.resolveMediaUrl(settings.aboutUs.mainImage)} alt="About Us Preview" className="admin-image-preview mt-2" />
                        )}
                    </div>
                    <div className="form-group">
                        <label>About Description</label>
                        <textarea
                            className="admin-textarea"
                            rows="4"
                            value={settings.aboutUs.description}
                            onChange={e => handleChange('aboutUs', 'description', e.target.value)}
                        />
                    </div>
                </div>

                <div className="settings-section" style={{ gridColumn: '1 / -1', border: '1px solid rgba(255, 118, 118, 0.3)' }}>
                    <h3 style={{ color: '#ff7676' }}>Admin Credentials</h3>
                    <p style={{ fontSize: '0.85rem', color: '#ff7676', marginBottom: '16px' }}>
                        Admin access is managed only by the server environment variables <strong>ADMIN_USER</strong> and <strong>ADMIN_PASS</strong>.
                    </p>
                    <div className="form-group">
                        <label>Deployment note</label>
                        <div className="admin-input" style={{ minHeight: 'auto', lineHeight: 1.5 }}>
                            Update admin credentials from Coolify or your environment file, then redeploy the admin service.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
