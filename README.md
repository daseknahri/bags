# Kago Bags Store

Client-ready React ecommerce storefront for a premium bag shop, with public catalog, product detail pages, WhatsApp ordering, promotions, journal posts, location page, and a protected admin panel for content updates.

## Local development

Install dependencies:

```bash
npm ci
```

Run the frontend:

```bash
npm run dev
```

Run the public API server:

```bash
npm run server:website
```

Run the admin API server:

```bash
npm run server:admin
```

Development defaults:

- website API: `http://localhost:3004`
- admin API: `http://localhost:3104`
- Vite frontend: `http://localhost:5173`

## Production

Use Docker Compose from the repository root. The first deployment seeds persistent storage from `server/data/` and serves generated product imagery from `public/assets/bags/`.

Important environment variables:

- `WEBSITE_PORT=3004`
- `ADMIN_PORT=3104`
- `PRODUCT_DOMAIN=<public-store-domain>`
- `ADMIN_DOMAIN=<admin-store-domain>`
- `ADMIN_USER=admin`
- `ADMIN_PASS=<strong-password>`
- `COOKIE_SECURE=true`
- `DATA_DIR=/app/storage/data`
- `UPLOADS_DIR=/app/storage/uploads`

## Ordering

Customers add bags to the cart and confirm the order through WhatsApp. Update the WhatsApp number in `server/data/settings.json` or from the admin settings screen after deployment.

## Deployment

The target GitHub repository is `daseknahri/bags`. Detailed Coolify notes are in `DEPLOYMENT.md`.
