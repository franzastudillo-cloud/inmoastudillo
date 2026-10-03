import React, { useState } from 'react';
import { Property } from '../types';

interface PropertyQuickViewModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleVisit?: (property: Property) => void;
}

export const PropertyQuickViewModal: React.FC<PropertyQuickViewModalProps> = ({
  property,
  onClose,
  onScheduleVisit,
}) => {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  if (!property) return null;

  const precioFmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.precio) + ' USD';

  const fotos = property.fotos && property.fotos.length > 0 ? property.fotos : [];
  const currentPhoto = fotos[currentPhotoIdx] || '';

  const waText = encodeURIComponent(
    `Hola Cbr. Daniel Astudillo, me interesa consultar por la propiedad: ${property.titulo} (${precioFmt}) en ${property.ubicacion}.`
  );
  const waUrl = `https://wa.me/593994773533?text=${waText}`;

  const nextPhoto = () => {
    if (fotos.length > 1) {
      setCurrentPhotoIdx((prev) => (prev + 1) % fotos.length);
    }
  };

  const prevPhoto = () => {
    if (fotos.length > 1) {
      setCurrentPhotoIdx((prev) => (prev - 1 + fotos.length) % fotos.length);
    }
  };

  const tipoLabel: Record<string, string> = {
    casa: 'Casa Residencial',
    terreno: 'Terreno / Lote',
    departamento: 'Departamento',
    quinta: 'Quinta Vacacional',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-slate-200 text-slate-900 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer backdrop-blur-md"
          aria-label="Cerrar ventana"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Gallery / Enlarged Photo Carousel */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[460px] bg-slate-950 overflow-hidden select-none">
          {currentPhoto ? (
            <img
              src={currentPhoto}
              alt={`${property.titulo} - foto ${currentPhotoIdx + 1}`}
              className="w-full h-full object-contain sm:object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-5xl">photo</span>
            </div>
          )}

          {/* Prev / Next Arrows */}
          {fotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
                title="Foto anterior"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
                title="Siguiente foto"
              >
                <span className="material-symbols-outlined text-[22px]">chevron_right</span>
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-3 right-3 z-20 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {currentPhotoIdx + 1} / {fotos.length}
              </div>
            </>
          )}

          {/* Over-photo Tag and Price */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800 text-amber-300 border border-emerald-500/40 backdrop-blur-md shadow-md">
              {tipoLabel[property.tipo] || property.tipo}
            </span>
          </div>
        </div>

        {/* Thumbnails row */}
        {fotos.length > 1 && (
          <div className="p-3 bg-slate-900 flex items-center gap-2 overflow-x-auto">
            {fotos.map((f, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPhotoIdx(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentPhotoIdx === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={f} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header & Price */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {property.titulo}
              </h2>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 mt-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-700">location_on</span>
                <span>{property.ubicacion}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl shrink-0">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Precio de Venta</span>
              <span className="text-2xl font-black text-emerald-950">{precioFmt}</span>
            </div>
          </div>

          {/* Specs Grid (Only real data that exists) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {property.superficie !== null && property.superficie !== undefined && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-emerald-700">square_foot</span>
                  Superficie
                </span>
                <span className="text-sm font-black text-slate-900 mt-1 block">{property.superficie} m²</span>
              </div>
            )}

            {property.habitaciones !== null && property.habitaciones !== undefined && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-emerald-700">bed</span>
                  Habitaciones
                </span>
                <span className="text-sm font-black text-slate-900 mt-1 block">{property.habitaciones} hab.</span>
              </div>
            )}

            {property.banos !== null && property.banos !== undefined && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-emerald-700">bathtub</span>
                  Baños
                </span>
                <span className="text-sm font-black text-slate-900 mt-1 block">{property.banos} baños</span>
              </div>
            )}

            {property.parqueaderos !== null && property.parqueaderos !== undefined && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-emerald-700">directions_car</span>
                  Parqueaderos
                </span>
                <span className="text-sm font-black text-slate-900 mt-1 block">{property.parqueaderos}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {property.descripcion && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Descripción de la Propiedad
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                {property.descripcion}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100">
            {/* Green button: Consultar por WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm shadow-md shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Consultar por WhatsApp</span>
            </a>

            {/* Optional: Ver publicación en Facebook/Instagram only if link exists */}
            {property.enlacePublicacion && (
              <a
                href={property.enlacePublicacion}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Ver Publicación en Redes</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
