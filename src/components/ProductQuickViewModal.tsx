import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart, 
  Check, 
  ShoppingBag,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CurrencyConfig, Product, ProductColor } from '../types';
import { formatPrice } from '../data/currencies';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: CurrencyConfig;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: string, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  activeCurrency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images.primary);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');
  const [isAdded, setIsAdded] = useState(false);

  // Combine images
  const allImages = [
    product.images.primary,
    product.images.secondary,
    ...(product.images.details || [])
  ];

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAFAF8] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 border border-[#E5E2D8] max-h-[92vh] flex flex-col">
        
        {/* Header Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            id="close-quickview-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-950 shadow-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Gallery Column (5 cols) */}
            <div className="md:col-span-6 space-y-4">
              {/* Main Featured Image */}
              <div className="aspect-4/5 w-full bg-neutral-100 rounded-xl overflow-hidden border border-neutral-200 relative group">
                <img
                  src={selectedImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                <div className="absolute bottom-3 left-3 bg-[#111214]/80 backdrop-blur-md px-3 py-1 rounded text-white text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Artisan Provenance: {product.origin}</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === img 
                        ? 'border-[#B8860B] ring-2 ring-[#B8860B]/30 scale-105' 
                        : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Options & Details (6 cols) */}
            <div className="md:col-span-6 space-y-5">
              
              {/* Brand & Category */}
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-500 mb-1">
                  <span>TEHREEZ Atelier • {product.category}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Ready for Courier
                  </span>
                </div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-neutral-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 text-xs border-y border-neutral-200/80 py-2.5">
                <div className="flex items-center text-[#B8860B]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300'}`} 
                    />
                  ))}
                  <span className="font-semibold text-neutral-900 ml-1.5">{product.rating}</span>
                </div>
                <span className="text-neutral-400">|</span>
                <span className="text-neutral-600 font-medium">{product.reviewsCount} Certified Collector Reviews</span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-neutral-900 font-mono">
                  {formatPrice(product.price, activeCurrency)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-400 line-through font-mono">
                    {formatPrice(product.originalPrice, activeCurrency)}
                  </span>
                )}
                <span className="text-xs text-neutral-500">
                  (Duties & Insured Courier included)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Choice */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800">Shade / Finish:</span>
                    <span className="text-neutral-600 font-medium">{selectedColor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-2 transition-all ${
                          selectedColor.name === c.name
                            ? 'border-neutral-900 bg-neutral-900 text-white font-medium shadow-sm'
                            : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Choice */}
              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800">Specification / Sizing:</span>
                    <span className="text-neutral-500 underline cursor-pointer hover:text-neutral-900">
                      View Size Guide
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                          selectedSize === sz
                            ? 'border-[#B8860B] bg-[#FAF3E0] text-[#7A5A0B] font-semibold'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-300 bg-white rounded-lg overflow-hidden h-12">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 text-neutral-600 hover:bg-neutral-100 transition-colors text-base"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono font-semibold text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3.5 text-neutral-600 hover:bg-neutral-100 transition-colors text-base"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Cart Button */}
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 h-12 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#141517] hover:bg-[#25282E] text-white hover:shadow-lg'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Acquired & Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                        <span>Acquire for {formatPrice(product.price * quantity, activeCurrency)}</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-colors ${
                      isWishlisted 
                        ? 'border-[#B8860B] bg-[#FAF3E0] text-[#B8860B]' 
                        : 'border-neutral-300 bg-white text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Details Tabs (Craftsmanship, Materials, Delivery) */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex border-b border-neutral-200 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-5 uppercase tracking-wider border-b-2 transition-all ${
                      activeTab === 'details' 
                        ? 'border-[#B8860B] text-neutral-900 font-bold' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Highlights
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={`pb-2 mr-5 uppercase tracking-wider border-b-2 transition-all ${
                      activeTab === 'materials' 
                        ? 'border-[#B8860B] text-neutral-900 font-bold' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Materials & Care
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 uppercase tracking-wider border-b-2 transition-all ${
                      activeTab === 'shipping' 
                        ? 'border-[#B8860B] text-neutral-900 font-bold' 
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Courier & Guarantees
                  </button>
                </div>

                <div className="pt-3 text-xs text-neutral-600 space-y-2">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.details.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <span className="text-neutral-800">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'materials' && (
                    <div className="space-y-2">
                      <p><strong className="text-neutral-900">Composition:</strong> {product.materials}</p>
                      {product.dimensions && <p><strong className="text-neutral-900">Dimensions:</strong> {product.dimensions}</p>}
                      <p><strong className="text-neutral-900">Provenance:</strong> Crafted with generational expertise in {product.origin}.</p>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2 text-neutral-600">
                      <p className="flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>White-glove worldwide insured courier via DHL Express (2-4 business days).</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <RotateCcw className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>30-day complimentary return & bespoke exchange policy.</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>Includes physical Certificate of Authenticity and serial passport.</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
