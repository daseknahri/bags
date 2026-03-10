const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3002;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*'
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB paths
const DB_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DB_DIR, 'products.json');
const SETTINGS_FILE = path.join(DB_DIR, 'settings.json');
const BLOGS_FILE = path.join(DB_DIR, 'blogs.json');
const AUTH_FILE = path.join(DB_DIR, 'auth.json');

// Ensure auth file exists with default credentials
if (!fs.existsSync(AUTH_FILE)) {
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ username: "admin", password: "admin" }, null, 2));
}

// Helper to read/write JSON safely
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// --- Image Upload API ---
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

// --- Auth API ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const auth = readJson(AUTH_FILE);
    if (auth.username === username && auth.password === password) {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/auth/update', (req, res) => {
    const { newUsername, newPassword, currentPassword } = req.body;
    const auth = readJson(AUTH_FILE);

    if (auth.password !== currentPassword) {
        return res.status(401).json({ error: 'Incorrect current password' });
    }

    if (newUsername && newUsername.trim() !== '') {
        auth.username = newUsername.trim();
    }
    if (newPassword && newPassword.trim() !== '') {
        auth.password = newPassword;
    }

    writeJson(AUTH_FILE, auth);
    res.json({ success: true });
});

// --- Settings API ---
app.get('/api/settings', (req, res) => {
    res.json(readJson(SETTINGS_FILE));
});

app.post('/api/settings', (req, res) => {
    writeJson(SETTINGS_FILE, req.body);
    res.json({ success: true, settings: req.body });
});

// --- Products API ---
app.get('/api/products', (req, res) => {
    res.json(readJson(PRODUCTS_FILE));
});

app.post('/api/products', (req, res) => {
    const products = readJson(PRODUCTS_FILE);
    const newProduct = { ...req.body, id: req.body.id || 'pcp-' + Date.now() };
    products.unshift(newProduct);
    writeJson(PRODUCTS_FILE, products);
    res.json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
    let products = readJson(PRODUCTS_FILE);
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    products[index] = { ...products[index], ...req.body };
    writeJson(PRODUCTS_FILE, products);
    res.json(products[index]);
});

app.delete('/api/products/:id', (req, res) => {
    let products = readJson(PRODUCTS_FILE);
    products = products.filter(p => p.id !== req.params.id);
    writeJson(PRODUCTS_FILE, products);
    res.json({ success: true });
});

// --- Blogs API ---
app.get('/api/blogs', (req, res) => {
    res.json(readJson(BLOGS_FILE));
});

app.post('/api/blogs', (req, res) => {
    const blogs = readJson(BLOGS_FILE);
    const newBlog = {
        ...req.body,
        id: req.body.slug || 'blog-' + Date.now(),
        date: new Date().toISOString()
    };
    blogs.unshift(newBlog);
    writeJson(BLOGS_FILE, blogs);
    res.json(newBlog);
});

app.put('/api/blogs/:id', (req, res) => {
    let blogs = readJson(BLOGS_FILE);
    const index = blogs.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });

    blogs[index] = { ...blogs[index], ...req.body };
    writeJson(BLOGS_FILE, blogs);
    res.json(blogs[index]);
});

app.delete('/api/blogs/:id', (req, res) => {
    let blogs = readJson(BLOGS_FILE);
    blogs = blogs.filter(b => b.id !== req.params.id);
    writeJson(BLOGS_FILE, blogs);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Backend Admin API running on http://localhost:${PORT}`);
});
