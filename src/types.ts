export type CategoryType = 'all' | 'casa' | 'terreno' | 'departamento' | 'quinta';

export interface Property {
  id: string;
  titulo: string;
  tipo: 'casa' | 'terreno' | 'departamento' | 'quinta';
  precio: number;
  ubicacion: string;
  descripcion: string;
  superficie: number | null;
  habitaciones: number | null;
  banos: number | null;
  parqueaderos: number | null;
  enlacePublicacion: string | null;
  fotos: string[];
  creadoEn: string;
}

export type Propiedad = Property;

export type ViewType = 'inicio' | 'propiedades' | 'tramites' | 'contacto' | 'admin';
