# PC Paradise Secure Deployment

This repository is prepared for a split public/admin deployment on Coolify.

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

The frontend automatically uses the website API on public routes and the admin API on `/admin` routes.

## Production domains

- public site: `pc.ibnbatoutaweb.com`
- admin site: `admin.pc.ibnbatoutaweb.com`

## Environment variables

See [.env.example](.env.example).

Key values for production:
- `WEBSITE_PORT=3004`
- `ADMIN_PORT=3104`
- `PRODUCT_DOMAIN=pc.ibnbatoutaweb.com`
- `ADMIN_DOMAIN=admin.pc.ibnbatoutaweb.com`
- `ADMIN_USER=admin`
- `ADMIN_PASS=<strong-password>`
- `COOKIE_SECURE=true`
- `DATA_DIR=/app/storage/data`
- `UPLOADS_DIR=/app/storage/uploads`

## Security model

- public server exposes only read APIs
- admin writes require server-side session auth
- admin credentials are read only from environment variables
- uploads require admin auth and are size/type limited

## Deployment

Use Coolify with `Docker Compose` and the repository root `docker-compose.yml`.
Detailed deployment steps are in [DEPLOYMENT.md](DEPLOYMENT.md).
