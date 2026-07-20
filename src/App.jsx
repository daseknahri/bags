import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Catalog from './pages/Catalog';
import Promotions from './pages/Promotions';
import About from './pages/About';
import LocationPage from './pages/Location';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin/*" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  );
}

export default App;
