import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CurrencyConfig, Product, ProductCategory } from '../types';
import { CURRENCIES, formatPrice } from '../data/currencies';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  activeCurrency: CurrencyConfig;
  onSelectCurrency: (currency: CurrencyConfig) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  activeCurrency,
  onSelectCurrency,
  onOpenCart,
  onOpenWishlist,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  allProducts,
  onSelectProduct,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  const announcements = [
    'Complimentary Worldwide Insured Courier on orders over $150',
    'Autumn / Winter 2026 Haute Atelier Capsule is now available',
    'Every piece is individually serial-numbered & guaranteed for life',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const categories: ProductCategory[] = [
    'All',
    'Tailored Couture',
    'Artisan Leather',
    'Timepieces',
    'Fragrance & Scents',
    'Curated Living'
  ];

  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#121314] text-[#E5E5E1] text-xs py-2 px-4 border-b border-[#28292C]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Rotating highlight */}
          <div className="flex items-center gap-2 overflow-hidden py-0.5">
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
            <p className="truncate font-light tracking-wider text-[11px] sm:text-xs">
              {announcements[tickerIndex]}
            </p>
          </div>

          {/* Right utility links */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs tracking-wider shrink-0">
            <div className="relative">
              <button
                id="currency-selector-button"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#C5A059] transition-colors py-0.5 focus:outline-none"
                aria-label="Select Currency"
              >
                <span>{activeCurrency.code} ({activeCurrency.symbol.trim()})</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-1.5 w-32 bg-[#1A1C1E] border border-[#33353A] rounded shadow-2xl py-1 z-50 text-xs"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  {Object.values(CURRENCIES).map((cur) => (
                    <button
                      key={cur.code}
                      onClick={() => {
                        onSelectCurrency(cur);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#25282D] transition-colors ${
                        activeCurrency.code === cur.code ? 'text-[#C5A059] font-medium' : 'text-neutral-300'
                      }`}
                    >
                      <span>{cur.code}</span>
                      <span className="text-neutral-400 font-mono">{cur.symbol.trim()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-neutral-600 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1 text-neutral-300 hover:text-white transition-colors cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Lifetime Atelier Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAFAF7]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#E8E6DF]' 
          : 'bg-[#FAFAF7] py-4 border-b border-[#ECEAE3]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Mobile menu toggle + Desktop categories button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-neutral-800 hover:text-[#B8860B] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <button 
                id="brand-logo-home-button"
                onClick={() => {
                  onSelectCategory('All');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left group focus:outline-none"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-luxury font-bold text-2xl sm:text-3xl tracking-[0.24em] text-neutral-900 group-hover:text-[#997328] transition-colors">
                    TEHREEZ
                  </span>
                </div>
                <div className="text-[9px] uppercase tracking-[0.35em] text-neutral-500 font-medium -mt-1 group-hover:text-neutral-700 transition-colors">
                  Atelier & Luxury Craft
                </div>
              </button>
            </div>

            {/* Desktop Center: Categories */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`nav-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    onSelectCategory(cat);
                    const catalogEl = document.getElementById('product-catalog-section');
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 py-1.5 text-xs uppercase tracking-[0.14em] font-medium transition-all rounded-sm relative ${
                    selectedCategory === cat
                      ? 'text-[#121314] font-semibold'
                      : 'text-neutral-600 hover:text-[#121314] hover:bg-black/5'
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#B8860B] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Right Icons: Search, Wishlist, Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Toggle */}
              <div className="relative">
                <button
                  id="search-toggle-button"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2 rounded-full transition-colors ${
                    isSearchOpen 
                      ? 'bg-neutral-200 text-neutral-900' 
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Inline desktop dropdown search */}
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 bg-white border border-[#E3E0D6] rounded-lg shadow-xl p-3 z-50">
                    <div className="relative">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search cashmere, leather, horology..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        autoFocus
                        className="w-full pl-9 pr-8 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded focus:outline-none focus:border-[#B8860B] focus:bg-white text-neutral-900"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => onSearchChange('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Quick Live Results */}
                    {searchResults.length > 0 && (
                      <div className="mt-3 divide-y divide-neutral-100 border-t border-neutral-100 pt-2">
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                          Matching Artifacts ({searchResults.length})
                        </div>
                        {searchResults.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              onSelectProduct(item);
                              setIsSearchOpen(false);
                            }}
                            className="py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-50 px-1 rounded transition-colors"
                          >
                            <img
                              src={item.images.primary}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 object-cover rounded border border-neutral-200"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-neutral-900 truncate">{item.name}</p>
                              <p className="text-[11px] text-[#B8860B] font-semibold">{formatPrice(item.price, activeCurrency)}</p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                id="wishlist-toggle-button"
                onClick={onOpenWishlist}
                className="relative p-2 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#121314] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger Button */}
              <button
                id="cart-drawer-toggle-button"
                onClick={onOpenCart}
                className="flex items-center gap-2 bg-[#141517] hover:bg-[#25282D] text-white px-3.5 py-2 rounded-full text-xs font-medium tracking-wider transition-all shadow-sm hover:shadow"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#C5A059] text-[#121314] font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-mono text-[11px]">
                  {formatPrice(cartTotal, activeCurrency)}
                </span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF9F6] shadow-2xl flex flex-col justify-between z-50 p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div>
                  <span className="font-serif-luxury font-bold text-2xl tracking-[0.2em] text-neutral-900">
                    TEHREEZ
                  </span>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-medium">
                    Atelier & Luxury Craft
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-neutral-500 hover:text-neutral-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Categories list */}
              <div className="mt-6 flex flex-col space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-2 px-2">
                  Collections & Atelier
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      setIsMobileMenuOpen(false);
                      const catalogEl = document.getElementById('product-catalog-section');
                      if (catalogEl) {
                        catalogEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`text-left px-3 py-2.5 rounded text-sm tracking-wider uppercase font-medium flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat}</span>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>

              {/* Story links */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 mb-3 px-2">
                  Heritage & Service
                </div>
                <a 
                  href="#heritage-story" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900"
                >
                  The TEHREEZ Atelier
                </a>
                <a 
                  href="#guarantee-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs uppercase tracking-wider text-neutral-600 hover:text-neutral-900"
                >
                  Materials & Lifetime Guarantee
                </a>
              </div>
            </div>

            {/* Mobile Footer with Currency */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="text-xs text-neutral-500 mb-2 font-medium">Selected Currency:</div>
              <div className="grid grid-cols-4 gap-1">
                {Object.values(CURRENCIES).map((cur) => (
                  <button
                    key={cur.code}
                    onClick={() => onSelectCurrency(cur)}
                    className={`py-1.5 text-xs text-center rounded border font-mono ${
                      activeCurrency.code === cur.code
                        ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {cur.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
