import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

export const App: React.FC = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-white text-[#404040] w-full max-w-full">
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Sticky Navigation Header */}
          <Header onOpenSearch={() => setSearchModalOpen(true)} />

          {/* Main View Routes */}
          <main className="flex-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Collections (e.g. /collections/sos-sale, /collections/suit-sets) */}
              <Route path="/collections/:category" element={<CollectionPage />} />

              {/* PDP with collection context (e.g. /collections/sos-sale/products/vibha-magenta-solid-chanderi-suit-set) */}
              <Route
                path="/collections/:category/products/:id"
                element={<ProductDetailPage />}
              />

              {/* Direct PDP route (e.g. /products/vibha-magenta-solid-chanderi-suit-set) */}
              <Route path="/products/:id" element={<ProductDetailPage />} />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <SearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
          />

          {/* Footer */}
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
