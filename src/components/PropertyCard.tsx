import React, { useState } from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onQuickView: (property: Property) => void;
  onScheduleVisit?: (property: Property) => void;
  onDeleteProperty?: (property: Property) => void;
  rankBadge?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onQuickView,
  onScheduleVisit,
  onDeleteProperty,
  rankBadge,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const precioFormateado = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.precio) + ' USD';

  const portada = property.fotos && property.fotos.length > 0 ? property.fotos[0] : '';

  const tipoLabel: Record<string, string> = {
    casa: 'Casa Residencial',
    terreno: 'Terreno / Lote',
    departamento: 'Departamento',
    quinta: 'Quinta Vacacional',
  };

  return (
    <article
      onClick={() => onQuickView(property)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer text-left"
    >
      {/* Cover Image in 4:3 ratio with lazy loading and subtle hover zoom */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-900">
        {portada ? (
          <img
            src={portada}
            alt={property.titulo}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
            <span className="material-symbols-outlined text-4xl">photo</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Rank Badge if provided */}
        {rankBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
              <span>{rankBadge}</span>
            </span>
          </div>
        )}

        {/* Type Badge */}
        <div className={`absolute ${rankBadge ? 'top-10' : 'top-3'} left-3 z-10`}>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-800/90 text-amber-300 border border-emerald-500/30 backdrop-blur-xs shadow-sm">
            {tipoLabel[property.tipo] || property.tipo}
          </span>
        </div>

        {/* Delete button (Admin) */}
        {onDeleteProperty && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteProperty(property);
            }}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
            title="Eliminar publicación"
          >
            <span className="material-symbols-outlined text-[17px]">delete</span>
          </button>
        )}

        {/* Highlighted Price over photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 pointer-events-none">
          <div className="bg-[#003816]/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-300/40 shadow-md">
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300/80 block leading-none">
              Precio
            </span>
            <span className="text-base sm:text-lg font-black text-amber-300 tracking-tight leading-tight">
              {precioFormateado}
            </span>
          </div>

          {property.fotos && property.fotos.length > 1 && (
            <div className="bg-black/60 backdrop-blur-xs text-white px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">photo_library</span>
              <span>{property.fotos.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Info Below Photo */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
            {property.titulo}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5">
            <span className="material-symbols-outlined text-[15px] text-emerald-700 shrink-0">location_on</span>
            <span className="truncate">{property.ubicacion}</span>
          </div>
        </div>

        {/* Key Specs Icons (Only if they exist) */}
        {(property.superficie !== null ||
          property.habitaciones !== null ||
          property.banos !== null ||
          property.parqueaderos !== null) && (
          <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100 text-slate-700 text-xs">
            {property.superficie !== null && property.superficie !== undefined && (
              <span className="inline-flex items-center gap-1 font-semibold bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md text-[11px]">
                <span className="material-symbols-outlined text-[14px] text-emerald-700">square_foot</span>
                <span>{property.superficie} m²</span>
              </span>
            )}

            {property.habitaciones !== null && property.habitaciones !== undefined && (
              <span className="inline-flex items-center gap-1 font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                <span className="material-symbols-outlined text-[14px]">bed</span>
                <span>{property.habitaciones} hab.</span>
              </span>
            )}

            {property.banos !== null && property.banos !== undefined && (
              <span className="inline-flex items-center gap-1 font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                <span className="material-symbols-outlined text-[14px]">bathtub</span>
                <span>{property.banos} baños</span>
              </span>
            )}

            {property.parqueaderos !== null && property.parqueaderos !== undefined && (
              <span className="inline-flex items-center gap-1 font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                <span className="material-symbols-outlined text-[14px]">directions_car</span>
                <span>{property.parqueaderos} parq.</span>
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
