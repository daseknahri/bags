const fs = require('fs');
const path = require('path');

const storageRoot = path.resolve(process.env.STORAGE_DIR || path.join(__dirname, '..', 'storage'));
const dataDir = path.resolve(process.env.DATA_DIR || path.join(storageRoot, 'data'));
const uploadsDir = path.resolve(process.env.UPLOADS_DIR || path.join(storageRoot, 'uploads'));
const productsFile = path.join(dataDir, 'products.json');
const settingsFile = path.join(dataDir, 'settings.json');
const blogsFile = path.join(dataDir, 'blogs.json');
const bundledProductsFile = path.join(__dirname, 'data', 'products.json');
const bundledSettingsFile = path.join(__dirname, 'data', 'settings.json');
const bundledBlogsFile = path.join(__dirname, 'data', 'blogs.json');
const bundledUploadsDir = path.join(__dirname, 'uploads');
const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

const defaultSettings = {
  socialLinks: { facebook: '', instagram: '', whatsapp: '' },
  aboutUs: { mainImage: '', description: '' },
  seo: { defaultTitle: '', defaultDescription: '' },
  contactInfo: { address: '', phone1: '', phone2: '', email1: '', email2: '', hours: '', mapUrl: '' }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readBundledJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_error) {
    return clone(fallback);
  }
}

function sanitizeProducts(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      ...item,
      id: typeof item.id === 'string' && item.id ? item.id : `pc-${Date.now()}`,
      title: typeof item.title === 'string' ? item.title : '',
      description: typeof item.description === 'string' ? item.description : '',
      price: typeof item.price === 'string' ? item.price : '',
      discountPrice: typeof item.discountPrice === 'string' ? item.discountPrice : '',
      promotion: Boolean(item.promotion),
      images: Array.isArray(item.images) ? item.images.filter((entry) => typeof entry === 'string' && entry.trim()) : [],
      specs: item.specs && typeof item.specs === 'object' && !Array.isArray(item.specs) ? item.specs : {}
    }));
}

function sanitizeBlogs(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => item && typeof item === 'object')
    .map((item) => ({
      ...item,
      id: typeof item.id === 'string' && item.id ? item.id : (typeof item.slug === 'string' && item.slug ? item.slug : `blog-${Date.now()}`),
      slug: typeof item.slug === 'string' && item.slug ? item.slug : `post-${Date.now()}`,
      title: typeof item.title === 'string' ? item.title : '',
      excerpt: typeof item.excerpt === 'string' ? item.excerpt : '',
      content: typeof item.content === 'string' ? item.content : '',
      image: typeof item.image === 'string' ? item.image : '',
      author: typeof item.author === 'string' && item.author ? item.author : 'Admin',
      date: typeof item.date === 'string' && item.date ? item.date : new Date().toISOString(),
      seoTitle: typeof item.seoTitle === 'string' ? item.seoTitle : '',
      seoDescription: typeof item.seoDescription === 'string' ? item.seoDescription : ''
    }));
}

function sanitizeSettings(value) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    socialLinks: {
      ...defaultSettings.socialLinks,
      ...(source.socialLinks && typeof source.socialLinks === 'object' ? source.socialLinks : {})
    },
    aboutUs: {
      ...defaultSettings.aboutUs,
      ...(source.aboutUs && typeof source.aboutUs === 'object' ? source.aboutUs : {})
    },
    seo: {
      ...defaultSettings.seo,
      ...(source.seo && typeof source.seo === 'object' ? source.seo : {})
    },
    contactInfo: {
      ...defaultSettings.contactInfo,
      ...(source.contactInfo && typeof source.contactInfo === 'object' ? source.contactInfo : {})
    }
  };
}

function syncBundledUploads() {
  ensureDirectory(uploadsDir);
  if (!fs.existsSync(bundledUploadsDir)) return;

  for (const entry of fs.readdirSync(bundledUploadsDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const source = path.join(bundledUploadsDir, entry.name);
    const target = path.join(uploadsDir, entry.name);
    if (!fs.existsSync(target)) {
      fs.copyFileSync(source, target);
    }
  }
}

function ensureSeedFile(filePath, bundledPath, sanitize, fallback) {
  if (fs.existsSync(filePath)) return;
  const seeded = sanitize(readBundledJson(bundledPath, fallback));
  fs.writeFileSync(filePath, JSON.stringify(seeded, null, 2));
}

function ensureStorage() {
  ensureDirectory(dataDir);
  ensureDirectory(uploadsDir);

  ensureSeedFile(productsFile, bundledProductsFile, sanitizeProducts, []);
  ensureSeedFile(settingsFile, bundledSettingsFile, sanitizeSettings, defaultSettings);
  ensureSeedFile(blogsFile, bundledBlogsFile, sanitizeBlogs, []);
  syncBundledUploads();
}

function readFileData(filePath, bundledPath, sanitize, fallback) {
  ensureStorage();
  try {
    return sanitize(JSON.parse(fs.readFileSync(filePath, 'utf8')));
  } catch (_error) {
    const nextValue = sanitize(readBundledJson(bundledPath, fallback));
    fs.writeFileSync(filePath, JSON.stringify(nextValue, null, 2));
    return nextValue;
  }
}

function writeFileData(filePath, sanitize, value) {
  ensureStorage();
  const nextValue = sanitize(value);
  fs.writeFileSync(filePath, JSON.stringify(nextValue, null, 2));
  return nextValue;
}

function readProducts() {
  return readFileData(productsFile, bundledProductsFile, sanitizeProducts, []);
}

function writeProducts(products) {
  return writeFileData(productsFile, sanitizeProducts, products);
}

function readSettings() {
  return readFileData(settingsFile, bundledSettingsFile, sanitizeSettings, defaultSettings);
}

function writeSettings(settings) {
  return writeFileData(settingsFile, sanitizeSettings, settings);
}

function readBlogs() {
  return readFileData(blogsFile, bundledBlogsFile, sanitizeBlogs, []);
}

function writeBlogs(blogs) {
  return writeFileData(blogsFile, sanitizeBlogs, blogs);
}

module.exports = {
  blogsFile,
  dataDir,
  distDir,
  ensureStorage,
  productsFile,
  publicDir,
  readBlogs,
  readProducts,
  readSettings,
  settingsFile,
  uploadsDir,
  writeBlogs,
  writeProducts,
  writeSettings
};
