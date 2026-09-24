import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.specifications.fabric.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16 sm:pt-24">
        <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 border border-gray-100">
          {/* Search Input Bar */}
          <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search suit sets, lehengas, kurtas, chanderi..."
              autoFocus
              className="w-full text-base focus:outline-none placeholder-gray-400 font-normal"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-gray-400 hover:text-black uppercase tracking-wider"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="p-4 bg-brand-ivory/50 border-b border-gray-100 flex flex-wrap gap-2 text-xs">
            <span className="text-gray-500 font-medium py-1">Popular searches:</span>
            {['Vibha Magenta', 'Chanderi Suit', 'Satin Lehenga', 'Handpainted', 'Under 4999'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 bg-white border border-gray-200 rounded-full hover:border-black text-gray-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-4">
            {query.trim() && filteredProducts.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No matching outfits found for "{query}". Try checking the spelling or search by fabric like "Chanderi" or "Satin".
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                  Products ({filteredProducts.length})
                </span>
                {filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/products/${p.handle}`}
                    onClick={onClose}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors group"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-12 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-brand-pink truncate">
                        {p.title}
                      </h4>
                      <div className="text-xs text-gray-500 flex items-center space-x-2 mt-0.5">
                        <span className="font-bold text-gray-900">
                          ₹{p.salePrice.toLocaleString('en-IN')}
                        </span>
                        {p.regularPrice > p.salePrice && (
                          <span className="line-through text-gray-400">
                            ₹{p.regularPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[10px] text-brand-pink font-bold">
                          {p.discountPercentage}% OFF
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            )}

            {!query.trim() && (
              <div className="text-center py-6 text-xs text-gray-400">
                Type keywords above to find matching outfits in real-time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
