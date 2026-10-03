import React, { useState, useEffect, useMemo } from 'react';
import { Propiedad, listarPropiedades } from '../lib/api';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyQuickViewModal } from '../components/PropertyQuickViewModal';
import { ViewType } from '../types';

interface PortfolioViewProps {
  onNavigate?: (view: ViewType) => void;
  onOpenAppointmentModal?: () => void;
  isAdmin?: boolean;
  onDeleteProperty?: (propiedad: Propiedad) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onNavigate,
  isAdmin = false,
  onDeleteProperty,
}) => {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Ordering
  const [filtroTipo, setFiltroTipo] = useState<'all' | 'casa' | 'terreno' | 'departamento' | 'quinta'>('all');
  const [orden, setOrden] = useState<'recientes' | 'precio_menor' | 'precio_mayor'>('recientes');

  // Selected for full detail modal
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState<Propiedad | null>(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await listarPropiedades();
      setPropiedades(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.message || 'No se pudieron cargar las propiedades. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  // Filtered and sorted properties
  const propiedadesFiltradas = useMemo(() => {
    let resultado = [...propiedades];

    if (filtroTipo !== 'all') {
      resultado = resultado.filter((p) => p.tipo === filtroTipo);
    }

    if (orden === 'precio_menor') {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'precio_mayor') {
      resultado.sort((a, b) => b.precio - a.precio);
    } else {
      resultado.sort((a, b) => new Date(b.creadoEn || 0).getTime() - new Date(a.creadoEn || 0).getTime());
    }

    return resultado;
  }, [propiedades, filtroTipo, orden]);

  const tiposFiltro: { label: string; valor: 'all' | 'casa' | 'terreno' | 'departamento' | 'quinta' }[] = [
    { label: 'Todos', valor: 'all' },
    { label: 'Casas', valor: 'casa' },
    { label: 'Terrenos', valor: 'terreno' },
    { label: 'Departamentos', valor: 'departamento' },
    { label: 'Quintas', valor: 'quinta' },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf7] text-[#191c1b] pb-24">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-emerald-950 via-[#003816] to-[#002d12] text-white py-14 sm:py-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 shadow-sm">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>Portafolio Inmobiliario en Pastaza</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl">
            Propiedades Seleccionadas en Puyo
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 mt-3 max-w-2xl leading-relaxed">
            Casas, terrenos, departamentos y quintas verificadas con rigor jurídico, avalúo comercial exacto y titulación notarial en Pastaza y la Amazonía ecuatoriana.
          </p>
        </div>
      </section>

      {/* Controls & Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tiposFiltro.map((t) => (
              <button
                key={t.valor}
                type="button"
                onClick={() => setFiltroTipo(t.valor)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  filtroTipo === t.valor
                    ? 'bg-[#003816] text-amber-300 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Ordenar por:
            </span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
            >
              <option value="recientes">Más recientes</option>
              <option value="precio_menor">Precio: menor a mayor</option>
              <option value="precio_mayor">Precio: mayor a menor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        {/* Loading Skeletons */}
        {cargando && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse"
              >
                <div className="w-full aspect-[4/3] bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-100 rounded-md w-1/2" />
                  <div className="pt-3 border-t border-slate-100 flex gap-2">
                    <div className="h-5 bg-slate-100 rounded-md w-1/3" />
                    <div className="h-5 bg-slate-100 rounded-md w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!cargando && error && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto border border-rose-200 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <span className="material-symbols-outlined text-[28px]">cloud_off</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">No se pudieron cargar las propiedades</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Ocurrió un inconveniente al conectar con el servidor. Puedes intentar nuevamente o comunicarte con nosotros directamente por WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={cargar}
                className="px-5 py-2.5 rounded-xl bg-[#003816] hover:bg-[#004d1e] text-amber-300 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Reintentar</span>
              </button>
              <a
                href="https://wa.me/593994773533?text=Hola%20Inmo%20Astudillo,%20deseo%20consultar%20sobre%20las%20propiedades%20disponibles"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Escríbenos por WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!cargando && !error && propiedadesFiltradas.length === 0 && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto border border-slate-200/90 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[30px]">cottage</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Pronto publicaremos nuevas propiedades. Escríbenos por WhatsApp
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
              Si estás buscando un inmueble específico en Puyo o Pastaza (casa, lote, departamento o quinta), contáctanos directamente para ayudarte a encontrarlo antes de su publicación general.
            </p>
            <a
              href="https://wa.me/593994773533?text=Hola%20Inmo%20Astudillo,%20deseo%20consultar%20propiedades%20en%20Puyo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs shadow-md shadow-[#25D366]/20 transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        )}

        {/* Properties Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        {!cargando && !error && propiedadesFiltradas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propiedadesFiltradas.map((propiedad) => (
              <PropertyCard
                key={propiedad.id}
                property={propiedad}
                onQuickView={(p) => setPropiedadSeleccionada(p)}
                onDeleteProperty={isAdmin ? onDeleteProperty : undefined}
              />
            ))}
          </div>
        )}
      </main>

      {/* Property Detail Modal */}
      {propiedadSeleccionada && (
        <PropertyQuickViewModal
          property={propiedadSeleccionada}
          onClose={() => setPropiedadSeleccionada(null)}
        />
      )}
    </div>
  );
};
