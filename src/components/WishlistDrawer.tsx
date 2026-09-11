import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { CurrencyConfig, Product } from '../types';
import { formatPrice } from '../data/currencies';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  activeCurrency: CurrencyConfig;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveFromWishlist,
  onMoveToCart,
  activeCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAFAF8] shadow-2xl flex flex-col z-50 border-l border-[#E2DFD2]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#C5A059] fill-current" />
            <h2 className="font-serif-luxury text-xl font-bold text-neutral-900 tracking-wide">
              Saved Atelier Pieces ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl text-neutral-800">Your Wishlist is Empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Mark your favorite timepieces, leather goods, or bespoke tailoring to save them for later.
                </p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#121314] hover:bg-[#2A2B2E] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Discover Artifacts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            items.map((prod) => (
              <div 
                key={prod.id}
                className="flex gap-4 p-3.5 bg-white rounded-xl border border-neutral-200 shadow-xs"
              >
                <div className="w-20 h-24 bg-neutral-100 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src={prod.images.primary}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif-luxury text-sm font-semibold text-neutral-900 leading-tight">
                        {prod.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(prod)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                      {prod.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono font-bold text-sm text-neutral-900">
                      {formatPrice(prod.price, activeCurrency)}
                    </span>

                    <button
                      onClick={() => {
                        onMoveToCart(prod);
                        onRemoveFromWishlist(prod);
                      }}
                      className="px-3 py-1.5 bg-[#141517] hover:bg-[#25282E] text-white rounded-lg text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#C5A059]" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
