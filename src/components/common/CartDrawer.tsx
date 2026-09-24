import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalSaved,
    itemCount,
    amountNeededForFreeShipping,
    freeShippingThreshold,
  } = useCart();

  const [orderNote, setOrderNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gray-800" />
              <h2 className="font-heading text-lg tracking-luxury uppercase font-normal text-gray-900">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-semibold">
                {itemCount}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-brand-ivory p-3.5 border-b border-gray-100">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-xs text-center text-gray-700 font-medium">
                Add <strong className="text-brand-maroon">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more to unlock <strong className="text-green-700">FREE SHIPPING</strong>!
              </p>
            ) : (
              <div className="flex items-center justify-center space-x-1 text-xs text-green-700 font-semibold">
                <Truck className="w-4 h-4" />
                <span>Congratulations! You qualify for FREE Shipping across India!</span>
              </div>
            )}
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-brand-pink h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-heading text-lg tracking-wider text-gray-800 uppercase mb-2">
                  Your bag is empty
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Discover exquisite festive suit sets, lehengas, and handprinted kurtas crafted with elegance.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-brand-dark hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex space-x-4 border-b border-gray-100 pb-4 relative group"
                >
                  <Link
                    to={`/products/${item.product.handle}`}
                    onClick={closeCart}
                    className="w-20 h-28 flex-shrink-0 bg-gray-50 rounded overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-6">
                        <Link
                          to={`/products/${item.product.handle}`}
                          onClick={closeCart}
                          className="text-xs sm:text-sm font-medium text-gray-900 hover:text-brand-pink line-clamp-2 leading-snug"
                        >
                          {item.product.title}
                        </Link>
                      </div>

                      <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium">
                          Size: {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-700 font-medium">In Stock</span>
                      </div>

                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">
                          ₹{(item.product.salePrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.product.regularPrice > item.product.salePrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{(item.product.regularPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Order Note Expandable */}
            {items.length > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteInput(!showNoteInput)}
                  className="text-xs text-gray-600 hover:text-black underline underline-offset-2"
                >
                  {showNoteInput ? 'Hide order instructions' : '+ Add order instructions / gift note'}
                </button>
                {showNoteInput && (
                  <textarea
                    rows={2}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Custom sizing notes, gift message, or delivery instructions..."
                    className="w-full mt-2 text-xs p-2 border border-gray-200 rounded focus:border-black focus:outline-none"
                  />
                )}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/70 space-y-3">
              {totalSaved > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded flex items-center justify-between font-medium">
                  <span>Total Festival Discount Applied:</span>
                  <span className="font-bold">₹{totalSaved.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-[11px] text-gray-500">
                Taxes included. Free shipping available across India.
              </p>

              {checkoutStep ? (
                <div className="bg-white p-4 rounded border border-gray-200 text-center space-y-2">
                  <p className="text-xs font-semibold text-green-700">Simulating Secure Checkout...</p>
                  <p className="text-[11px] text-gray-500">Connecting to payment gateway (UPI / Cards / COD)...</p>
                  <button
                    type="button"
                    onClick={() => {
                      alert('Order confirmed! In a production deployment, this redirects to Razorpay/GoKwik.');
                      setCheckoutStep(false);
                      closeCart();
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded"
                  >
                    Confirm Mock Order (₹{subtotal.toLocaleString('en-IN')})
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(true)}
                    className="btn-shine w-full py-3.5 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold uppercase tracking-luxury rounded-sm flex items-center justify-center space-x-2 shadow-md transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* GoKwik / Fast One-Click Checkout simulation button */}
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(true)}
                    className="w-full py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center space-x-2 shadow-sm transition-all"
                  >
                    <span>Instant UPI / One-Click Checkout</span>
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center space-x-4 pt-1 text-[10px] text-gray-500">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gray-600" /> 100% Safe Payments
                </span>
                <span className="flex items-center">
                  <Truck className="w-3.5 h-3.5 mr-1 text-gray-600" /> Free Shipping
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
