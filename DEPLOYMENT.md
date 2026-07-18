# PuaFeli Bags Coolify Deployment

## Repository

Use the GitHub repository:

```text
daseknahri/bags
```

## Domains

Set these to the client domains you choose:

- public site: `bags.example.com`
- admin site: `admin.bags.example.com`

## Coolify app settings

Create one application from `daseknahri/bags` using `Docker Compose`.

Environment variables:

- `WEBSITE_PORT=3004`
- `ADMIN_PORT=3104`
- `PRODUCT_DOMAIN=bags.example.com`
- `ADMIN_DOMAIN=admin.bags.example.com`
- `ADMIN_USER=admin`
- `ADMIN_PASS=<strong-password>`
- `COOKIE_SECURE=true`
- `DATA_DIR=/app/storage/data`
- `UPLOADS_DIR=/app/storage/uploads`
- `DEV_FRONTEND_URL=http://localhost:5173`

## Domain assignment in Coolify

Start with generated domains. After the services are healthy, switch to:

- website: `https://bags.example.com:3004`
- admin: `https://admin.bags.example.com:3104`

## Storage

The app uses one persisted volume at `/app/storage`.
It contains:

- `data/products.json`
- `data/settings.json`
- `data/blogs.json`
- uploaded images

The first deployment seeds storage from the repo copies in `server/data/`. If you already deployed an older site into the same volume, clear or migrate the persisted `data/` files so the new bag catalog is used.

## Auto deploy

GitHub Actions triggers Coolify if these repo secrets exist:

- `COOLIFY_WEBHOOK_PROD`
- `COOLIFY_TOKEN_PROD`
