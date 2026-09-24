import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string | null>(null);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, 1);
    setShowSizePicker(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Image Container with Badges & Actions */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Link to={`/products/${product.handle}`} className="block w-full h-full">
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-brand-pink text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.readyToShip && (
            <span className="bg-[#1a1a1a] text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              Ready to Ship
            </span>
          )}
          {product.bestseller && !product.readyToShip && (
            <span className="bg-[#7d1a29] text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:text-brand-pink shadow-md z-10 transition-transform active:scale-90"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? 'fill-brand-pink text-brand-pink' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Quick Add / Size Selector Overlay */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm p-3 transition-all duration-300 z-10 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          {showSizePicker ? (
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center mb-1.5">
                Select Size to Add
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    disabled={!s.available}
                    onClick={(e) => handleQuickAdd(s.size, e)}
                    className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors ${
                      !s.available
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                        : 'border-gray-300 hover:border-black hover:bg-black hover:text-white text-gray-800'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowSizePicker(true);
              }}
              className="w-full py-2 bg-brand-dark hover:bg-black text-white text-[11px] font-bold tracking-widest uppercase rounded-sm flex items-center justify-center space-x-1.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Meta */}
      <div className="pt-3 pb-2 px-1 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-medium">
            {product.brand}
          </span>
          <Link
            to={`/products/${product.handle}`}
            className="mt-1 block text-xs sm:text-sm font-medium text-gray-800 hover:text-brand-pink line-clamp-1 leading-snug"
          >
            {product.title}
          </Link>
        </div>

        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-sm font-bold text-gray-900">
            ₹{product.salePrice.toLocaleString('en-IN')}
          </span>
          {product.regularPrice > product.salePrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.regularPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="text-[10px] font-bold text-brand-pink">
              ({product.discountPercentage}% OFF)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
