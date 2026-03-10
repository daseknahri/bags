const crypto = require('crypto');
const path = require('path');
const multer = require('multer');

const { uploadsDir } = require('./site-store.cjs');

const MAX_JSON_BYTES = '2mb';
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const SESSION_COOKIE = 'pc_admin_session';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const ALLOWED_UPLOAD_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']);

function parsePort(value, fallback) {
  const parsed = Number.parseInt(value || '', 10);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return fallback;
  }
  return parsed;
}

function booleanFromEnv(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim().toLowerCase();
  if (['true', '1', 'yes'].includes(normalized)) return true;
  if (['false', '0', 'no'].includes(normalized)) return false;
  return fallback;
}

function parseCookies(cookieHeader) {
  const cookies = {};
  const source = typeof cookieHeader === 'string' ? cookieHeader : '';
  source.split(';').forEach((entry) => {
    const separator = entry.indexOf('=');
    if (separator === -1) return;
    const key = entry.slice(0, separator).trim();
    const value = entry.slice(separator + 1).trim();
    if (!key) return;
    cookies[key] = decodeURIComponent(value);
  });
  return cookies;
}

function createSessionManager() {
  const sessions = new Map();

  function cleanup() {
    const now = Date.now();
    for (const [token, expiresAt] of sessions.entries()) {
      if (expiresAt <= now) {
        sessions.delete(token);
      }
    }
  }

  return {
    create() {
      cleanup();
      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token, Date.now() + SESSION_TTL_MS);
      return token;
    },
    isValid(token) {
      cleanup();
      if (!token) return false;
      const expiresAt = sessions.get(token);
      if (!expiresAt || expiresAt <= Date.now()) {
        sessions.delete(token);
        return false;
      }
      sessions.set(token, Date.now() + SESSION_TTL_MS);
      return true;
    },
    remove(token) {
      if (token) sessions.delete(token);
    }
  };
}

function getSessionToken(req) {
  const cookies = parseCookies(req.headers.cookie);
  return typeof cookies[SESSION_COOKIE] === 'string' && cookies[SESSION_COOKIE] ? cookies[SESSION_COOKIE] : null;
}

function setSessionCookie(res, token) {
  const secure = booleanFromEnv(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production');
  const attributes = [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`
  ];
  if (secure) attributes.push('Secure');
  res.setHeader('Set-Cookie', attributes.join('; '));
}

function clearSessionCookie(res) {
  const secure = booleanFromEnv(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production');
  const attributes = [
    `${SESSION_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0'
  ];
  if (secure) attributes.push('Secure');
  res.setHeader('Set-Cookie', attributes.join('; '));
}

function createUploadMiddleware() {
  return multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, uploadsDir),
      filename: (_req, file, cb) => {
        const originalExtension = path.extname(file.originalname || '').toLowerCase().replace(/^\./, '');
        const extension = ALLOWED_UPLOAD_EXTENSIONS.has(originalExtension) ? originalExtension : 'bin';
        cb(null, `upload_${Date.now()}_${crypto.randomBytes(8).toString('hex')}.${extension}`);
      }
    }),
    limits: { fileSize: MAX_UPLOAD_BYTES },
    fileFilter: (_req, file, cb) => {
      const extension = path.extname(file.originalname || '').toLowerCase().replace(/^\./, '');
      if (!ALLOWED_UPLOAD_EXTENSIONS.has(extension)) {
        cb(new Error('unsupported_file_type'));
        return;
      }
      cb(null, true);
    }
  });
}

function createCorsOptions() {
  const allowedOrigins = new Set(
    (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
  );

  [
    process.env.DEV_FRONTEND_URL || 'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5173'
  ].forEach((origin) => allowedOrigins.add(origin));

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true
  };
}

module.exports = {
  MAX_JSON_BYTES,
  clearSessionCookie,
  createCorsOptions,
  createSessionManager,
  createUploadMiddleware,
  getSessionToken,
  parsePort,
  setSessionCookie
};
