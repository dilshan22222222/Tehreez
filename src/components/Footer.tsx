import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Check, Sparkles, Phone, MapPin, Globe } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0E0F12] text-white border-t border-[#22242B]">
      
      {/* VIP Atelier Newsletter Invitation */}
      <div className="border-b border-[#22242B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Private Atelier Circle</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light tracking-tight text-white">
            Access Private Seasonal Allocations
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join the TEHREEZ patron list for early access to limited capsule releases, bespoke fitting appointments, and complimentary monogramming privileges.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 px-6 py-3 rounded-full text-xs sm:text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Welcome to the Atelier Circle. Check your inbox for your private welcome code: <strong>WELCOME15</strong></span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your private email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/15 rounded-full text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A059] focus:bg-white/10 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#C5A059] hover:bg-[#D4B066] text-neutral-950 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 shadow-lg"
              >
                <span>Request Invitation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-neutral-500">
            We honor discretion. Unsubscribe anytime. View our strict Privacy Protocol.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif-luxury font-bold text-2xl sm:text-3xl tracking-[0.25em] text-white">
                TEHREEZ
              </span>
              <div className="text-[9px] uppercase tracking-[0.35em] text-[#C5A059] font-medium mt-0.5">
                Atelier & Luxury Craft
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Purveyors of modern luxury essentials. Hand-tailored couture, vegetable-tanned Italian leather, and precision Swiss mechanical movements crafted without compromise.
            </p>

            <div className="space-y-1.5 text-xs text-neutral-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Atelier Concierge: Via Monte Napoleone, Milan & Madison Ave, New York</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Direct VIP Styling Line: +1 (800) 492-8349</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Global Insured Dispatch: 140+ Countries</span>
              </div>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('Tailored Couture');
                    document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Tailored Couture
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('Artisan Leather');
                    document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Artisan Leather Goods
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('Timepieces');
                    document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Mechanical Horology
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('Fragrance & Scents');
                    document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Grasse Parfums & Scents
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('Curated Living');
                    document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Curated Living & Objects
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: The Atelier */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#heritage-story" className="hover:text-white transition-colors">Artisanal Provenance</a></li>
              <li><a href="#heritage-story" className="hover:text-white transition-colors">Tuscan Tannery Standards</a></li>
              <li><a href="#heritage-story" className="hover:text-white transition-colors">Swiss Calibre Movement Regs</a></li>
              <li><a href="#heritage-story" className="hover:text-white transition-colors">Lifetime Repair Guarantee</a></li>
              <li><a href="#heritage-story" className="hover:text-white transition-colors">Serial Passport Verification</a></li>
            </ul>
          </div>

          {/* Column 3: Concierge & Client Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Track Consignment</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bespoke Size Consultation</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Complimentary Exchanges</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Archival Storage Advice</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Corporate & Diplomatic Gifting</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-12 mt-12 border-t border-[#22242B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 TEHREEZ HAUTE CRAFT ATELIER. All rights reserved.</p>
          
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hover:text-white transition-colors cursor-pointer">Discretion Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Acquisition</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Provenance Registry</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
