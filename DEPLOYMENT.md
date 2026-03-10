# PC Paradise Coolify Deployment

## Domains

- public site: `pc.ibnbatoutaweb.com`
- admin site: `admin.pc.ibnbatoutaweb.com`

## DNS

Add these records:
- `A pc -> 85.31.239.111`
- `A admin.pc -> 85.31.239.111`

## Coolify app settings

Create one application from `yassernahri7-create/pc` using `Docker Compose`.

Environment variables:
- `WEBSITE_PORT=3004`
- `ADMIN_PORT=3104`
- `PRODUCT_DOMAIN=pc.ibnbatoutaweb.com`
- `ADMIN_DOMAIN=admin.pc.ibnbatoutaweb.com`
- `ADMIN_USER=admin`
- `ADMIN_PASS=<strong-password>`
- `COOKIE_SECURE=true`
- `DATA_DIR=/app/storage/data`
- `UPLOADS_DIR=/app/storage/uploads`
- `DEV_FRONTEND_URL=http://localhost:5173`

## Domain assignment in Coolify

Use generated domains first. After that works, switch to:
- website: `https://pc.ibnbatoutaweb.com:3004`
- admin: `https://admin.pc.ibnbatoutaweb.com:3104`

## Storage

The app uses one persisted volume at `/app/storage`.
It contains:
- `data/products.json`
- `data/settings.json`
- `data/blogs.json`
- uploaded images

The first deployment seeds storage from the repo copies in `server/data/` and `server/uploads/`.

## Auto deploy

GitHub Actions triggers Coolify if these repo secrets exist:
- `COOLIFY_WEBHOOK_PROD`
- `COOLIFY_TOKEN_PROD`
