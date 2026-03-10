# PC Paradise - Premium Tech Catalog

A full-stack web application for a tech shop featuring a dynamic product catalog, administration panel, and bilingual support (EN/FR).

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and a `.env` file in the `server/` directory based on the provided `.env.example` files.

#### Root `.env` (Frontend)
```env
VITE_API_URL=http://localhost:3002/api
```

#### `server/.env` (Backend)
```env
PORT=3002
BASE_URL=http://localhost:3002
ALLOWED_ORIGINS=http://localhost:5173
```

### 4. Running the Application

#### Start Backend
```bash
npm run server
```

#### Start Frontend (Development)
```bash
npm run dev
```

## 🛠 Features
- **Dynamic Catalog:** Browse products fetched from a JSON-based database.
- **Admin Panel:** (/admin) Secure access to manage products, promotions, and site settings.
- **Bilingual Interface:** Automatic browser language detection with manual toggle (EN/FR).
- **Responsive Design:** Optimized for mobile and desktop viewing.
- **WhatsApp Integration:** Direct order confirmation via WhatsApp.

## 📦 Tech Stack
- **Frontend:** React, Vite, Lucide Icons, Axios, i18next.
- **Backend:** Node.js, Express.js, Multer (file uploads).
- **Database:** Local JSON files for lightweight, fast data management.

## 🔒 Security Note
- Default admin credentials: `admin` / `admin` (Change these in the Admin Settings).
- The `auth.json` file and uploaded images are ignored by Git for security.
