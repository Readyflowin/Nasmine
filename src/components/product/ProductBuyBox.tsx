import React, { useState } from 'react';
import { Star, Heart, Share2, Ruler, ShieldCheck, Truck, Zap, Tag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { SizeChartModal } from './SizeChartModal';
import { PincodeChecker } from './PincodeChecker';

interface ProductBuyBoxProps {
  product: Product;
}

export const ProductBuyBox: React.FC<ProductBuyBoxProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activeSizeObj = product.sizes.find((s) => s.size === selectedSize);

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Brand & Title */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1 text-xs text-amber-500 font-semibold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-gray-900">{product.rating}</span>
            <span className="text-gray-400">({product.reviewCount} reviews)</span>
          </div>
        </div>

        <h1 className="font-heading text-xl sm:text-2xl lg:text-3xl text-gray-900 tracking-luxury uppercase font-normal mt-1 leading-snug">
          {product.title}
        </h1>
        {product.subTitle && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {product.subTitle}
          </p>
        )}
      </div>

      {/* Price Strip */}
      <div className="flex items-baseline space-x-3 pb-3 border-b border-gray-100">
        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
          ₹{product.salePrice.toLocaleString('en-IN')}
        </span>
        {product.regularPrice > product.salePrice && (
          <span className="text-base text-gray-400 line-through">
            MRP ₹{product.regularPrice.toLocaleString('en-IN')}
          </span>
        )}
        {product.discountPercentage > 0 && (
          <span className="bg-brand-pink text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>
      <p className="text-[11px] text-gray-500 -mt-3">
        Inclusive of all taxes. Free shipping on prepaid & COD orders across India.
      </p>

      {/* Special Festive Offers Box */}
      <div className="bg-brand-ivory border border-amber-200/80 rounded p-3 text-xs space-y-1.5">
        <div className="flex items-center space-x-1.5 font-bold text-brand-maroon uppercase tracking-wide">
          <Tag className="w-3.5 h-3.5" />
          <span>Active Festival Offers:</span>
        </div>
        <p className="text-gray-700">
          • Use code <strong className="bg-white px-1.5 py-0.5 border border-amber-300 rounded font-mono font-bold text-brand-maroon">FESTIVE10</strong> to get additional 10% off at checkout.
        </p>
        <p className="text-gray-700">
          • Flat ₹500 off on orders above ₹4,999 with code <strong className="font-mono font-bold">UTSAV500</strong>.
        </p>
      </div>

      {/* Size Selector */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase font-bold tracking-wider text-gray-800">
            Select Size: <strong className="text-black">{selectedSize}</strong>
          </span>
          <button
            type="button"
            onClick={() => setIsSizeChartOpen(true)}
            className="flex items-center space-x-1 text-brand-maroon hover:text-black font-semibold uppercase tracking-wider underline underline-offset-2"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size Guide</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((s) => {
            const isSelected = selectedSize === s.size;
            return (
              <button
                key={s.size}
                type="button"
                disabled={!s.available}
                onClick={() => setSelectedSize(s.size)}
                className={`min-w-[44px] h-11 px-3 text-xs font-bold rounded-sm border uppercase tracking-wider transition-all relative ${
                  !s.available
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through bg-gray-50'
                    : isSelected
                    ? 'border-black bg-black text-white shadow-sm'
                    : 'border-gray-300 text-gray-800 hover:border-black bg-white'
                }`}
              >
                {s.size}
              </button>
            );
          })}
        </div>

        {activeSizeObj?.stockCount && activeSizeObj.stockCount <= 4 && (
          <p className="text-[11px] text-amber-700 font-semibold animate-pulse">
            ⚡ Hurry! Only {activeSizeObj.stockCount} items left in size {selectedSize}!
          </p>
        )}
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 pt-2 w-full">
        <div className="flex space-x-2 sm:space-x-3 w-full">
          {/* Quantity selector */}
          <div className="flex items-center border border-gray-300 rounded text-xs flex-shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2.5 sm:px-3 py-3 text-gray-600 hover:bg-gray-100 font-bold"
            >
              -
            </button>
            <span className="px-2 sm:px-3 py-3 font-semibold text-gray-900 min-w-[28px] sm:min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-2.5 sm:px-3 py-3 text-gray-600 hover:bg-gray-100 font-bold"
            >
              +
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-shine flex-1 min-w-0 py-3.5 bg-brand-dark hover:bg-black text-white text-xs font-bold uppercase tracking-luxury rounded-sm shadow-md transition-all flex items-center justify-center space-x-1.5 sm:space-x-2"
          >
            <span className="truncate">Add to Cart</span>
          </button>

          {/* Wishlist toggle */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`p-3 sm:p-3.5 rounded-sm border transition-colors flex-shrink-0 ${
              isFavorited
                ? 'border-brand-pink text-brand-pink bg-rose-50'
                : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-brand-pink' : ''}`} />
          </button>
        </div>

        {/* Buy Now / GoKwik Instant button */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full py-4 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-extrabold uppercase tracking-luxury rounded-sm shadow-lg transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Buy It Now (Fast Checkout)</span>
        </button>
      </div>

      {/* Indian Pincode Delivery Checker */}
      <PincodeChecker />

      {/* Share & Trust Perks */}
      <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center space-x-1.5 hover:text-black transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Outfit'}</span>
        </button>

        <div className="flex items-center space-x-3 text-[11px]">
          <span className="flex items-center">
            <Truck className="w-3.5 h-3.5 mr-1 text-gray-600" /> Free Dispatch
          </span>
          <span className="flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gray-600" /> 100% Original
          </span>
        </div>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        sizeChart={product.sizeChart}
      />
    </div>
  );
};
