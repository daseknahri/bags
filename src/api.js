import axios from 'axios';

const DEV_HOSTS = new Set(['localhost', '127.0.0.1']);

function isBrowser() {
    return typeof window !== 'undefined';
}

function isDevHost() {
    return isBrowser() && DEV_HOSTS.has(window.location.hostname);
}

function isAdminRoute() {
    return isBrowser() && window.location.pathname.startsWith('/admin');
}

function getWebsiteOrigin() {
    return isDevHost() ? (import.meta.env.VITE_WEBSITE_ORIGIN || 'http://localhost:3004') : '';
}

function getAdminOrigin() {
    return isDevHost() ? (import.meta.env.VITE_ADMIN_ORIGIN || 'http://localhost:3104') : '';
}

function resolveBaseUrl(origin) {
    return `${origin}/api`;
}

const publicClient = axios.create({
    baseURL: resolveBaseUrl(getWebsiteOrigin())
});

const adminClient = axios.create({
    baseURL: resolveBaseUrl(getAdminOrigin()),
    withCredentials: true
});

adminClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error?.config?.url || '';
        if (
            error?.response?.status === 401 &&
            !url.includes('/admin/login') &&
            !url.includes('/admin/session') &&
            typeof window !== 'undefined'
        ) {
            window.dispatchEvent(new CustomEvent('pc-admin-auth-required'));
        }
        return Promise.reject(error);
    }
);

function getReadClient() {
    return isAdminRoute() ? adminClient : publicClient;
}

function getMediaOrigin() {
    return isAdminRoute() ? getAdminOrigin() : getWebsiteOrigin();
}

function normalizePath(url) {
    if (!url) return '';
    if (/^(https?:)?\/\//.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
        return url;
    }
    const origin = getMediaOrigin();
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    return `${origin}${normalizedPath}`;
}

export const api = {
    getProducts: () => getReadClient().get('/products').then((res) => res.data),
    getProduct: async (id) => {
        const products = await getReadClient().get('/products').then((res) => res.data);
        return products.find((product) => product.id === id);
    },
    createProduct: (data) => adminClient.post('/products', data).then((res) => res.data),
    updateProduct: (id, data) => adminClient.put(`/products/${id}`, data).then((res) => res.data),
    deleteProduct: (id) => adminClient.delete(`/products/${id}`).then((res) => res.data),

    getSettings: () => getReadClient().get('/settings').then((res) => res.data),
    updateSettings: (data) => adminClient.post('/settings', data).then((res) => res.data),

    getBlogs: () => getReadClient().get('/blogs').then((res) => res.data),
    getBlog: async (slug) => {
        const blogs = await getReadClient().get('/blogs').then((res) => res.data);
        return blogs.find((blog) => blog.slug === slug);
    },
    createBlog: (data) => adminClient.post('/blogs', data).then((res) => res.data),
    updateBlog: (id, data) => adminClient.put(`/blogs/${id}`, data).then((res) => res.data),
    deleteBlog: (id) => adminClient.delete(`/blogs/${id}`).then((res) => res.data),

    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return adminClient
            .post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => res.data.url);
    },

    login: (username, password) => adminClient.post('/admin/login', { username, password }).then((res) => res.data),
    getAdminSession: () => adminClient.get('/admin/session').then((res) => res.data),
    logout: () => adminClient.post('/admin/logout').then((res) => res.data),

    resolveMediaUrl: normalizePath
};

