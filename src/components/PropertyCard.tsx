import React, { useState } from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onQuickView: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
  onChangeImage?: (property: Property) => void;
  onEditProperty?: (property: Property) => void;
  onDeleteProperty?: (property: Property) => void;
  rankBadge?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onQuickView,
  onScheduleVisit,
  onChangeImage,
  onEditProperty,
  onDeleteProperty,
  rankBadge,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const waText = encodeURIComponent(
    `Hola, me interesa agendar visita para la propiedad: ${property.title} (${property.location}, ${property.priceFormatted})`
  );
  const waUrl = `https://wa.me/593994773533?text=${waText}`;

  // Dynamic friendly badge color palette
  const getBadgeStyle = (badge: string, idx: number) => {
    const b = badge.toLowerCase();
    if (b.includes('oportunidad') || b.includes('inversión') || b.includes('rentabilidad') || b.includes('negociable')) {
      return 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white shadow-sm border border-amber-300/40';
    }
    if (b.includes('exclusivo') || b.includes('lujo') || b.includes('estreno') || b.includes('residencial')) {
      return 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white shadow-sm border border-emerald-300/40';
    }
    if (b.includes('lote') || b.includes('terreno') || b.includes('comercial') || b.includes('puyo') || b.includes('pastaza')) {
      return 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-sm border border-sky-300/40';
    }
    if (b.includes('escritura') || b.includes('biess') || b.includes('garantía') || b.includes('nuevo')) {
      return 'bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 text-white shadow-sm border border-rose-300/40';
    }
    return idx === 0
      ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-amber-200 border border-amber-300/30 shadow-sm'
      : 'bg-emerald-900/90 text-white backdrop-blur-sm border border-white/20 shadow-sm';
  };

  return (
    <article className="property-card flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e2e6e2] hover:border-emerald-300/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(6,95,70,0.12)] transition-all duration-300 group">
      {/* Image Container with 4:3 Aspect Ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
        {/* Fallback architectural gradient in case image is loading or offline */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${property.fallbackGradient} flex items-center justify-center transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="material-symbols-outlined text-white/30 text-5xl">apartment</span>
        </div>

        <img
          src={property.imageUrl}
          alt={property.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/20 pointer-events-none" />

        {/* Rank Badge if in Top 3 Highest-Value */}
        {rankBadge && (
          <div className="absolute top-3.5 left-3.5 z-20">
            <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-950 shadow-lg border border-amber-200 flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] fill-1 text-slate-950">workspace_premium</span>
              <span>{rankBadge}</span>
            </span>
          </div>
        )}

        {/* Dynamic Colorful Badges */}
        <div className={`absolute top-3.5 ${rankBadge ? 'left-36' : 'left-3.5'} flex flex-wrap gap-1.5 items-center z-10 max-w-[65%]`}>
          {property.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-transform hover:scale-105 ${getBadgeStyle(
                badge,
                idx
              )}`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Top Admin Action Buttons */}
        <div className="absolute top-3.5 right-13 flex items-center gap-1.5 z-10">
          {onEditProperty && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditProperty(property);
              }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex items-center gap-1 text-xs font-bold transition-all shadow-md cursor-pointer border border-amber-200 animate-pulse hover:animate-none"
              title="Editar precio, textos, habitaciones, metros y fotos"
            >
              <span className="material-symbols-outlined text-[15px]">edit_note</span>
              <span>Editar</span>
            </button>
          )}

          {onChangeImage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChangeImage(property);
              }}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white hover:text-amber-300 flex items-center justify-center text-xs font-bold transition-all shadow-md cursor-pointer border border-white/30 backdrop-blur-sm"
              title="Cambiar foto de este inmueble"
            >
              <span className="material-symbols-outlined text-[15px]">photo_camera</span>
            </button>
          )}

          {onDeleteProperty && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteProperty(property);
              }}
              className="p-1.5 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white flex items-center justify-center text-xs font-bold transition-all shadow-md cursor-pointer border border-white/30 backdrop-blur-sm"
              title="Eliminar este inmueble"
            >
              <span className="material-symbols-outlined text-[15px]">delete</span>
            </button>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3.5 right-3.5 w-8.5 h-8.5 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 shadow-md z-10 cursor-pointer ${
            isFavorite ? 'text-rose-500' : 'text-slate-600 hover:text-rose-500'
          }`}
          title="Guardar como favorita"
          aria-label="Guardar propiedad"
        >
          <span className={`material-symbols-outlined text-[18px] ${isFavorite ? 'fill-1' : ''}`}>
            {isFavorite ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Dynamic Price Tag & Photos Count Overlay */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-lg border border-white/80">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block leading-none mb-0.5">
              {property.priceLabel}
            </span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 bg-clip-text text-transparent tracking-tight tabular-nums">
              {property.priceFormatted}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-white/95 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20 shadow-sm">
            <span className="material-symbols-outlined text-[13px] text-amber-300">photo_camera</span>
            {property.photoCount} Fotos
          </span>
        </div>
      </div>

      {/* Body Information */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Location Line with soft sky accent */}
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">location_on</span>
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(property)}
            className="text-lg font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {property.title}
          </h3>

          {/* Short Summary */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        {/* Technical Specs 4-Column Grid with friendly colorful icons */}
        <div
          onClick={onEditProperty ? () => onEditProperty(property) : undefined}
          className={`grid grid-cols-4 gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 text-center border border-slate-200/80 transition-all ${
            onEditProperty
              ? 'cursor-pointer hover:border-amber-400 hover:ring-2 hover:ring-amber-200/50'
              : ''
          }`}
          title={onEditProperty ? 'Clic para editar superficie, habitaciones y especificaciones' : undefined}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[18px] text-amber-600">
              {property.category === 'land' ? 'straighten' : 'square_foot'}
            </span>
            <span className="text-xs font-bold text-slate-800 mt-0.5 tabular-nums">
              {property.specs.surface}
            </span>
            <span className="text-[9px] text-slate-500 uppercase tracking-wide">Superficie</span>
          </div>

          {property.category === 'residential' ? (
            <>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">bed</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {property.specs.rooms}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wide">Dormitorios</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px] text-sky-600">shower</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {property.specs.bathrooms}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wide">Baños</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px] text-indigo-600">garage</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {property.specs.parking}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wide">Parqueo</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px] text-teal-600">rule</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {property.specs.landUse}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wide">Uso Suelo</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px] text-orange-500">power</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {property.specs.services}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wide">Servicios</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">horizontal_rule</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5">
                  {property.specs.topography}
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wide">Topografía</span>
              </div>
            </>
          )}
        </div>

        {/* Card Actions with Dynamic Vibrant Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onQuickView(property)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            title="Vista Rápida del Inmueble"
            aria-label="Vista rápida"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>

          {onEditProperty && (
            <button
              onClick={() => onEditProperty(property)}
              className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-amber-300 shadow-xs"
              title="Editar textos, precios, habitaciones, metros y fotos"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-700">edit_note</span>
              <span>Editar</span>
            </button>
          )}

          {onDeleteProperty && (
            <button
              onClick={() => onDeleteProperty(property)}
              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
              title="Eliminar este inmueble"
              aria-label="Eliminar propiedad"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          )}

          <button
            onClick={() => onScheduleVisit(property)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/15 hover:shadow-lg hover:shadow-emerald-900/25 cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Agendar Visita</span>
          </button>
        </div>
      </div>
    </article>
  );
};
