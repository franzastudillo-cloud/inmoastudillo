export type Propiedad = {
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
};

async function pedir(url: string, init?: RequestInit) {
  const r = await fetch(url, { cache: 'no-store', credentials: 'same-origin', ...init });
  const datos = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(datos.error || 'Ocurrió un error. Intenta de nuevo.');
  return datos;
}

export const listarPropiedades = (): Promise<Propiedad[]> => pedir('/api/propiedades');
export const hayAdmin = async (): Promise<boolean> => (await pedir('/api/sesion')).admin === true;
export const iniciarSesion = (password: string) =>
  pedir('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
export const cerrarSesion = () => pedir('/api/logout', { method: 'POST' });
export const crearPropiedad = (form: FormData) => pedir('/api/propiedades', { method: 'POST', body: form });
export const eliminarPropiedad = (id: string) => pedir(`/api/propiedades/${id}`, { method: 'DELETE' });
