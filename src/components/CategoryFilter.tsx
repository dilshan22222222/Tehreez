import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, X } from 'lucide-react';
import { ProductCategory } from '../types';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface CategoryFilterProps {
  categories: ProductCategory[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onlyInStock: boolean;
  onToggleInStock: () => void;
  onlyBestsellers: boolean;
  onToggleBestsellers: () => void;
  totalResults: number;
  categoryCounts: Record<ProductCategory, number>;
  searchQuery: string;
  onClearSearch: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onlyInStock,
  onToggleInStock,
  onlyBestsellers,
  onToggleBestsellers,
  totalResults,
  categoryCounts,
  searchQuery,
  onClearSearch,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Category Navigation Pills */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.14em] transition-all shrink-0 flex items-center gap-2 ${
              selectedCategory === cat
                ? 'bg-[#141517] text-white shadow-md font-semibold'
                : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80'
            }`}
          >
            <span>{cat}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              selectedCategory === cat 
                ? 'bg-white/20 text-white' 
                : 'bg-neutral-100 text-neutral-500'
            }`}>
              {categoryCounts[cat] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Secondary Controls Bar: Sort, Quick Toggles & Results Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 border-y border-neutral-200/80 text-xs">
        
        {/* Results Info & Active Search indicator */}
        <div className="flex items-center gap-3 text-neutral-600">
          <span className="font-medium">
            Showing <strong className="text-neutral-900">{totalResults}</strong> Artifacts
          </span>

          {searchQuery && (
            <div className="inline-flex items-center gap-1.5 bg-[#FAF3E0] text-[#7A5A0B] px-2.5 py-1 rounded-full text-xs">
              <span>Search: "{searchQuery}"</span>
              <button 
                onClick={onClearSearch}
                className="hover:text-black"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Right side: Quick Toggles and Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* In Stock toggle */}
          <button
            id="toggle-in-stock-filter"
            onClick={onToggleInStock}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
              onlyInStock 
                ? 'bg-neutral-900 text-white border-neutral-900 font-medium' 
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center border ${
              onlyInStock ? 'bg-white text-black border-white' : 'border-neutral-400'
            }`}>
              {onlyInStock && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>Ready for Courier</span>
          </button>

          {/* Bestseller toggle */}
          <button
            id="toggle-bestseller-filter"
            onClick={onToggleBestsellers}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
              onlyBestsellers 
                ? 'bg-neutral-900 text-white border-neutral-900 font-medium' 
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center border ${
              onlyBestsellers ? 'bg-white text-black border-white' : 'border-neutral-400'
            }`}>
              {onlyBestsellers && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>Atelier Choice</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              id="sort-by-dropdown"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-neutral-800 text-xs focus:outline-none cursor-pointer font-medium"
            >
              <option value="featured">Sort: Atelier Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

        </div>

      </div>

    </div>
  );
};
