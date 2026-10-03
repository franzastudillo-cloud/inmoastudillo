import React from 'react';
import { SocialBanner, Property } from '../types';

interface SocialPropertyBannersProps {
  banners: SocialBanner[];
  isAdmin: boolean;
  onOpenAddBanner: () => void;
  onEditBanner?: (banner: SocialBanner) => void;
  onDeleteBanner: (bannerId: string) => void;
  onScheduleVisit: (property: Property) => void;
  onQuickView?: (property: Property) => void;
  properties?: Property[];
}

export const SocialPropertyBanners: React.FC<SocialPropertyBannersProps> = ({
  banners,
  isAdmin,
  onOpenAddBanner,
  onEditBanner,
  onDeleteBanner,
  onScheduleVisit,
  properties = [],
}) => {

  // Helper to open WhatsApp with custom booking message for this social post
  const handleWhatsAppVisit = (banner: SocialBanner, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `*Solicitud de Visita Presencial - Inmo Astudillo*\n\n` +
      `🏠 *Propiedad:* ${banner.title}\n` +
      `💵 *Precio:* ${banner.priceFormatted || 'Consultar'}\n` +
      `📍 *Ubicación:* ${banner.location}\n` +
      `🔗 *Publicación en Redes:* ${banner.postUrl}\n\n` +
      `Hola Cbr. Daniel Astudillo, vi esta publicación en sus redes y deseo agendar una visita presencial para conocer el inmueble.`
    );
    window.open(`https://wa.me/593994773533?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Convert banner to a Property object for onScheduleVisit modal if clicked
  const handleScheduleModal = (banner: SocialBanner, e: React.MouseEvent) => {
    e.stopPropagation();
    const matched = properties.find(
      (p) => p.id === banner.propertyId || (banner.title && p.title.toLowerCase().includes(banner.title.toLowerCase()))
    );
    if (matched) {
      onScheduleVisit(matched);
      return;
    }

    const pseudoProperty: Property = {
      id: typeof banner.propertyId === 'number' ? banner.propertyId : 999,
      title: banner.title,
      category: banner.title.toLowerCase().includes('terreno') || banner.title.toLowerCase().includes('lote') ? 'land' : 'residential',
      price: banner.price || 0,
      priceFormatted: banner.priceFormatted || 'Consultar Precio',
      priceLabel: 'Venta Directa',
      location: banner.location || 'Puyo, Pastaza',
      locationZone: banner.locationZone || 'Puyo',
      address: banner.location || 'Puyo, Pastaza',
      shortDescription: banner.description || banner.title,
      description: banner.description || banner.title,
      imageUrl: banner.imageUrl,
      fallbackGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      photoCount: 1,
      badges: [banner.platform.toUpperCase(), 'Publicación en Redes'],
      specs: {
        surface: banner.surface || 'Consultar',
        rooms: banner.rooms,
        bathrooms: banner.bathrooms,
        parking: banner.parking
      },
      highlights: [banner.description || banner.title],
      legalCertified: true,
      featured: true
    };
    onScheduleVisit(pseudoProperty);
  };

  return (
    <div className="w-full">
      {/* Header section with Admin Add Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="material-symbols-outlined text-[16px] text-emerald-700">campaign</span>
            <span>Banners de Publicidad de Propiedades (Facebook & Instagram)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#003816] tracking-tight">
            Publicaciones Destacadas en Redes Sociales
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Propiedades promocionadas en Facebook e Instagram. Haz clic en el banner para ver la publicación original en redes o agenda tu visita técnica con un solo clic.
          </p>
        </div>

        {/* Admin Action: Agregar Publicación con IA */}
        {isAdmin && (
          <button
            type="button"
            onClick={onOpenAddBanner}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 text-amber-300 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-98 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Agregar Publicación (Facebook / Instagram)</span>
          </button>
        )}
      </div>

      {/* When no banners exist yet */}
      {banners.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-emerald-200/90 rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[28px]">campaign</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            {isAdmin ? 'Crea tu Primer Banner Publicitario con IA' : 'Próximamente Banners de Publicidad'}
          </h3>
          <p className="text-xs text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed">
            {isAdmin 
              ? 'Pega el enlace de Facebook (ej: https://www.facebook.com/share/p/1FrRzwdY6E/). La IA extraerá los datos automáticamente y solo tendrás que subir la foto de la propiedad.' 
              : 'En breve publicaremos nuevas propiedades destacadas con enlace directo a nuestras redes oficiales.'}
          </p>
          {isAdmin ? (
            <button
              onClick={onOpenAddBanner}
              className="mt-5 px-5 py-2.5 bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 text-amber-300 text-xs font-extrabold rounded-xl cursor-pointer shadow-md transition-all active:scale-98 inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Agregar Publicación con IA</span>
            </button>
          ) : (
            <a
              href="https://www.facebook.com/InmoAstudillo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 px-5 py-2.5 bg-[#1877F2] hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Ver Facebook Oficial</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          )}
        </div>
      ) : (
        /* Grid of Advertising Property Banners */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner) => {
            const isFacebook = banner.platform === 'facebook';

            return (
              <div
                key={banner.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-5px_rgba(0,66,21,0.18)] transition-all duration-300 flex flex-col group relative"
              >
                {/* Social Network Top Ad Bar with direct link */}
                <div className={`px-5 py-3 flex items-center justify-between text-white ${
                  isFacebook
                    ? 'bg-[#1877F2]'
                    : 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                      {isFacebook ? (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-black tracking-wide">
                      {isFacebook ? 'Publicación en Facebook' : 'Publicación en Instagram'}
                    </span>
                  </div>

                  {/* Direct Link button */}
                  <a
                    href={banner.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[11px] font-black bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors backdrop-blur-xs cursor-pointer shadow-xs"
                    title="Abrir la publicación original"
                  >
                    <span>Ir a {isFacebook ? 'Facebook' : 'Instagram'}</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>

                {/* Banner Hero Photo with Direct Click to Social Post */}
                <a
                  href={banner.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 block cursor-pointer group"
                  title="Haz clic para ver la publicación en redes"
                >
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Floating Price Tag */}
                  {banner.priceFormatted && (
                    <div className="absolute top-4 left-4 bg-[#003816]/95 backdrop-blur-md text-amber-300 border border-amber-300/40 px-3.5 py-1.5 rounded-xl shadow-lg">
                      <span className="text-[10px] uppercase font-bold text-amber-200/90 block leading-none">
                        Precio
                      </span>
                      <span className="text-sm font-black tracking-tight leading-tight">
                        {banner.priceFormatted}
                      </span>
                    </div>
                  )}

                  {/* Overlay Link Hint */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Ver en {isFacebook ? 'Facebook' : 'Instagram'}</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </div>

                  {/* Bottom details inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    {banner.location && (
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-300 mb-1 drop-shadow-md">
                        <span className="material-symbols-outlined text-[15px]">location_on</span>
                        <span>{banner.location}</span>
                      </div>
                    )}
                    <h3 className="text-base sm:text-lg font-black leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {banner.title}
                    </h3>
                  </div>
                </a>

                {/* Banner Footer & Actions */}
                <div className="p-5 flex flex-col justify-between gap-4 flex-1">
                  {/* Technical Specs pills if present */}
                  {(banner.surface || banner.rooms || banner.bathrooms || banner.parking) && (
                    <div className="flex flex-wrap items-center gap-2">
                      {banner.surface && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-900">
                          <span className="material-symbols-outlined text-[14px]">square_foot</span>
                          <span>{banner.surface}</span>
                        </span>
                      )}
                      {banner.rooms && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-700">
                          <span className="material-symbols-outlined text-[14px]">bed</span>
                          <span>{banner.rooms}</span>
                        </span>
                      )}
                      {banner.bathrooms && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-700">
                          <span className="material-symbols-outlined text-[14px]">bathtub</span>
                          <span>{banner.bathrooms}</span>
                        </span>
                      )}
                      {banner.parking && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-700">
                          <span className="material-symbols-outlined text-[14px]">garage</span>
                          <span>{banner.parking}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {banner.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {banner.description}
                    </p>
                  )}

                  {/* Action Buttons: Agendar Visita, WhatsApp, y Eliminar Propiedad */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => handleScheduleModal(banner, e)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#003816] to-[#005422] hover:from-[#00481c] hover:to-[#00692b] text-amber-300 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                      <span>Agendar Visita a esta Propiedad</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleWhatsAppVisit(banner, e)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-emerald-700">chat</span>
                        <span>Consultar por WhatsApp</span>
                      </button>

                      {/* Prominent Delete Button as explicitly requested by user */}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`¿Estás seguro de eliminar la propiedad "${banner.title}"?`)) {
                              onDeleteBanner(banner.id);
                            }
                          }}
                          className="py-2 px-3.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-extrabold transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0 active:scale-95"
                          title="Eliminar esta propiedad y su banner"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span>Eliminar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
