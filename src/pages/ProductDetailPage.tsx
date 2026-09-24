import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, Star, CheckCircle, MessageSquarePlus } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductBuyBox } from '../components/product/ProductBuyBox';
import { ProductAccordions } from '../components/product/ProductAccordions';
import { ProductCard } from '../components/common/ProductCard';
import { Product, Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>(
    PRODUCTS.find((p: Product) => p.handle === id || p.id === id) || PRODUCTS[0]
  );
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(false);

  useEffect(() => {
    const found = PRODUCTS.find((p: Product) => p.handle === id || p.id === id);
    if (found) {
      setProduct(found);
      window.scrollTo(0, 0);
    }
  }, [id]);

  const relatedProducts = useMemo(() => {
    const sameCategory = PRODUCTS.filter(
      (p: Product) => p.id !== product.id && p.subCategory === product.subCategory
    );
    const others = PRODUCTS.filter(
      (p: Product) => p.id !== product.id && p.subCategory !== product.subCategory
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [product]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      setSubmittedReview(true);
      setShowReviewForm(false);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Breadcrumb Trail */}
      <div className="border-b border-gray-100 bg-brand-ivory/40 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center space-x-2 overflow-x-auto whitespace-nowrap no-scrollbar w-full">
          <Link to="/" className="hover:text-black flex items-center flex-shrink-0">
            <Home className="w-3.5 h-3.5 mr-1" /> Home
          </Link>
          <span>/</span>
          <Link to="/collections/sos-sale" className="hover:text-black flex-shrink-0">
            Tyohar Sale
          </Link>
          <span>/</span>
          <Link to={`/collections/${product.subCategory.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black flex-shrink-0">
            {product.subCategory}
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-800 truncate max-w-[140px] sm:max-w-xs flex-shrink-0">{product.title}</span>
        </div>
      </div>

      {/* Main Product Layout (2 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
          {/* Left Column: Gallery (Sticky on desktop for parallel scrolling) */}
          <div className="lg:col-span-7 min-w-0 w-full lg:sticky lg:top-24 z-10 self-start">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Right Column: Buy Box & Details */}
          <div className="lg:col-span-5 min-w-0 w-full">
            <ProductBuyBox product={product} />
            <ProductAccordions product={product} />
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-20 pt-12 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-gray-100 gap-4">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl text-gray-900 uppercase tracking-luxury font-normal text-center sm:text-left">
                  Customer Reviews
                </h3>
                <div className="flex items-center space-x-2 mt-1 justify-center sm:justify-start">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{product.rating} out of 5</span>
                  <span className="text-xs text-gray-500">Based on {product.reviewCount} ratings</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="flex items-center space-x-2 px-6 py-2.5 border border-brand-dark hover:bg-black hover:text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleAddReview} className="my-6 p-6 bg-brand-ivory rounded border border-gray-200 space-y-4 animate-in fade-in-50">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gray-900">
                  Write Your Review for {product.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:border-black focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 - Flawless Fit & Quality)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                      <option value={3}>⭐⭐⭐ (3 - Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us about the fabric drape, fitting, festival compliments..."
                    className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:border-black focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs text-gray-600 hover:text-black uppercase font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold uppercase tracking-wider rounded"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            {submittedReview && (
              <div className="my-4 p-4 bg-green-50 text-green-800 rounded border border-green-200 text-xs font-medium">
                Thank you for your review! It has been submitted for moderation and will appear shortly.
              </div>
            )}

            {/* Reviews List */}
            <div className="mt-8 space-y-6">
              {product.reviews.map((rev: Review) => (
                <div key={rev.id} className="border-b border-gray-100 pb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-900">{rev.title}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{rev.date}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="flex items-center space-x-2 text-[11px] text-gray-500">
                    <span className="font-semibold text-gray-800">{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center text-emerald-700 font-medium">
                        <CheckCircle className="w-3 h-3 mr-0.5" /> Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* You May Also Like / Complete the Look Carousel */}
        <section className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-gray-400 tracking-[0.25em] uppercase block mb-1">
              Curated Pairs
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-gray-900 tracking-luxury uppercase font-normal">
              You May Also Like
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Trending festive ensembles from our Jaipur atelier.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
