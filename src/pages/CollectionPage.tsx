import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, Grid, LayoutGrid, Home } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { FilterSidebar } from '../components/collection/FilterSidebar';
import { ProductCard } from '../components/common/ProductCard';
import { FilterState, Product } from '../types';

export const CollectionPage: React.FC = () => {
  const { category = 'sos-sale' } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const [filters, setFilters] = useState<FilterState>({
    availability: searchParams.get('filter.v.availability') === '1' ? true : null,
    priceRanges: [],
    sizes: [],
    fabrics: [],
    techniques: [],
    colors: [],
    occasions: [],
    sortBy: 'featured',
  });

  const clearFilters = () => {
    setFilters({
      availability: null,
      priceRanges: [],
      sizes: [],
      fabrics: [],
      techniques: [],
      colors: [],
      occasions: [],
      sortBy: 'featured',
    });
  };

  // Determine collection metadata based on route
  const collectionTitle = useMemo(() => {
    switch (category) {
      case 'sos-sale':
        return 'TYOHAR SOS SALE';
      case 'suit-sets':
        return 'SUIT SETS';
      case 'lehenga-set':
        return 'LEHENGA SETS';
      case 'kurta-set':
        return 'KURTA SETS';
      case 'bestseller-100-days':
        return '100-DAY BESTSELLERS';
      case 'new-arrivals':
        return 'NEW ARRIVALS';
      default:
        return category.replace(/-/g, ' ').toUpperCase();
    }
  }, [category]);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    const priceParam = searchParams.get('price');
    const discountParam = searchParams.get('discount');

    return PRODUCTS.filter((product: Product) => {
      // Route Category filter
      if (category === 'suit-sets' && product.subCategory !== 'Suit Sets') {
        return false;
      }
      if (category === 'lehenga-set' && product.subCategory !== 'Lehenga Sets') {
        return false;
      }
      if (category === 'kurta-set' && product.subCategory !== 'Kurta Sets') {
        return false;
      }
      if (category === 'ready-to-ship' && !product.readyToShip) {
        return false;
      }
      if (category === 'bestseller-100-days' && !product.bestseller) {
        return false;
      }
      if (category === 'new-arrivals' && !product.tags.includes('New Arrivals')) {
        return false;
      }
      if (category === 'sos-sale' && !product.tags.includes('Tyohar Sale')) {
        return false;
      }

      // Query param price filters
      if (priceParam === 'under-999' && product.salePrice > 999) return false;
      if (priceParam === 'under-1999' && product.salePrice > 1999) return false;
      if (priceParam === 'under-2999' && product.salePrice > 2999) return false;
      if (priceParam === 'under-4999' && product.salePrice > 4999) return false;

      // Query param discount filters
      if (discountParam && product.discountPercentage < Number(discountParam)) {
        return false;
      }

      // In-stock availability
      if (filters.availability === true && !product.inStock) {
        return false;
      }

      // Sizes filter
      if (filters.sizes.length > 0) {
        const hasSize = product.sizes.some(
          (s) => filters.sizes.includes(s.size) && s.available
        );
        if (!hasSize) return false;
      }

      // Fabrics filter
      if (filters.fabrics.length > 0) {
        const hasFabric = filters.fabrics.some((f) =>
          product.specifications.fabric.toLowerCase().includes(f.toLowerCase())
        );
        if (!hasFabric) return false;
      }

      // Techniques filter
      if (filters.techniques.length > 0) {
        const hasTechnique = filters.techniques.some((t) =>
          product.specifications.technique.toLowerCase().includes(t.toLowerCase())
        );
        if (!hasTechnique) return false;
      }

      // Occasions filter
      if (filters.occasions.length > 0) {
        const hasOccasion = filters.occasions.some((o) =>
          product.specifications.occasion.toLowerCase().includes(o.toLowerCase())
        );
        if (!hasOccasion) return false;
      }

      return true;
    }).sort((a: Product, b: Product) => {
      if (filters.sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (filters.sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (filters.sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [filters, category, searchParams]);

  const activeFilterCount =
    (filters.availability ? 1 : 0) +
    filters.sizes.length +
    filters.fabrics.length +
    filters.techniques.length +
    filters.occasions.length;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-100 bg-brand-ivory/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center space-x-2">
          <Link to="/" className="hover:text-black flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" /> Home
          </Link>
          <span>/</span>
          <span className="text-gray-400">Collections</span>
          <span>/</span>
          <span className="font-semibold text-gray-800">{collectionTitle}</span>
        </div>
      </div>

      {/* Collection Hero Header */}
      <div className="bg-brand-cream/60 py-10 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] font-bold tracking-[0.25em] text-brand-maroon uppercase block mb-1">
            Handcrafted Luxury Collection
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-gray-900 tracking-luxury uppercase font-normal mb-3">
            {collectionTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            Discover bespoke ethnic silhouettes handcrafted in Jaipur. Featuring festive Chanderi suits, flared kalidar lehengas, and artisanal embroidery.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar: Filter Trigger, Count, Sort, Grid Switcher */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-gray-200 gap-4">
          <div className="flex items-center space-x-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded text-xs uppercase font-bold tracking-wider hover:border-black transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <span className="text-xs text-gray-500 font-medium">
              Showing <strong>{filteredProducts.length}</strong> products
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500 uppercase font-semibold hidden sm:inline">
                Sort By:
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="text-xs border border-gray-200 rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-black uppercase font-medium cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            {/* Grid Column Selector (Desktop) */}
            <div className="hidden md:flex items-center space-x-1 border-l border-gray-200 pl-4">
              <button
                type="button"
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded ${gridCols === 3 ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-black'}`}
                title="3 Columns"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded ${gridCols === 4 ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-black'}`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout Grid: Desktop Sidebar + Product Grid */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-100">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded p-8">
                <h3 className="font-heading text-lg text-gray-800 uppercase mb-2">
                  No Outfits Match Your Filters
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Try clearing some filter options like size or fabric to view more options.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-brand-dark text-white text-xs uppercase tracking-widest font-bold rounded"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'
                } gap-4 sm:gap-6`}
              >
                {filteredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full shadow-2xl z-10 overflow-y-auto">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
