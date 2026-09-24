import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, ChevronRight, User } from 'lucide-react';
import { NAVIGATION_DATA } from '../../data/categories';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { openCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const toggleMobileSubMenu = (title: string) => {
    setExpandedMobileCategory(expandedMobileCategory === title ? null : title);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 sm:h-20 w-full min-w-0">
            {/* Left: Mobile hamburger & Search trigger on Desktop */}
            <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
              <button
                type="button"
                className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-black focus:outline-none"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={onOpenSearch}
                className="hidden lg:flex items-center space-x-2 text-sm text-gray-500 hover:text-black py-1.5 px-3 rounded-full border border-gray-200 hover:border-gray-400 transition-all"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-xs tracking-wider">Search kurtis, lehengas...</span>
              </button>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-1 min-w-0 text-center lg:flex-initial px-1">
              <Link to="/" className="inline-block group text-center py-1 max-w-full">
                <BrandLogo variant="header" />
              </Link>
            </div>

            {/* Right: Actions (Search on mobile, User, Wishlist, Cart) */}
            <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
              <button
                type="button"
                onClick={onOpenSearch}
                className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-black"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/account"
                className="hidden sm:block p-2 text-gray-700 hover:text-black"
                title="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                to="/collections/sos-sale"
                className="p-1.5 sm:p-2 text-gray-700 hover:text-black relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-brand-pink text-white text-[9px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openCart}
                className="p-1.5 sm:p-2 text-gray-700 hover:text-black relative flex items-center"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0 sm:top-1 sm:right-0 bg-[#7d1a29] text-white text-[9px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-2 border-t border-gray-50">
            {NAVIGATION_DATA.map((item) => {
              const hasDropdown = item.subCategories && item.subCategories.length > 0;
              const isSale = item.badge === 'Sale' || item.title.includes('Sale');

              return (
                <div
                  key={item.title}
                  className="relative group py-2"
                  onMouseEnter={() => setHoveredCategory(item.title)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    to={item.href}
                    className={`inline-flex items-center text-[13px] tracking-[0.12em] uppercase font-medium transition-colors ${
                      isSale ? 'text-red-700 font-semibold' : 'text-gray-700 hover:text-brand-pink'
                    }`}
                  >
                    {item.title}
                    {item.badge && (
                      <span className={`ml-1.5 text-[9px] px-1.5 py-0.5 rounded tracking-normal font-bold uppercase ${
                        isSale ? 'bg-red-600 text-white' : 'bg-brand-pink text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-400 group-hover:text-black transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {hasDropdown && hoveredCategory === item.title && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-max max-w-4xl z-50 animate-in fade-in-50 duration-200">
                      <div className="bg-white shadow-2xl border border-gray-100 rounded-sm p-6 grid grid-flow-col auto-cols-max gap-12">
                        {item.subCategories!.map((sub) => (
                          <div key={sub.title} className="min-w-[160px]">
                            <h4 className="font-heading text-xs tracking-widest text-[#1a1a1a] font-bold pb-2 mb-3 border-b border-gray-100 uppercase">
                              {sub.title}
                            </h4>
                            {sub.items && (
                              <ul className="space-y-2 text-xs">
                                {sub.items.map((subItem) => (
                                  <li key={subItem.title}>
                                    <Link
                                      to={subItem.href}
                                      className="text-gray-600 hover:text-brand-pink hover:translate-x-1 transition-transform inline-block py-0.5"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}

                        {/* Featured Mega Menu Promo Tile */}
                        <div className="w-56 bg-brand-ivory p-4 rounded border border-amber-100 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold tracking-widest text-brand-maroon uppercase block">
                              Festive Spotlight
                            </span>
                            <h5 className="font-heading text-sm text-[#1a1a1a] font-bold mt-1">
                              Chanderi & Satin Elegance
                            </h5>
                            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                              Handcrafted with love in Jaipur. Up to 60% off during Tyohar Sale.
                            </p>
                          </div>
                          <Link
                            to="/collections/sos-sale"
                            className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-maroon hover:underline flex items-center"
                          >
                            Explore Collection <ChevronRight className="w-3 h-3 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full shadow-2xl z-10 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <BrandLogo variant="mobile" />
              </Link>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 py-3 px-4 space-y-1">
              {NAVIGATION_DATA.map((item) => {
                const hasSub = item.subCategories && item.subCategories.length > 0;
                const isExpanded = expandedMobileCategory === item.title;

                return (
                  <div key={item.title} className="border-b border-gray-50 py-1">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-sm tracking-luxury uppercase py-2 font-medium ${
                          item.badge === 'Sale' ? 'text-red-600 font-bold' : 'text-gray-800'
                        }`}
                      >
                        {item.title}
                        {item.badge && (
                          <span className="ml-2 text-[9px] bg-brand-pink text-white px-1.5 py-0.5 rounded font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>

                      {hasSub && (
                        <button
                          type="button"
                          onClick={() => toggleMobileSubMenu(item.title)}
                          className="p-2 text-gray-500 hover:text-black"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion submenu */}
                    {hasSub && isExpanded && (
                      <div className="pl-4 pb-2 space-y-3 pt-1">
                        {item.subCategories!.map((sub) => (
                          <div key={sub.title} className="space-y-1">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">
                              {sub.title}
                            </span>
                            {sub.items?.map((subItem) => (
                              <Link
                                key={subItem.title}
                                to={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-xs text-gray-600 hover:text-brand-pink py-1"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 bg-brand-ivory border-t border-gray-100 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4" />
                <span>My Account / Login</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Handcrafted in Rajasthan, India. Free domestic delivery.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
