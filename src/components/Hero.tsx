import React, { useState } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Compass, 
  Clock, 
  ChevronRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { CurrencyConfig, Product } from '../types';
import { formatPrice } from '../data/currencies';

interface HeroProps {
  onExploreClick: () => void;
  featuredProduct: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  activeCurrency: CurrencyConfig;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  featuredProduct,
  onQuickView,
  onAddToCart,
  activeCurrency
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      season: 'AUTUMN / WINTER 2026 CAPSULE',
      title: 'The Architecture of Distinction',
      subtitle: 'Impeccably tailored outerwear, Tuscan vegetable-tanned leather, and Swiss horological movements crafted without compromise.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85',
      tag: 'Couture & Leather Goods',
      accent: 'Biella & Florence'
    },
    {
      season: 'HAUTE HOROLOGY & ATELIER SCENTS',
      title: 'Objects of Enduring Weight',
      subtitle: 'From mechanical automatic chronographs with exhibition sapphire casebacks to rare aged Cambodian oud extraits.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85',
      tag: 'Swiss Movement & Grasse Perfumery',
      accent: 'Geneva & Grasse'
    }
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="relative w-full overflow-hidden bg-[#111215] text-white">
      {/* Background Image Container with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlide.image}
          alt="TEHREEZ Luxury Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out brightness-[0.72] contrast-[1.05]"
        />
        {/* Multilayered subtle vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1012] via-[#0F1012]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-transparent to-black/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#E5C378] tracking-[0.2em] uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide.season}</span>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="font-serif-luxury text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight leading-[1.08] text-white">
                {currentSlide.title}
              </h1>
              <p className="text-neutral-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="inline-flex items-center gap-3 bg-[#C5A059] hover:bg-[#D4B066] text-[#0E0F11] font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] px-7 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#C5A059]/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-quick-view-featured-btn"
                onClick={() => onQuickView(featuredProduct)}
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/20 font-medium text-xs sm:text-sm uppercase tracking-[0.16em] px-6 py-4 rounded-full transition-all duration-200"
              >
                <Eye className="w-4 h-4 text-[#C5A059]" />
                <span>Featured Artifact</span>
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-3 pt-4">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 transition-all rounded-full ${
                    activeSlide === idx ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 ml-2">
                Atelier Series 0{activeSlide + 1} / 0{heroSlides.length}
              </span>
            </div>

          </div>

          {/* Right Column: Floating Flagship Product Preview Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md bg-[#16171B]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl text-left relative group">
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-2.5 py-1 rounded">
                  Season Flagship
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {featuredProduct.origin}
                </span>
              </div>

              {/* Product Thumbnail */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-white/10">
                <img
                  src={featuredProduct.images.primary}
                  alt={featuredProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-white/90 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                  <span>Only {featuredProduct.stockCount} pieces remaining</span>
                </div>
              </div>

              {/* Title and details */}
              <div className="space-y-1.5 mb-4">
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium">
                  {featuredProduct.name}
                </h2>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {featuredProduct.subtitle}
                </p>
              </div>

              {/* Price & Quick Add Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Investment</span>
                  <span className="text-lg sm:text-xl font-semibold text-[#E5C378] font-mono">
                    {formatPrice(featuredProduct.price, activeCurrency)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="hero-card-details-btn"
                    onClick={() => onQuickView(featuredProduct)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Inspect Artifact"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    id="hero-card-add-cart-btn"
                    onClick={() => onAddToCart(featuredProduct)}
                    className="px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-neutral-900 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Acquire
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Brand Value Pillars Bar */}
      <div className="relative z-10 border-t border-white/10 bg-[#0D0E10]/95 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C5A059]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Global Express</p>
              <p className="text-[11px] text-neutral-400">Complimentary over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C5A059]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Lifetime Guarantee</p>
              <p className="text-[11px] text-neutral-400">Master artisan repair warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C5A059]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Traceable Materials</p>
              <p className="text-[11px] text-neutral-400">Grade-A Italian & Swiss provenance</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#C5A059]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Concierge Service</p>
              <p className="text-[11px] text-neutral-400">Direct styling & sizing support</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
