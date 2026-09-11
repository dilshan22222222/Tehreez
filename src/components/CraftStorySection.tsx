import React, { useState } from 'react';
import { ShieldCheck, Award, Feather, Sparkles, CheckCircle2 } from 'lucide-react';

export const CraftStorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: 'Tuscan Leather Mastery',
      subtitle: 'Slow Vegetable Tanning in Florence',
      description: 'We source exclusively full-grain hides tanned over 40 days using organic bark extracts from chestnut, mimosa, and quebracho trees. Zero synthetic polymers. The leather breathes, softens, and gains a luminous golden patina that records your life adventures.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      specs: [
        'Naturally vegetable-tanned with tree barks',
        'Hand-burnished edges sealed with pure beeswax',
        'Solid cast brass hardware from Florentine foundries',
        'Guaranteed against seam rupture for life'
      ]
    },
    {
      title: 'Mongolian Grade-A Cashmere',
      subtitle: 'Woven on Vintage Looms in Biella, Italy',
      description: 'Only the downy undercoat from mountain goats surviving harsh alpine winters is gathered through gentle hand-combing. Spun into 4-ply yarn in Biella to achieve cloud-like thermal efficiency without bulk.',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80',
      specs: [
        'Fibers average under 15 microns in diameter',
        'Double-faced weaving for supreme structural drape',
        'Non-scratching, hypoallergenic skin contact',
        'Pill-resistant multi-ply yarn twisting'
      ]
    },
    {
      title: 'Geneva Horological Precision',
      subtitle: 'Swiss Mechanical Calibres & Sapphire Crystals',
      description: 'Every TEHREEZ chronometer is regulated across 5 positions and tested for temperature tolerance. Encased in surgical grade 316L stainless steel with anti-reflective sapphire glass that maintains flawless clarity for decades.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      specs: [
        'High-beat automatic movement (28,800 vph)',
        'Double-domed sapphire with 5x AR internal coating',
        'Individually engraved bespoke serial numbering',
        '10 ATM pressure-tested water resistance'
      ]
    }
  ];

  const current = pillars[activeTab];

  return (
    <section id="heritage-story" className="py-20 bg-[#121316] text-white overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C5A059] text-xs uppercase tracking-[0.2em] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The TEHREEZ Atelier Standard</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light tracking-tight text-white">
            Uncompromising Material Integrity
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            In an era of mass obsolescence, TEHREEZ partners directly with generational artisan family ateliers across Europe and Japan.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex bg-[#1D1F24] p-1.5 rounded-full border border-white/10 gap-1 sm:gap-2">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all ${
                  activeTab === idx
                    ? 'bg-[#C5A059] text-[#0E0F11] font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#17181D] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          
          {/* Image */}
          <div className="lg:col-span-6 relative aspect-4/3 rounded-xl overflow-hidden border border-white/10">
            <img
              src={current.image}
              alt={current.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#E5C378] font-bold">
                Atelier Workshop Documentation
              </span>
              <p className="font-serif-luxury text-lg font-medium">{current.subtitle}</p>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                Pillar 0{activeTab + 1}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-white">
                {current.title}
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Rigorous Atelier Criteria:
              </span>
              {current.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span>Certified Origin</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Serial Tracked</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-[#C5A059]" />
                <span>Zero Compromise</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
