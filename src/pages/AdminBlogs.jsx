import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: '', slug: '', author: '', excerpt: '', content: '', image: '', seoTitle: '', seoDescription: ''
    });
    const [toastMessage, setToastMessage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const fetchBlogs = async () => {
        setLoading(true);
        const data = await api.getBlogs();
        setBlogs(data);
        setLoading(false);
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleOpenModal = (blog = null) => {
        if (blog) {
            setEditingId(blog.id);
            setFormData(blog);
        } else {
            setEditingId(null);
            setFormData({ title: '', slug: '', author: 'Admin', excerpt: '', content: '', image: '', seoTitle: '', seoDescription: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await api.updateBlog(editingId, formData);
            showToast('Blog post updated!');
        } else {
            await api.createBlog(formData);
            showToast('Blog post created!');
        }
        handleCloseModal();
        fetchBlogs();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this post?')) {
            await api.deleteBlog(id);
            showToast('Blog post deleted!');
            fetchBlogs();
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingImage(true);
        try {
            const url = await api.uploadImage(file);
            setFormData({ ...formData, image: url });
            showToast('Image uploaded!');
        } catch (err) {
            console.error(err);
            alert('Failed to upload image.');
        } finally {
            setUploadingImage(false);
        }
    };

    if (loading) return <div>Loading blogs...</div>;

    return (
        <div className="admin-content-card glass-panel animate-fade-in relative-container">
            {toastMessage && (
                <div className="admin-toast">
                    <Check size={18} /> {toastMessage}
                </div>
            )}
            <div className="admin-header-row">
                <h2>Manage Blog Posts</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={16} style={{ marginRight: '8px' }} /> New Post
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                                <td>{new Date(blog.date).toLocaleDateString()}</td>
                                <td>{blog.author}</td>
                                <td className="actions-cell">
                                    <button className="action-btn edit" onClick={() => handleOpenModal(blog)}><Edit2 size={16} /></button>
                                    <button className="action-btn delete" onClick={() => handleDelete(blog.id)}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {blogs.length === 0 && (
                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '24px' }}>No posts found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal glass-panel">
                        <div className="modal-header">
                            <h2>{editingId ? 'Edit Post' : 'New Post'}</h2>
                            <button className="icon-btn" onClick={handleCloseModal}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input required type="text" className="admin-input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>URL Slug (e.g., best-laptops-2026)</label>
                                <input required type="text" className="admin-input" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Cover Image</label>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    {formData.image && (
                                        <img src={formData.image} alt="Cover Preview" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--surface-border)' }} />
                                    )}
                                    <input type="file" accept="image/*" className="admin-input" onChange={handleFileUpload} disabled={uploadingImage} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Excerpt (Short Description)</label>
                                <textarea required className="admin-textarea" rows="2" value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Main Content (HTML/Text)</label>
                                <textarea required className="admin-textarea" rows="8" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                            </div>

                            <div className="settings-section mt-4 mb-4">
                                <h3>SEO Meta Tags</h3>
                                <div className="form-group">
                                    <label>SEO Title</label>
                                    <input type="text" className="admin-input" value={formData.seoTitle} onChange={e => setFormData({ ...formData, seoTitle: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>SEO Description</label>
                                    <textarea className="admin-textarea" rows="2" value={formData.seoDescription} onChange={e => setFormData({ ...formData, seoDescription: e.target.value })} />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ marginLeft: '12px' }}>Save Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
