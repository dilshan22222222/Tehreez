import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'thz-01',
    name: 'The Sovereign Cashmere Overcoat',
    subtitle: 'Pure Grade-A Mongolian Cashmere',
    category: 'Tailored Couture',
    price: 890,
    originalPrice: 1100,
    rating: 4.9,
    reviewsCount: 48,
    isNew: true,
    isBestseller: true,
    featured: true,
    stockCount: 7,
    description: 'Masterfully structured from double-faced, unbleached Grade-A Mongolian cashmere. Hand-finished horn buttons, natural drape silhouette, and a cupro silk lining that glides effortlessly over evening or tailored layers.',
    details: [
      'Double-faced 100% Mongolian Cashmere (580 GSM)',
      'Hand-stitched pick-lapel and genuine horn buttons',
      'Interior passport and pen pocket with brass closures',
      'Water-repellent nanotech yarn coating',
      'Tailored in Biella, Italy'
    ],
    materials: '100% Grade-A Mongolian Cashmere, Bemberg Cupro Silk Lining',
    origin: 'Biella, Italy',
    images: {
      primary: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Midnight Charcoal', hex: '#232528' },
      { name: 'Oatmeal Melange', hex: '#D8D1C5' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46L'],
    tags: ['Outerwear', 'Winter', 'Limited Edition', 'Atelier Exclusive']
  },
  {
    id: 'thz-02',
    name: 'Tuscan Full-Grain Weekender Duffel',
    subtitle: 'Vegetable-Tanned Vacchetta Leather',
    category: 'Artisan Leather',
    price: 640,
    rating: 5.0,
    reviewsCount: 82,
    isBestseller: true,
    featured: true,
    stockCount: 12,
    description: 'Constructed from vegetable-tanned Tuscan Vacchetta leather that deepens in patina and character with every journey. Features solid brass hardware cast in Florence, reinforced handles, and an isolated ventilated shoe compartment.',
    details: [
      'Full-grain Tuscan cowhide tanned with chestnut and mimosa tannins',
      'Solid antique-finish brass hardware and YKK Excella zippers',
      'Padded laptop sleeve (accommodates up to 16" MacBook Pro)',
      'Detachable ergonomic leather shoulder strap with memory foam padding',
      'Complies with international airline carry-on dimensions'
    ],
    materials: 'Vegetable-Tanned Tuscan Leather, Heavyweight 16oz Waxed Canvas Lining',
    dimensions: '52cm x 28cm x 30cm (42L Capacity)',
    origin: 'Florence, Italy',
    images: {
      primary: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4513' },
      { name: 'Espresso Nero', hex: '#2C1D11' },
      { name: 'British Racing Tan', hex: '#A0522D' }
    ],
    sizes: ['One Size (42L)'],
    tags: ['Travel', 'Leather Goods', 'Bestseller', 'Lifetime Guarantee']
  },
  {
    id: 'thz-03',
    name: 'Chrono Nocturne Automatic 40mm',
    subtitle: 'Swiss Mechanical Calibre with Exhibition Caseback',
    category: 'Timepieces',
    price: 1250,
    originalPrice: 1450,
    rating: 4.9,
    reviewsCount: 37,
    isNew: true,
    featured: true,
    stockCount: 5,
    description: 'An architectural horological statement. Powered by a high-beat automatic movement with 42-hour reserve, a matte sunburst slate dial, double-domed anti-reflective sapphire crystal, and hand-beveled surgical grade 316L steel.',
    details: [
      'Swiss Made Automatic Calibre (28,800 vph, 26 jewels)',
      'Double-domed scratchproof Sapphire Crystal with 5x AR coating',
      '316L Marine-Grade Stainless Steel case with brushed and polished bevels',
      'Water resistance to 10 ATM (100 meters / 330 feet)',
      'Quick-release French alligator-embossed calfskin strap'
    ],
    materials: '316L Stainless Steel, Sapphire Crystal, Italian Calfskin',
    dimensions: '40mm diameter, 10.8mm thickness, 20mm lug width',
    origin: 'Geneva, Switzerland',
    images: {
      primary: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Onyx Slate Dial', hex: '#1C1C1E' },
      { name: 'Arctic Silver Dial', hex: '#E5E5EA' },
      { name: 'Deep Emerald', hex: '#0B3B24' }
    ],
    sizes: ['40mm Case'],
    tags: ['Horology', 'Automatic', 'Sapphire', 'Heirloom']
  },
  {
    id: 'thz-04',
    name: 'Oud Royale Extrait de Parfum',
    subtitle: 'Aged Cambodian Oud & Florentine Iris (50ml)',
    category: 'Fragrance & Scents',
    price: 295,
    rating: 4.8,
    reviewsCount: 64,
    isBestseller: true,
    stockCount: 18,
    description: 'A dark, hypnotic fragrance crafted by master perfumers in Grasse. Built around 12-year aged sustainable Cambodian oud, woven with smoked birch, Florentine orris root, Damask rose, and bourbon vanilla.',
    details: [
      'Concentration: Extrait de Parfum (32% oil concentration)',
      'Sillage: Enveloping, 14+ hours longevity on skin',
      'Top Notes: Calabrian Bergamot, Pink Peppercorn, Cardamom',
      'Heart Notes: Florentine Orris, Smoked Birch, Damask Rose',
      'Base Notes: Rare Cambodian Oud, Ambergris, Bourbon Vanilla'
    ],
    materials: 'Heavy obsidian crystal flacon, magnetic knurled brass cap',
    dimensions: '50ml / 1.7 fl oz',
    origin: 'Grasse, France',
    images: {
      primary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Obsidian Flacon', hex: '#171717' }
    ],
    sizes: ['50ml Extrait'],
    tags: ['Fragrance', 'Artisanal Perfumery', 'Grasse', 'Sensorial']
  },
  {
    id: 'thz-05',
    name: 'Hand-Loomed Linen Atelier Shirt',
    subtitle: 'Organic Normandy Flax with Mother-of-Pearl Buttons',
    category: 'Tailored Couture',
    price: 240,
    rating: 4.7,
    reviewsCount: 29,
    isNew: false,
    stockCount: 15,
    description: 'Spun from breathable organic Normandy flax, washed with volcanic pumice for unparalleled softness from the very first wear. Cut with a relaxed camp collar and fastened with natural Australian mother-of-pearl buttons.',
    details: [
      '100% Long-Staple Normandy Flax Linen (190 GSM)',
      'Enzyme and stone softened finish for buttery drape',
      'Genuine Australian Mother-of-Pearl shank buttons',
      'Single-needle French seams throughout',
      'Breathable, thermoregulating structure'
    ],
    materials: '100% Certified Organic Normandy Linen',
    origin: 'Porto, Portugal',
    images: {
      primary: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Natural Ecru', hex: '#EAE6DF' },
      { name: 'Aegean Indigo', hex: '#263D5C' },
      { name: 'Olive Drab', hex: '#555944' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Apparel', 'Linen', 'Summer Essentials', 'Breathable']
  },
  {
    id: 'thz-06',
    name: 'The Minimalist Saddle Leather Folio',
    subtitle: 'Hand-Burnished Vegetable Tanned Leather',
    category: 'Artisan Leather',
    price: 320,
    rating: 4.9,
    reviewsCount: 51,
    isBestseller: true,
    stockCount: 9,
    description: 'Designed for the modern executive and creator. Accommodates a 14" laptop, legal documents, bespoke notebooks, and pens in dedicated suede-lined compartments. Hand-stitched with waxed linen thread.',
    details: [
      'Full-grain bridal leather with hand-beveled edges',
      'Traditional saddle-stitch technique using waxed cord',
      'Plush Japanese micro-suede interior lining',
      'Concealed neodymium magnetic tab closure',
      'Lifetime warranty on all seam stitching'
    ],
    materials: 'English Bridle Leather, Japanese Ultrasuede',
    dimensions: '36cm x 26cm x 2.5cm',
    origin: 'Northamptonshire, UK',
    images: {
      primary: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Vintage Chestnut', hex: '#633A18' },
      { name: 'Midnight Onyx', hex: '#1A1A1A' }
    ],
    sizes: ['14" Laptop Size', '16" Pro Size'],
    tags: ['Leather', 'Workplace', 'Minimalist', 'Hand-Stitched']
  },
  {
    id: 'thz-07',
    name: 'Precision Solid Brass Valet Tray',
    subtitle: 'CNC-Milled Monobloc with Saddle Leather Inset',
    category: 'Curated Living',
    price: 185,
    rating: 4.8,
    reviewsCount: 43,
    isNew: true,
    stockCount: 14,
    description: 'Precision milled from a solid 4-pound block of marine-grade brass, polished to a brushed satin finish and paired with a hand-cut vegetable tanned leather inlay to silence timepieces and jewelry.',
    details: [
      'Milled from a single block of solid C36000 free-cutting brass',
      'Protective natural micro-crystalline wax prevents uneven tarnish',
      'Custom dyed Italian vachetta leather center cushion',
      'Integrated non-marring silicone footings on underside',
      'Weighs a substantial 1.4 kg for immovable desk presence'
    ],
    materials: 'Solid Solid Brass, Italian Vachetta Leather, Silicone Base',
    dimensions: '22cm x 15cm x 2cm (1.4kg)',
    origin: 'Kyoto, Japan',
    images: {
      primary: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Brushed Brass / Tan', hex: '#D4AF37' },
      { name: 'Aged Gunmetal / Black', hex: '#3E424B' }
    ],
    sizes: ['Desk Medium', 'Console Grand'],
    tags: ['Living', 'Brass', 'Desk Decor', 'Artisanal']
  },
  {
    id: 'thz-08',
    name: 'Double-Breasted Sculpted Wool Blazer',
    subtitle: 'Woven from Super 150s Australian Merino',
    category: 'Tailored Couture',
    price: 760,
    originalPrice: 920,
    rating: 4.9,
    reviewsCount: 31,
    isBestseller: false,
    stockCount: 8,
    description: 'An immaculate architectural silhouette with soft roped shoulders and a floating canvas chest piece that molds naturally to your posture. Woven in northern Italy from ultra-fine Super 150s merino wool.',
    details: [
      '100% Super 150s Australian Merino Wool (260 GSM all-season)',
      'Half-canvas construction with horsehair chest reinforcement',
      'Hand-sewn milanese buttonhole on the lapel',
      'Double back vents and dual interior welt pockets',
      'Dry clean only by luxury garment specialists'
    ],
    materials: 'Super 150s Merino Wool, Silk Cupro Lining',
    origin: 'Naples, Italy',
    images: {
      primary: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Deep Navy Melange', hex: '#1E293B' },
      { name: 'Houndstooth Graphite', hex: '#374151' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    tags: ['Tailoring', 'Blazer', 'Formal', 'Wool']
  },
  {
    id: 'thz-09',
    name: 'Amber Santal Sculpted Candle (380g)',
    subtitle: 'Hand-Poured Soy Wax in Hand-Turned Ceramic',
    category: 'Fragrance & Scents',
    price: 95,
    rating: 4.8,
    reviewsCount: 57,
    isBestseller: true,
    stockCount: 24,
    description: 'Poured into a tactile textured stone vessel designed to be repurposed as an architectural vase. Notes of warm Mysore sandalwood, golden amber resin, Moroccan cedarwood, and delicate cardamon pods.',
    details: [
      '100% natural biodegradable coconut-soy wax blend',
      'Dual braided unbleached organic cotton wicks',
      'Burn time: 75+ hours of clean, soot-free flame',
      'Re-usable stoneware vessel fired at 1200°C',
      'Free from parabens, phthalates, and synthetic dyes'
    ],
    materials: 'Coconut-Soy Wax, Pure Botanical Oils, Stoneware Ceramic',
    dimensions: '380g / 13.4 oz, 10cm x 11cm',
    origin: 'Copenhagen, Denmark',
    images: {
      primary: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Warm Terracotta Sand', hex: '#C27D56' },
      { name: 'Chalk White Clay', hex: '#EBE7DF' }
    ],
    sizes: ['380g (75h Burn)'],
    tags: ['Candle', 'Fragrance', 'Ceramics', 'Home Living']
  },
  {
    id: 'thz-10',
    name: 'The Heritage Aviator Sunglasses',
    subtitle: 'Handcrafted Japanese Titanium & Mazzucchelli Acetate',
    category: 'Timepieces',
    price: 380,
    rating: 4.9,
    reviewsCount: 41,
    isNew: true,
    stockCount: 11,
    description: 'Sculpted from ultra-light beta-titanium and Italian Mazzucchelli cellulose acetate. Fitted with mineral glass polarized lenses offering 100% UVA/UVB protection with anti-reflective interior tinting.',
    details: [
      'Japanese Beta-Titanium framework (weighs only 21 grams)',
      'Custom five-barrel hinge mechanism with Teflon-coated screws',
      'Mineral Glass lenses with backside anti-reflective coating',
      'Handmade leather travel case and microfiber polishing cloth included',
      'Engraved TEHREEZ atelier serial on inner temple'
    ],
    materials: 'Beta-Titanium, Mazzucchelli Acetate, Mineral Glass',
    dimensions: 'Lens 54mm, Bridge 18mm, Temple 145mm',
    origin: 'Fukui, Japan',
    images: {
      primary: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Champagne Gold / Tortoise', hex: '#D4AF37' },
      { name: 'Matte Gunmetal / Slate', hex: '#3A3D40' }
    ],
    sizes: ['Standard Medium (54-18-145)'],
    tags: ['Eyewear', 'Titanium', 'Accessories', 'Polarized']
  },
  {
    id: 'thz-11',
    name: 'Mongolian Cashmere Travel Throw',
    subtitle: 'Woven Herringbone with Fringed Hand-Finished Hem',
    category: 'Curated Living',
    price: 490,
    rating: 5.0,
    reviewsCount: 38,
    isBestseller: true,
    stockCount: 6,
    description: 'An expansive, feather-light cocoon of pure warmth. Hand-woven on vintage wooden looms in the Scottish Highlands using raw underfleece collected from free-roaming mountain goats.',
    details: [
      '100% 4-ply Grade-A Cashmere yarn',
      'Dimensions: 140cm x 190cm including hand-twisted fringe',
      'Weight: 620 grams of sublime cloud-like loft',
      'Naturally hypoallergenic and temperature-regulating',
      'Presented in a bespoke cotton-canvas archival storage box'
    ],
    materials: '100% Highland-Woven Cashmere',
    dimensions: '140cm x 190cm',
    origin: 'Elgin, Scotland',
    images: {
      primary: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Desert Sand Melange', hex: '#D2B48C' },
      { name: 'Slate River Fog', hex: '#778899' },
      { name: 'Espresso Heather', hex: '#4A3B32' }
    ],
    sizes: ['140 x 190 cm'],
    tags: ['Living', 'Cashmere', 'Home Comfort', 'Heirloom']
  },
  {
    id: 'thz-12',
    name: 'Hand-Burnished Bifold Wallet',
    subtitle: 'Traditional French Chèvre Leather & Fil Au Chinois Stitch',
    category: 'Artisan Leather',
    price: 195,
    originalPrice: 240,
    rating: 4.9,
    reviewsCount: 76,
    isBestseller: true,
    stockCount: 22,
    description: 'Slim, functional refinement. Handcrafted from French goat leather prized for its scratch resistance and distinctive grain. Hand-stitched with waxed French linen thread and hand-creased hot wax edges.',
    details: [
      'Full-grain French Sully Chèvre goat leather',
      '6 card slots, 2 concealed receipt pockets, full banknote compartment',
      'Hand-burnished edges sealed with beeswax',
      'RFID blocking shielding incorporated seamlessly in lining',
      'Only 8mm thick when empty'
    ],
    materials: 'French Chèvre Leather, Waxed Linen Thread',
    dimensions: '11cm x 9cm x 0.8cm',
    origin: 'Lyon, France',
    images: {
      primary: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
      secondary: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      details: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
      ]
    },
    colors: [
      { name: 'Caramel Suede', hex: '#A75D27' },
      { name: 'Onyx Noir', hex: '#1C1C1E' },
      { name: 'Forest Moss', hex: '#2F4F4F' }
    ],
    sizes: ['Compact Bifold'],
    tags: ['Leather', 'Wallet', 'EDC', 'Bestseller']
  }
];

export const VALID_PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  TEHREEZ10: { discountPercent: 10, description: '10% Privileged Atelier Discount' },
  WELCOME15: { discountPercent: 15, description: '15% First Collector Order' },
  VIP20: { discountPercent: 20, description: '20% Private Circle Privilege' }
};

export const EDITORIAL_REVIEWS = [
  {
    quote: "TEHREEZ captures that elusive intersection of timeless European tailoring and contemporary Middle-Eastern architectural poise.",
    publication: "GQ Style International",
    location: "London"
  },
  {
    quote: "The craftsmanship in their Tuscan leather pieces rivals century-old heritage houses, executed with immaculate modern restraint.",
    publication: "Robb Report",
    location: "Milan"
  },
  {
    quote: "A masterclass in tactile luxury. Every fabric choice, zipper weight, and scent profile feels thoroughly considered.",
    publication: "Monocle Magazine",
    location: "Zurich"
  }
];
