import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Lock, 
  ArrowRight, 
  Package, 
  Sparkles,
  Printer
} from 'lucide-react';
import { CartItem, CurrencyConfig, OrderDetails } from '../types';
import { formatPrice } from '../data/currencies';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  activeCurrency: CurrencyConfig;
  discountPercent: number;
  promoCode: string;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  activeCurrency,
  discountPercent,
  promoCode,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority'>('standard');
  const [formData, setFormData] = useState({
    fullName: 'Alexander Vance',
    email: 'alexander.vance@atelier-couture.com',
    phone: '+1 (555) 234-8901',
    address: '450 Park Avenue, Penthouse B',
    city: 'New York',
    country: 'United States',
    postalCode: '10022',
  });

  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'ALEXANDER VANCE',
    expiry: '09/29',
    cvv: '883',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'wire'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const shippingBase = rawSubtotal >= 150 ? 0 : 25;
  const shippingCost = shippingMethod === 'priority' ? shippingBase + 35 : shippingBase;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const randomId = `THZ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId: randomId,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: [...items],
        subtotal: rawSubtotal,
        shipping: shippingCost,
        tax: 0,
        discount: discountAmount,
        total: finalTotal,
        shippingAddress: { ...formData },
        paymentMethod: paymentMethod === 'card' ? 'Visa Signature Vault Card' : paymentMethod === 'apple' ? 'Apple Pay Express' : 'Bespoke Bank Wire',
        currency: activeCurrency,
      };
      setConfirmedOrder(order);
      setIsProcessing(false);
      setStep('confirmation');
      onOrderCompleted();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={step === 'confirmation' ? onClose : undefined}
      />

      <div className="relative bg-[#FAF9F6] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 border border-[#E2DFD3] my-8">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury font-bold text-2xl tracking-[0.2em] text-neutral-900">
              TEHREEZ
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-xs uppercase tracking-widest text-[#B8860B] font-semibold">
              Atelier Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="bg-[#141517] text-white px-6 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 'shipping' ? 'bg-[#C5A059] text-black' : 'bg-neutral-700 text-white'
              }`}>1</span>
              <span className={step === 'shipping' ? 'text-[#E5C378] font-medium' : 'text-neutral-400'}>
                Dispatch Address
              </span>
            </div>

            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />

            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 'payment' ? 'bg-[#C5A059] text-black' : 'bg-neutral-700 text-white'
              }`}>2</span>
              <span className={step === 'payment' ? 'text-[#E5C378] font-medium' : 'text-neutral-400'}>
                Bespoke Payment
              </span>
            </div>

            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />

            <div className="flex items-center gap-2 text-neutral-500">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center text-[10px]">3</span>
              <span>Confirmation</span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: Shipping */}
          {step === 'shipping' && (
            <form onSubmit={handleSubmitShipping} className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl font-semibold text-neutral-900">
                  Client & Dispatch Details
                </h3>
                <p className="text-xs text-neutral-500">
                  All consignments are packed in protective archival boxes with ribbon sealing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-medium text-neutral-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-700">VIP Email (for tracking)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-medium text-neutral-700">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-700">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-700">Postal / ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-700">Country / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#B8860B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-700">Contact Telephone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-[#B8860B]"
                  />
                </div>
              </div>

              {/* Courier Tiers */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider block">
                  Select Dispatch Courier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div 
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard' 
                        ? 'border-[#B8860B] bg-[#FFFDF9] ring-1 ring-[#B8860B]' 
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-neutral-900">
                      <span>Insured Express Courier</span>
                      <span>{shippingBase === 0 ? 'Free' : formatPrice(shippingBase, activeCurrency)}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">2-4 Business Days with Signature Delivery</p>
                  </div>

                  <div 
                    onClick={() => setShippingMethod('priority')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'priority' 
                        ? 'border-[#B8860B] bg-[#FFFDF9] ring-1 ring-[#B8860B]' 
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-neutral-900">
                      <span>Priority White-Glove</span>
                      <span>+{formatPrice(35, activeCurrency)}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">Next Flight Dispatch & Hand Delivery</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#121314] hover:bg-[#282A2E] text-white rounded-lg text-xs uppercase font-semibold tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 'payment' && (
            <form onSubmit={handleProcessPayment} className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl font-semibold text-neutral-900">
                  Select Settlement Method
                </h3>
                <p className="text-xs text-neutral-500">
                  Your payment information is tokenized with bank-grade 256-bit encryption.
                </p>
              </div>

              {/* Payment selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-[#B8860B] bg-[#FAF3E0] text-[#7A5A0B] font-bold' 
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'apple' 
                      ? 'border-[#B8860B] bg-[#FAF3E0] text-[#7A5A0B] font-bold' 
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'wire' 
                      ? 'border-[#B8860B] bg-[#FAF3E0] text-[#7A5A0B] font-bold' 
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Bank Wire</span>
                </button>
              </div>

              {/* Card visual mockup */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-tr from-[#16171B] to-[#2E3138] p-5 rounded-xl text-white shadow-xl space-y-4 font-mono text-xs">
                    <div className="flex justify-between items-center text-[#C5A059]">
                      <span className="font-serif-luxury tracking-widest text-sm text-white font-bold">TEHREEZ VAULT</span>
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="tracking-[0.25em] text-base sm:text-lg pt-2">
                      {cardData.cardNumber}
                    </div>
                    <div className="flex justify-between items-end text-[11px] text-neutral-400">
                      <div>
                        <span className="block text-[9px] uppercase">Cardholder</span>
                        <span className="text-white font-semibold">{cardData.cardHolder}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase">Expires</span>
                        <span className="text-white font-semibold">{cardData.expiry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card input fields */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="col-span-2 space-y-1">
                      <label className="font-medium text-neutral-700">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg font-mono focus:outline-none focus:border-[#B8860B]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium text-neutral-700">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg font-mono focus:outline-none focus:border-[#B8860B]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-medium text-neutral-700">Security CVV</label>
                      <input
                        type="password"
                        required
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg font-mono focus:outline-none focus:border-[#B8860B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="p-8 text-center bg-neutral-100 rounded-xl space-y-2 border border-neutral-200">
                  <Sparkles className="w-8 h-8 mx-auto text-[#B8860B]" />
                  <p className="text-xs font-semibold text-neutral-800">Touch ID / Face ID Authentication Ready</p>
                  <p className="text-[11px] text-neutral-500">Confirm purchase with your authorized biometric device.</p>
                </div>
              )}

              {paymentMethod === 'wire' && (
                <div className="p-6 bg-neutral-100 rounded-xl space-y-2 text-xs border border-neutral-200">
                  <p className="font-semibold text-neutral-900">Atelier Private Banking Information</p>
                  <p className="text-[11px] text-neutral-600">
                    Upon submitting, a formal Proforma Invoice with IBAN instructions will be generated and dispatched to your concierge email.
                  </p>
                </div>
              )}

              {/* Order total review */}
              <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Artifacts Subtotal ({items.length} items)</span>
                  <span className="font-mono">{formatPrice(rawSubtotal, activeCurrency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Discount ({promoCode})</span>
                    <span className="font-mono">-{formatPrice(discountAmount, activeCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Courier & Insurance</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost, activeCurrency)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-neutral-900 pt-2 border-t border-neutral-100">
                  <span>Total Due</span>
                  <span className="font-mono text-base text-[#997328]">
                    {formatPrice(finalTotal, activeCurrency)}
                  </span>
                </div>
              </div>

              {/* Submission buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  ← Back to Address
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-7 py-3 bg-[#121314] hover:bg-[#282A2E] text-white rounded-lg text-xs uppercase font-semibold tracking-wider flex items-center gap-2 shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authorizing Vault...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Authorize {formatPrice(finalTotal, activeCurrency)}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 'confirmation' && confirmedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#B8860B] font-bold">
                  Order Successfully Authorized
                </span>
                <h3 className="font-serif-luxury text-3xl font-semibold text-neutral-900">
                  Thank You, {confirmedOrder.shippingAddress.fullName}
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Your acquisition has been logged at the TEHREEZ Atelier. You will receive an encrypted dispatch docket and tracking key at <strong className="text-neutral-800">{confirmedOrder.shippingAddress.email}</strong>.
                </p>
              </div>

              {/* Order Dossier Card */}
              <div className="bg-white rounded-xl border border-neutral-200 p-5 text-left text-xs space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Acquisition Reference</span>
                    <span className="font-mono font-bold text-sm text-neutral-900">{confirmedOrder.orderId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Date</span>
                    <span className="text-neutral-700">{confirmedOrder.date}</span>
                  </div>
                </div>

                <div className="space-y-2 py-1">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400">Consignment Items:</div>
                  {confirmedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-xs">
                      <span className="truncate pr-4 text-neutral-800">
                        {it.product.name} ({it.selectedColor.name}, {it.selectedSize}) x{it.quantity}
                      </span>
                      <span className="font-mono font-medium shrink-0">
                        {formatPrice(it.product.price * it.quantity, confirmedOrder.currency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-neutral-100 flex justify-between font-bold text-sm">
                  <span>Settled Amount</span>
                  <span className="font-mono text-[#997328]">
                    {formatPrice(confirmedOrder.total, confirmedOrder.currency)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 border border-neutral-300 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#121314] hover:bg-[#282A2E] text-white rounded-lg text-xs uppercase font-semibold tracking-wider"
                >
                  Return to Atelier
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
