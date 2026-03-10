import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import './Blog.css';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        api.getBlog(slug).then(p => setPost(p));
    }, [slug]);

    if (!post) return <div className="container loading">Loading post...</div>;

    return (
        <div className="blog-post-page container animate-fade-in">
            <Helmet>
                <title>{post.seoTitle || post.title}</title>
                <meta name="description" content={post.seoDescription || post.excerpt} />
                <meta property="og:title" content={post.seoTitle || post.title} />
                <meta property="og:image" content={api.resolveMediaUrl(post.image)} />
            </Helmet>

            <Link to="/blog" className="back-link">
                <ArrowLeft size={16} /> Back to Blog
            </Link>

            <article className="post-article glass-panel">
                <div className="post-header text-center">
                    <h1>{post.title}</h1>
                    <div className="blog-meta justify-center">
                        <span className="meta-item"><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
                        <span className="meta-item"><User size={14} /> {post.author}</span>
                    </div>
                </div>

                {post.image && (
                    <div className="post-main-image">
                        <img src={api.resolveMediaUrl(post.image)} alt={post.title} />
                    </div>
                )}

                <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </article>
        </div>
    );
};

export default BlogPost;
