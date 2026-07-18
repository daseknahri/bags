const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { createCorsOptions, parsePort } = require('./server/server-common.cjs');
const { distDir, ensureStorage, readBlogs, readProducts, readSettings, uploadsDir } = require('./server/site-store.cjs');

const app = express();
const port = parsePort(process.env.PORT, 3004);
const devFrontendUrl = process.env.DEV_FRONTEND_URL || 'http://localhost:5173';
const distIndex = path.join(distDir, 'index.html');

ensureStorage();

app.use(cors(createCorsOptions()));
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'website' });
});

app.get('/api/products', (_req, res) => {
  res.json(readProducts());
});

app.get('/api/settings', (_req, res) => {
  res.json(readSettings());
});

app.get('/api/blogs', (_req, res) => {
  res.json(readBlogs());
});

app.use('/uploads', express.static(uploadsDir));
app.use(express.static(distDir, { index: false }));

app.get(/^\/admin(?:\/.*)?$/, (_req, res) => {
  if (process.env.ADMIN_DOMAIN) {
    res.redirect(302, `https://${process.env.ADMIN_DOMAIN}/admin`);
    return;
  }
  res.status(404).type('text/plain').send('Admin is available on the admin domain.');
});

app.get(/^(?!\/(api|uploads)).*/, (req, res) => {
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
    return;
  }
  res.redirect(302, `${devFrontendUrl}${req.originalUrl || '/'}`);
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'not_found' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`PuaFeli website server running on 0.0.0.0:${port}`);
});
