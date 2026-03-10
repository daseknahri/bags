import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api';
import { Calendar, User } from 'lucide-react';
import './Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [seo, setSeo] = useState({ title: 'Tech Blog | PC Paradise', description: 'Read the latest tech news and reviews.' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogsData = await api.getBlogs();
                setBlogs(blogsData);

                const settings = await api.getSettings();
                if (settings?.seo) setSeo(settings.seo);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="blog-page container animate-fade-in">
            <Helmet>
                <title>{`Blog | ${seo.defaultTitle || seo.title}`}</title>
                <meta name="description" content="Latest technology news, laptop reviews, and PC tips from PC Paradise Morocco." />
            </Helmet>

            <div className="blog-header">
                <h1>Tech <span className="accent">Insights</span></h1>
                <p>Expert reviews, tech news, and buying guides.</p>
            </div>

            <div className="blog-grid">
                {blogs.map(post => (
                    <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card glass-panel">
                        <div className="blog-image">
                            <img src={api.resolveMediaUrl(post.image) || '/placeholder.png'} alt={post.title} />
                        </div>
                        <div className="blog-content">
                            <h2>{post.title}</h2>
                            <div className="blog-meta">
                                <span className="meta-item"><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
                                <span className="meta-item"><User size={14} /> {post.author}</span>
                            </div>
                            <p>{post.excerpt}</p>
                            <span className="read-more">Read Full Article →</span>
                        </div>
                    </Link>
                ))}
                {blogs.length === 0 && (
                    <div className="no-blogs">
                        <h3>No posts yet. Check back soon!</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
