import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter, SortOption } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FeaturedCollectionBanner } from './components/FeaturedCollectionBanner';
import { CraftStorySection } from './components/CraftStorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { CURRENCIES } from './data/currencies';
import { Product, ProductCategory, CartItem, ProductColor, CurrencyConfig } from './types';
import { Check, Sparkles, X } from 'lucide-react';

export default function App() {
  // Load state from localStorage where available
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tehreez_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('tehreez_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCurrency, setActiveCurrency] = useState<CurrencyConfig>(() => {
    try {
      const saved = localStorage.getItem('tehreez_currency_v1');
      if (saved && CURRENCIES[saved as keyof typeof CURRENCIES]) {
        return CURRENCIES[saved as keyof typeof CURRENCIES];
      }
    } catch {
      // ignore
    }
    return CURRENCIES.USD;
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);

  // Modals / Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tehreez_cart_v1', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('tehreez_wishlist_v1', JSON.stringify(wishlistItems));
    } catch {
      // ignore
    }
  }, [wishlistItems]);

  useEffect(() => {
    try {
      localStorage.setItem('tehreez_currency_v1', activeCurrency.code);
    } catch {
      // ignore
    }
  }, [activeCurrency]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedColor: ProductColor = product.colors[0],
    selectedSize: string = product.sizes[0],
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedColor.name}-${selectedSize}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedColor,
          selectedSize,
          quantity,
        },
      ];
    });

    showToast(`Acquired: "${product.name}" added to your atelier bag.`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from saved pieces.`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Added to saved pieces.`);
        return [...prev, product];
      }
    });
  };

  const isProductWishlisted = (id: string) => {
    return wishlistItems.some((p) => p.id === id);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // In stock
      if (onlyInStock && p.stockCount <= 0) {
        return false;
      }
      // Bestsellers
      if (onlyBestsellers && !p.isBestseller) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesSubtitle || matchesCategory || matchesTags;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // featured default
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, onlyInStock, onlyBestsellers, searchQuery, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      All: PRODUCTS.length,
      'Tailored Couture': 0,
      'Artisan Leather': 0,
      Timepieces: 0,
      'Fragrance & Scents': 0,
      'Curated Living': 0,
    };
    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, []);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const flagshipProduct = PRODUCTS[0]; // The Sovereign Cashmere Overcoat

  const categories: ProductCategory[] = [
    'All',
    'Tailored Couture',
    'Artisan Leather',
    'Timepieces',
    'Fragrance & Scents',
    'Curated Living',
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#161719] flex flex-col font-sans-clean selection:bg-[#B8860B] selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121316] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-3 animate-slide-up">
          <div className="w-6 h-6 rounded-full bg-[#C5A059] text-black flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        wishlistCount={wishlistItems.length}
        activeCurrency={activeCurrency}
        onSelectCurrency={setActiveCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        allProducts={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Powerful Hero Section */}
      <Hero
        onExploreClick={() => {
          document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        featuredProduct={flagshipProduct}
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        activeCurrency={activeCurrency}
      />

      {/* Seasonal Dual Capsule Banner */}
      <FeaturedCollectionBanner
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
        }}
      />

      {/* Main Product Catalog Section */}
      <main id="product-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#997328] font-bold">
            The Permanent Collection
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-neutral-900">
            Handcrafted Essentials
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
            Every garment, timepiece, and leather object is numbered and individually certified by our master ateliers.
          </p>
        </div>

        {/* Filter and Sorting Controls */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyInStock={onlyInStock}
          onToggleInStock={() => setOnlyInStock(!onlyInStock)}
          onlyBestsellers={onlyBestsellers}
          onToggleBestsellers={() => setOnlyBestsellers(!onlyBestsellers)}
          totalResults={filteredProducts.length}
          categoryCounts={categoryCounts}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* Product Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] text-[#7A5A0B] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-neutral-800">
                No matching artifacts found
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                We could not find any items matching your selected criteria. Try resetting filters or searching for different materials.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setOnlyInStock(false);
                  setOnlyBestsellers(false);
                }}
                className="px-6 py-2.5 bg-[#121314] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  activeCurrency={activeCurrency}
                  isWishlisted={isProductWishlisted(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>

      </main>

      {/* The Atelier Craft Storytelling Section */}
      <CraftStorySection />

      {/* Critical Press & Client Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        activeCurrency={activeCurrency}
        isWishlisted={quickViewProduct ? isProductWishlisted(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        activeCurrency={activeCurrency}
        onProceedToCheckout={(discount, code) => {
          setCheckoutDiscount(discount);
          setCheckoutPromoCode(code);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(product) => handleAddToCart(product)}
        activeCurrency={activeCurrency}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        activeCurrency={activeCurrency}
        discountPercent={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderCompleted={() => {
          setCartItems([]);
          showToast('Acquisition docket confirmed and stored in vault.');
        }}
      />

    </div>
  );
}
