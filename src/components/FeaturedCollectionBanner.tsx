import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface FeaturedCollectionBannerProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const FeaturedCollectionBanner: React.FC<FeaturedCollectionBannerProps> = ({
  onSelectCategory
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#F4F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Banner 1: Tuscan Leather */}
          <div 
            onClick={() => {
              onSelectCategory('Artisan Leather');
              document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative h-96 sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
              alt="Artisan Leather Collection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-[#E5C378]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Florence Workshop</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-neutral-300 font-medium">Curated Capsule</span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light leading-tight">
                  Tuscan Vegetable Leather
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm line-clamp-2">
                  Weekend bags, portfolios, and bifold wallets crafted to deepen in patina across decades.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5C378] group-hover:translate-x-2 transition-transform">
                    <span>Explore Leather Capsule</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner 2: Cashmere & Couture */}
          <div 
            onClick={() => {
              onSelectCategory('Tailored Couture');
              document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative h-96 sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80"
              alt="Tailored Couture Collection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-[#E5C378]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Biella & Naples Tailoring</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-neutral-300 font-medium">Seasonal Drop</span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light leading-tight">
                  Grade-A Cashmere & Wool
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm line-clamp-2">
                  Double-faced cashmere overcoats, structured wool blazers, and organic flax linen shirts.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5C378] group-hover:translate-x-2 transition-transform">
                    <span>Explore Couture Capsule</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
