// TODO: Doc strings
export type ProductStatus = 'available' | 'sold' | 'coming_soon';

export type ProductLine =
  | 'Tarot'
  | 'Limited'
  | 'Custom'
  | 'Handwired'
  | 'Point to Point';

export type PedalType =
  | 'Overdrive'
  | 'Distortion'
  | 'Fuzz'
  | 'Delay'
  | 'Modulation'
  | 'Boost'
  | 'Preamp'
  | 'Utility'
  | 'Buffers'
  | 'Amp Sim';

export type PedalFilterId = 'All' | PedalType;

export interface Pedal {
  slug: string;
  name: string;
  priceCents: number;
  status: ProductStatus;
  imageUrl: string;
  heroImageUrl?: string;
  descriptionShort?: string;
  descriptionLong?: string;
  tags?: string[];
  type: PedalType;
  productLine?: ProductLine;
}
