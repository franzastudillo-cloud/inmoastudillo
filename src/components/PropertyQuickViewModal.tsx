import React from 'react';
import { Property } from '../types';

interface PropertyQuickViewModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleVisit: (property: Property) => void;
  onEditProperty?: (property: Property) => void;
}

export const PropertyQuickViewModal: React.FC<PropertyQuickViewModalProps> = ({
  property,
  onClose,
  onScheduleVisit,
  onEditProperty,
}) => {
  if (!property) return null;

  const waLink = `https://wa.me/593994773533?text=${encodeURIComponent(
    `Hola, solicito información técnica y visita para: ${property.title} (${property.priceFormatted})`
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#e1e3e0] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#191c1b] hover:bg-[#f2f4f1] flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Hero Photo with Scrim */}
        <div className="relative w-full aspect-[16/9] max-h-[360px] overflow-hidden bg-slate-900">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {property.badges.map((b, i) => {
              const lower = b.toLowerCase();
              const badgeClass = lower.includes('oportunidad') || lower.includes('inversión')
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : lower.includes('lote') || lower.includes('terreno')
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white';
              return (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-md ${badgeClass}`}
                >
                  {b}
                </span>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                {property.priceLabel}
              </span>
              <span className="text-3xl font-extrabold tracking-tight tabular-nums text-white drop-shadow-sm">
                {property.priceFormatted}
              </span>
            </div>
            <span className="text-xs font-semibold bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-amber-300">photo_camera</span>
              {property.photoCount} Fotografías Verificadas
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          {/* Title & Location */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {property.title}
            </h2>
            <div className="flex items-center gap-1.5 text-slate-600 text-sm">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">location_on</span>
              <span className="font-semibold">{property.location}</span>
            </div>
          </div>

          {/* Quick Technical Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#f2f4f1] border border-[#e1e3e0]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">Superficie Total</span>
              <span className="text-base font-bold text-[#004215]">{property.specs.surface}</span>
            </div>
            {property.category === 'residential' ? (
              <>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">Dormitorios</span>
                  <span className="text-base font-bold text-[#004215]">{property.specs.rooms}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">Baños</span>
                  <span className="text-base font-bold text-[#004215]">{property.specs.bathrooms}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">Parqueaderos</span>
                  <span className="text-base font-bold text-[#004215]">{property.specs.parking}</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">Uso de Suelo</span>
                  <span className="text-base font-bold text-[#004215]">{property.specs.landUse}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">Servicios</span>
                  <span className="text-base font-bold text-[#004215]">{property.specs.services}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">Topografía</span>
                  <span className="text-base font-bold text-[#004215]">{property.specs.topography}</span>
                </div>
              </>
            )}
          </div>

          {/* Detailed Description */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#191c1b]">
              Descripción Arquitectónica & Entorno
            </h4>
            <p className="text-sm text-[#41493f] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Key Attributes */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#191c1b]">
              Puntos Destacados
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#191c1b] bg-[#f8faf7] p-2.5 rounded-lg border border-[#eceeeb]">
                  <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Certification Guarantee Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-[24px] text-emerald-700 shrink-0 mt-0.5">verified_user</span>
            <div className="text-xs text-emerald-950 leading-relaxed">
              <span className="font-extrabold text-emerald-900 block mb-0.5">Garantía Legal Inmo Astudillo (100% Blindaje):</span>
              Inmueble con titulación auditada por nuestro departamento legal. Certificado de gravámenes al día, plano catastral verificado y sin prohibiciones de enajenar. Listo para suscripción inmediata de escritura.
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {onEditProperty && (
              <button
                onClick={() => {
                  onClose();
                  onEditProperty(property);
                }}
                className="w-full sm:w-auto py-3 px-4.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-900/15 cursor-pointer active:scale-95"
                title="Editar precios, habitaciones, metros y fotos"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Editar Inmueble</span>
              </button>
            )}

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/25 hover:shadow-lg active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Contactar por WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onScheduleVisit(property);
              }}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/15 hover:shadow-lg cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Agendar Visita</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
