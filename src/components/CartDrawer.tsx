import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Tag, 
  Check, 
  Sparkles,
  Truck
} from 'lucide-react';
import { CartItem, CurrencyConfig } from '../types';
import { formatPrice } from '../data/currencies';
import { VALID_PROMO_CODES } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  activeCurrency: CurrencyConfig;
  onProceedToCheckout: (discountPercent: number, appliedCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  activeCurrency,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - rawSubtotal);

  const discountAmount = appliedPromo 
    ? (rawSubtotal * appliedPromo.discountPercent) / 100 
    : 0;

  const shippingCost = rawSubtotal >= freeShippingThreshold || items.length === 0 ? 0 : 25;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoInput.trim().toUpperCase();
    if (VALID_PROMO_CODES[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        ...VALID_PROMO_CODES[cleanCode]
      });
      setPromoInput('');
    } else {
      setPromoError('Invalid privilege code. Try TEHREEZ10 or VIP20');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAFAF8] shadow-2xl flex flex-col z-50 border-l border-[#E2DFD2]">
        
        {/* Cart Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#997328]" />
            <h2 className="font-serif-luxury text-xl font-bold text-neutral-900 tracking-wide">
              Your Atelier Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#141517] text-white px-6 py-3 text-xs">
          <div className="flex items-center justify-between mb-1.5 text-[11px] uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
              {amountNeeded === 0 ? (
                <span className="text-[#E5C378] font-semibold">Complimentary Global Courier Unlocked!</span>
              ) : (
                <span>Add {formatPrice(amountNeeded, activeCurrency)} for Free Express Courier</span>
              )}
            </span>
            <span className="font-mono text-[#C5A059]">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#C5A059] h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl text-neutral-800">Your Bag is Empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our curated seasonal drop of outerwear, leather goods, and fine horology.
                </p>
              </div>
              <button
                id="cart-continue-shopping-btn"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#121314] hover:bg-[#2A2B2E] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Browse Artifacts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-xl border border-neutral-200/70 shadow-xs group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-neutral-100 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src={item.product.images.primary}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif-luxury text-sm font-semibold text-neutral-900 leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-500 space-x-2 mt-1">
                      <span>Shade: <strong>{item.selectedColor.name}</strong></span>
                      <span>•</span>
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-neutral-300 rounded-md bg-neutral-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-semibold text-xs"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-black font-semibold text-xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-mono font-semibold text-sm text-neutral-900">
                      {formatPrice(item.product.price * item.quantity, activeCurrency)}
                    </span>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout & Promo Section */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-neutral-200 space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Privilege Code (e.g. TEHREEZ10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#B8860B] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs uppercase font-semibold tracking-wider transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <p className="text-[11px] text-red-600 pl-1">{promoError}</p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded text-xs mt-1">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>{appliedPromo.code}</strong>: {appliedPromo.description}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setAppliedPromo(null)}
                    className="text-xs text-neutral-500 hover:text-black font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-900">{formatPrice(rawSubtotal, activeCurrency)}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Privilege ({appliedPromo.discountPercent}%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount, activeCurrency)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  Insured White-Glove Courier
                  <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
                </span>
                <span className="font-mono">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-medium uppercase tracking-wider text-[11px]">Complimentary</span>
                  ) : (
                    formatPrice(shippingCost, activeCurrency)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-neutral-500 text-[11px]">
                <span>Import Duties & Vat</span>
                <span className="font-mono">Included</span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total Investment</span>
                <span className="font-mono text-base sm:text-lg text-[#997328]">
                  {formatPrice(finalTotal, activeCurrency)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={() => onProceedToCheckout(appliedPromo ? appliedPromo.discountPercent : 0, appliedPromo ? appliedPromo.code : '')}
              className="w-full bg-[#121314] hover:bg-[#2A2B2E] text-white py-3.5 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[10px] text-center text-neutral-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
              <span>256-Bit Encrypted Atelier Vault Payment</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
