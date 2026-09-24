import React from 'react';
import { X, Check } from 'lucide-react';
import { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const FABRICS = ['Chanderi', 'Satin Silk', 'Cotton', 'Kota Doria', 'Organza'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const TECHNIQUES = ['Solid', 'Handpainted', 'Zari Embroidery', 'Gota Lace Work', 'Hand Block Print'];
const OCCASIONS = ['Festive', 'Wedding / Festive', 'Day Festive / Puja', 'Casual / Workwear', 'Sangeet / Reception'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const current = (filters[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    onFilterChange({
      ...filters,
      [key]: updated,
    });
  };

  const toggleAvailability = () => {
    onFilterChange({
      ...filters,
      availability: filters.availability === true ? null : true,
    });
  };

  return (
    <aside className={`space-y-6 ${isMobileDrawer ? 'p-6' : 'pr-6'}`}>
      {/* Mobile Header */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="font-heading text-lg uppercase tracking-luxury text-gray-900 font-semibold">
            Filters
          </h3>
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="p-1.5 text-gray-400 hover:text-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Clear Filters bar */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <span className="text-xs uppercase font-bold tracking-wider text-gray-800">
          Refine By
        </span>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs text-brand-pink hover:underline uppercase font-semibold"
        >
          Reset All
        </button>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
          Availability
        </h4>
        <label className="flex items-center space-x-2.5 text-xs text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.availability === true}
            onChange={toggleAvailability}
            className="rounded border-gray-300 text-brand-pink focus:ring-brand-pink w-4 h-4"
          />
          <span>In stock only</span>
        </label>
      </div>

      {/* Size Filter */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
          Garment Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleArrayFilter('sizes', size)}
                className={`text-xs font-bold w-9 h-9 rounded flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric Filter */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
          Fabric
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {FABRICS.map((fabric) => {
            const isSelected = filters.fabrics.includes(fabric);
            return (
              <label
                key={fabric}
                className="flex items-center space-x-2.5 text-xs text-gray-700 cursor-pointer select-none py-0.5 hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleArrayFilter('fabrics', fabric)}
                  className="rounded border-gray-300 text-brand-pink focus:ring-brand-pink w-4 h-4"
                />
                <span>{fabric}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Technique Filter */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
          Technique / Work
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {TECHNIQUES.map((tech) => {
            const isSelected = filters.techniques.includes(tech);
            return (
              <label
                key={tech}
                className="flex items-center space-x-2.5 text-xs text-gray-700 cursor-pointer select-none py-0.5 hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleArrayFilter('techniques', tech)}
                  className="rounded border-gray-300 text-brand-pink focus:ring-brand-pink w-4 h-4"
                />
                <span>{tech}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Occasion Filter */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
          Occasion
        </h4>
        <div className="space-y-1.5">
          {OCCASIONS.map((occ) => {
            const isSelected = filters.occasions.includes(occ);
            return (
              <label
                key={occ}
                className="flex items-center space-x-2.5 text-xs text-gray-700 cursor-pointer select-none py-0.5 hover:text-black"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleArrayFilter('occasions', occ)}
                  className="rounded border-gray-300 text-brand-pink focus:ring-brand-pink w-4 h-4"
                />
                <span>{occ}</span>
              </label>
            );
          })}
        </div>
      </div>

      {isMobileDrawer && (
        <div className="pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full py-3 bg-brand-dark hover:bg-black text-white font-bold text-xs uppercase tracking-luxury rounded"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
};
