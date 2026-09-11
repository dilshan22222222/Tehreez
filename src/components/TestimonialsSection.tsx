import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { EDITORIAL_REVIEWS } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  const verifiedReviews = [
    {
      author: 'Julian Sterling',
      title: 'Architect, Zurich',
      date: 'September 2026',
      productName: 'The Sovereign Cashmere Overcoat',
      comment: 'The drape and hand-feel of this overcoat are staggering. You instantly recognize the weight of authentic Mongolian cashmere. The interior brass fasteners and pick-stitching show profound respect for traditional tailoring.',
      rating: 5,
    },
    {
      author: 'Elena Rostova',
      title: 'Creative Director, London',
      date: 'August 2026',
      productName: 'Tuscan Full-Grain Weekender',
      comment: 'I travel extensively between London, Milan, and Dubai. This weekender has survived dozens of flights and only looks richer with each scuff and buff. Worth twice the price.',
      rating: 5,
    },
    {
      author: 'Tariq Al-Mansoor',
      title: 'Collector, Abu Dhabi',
      date: 'July 2026',
      productName: 'Oud Royale Extrait & Chrono Nocturne',
      comment: 'The fragrance sillage is intoxicating without being overpowering. The automatic watch has kept +/- 2 seconds a day since arrival. TEHREEZ is operating at the pinnacle of discreet luxury.',
      rating: 5,
    }
  ];

  return (
    <section className="py-20 bg-[#FAF9F6] border-t border-[#ECEAE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Press / Editorial Quotes */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#997328] font-bold">
              Critical Acclaim
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-neutral-900">
              The Press on TEHREEZ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EDITORIAL_REVIEWS.map((review, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-[#C5A059] opacity-70" />
                  <p className="font-serif-luxury text-lg text-neutral-800 italic leading-relaxed">
                    "{review.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100 flex items-baseline justify-between">
                  <span className="font-semibold text-xs tracking-wider uppercase text-neutral-900">
                    {review.publication}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {review.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Collector Reviews */}
        <div className="space-y-8 pt-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-bold">
              Collector Chronicles
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-neutral-900">
              Verified Patron Impressions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedReviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-[#F4F3EE] p-6 rounded-xl border border-neutral-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex text-[#B8860B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="pt-3 border-t border-neutral-200/70">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{rev.author}</p>
                      <p className="text-[11px] text-neutral-500">{rev.title}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Acquisition</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#997328] font-medium mt-1 truncate">
                    Piece: {rev.productName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
