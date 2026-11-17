export const FREE_SHIPPING_THRESHOLD = 150;
export const TAX_RATE = 0.08;

export const CATEGORIES = ['All', 'Audio', 'Lighting', 'Desk Hardware', 'Timepieces'];

export const SHIPPING_METHODS = {
  standard: {
    id: 'standard',
    label: 'Standard Ground',
    description: '3-5 business days · Free on orders $150+',
    baseCost: 12,
    freeEligible: true,
  },
  express: {
    id: 'express',
    label: 'Express Air',
    description: '1-2 business days · Priority tracked dispatch',
    baseCost: 24,
    freeEligible: false,
  },
};

export const PROMO_CODES = {
  NOVA10: {
    code: 'NOVA10',
    type: 'percent',
    value: 10,
    label: '10% Studio Member Discount',
  },
  WELCOME20: {
    code: 'WELCOME20',
    type: 'fixed',
    value: 20,
    minSubtotal: 100,
    label: '$20 Welcome Credit (orders $100+)',
  },
};

export const PRODUCTS = [
  {
    id: 'monolith-speaker',
    sku: 'NV-AUD-01',
    name: 'Monolith M1 Wireless Speaker',
    category: 'Audio',
    material: 'Anodized Aluminum',
    price: 280,
    rating: 4.9,
    reviewCount: 64,
    stockStatus: 'In Stock',
    featured: true,
    image: 'assets/images/prod_monolith_speaker.jpg',
    description:
      'CNC-milled acoustic enclosure with dual neodymium drivers, AirPlay 2, lossless USB-C DAC input, and zero-resonance aluminum damping.',
    finishes: ['Matte Charcoal', 'Raw Silver', 'Slate Obsidian'],
    specs: {
      Dimensions: '240 x 145 x 110 mm',
      Weight: '2.4 kg',
      Connectivity: 'Wi-Fi 6, Bluetooth 5.3, USB-C',
      Warranty: '2 Years Studio Care',
    },
  },
  {
    id: 'arc-desk-lamp',
    sku: 'NV-LGT-02',
    name: 'Arc Cantilever Desk Lamp',
    category: 'Lighting',
    material: 'Milled Aluminum',
    price: 195,
    rating: 4.8,
    reviewCount: 49,
    stockStatus: 'In Stock',
    featured: true,
    image: 'assets/images/prod_arc_lamp.jpg',
    description:
      'Counterbalanced architectural task lamp featuring high-CRI 97+ glare-free optics and stepless capacitive dimming from 2700K to 5000K.',
    finishes: ['Obsidian / Silver', 'Brushed Aluminum'],
    specs: {
      Dimensions: '520 x 440 x 130 mm',
      Luminance: '850 lm (CRI 97+)',
      'Color Temp': '2700K - 5000K Tunable',
      Warranty: '2 Years Studio Care',
    },
  },
  {
    id: 'chrono-desk-clock',
    sku: 'NV-TMP-03',
    name: 'Chrono S2 Solid Desk Clock',
    category: 'Timepieces',
    material: 'Machined Alloy',
    price: 145,
    rating: 4.9,
    reviewCount: 38,
    stockStatus: 'Limited Run',
    featured: true,
    image: 'assets/images/prod_chrono_clock.jpg',
    description:
      'Carved from a single billet of 6061 aluminum with a silent sweep Swiss quartz movement, sapphire crystal lens, and cobalt second hand.',
    finishes: ['Slate Dial', 'Chalk White Dial'],
    specs: {
      Dimensions: '98 x 98 x 42 mm',
      Movement: 'Silent Sweep Quartz',
      Crystal: 'Anti-Reflective Sapphire',
      Battery: 'AA Lithium (36 Months)',
    },
  },
  {
    id: 'studio-headphones',
    sku: 'NV-AUD-04',
    name: 'Reference H1 Studio Headphones',
    category: 'Audio',
    material: 'Titanium & Leather',
    price: 340,
    rating: 4.9,
    reviewCount: 82,
    stockStatus: 'In Stock',
    featured: false,
    image: 'assets/images/prod_studio_headphones.jpg',
    description:
      'Closed-back planar magnetic headphones engineered with spring-titanium yokes, memory-foam lambskin earpads, and hybrid active noise isolation.',
    finishes: ['Titanium / Charcoal', 'Obsidian Black'],
    specs: {
      Driver: '45mm Planar Magnetic',
      Battery: '42 Hours ANC Active',
      Weight: '310 g',
      Warranty: '2 Years Studio Care',
    },
  },
  {
    id: 'modular-desk-dock',
    sku: 'NV-DSK-05',
    name: 'Modular MagDock Desk Tray',
    category: 'Desk Hardware',
    material: 'Anodized Slate',
    price: 115,
    rating: 4.7,
    reviewCount: 41,
    stockStatus: 'In Stock',
    featured: false,
    image: 'assets/images/prod_modular_dock.jpg',
    description:
      'Weighted desk valet combining a 15W Qi2 magnetic charging pad with precision-milled channels for pens, mechanical keys, and everyday tools.',
    finishes: ['Slate Gray', 'Matte Black'],
    specs: {
      Dimensions: '265 x 120 x 18 mm',
      Output: '15W Qi2 + USB-C Passthrough',
      Base: 'Micro-suction Silicone Pad',
      Weight: '680 g',
    },
  },
  {
    id: 'ambient-table-lantern',
    sku: 'NV-LGT-06',
    name: 'Lumen G3 Portable Lantern',
    category: 'Lighting',
    material: 'Borosilicate Glass',
    price: 165,
    rating: 4.8,
    reviewCount: 53,
    stockStatus: 'In Stock',
    featured: false,
    image: 'assets/images/prod_ambient_lantern.jpg',
    description:
      'Cordless indoor-outdoor ambient luminaire pairing hand-blown frosted borosilicate glass with a weighted dark bronze aluminum base and 30-hour battery.',
    finishes: ['Dark Bronze', 'Brushed Steel'],
    specs: {
      Dimensions: '125 x 125 x 220 mm',
      Battery: '30 Hours (USB-C Fast Charge)',
      Protection: 'IP54 Weather Resistant',
      'Color Temp': '2400K Warm Ambient',
    },
  },
];

export function getProductById(productId) {
  return PRODUCTS.find((item) => item.id === productId) || null;
}

export function formatCurrency(amount) {
  const safeValue = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeValue);
}
