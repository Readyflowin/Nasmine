import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Link } from 'react-router-dom';

export const CuratedCollections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'new'>('bestsellers');

  const displayedProducts =
    activeTab === 'bestsellers'
      ? PRODUCTS.filter((p) => p.bestseller)
      : PRODUCTS.filter((p) => p.tags.includes('New Arrivals') || p.discountPercentage < 55);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-gray-400 tracking-[0.25em] uppercase block mb-1">
            Handcrafted Perfection
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl tracking-luxury uppercase text-gray-900 font-normal">
            Trending This Season
          </h2>

          {/* Tab Switcher */}
          <div className="flex justify-center space-x-8 mt-6 border-b border-gray-100">
            <button
              type="button"
              onClick={() => setActiveTab('bestsellers')}
              className={`pb-3 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all relative ${
                activeTab === 'bestsellers'
                  ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-pink'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              100-Day Bestsellers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className={`pb-3 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all relative ${
                activeTab === 'new'
                  ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-pink'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Fresh Arrivals
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Category Banners Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden group">
            <img
              src="https://cdn.shopify.com/s/files/1/2542/7564/files/1_4f82314f-c3c9-43c5-88cf-f72efa475255.jpg?v=1768903808"
              alt="Suit Sets"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] tracking-[0.3em] uppercase text-rose-300 font-bold">
                Festive Collection
              </span>
              <h3 className="font-heading text-2xl font-normal tracking-luxury uppercase mt-1">
                Chanderi & Doria Suits
              </h3>
              <p className="text-xs text-gray-300 mt-1 max-w-sm">
                Fine mulmul lining, umbrella cuts, and rich gota patti embroideries.
              </p>
              <Link
                to="/collections/suit-sets"
                className="mt-4 inline-block text-xs uppercase tracking-widest font-bold underline underline-offset-4 hover:text-rose-300"
              >
                Shop Suit Sets →
              </Link>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-sm overflow-hidden group">
            <img
              src="https://cdn.shopify.com/s/files/1/2542/7564/files/1_7258e590-b662-4a57-a602-f8ca515ef7ef.jpg?v=1768911739"
              alt="Bridal & Festive Lehengas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] tracking-[0.3em] uppercase text-rose-300 font-bold">
                Wedding Season
              </span>
              <h3 className="font-heading text-2xl font-normal tracking-luxury uppercase mt-1">
                Royal Satin Silk Lehengas
              </h3>
              <p className="text-xs text-gray-300 mt-1 max-w-sm">
                Grand flared skirts designed for cocktail nights, sangeet, and weddings.
              </p>
              <Link
                to="/collections/lehenga-set"
                className="mt-4 inline-block text-xs uppercase tracking-widest font-bold underline underline-offset-4 hover:text-rose-300"
              >
                Shop Lehenga Sets →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
