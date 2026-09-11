import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { CurrencyConfig, Product, ProductColor } from '../types';
import { formatPrice } from '../data/currencies';

interface ProductCardProps {
  product: Product;
  activeCurrency: CurrencyConfig;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: ProductColor, selectedSize: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  activeCurrency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product, selectedColor, selectedSize);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-xl border border-[#E9E7E0] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D0CCC0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div 
        className="relative aspect-4/5 w-full bg-[#F5F4F0] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {/* Main Image & Hover Lifestyle Image */}
        <img
          src={isHovered && product.images.secondary ? product.images.secondary : product.images.primary}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-[#121314] text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded shadow-sm">
              New Arrival
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="bg-[#997328] text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded shadow-sm">
              Atelier Choice
            </span>
          )}
          {product.stockCount <= 7 && (
            <span className="bg-[#FAF8F5] text-[#8C3A27] border border-[#E8D0C9] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              Rare: {product.stockCount} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted 
              ? 'bg-[#121314] text-[#E5C378]' 
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-neutral-900 shadow-sm'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Overlay Bar */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-[#1A1C1E]/90 hover:bg-[#1A1C1E] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-3 rounded-lg backdrop-blur-md flex items-center justify-center gap-2 shadow-lg transition-transform"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Quick Inspect</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Origin */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-wider mb-1.5">
            <span>{product.category}</span>
            <span className="font-mono text-neutral-400">{product.origin}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-serif-luxury text-lg sm:text-xl font-medium text-neutral-900 leading-snug cursor-pointer hover:text-[#997328] transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-[#B8860B]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold ml-1 text-neutral-900">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[11px] text-neutral-500 mr-1">Shade:</span>
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor.name === color.name 
                    ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110' 
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
          </div>
        )}

        {/* Price & Quick Add Button */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-neutral-900 font-mono">
                {formatPrice(product.price, activeCurrency)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through font-mono">
                  {formatPrice(product.originalPrice, activeCurrency)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400 block">Taxes & Duties Included</span>
          </div>

          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              isAdding 
                ? 'bg-emerald-700 text-white'
                : 'bg-[#181A1D] hover:bg-[#2C2F36] text-white'
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Acquired</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
