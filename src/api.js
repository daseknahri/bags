import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

export const api = {
    getProducts: () => axios.get(`${API_URL}/products`).then(res => res.data),
    getProduct: async (id) => {
        const products = await axios.get(`${API_URL}/products`).then(res => res.data);
        return products.find(p => p.id === id);
    },
    createProduct: (data) => axios.post(`${API_URL}/products`, data).then(res => res.data),
    updateProduct: (id, data) => axios.put(`${API_URL}/products/${id}`, data).then(res => res.data),
    deleteProduct: (id) => axios.delete(`${API_URL}/products/${id}`).then(res => res.data),

    getSettings: () => axios.get(`${API_URL}/settings`).then(res => res.data),
    updateSettings: (data) => axios.post(`${API_URL}/settings`, data).then(res => res.data),

    getBlogs: () => axios.get(`${API_URL}/blogs`).then(res => res.data),
    getBlog: async (slug) => {
        const blogs = await axios.get(`${API_URL}/blogs`).then(res => res.data);
        return blogs.find(b => b.slug === slug);
    },
    createBlog: (data) => axios.post(`${API_URL}/blogs`, data).then(res => res.data),
    updateBlog: (id, data) => axios.put(`${API_URL}/blogs/${id}`, data).then(res => res.data),
    deleteBlog: (id) => axios.delete(`${API_URL}/blogs/${id}`).then(res => res.data),

    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return axios.post(`${API_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => res.data.url);
    },

    login: (username, password) => axios.post(`${API_URL}/login`, { username, password }).then(res => res.data),
    updateAuth: (currentPassword, newUsername, newPassword) =>
        axios.post(`${API_URL}/auth/update`, { currentPassword, newUsername, newPassword }).then(res => res.data)
};
