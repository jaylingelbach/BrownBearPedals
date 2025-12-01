// ─── Status ───────────────────────────────────────────────────────────────────

export type ProductStatus = 'available' | 'sold' | 'coming_soon';

// ─── Product Lines ───────────────────────────────────────────────────────────

export const PRODUCT_LINES = [
  'Tarot',
  'Limited',
  'Custom',
  'Handwired',
  'Point to Point'
] as const;

export type ProductLine = (typeof PRODUCT_LINES)[number];

// ─── Pedal Types ─────────────────────────────────────────────────────────────

export const PEDAL_TYPES = [
  'Overdrive',
  'Distortion',
  'Fuzz',
  'Delay',
  'Modulation',
  'Boost',
  'Preamp',
  'Utility',
  'Buffers',
  'Amp Sim'
] as const;

export type PedalType = (typeof PEDAL_TYPES)[number];

// ─── Filter Ids (for the UI bar) ─────────────────────────────────────────────

export const PEDAL_FILTER_IDS = ['All', ...PEDAL_TYPES] as const;

export type PedalFilterId = (typeof PEDAL_FILTER_IDS)[number];

// ─── Pedal model ─────────────────────────────────────────────────────────────

export interface Pedal {
  slug: string;
  name: string;
  priceCents: number;
  status: ProductStatus;
  imageUrl: string;
  heroImageUrl?: string;
  descriptionShort?: string;
  descriptionLong?: string;
  descriptionIntro?: string;
  descriptionBullets?: string[];
  descriptionOutro?: string;
  tags?: string[];
  type: PedalType;
  productLine?: ProductLine;
  stripePriceId?: string;
}
