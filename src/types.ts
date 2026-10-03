export type CategoryType = 'all' | 'residential' | 'land' | 'investment';

export interface Property {
  id: number;
  title: string;
  category: 'residential' | 'land';
  price: number;
  priceFormatted: string;
  priceLabel: string;
  location: string;
  locationZone: string;
  address: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  fallbackGradient: string;
  photoCount: number;
  badges: string[];
  specs: {
    surface: string;
    rooms?: string;
    bathrooms?: string;
    parking?: string;
    landUse?: string;
    services?: string;
    topography?: string;
  };
  highlights: string[];
  legalCertified: boolean;
  featured: boolean;
}

export type ViewType = 'inicio' | 'propiedades' | 'tramites' | 'contacto';

export interface SocialBanner {
  id: string;
  platform: 'facebook' | 'instagram' | 'tiktok';
  postUrl: string;
  title: string;
  priceFormatted: string;
  price?: number;
  location: string;
  locationZone?: string;
  imageUrl: string;
  description: string;
  badge?: string;
  surface?: string;
  rooms?: string;
  bathrooms?: string;
  parking?: string;
  propertyId?: number;
  dateAdded?: string;
}
