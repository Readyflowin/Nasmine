import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Timer, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const FlashSaleSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });
  const [activePriceFilter, setActivePriceFilter] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  const filteredProducts = activePriceFilter
    ? PRODUCTS.filter((p) => p.salePrice <= activePriceFilter)
    : PRODUCTS.slice(0, 4);

  return (
    <section className="py-14 bg-gradient-to-b from-brand-ivory to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center space-x-1 text-xs font-bold text-red-600 tracking-widest uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Period Festive Steal</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-gray-900 tracking-luxury uppercase font-normal">
              TYOHAR SOS SALE
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Heavily discounted chanderi suits, satin lehengas, and designer sets.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-white px-4 py-2 rounded border border-red-200 shadow-sm">
            <Timer className="w-4 h-4 text-red-600 animate-pulse" />
            <span className="text-xs text-gray-600 uppercase font-semibold">Ends In:</span>
            <div className="flex space-x-1 text-xs font-mono font-bold text-red-700">
              <span className="bg-red-50 px-1.5 py-0.5 rounded">{format(timeLeft.hours)}h</span>
              <span>:</span>
              <span className="bg-red-50 px-1.5 py-0.5 rounded">{format(timeLeft.minutes)}m</span>
              <span>:</span>
              <span className="bg-red-50 px-1.5 py-0.5 rounded">{format(timeLeft.seconds)}s</span>
            </div>
          </div>
        </div>

        {/* Quick Price Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActivePriceFilter(null)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all uppercase tracking-wider ${
              activePriceFilter === null
                ? 'bg-[#1a1a1a] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
            }`}
          >
            All Festive Deals
          </button>
          {[
            { label: 'Under ₹3,500', max: 3500 },
            { label: 'Under ₹5,000', max: 5000 },
            { label: 'Under ₹7,000', max: 7000 },
            { label: 'Under ₹12,000', max: 12000 }
          ].map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => setActivePriceFilter(pill.max)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all uppercase tracking-wider ${
                activePriceFilter === pill.max
                  ? 'bg-[#1a1a1a] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/collections/sos-sale"
            className="btn-shine inline-flex items-center space-x-2 px-8 py-3 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold uppercase tracking-luxury rounded shadow-md transition-all"
          >
            <span>View All SOS Sale Styles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
