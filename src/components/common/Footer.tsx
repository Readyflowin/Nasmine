import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#191919] text-gray-300 pt-16 pb-12 border-t border-gray-800 w-full overflow-hidden">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-gray-800 w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-pink flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Free Domestic Shipping</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">On all prepaid & COD orders in India</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-pink flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Easy Exchanges</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Hassle-free 48h exchange policy</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-pink flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">100% Handcrafted</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Artisanal quality straight from Jaipur</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-pink flex-shrink-0">
              <span className="text-lg font-bold">220+</span>
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Worldwide Shipping</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Express DHL & Aramex delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-start">
              <BrandLogo variant="footer" className="!items-start" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed pr-6">
              Nasmine celebrates feminine grace with handcrafted female kurtis, heirloom lehengas, breezy anarkalis, and artisanal prints, blending timeless craftsmanship with contemporary silhouettes.
            </p>

            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span>Mansarovar Industrial Area, Jaipur, Rajasthan 302020</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span>+91 141 3550000 (Mon-Sat, 9:30 AM - 6:30 PM)</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span>support@nasmine.com</span>
              </p>
            </div>

            {/* Social Icons (SVGs) */}
            <div className="flex space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-white uppercase font-bold mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/collections/sos-sale" className="hover:text-white transition-colors">Tyohar Sale</Link></li>
              <li><Link to="/collections/suit-sets" className="hover:text-white transition-colors">Suit Sets</Link></li>
              <li><Link to="/collections/kurta-set" className="hover:text-white transition-colors">Kurta Sets</Link></li>
              <li><Link to="/collections/lehenga-set" className="hover:text-white transition-colors">Lehenga Sets</Link></li>
              <li><Link to="/collections/saree" className="hover:text-white transition-colors">Sarees</Link></li>
              <li><Link to="/collections/western-wear" className="hover:text-white transition-colors">Western Wear</Link></li>
              <li><Link to="/collections/footwear" className="hover:text-white transition-colors">Footwear & Juttis</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-white uppercase font-bold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#track" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#exchange" className="hover:text-white transition-colors">Exchange & Returns</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help & FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="font-heading text-xs tracking-widest text-white uppercase font-bold mb-4">
              Get 10% Off
            </h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Subscribe to unlock secret festive drops, private sales, and special offers.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 rounded text-xs text-green-400 font-medium">
                Thank you for subscribing! Use coupon <strong>NASMINE10</strong> on your order.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full text-xs p-2.5 bg-white/10 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold uppercase tracking-luxury rounded transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 space-y-4 sm:space-y-0">
        <div>
          © {new Date().getFullYear()} Nasmine Kurtis Private Limited. All rights reserved.
        </div>
        <div className="flex items-center space-x-3 text-xs opacity-75">
          <span>UPI</span>
          <span>•</span>
          <span>RuPay</span>
          <span>•</span>
          <span>Visa</span>
          <span>•</span>
          <span>Mastercard</span>
          <span>•</span>
          <span>NetBanking</span>
          <span>•</span>
          <span>Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};
