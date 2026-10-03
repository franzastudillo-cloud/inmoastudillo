import React, { useState, useMemo } from 'react';
import { Property, ViewType } from '../types';
import { PROPERTIES_DATA } from '../data/propertiesData';
import { PropertyCard } from '../components/PropertyCard';

interface PortfolioViewProps {
  onQuickView: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
  onOpenAppointmentModal?: () => void;
  onNavigate: (view: ViewType) => void;
  properties?: Property[];
  onChangePropertyImage?: (property: Property) => void;
  onEditProperty?: (property: Property) => void;
  onDeleteProperty?: (property: Property) => void;
  onAddNewProperty?: () => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
  onOpenPhotoSecurityModal?: () => void;
  onResetProperties?: () => void;
  onOpenExportCatalog?: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  onQuickView,
  onScheduleVisit,
  onOpenAppointmentModal,
  onNavigate,
  properties = PROPERTIES_DATA,
  onChangePropertyImage,
  onEditProperty,
  onDeleteProperty,
  onAddNewProperty,
  isAdmin = false,
  onToggleAdmin,
  onOpenPhotoSecurityModal,
  onResetProperties,
  onOpenExportCatalog,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'land'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Category match
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Location match
      if (selectedLocation !== 'all' && p.locationZone !== selectedLocation) {
        return false;
      }
      // Price match
      if (selectedPriceRange === 'under-500k' && p.price > 500000) return false;
      if (
        selectedPriceRange === '500k-800k' &&
        (p.price <= 500000 || p.price > 800000)
      )
        return false;
      if (selectedPriceRange === 'above-800k' && p.price <= 800000) return false;

      return true;
    });
  }, [properties, activeCategory, selectedLocation, selectedPriceRange]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedLocation('all');
    setSelectedPriceRange('all');
  };

  const countResidential = properties.filter((p) => p.category === 'residential').length;
  const countLand = properties.filter((p) => p.category === 'land').length;

  return (
    <div className="flex flex-col w-full">
      {/* Top Showcase Banner with Dynamic 10-Second Real Estate Video Background */}
      <section className="relative w-full px-6 lg:px-12 py-14 md:py-20 overflow-hidden border-b border-[#1a5b28] bg-[#002107] text-white">
        {/* Dynamic Real Estate Background Video (10s Loop, Muted, Autoplay) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover object-center transform scale-105 transition-opacity duration-1000"
          >
            <source src="/videos/inmobiliaria-bg.mp4" type="video/mp4" />
          </video>
          {/* Emerald & Deep Forest Green Luxury Real Estate Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002107]/92 via-[#004215]/82 to-[#002107]/78" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#002107]/30 to-[#002107]/80" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs, Slogan Tagline & Video Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-[#caead8] font-medium">
              <button 
                onClick={() => onNavigate('inicio')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-white font-bold">Portafolio Seleccionado</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Dynamic Video indicator & control */}
              <button
                type="button"
                onClick={toggleVideoPlayback}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 text-[#aef3b0] border border-[#aef3b0]/30 text-[11px] font-bold backdrop-blur-md transition-all cursor-pointer shadow-sm"
                title={isVideoPlaying ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
              >
                <span className="w-2 h-2 rounded-full bg-[#aaf773] animate-ping" />
                <span className="material-symbols-outlined text-[15px]">
                  {isVideoPlaying ? 'pause_circle' : 'play_circle'}
                </span>
                <span>{isVideoPlaying ? 'Video Inmobiliario 10s' : 'Reanudar Video'}</span>
              </button>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#caead8] border border-white/15 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#aaf773]" />
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#aaf773]">
                  "Donde los sueños se hacen realidad"
                </span>
              </div>
            </div>
          </div>

          {/* Hero Grid: Typographic Impact & Executive Trust Badge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-emerald-400" />
                <span className="text-xs text-amber-300 uppercase font-bold tracking-wider">
                  Propiedades Exclusivas 2025 · Inmo Astudillo
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                Portafolio{' '}
                <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  Seleccionado
                </span>
              </h1>
              <p className="text-base md:text-lg text-emerald-100/90 max-w-2xl leading-relaxed drop-shadow-xs">
                Inmuebles cuidadosamente verificados con garantía legal, excelente plusvalía y acabados de primera categoría en los enclaves residenciales más codiciados.
              </p>
            </div>

            {/* Trust Mini-Cards Anchor */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/40 flex items-center gap-4 text-slate-800">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">verified_user</span>
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900">100% Blindaje Legal</div>
                  <div className="text-xs text-slate-500">Revisión registral y notarial sin riesgos</div>
                </div>
              </div>

              <div className="bg-emerald-950/90 backdrop-blur-md text-white p-5 rounded-2xl shadow-xl border border-amber-300/40 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-amber-300 uppercase tracking-wider font-extrabold">
                    Atención Preferente Inmediata
                  </span>
                  <span className="text-xl font-extrabold tracking-tight text-white tabular-nums">
                    +593 994773533
                  </span>
                </div>
                <a
                  className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-[#25D366]/30"
                  href="https://wa.me/593994773533?text=Hola,%20solicito%20asesoría%20sobre%20el%20portafolio%20seleccionado"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="WhatsApp Inmediato"
                >
                  <span className="material-symbols-outlined text-[22px]">chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter Station */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 -mt-6 relative z-20">
        <div className="bg-white/98 rounded-3xl shadow-[0_20px_50px_-10px_rgba(6,95,70,0.12)] p-5 md:p-6 border border-emerald-900/10 backdrop-blur-md">
          {/* Top Tabs: Category Switching with Dynamic Vibrant Colors */}
          <div className="flex flex-wrap items-center gap-3 pb-5 mb-5 border-b border-slate-100">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-stone-900 to-emerald-950 text-amber-300 shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">domain</span>
              <span>Todos los Inmuebles</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeCategory === 'all' ? 'bg-amber-400/20 text-amber-300 border border-amber-300/30' : 'bg-slate-200 text-slate-600'
              }`}>
                {PROPERTIES_DATA.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('residential')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeCategory === 'residential'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-md shadow-emerald-900/15'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              <span>Casas y Departamentos</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeCategory === 'residential' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {countResidential}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('land')}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeCategory === 'land'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-900/15'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-amber-400">terrain</span>
              <span>Terrenos y Lotes</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 font-extrabold uppercase tracking-wider shadow-xs">
                Oportunidad
              </span>
            </button>
          </div>

          {/* Secondary Multi-criteria Search Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* City / Sector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#41493f] uppercase tracking-wider">
                Ubicación / Sector
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#717a6e] text-[18px]">
                  location_on
                </span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-9 pr-8 text-xs font-medium text-[#191c1b] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#326b00] transition-all appearance-none cursor-pointer"
                >
                  <option value="all">Todas las Ubicaciones</option>
                  <option value="Chamberí">Chamberí (Madrid Residencial)</option>
                  <option value="Valle Verde">Valle Verde (Residencial Privado)</option>
                  <option value="La Moraleja">La Moraleja (Zona Exclusiva)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#717a6e] pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#41493f] uppercase tracking-wider">
                Rango de Precio ($ USD)
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#717a6e] text-[18px]">
                  payments
                </span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-9 pr-8 text-xs font-medium text-[#191c1b] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#326b00] transition-all appearance-none cursor-pointer"
                >
                  <option value="all">Cualquier Precio</option>
                  <option value="under-500k">Hasta $500,000 USD</option>
                  <option value="500k-800k">$500,000 - $800,000 USD</option>
                  <option value="above-800k">Más de $800,000 USD</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#717a6e] pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Operation Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#41493f] uppercase tracking-wider">
                Operación
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#717a6e] text-[18px]">
                  real_estate_agent
                </span>
                <input
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-9 pr-8 text-xs text-[#191c1b] font-semibold focus:outline-none cursor-not-allowed"
                  readOnly
                  type="text"
                  value="Venta (Exclusiva)"
                />
                <span className="material-symbols-outlined absolute right-3 text-[#326b00] text-[16px]">
                  lock
                </span>
              </div>
            </div>

            {/* Reset & Action Trigger */}
            <div className="flex flex-col gap-1.5 justify-end">
              <label className="text-[10px] font-bold text-transparent select-none">
                Acción
              </label>
              <div className="flex gap-2">
                <button
                  onClick={resetFilters}
                  className="px-3.5 py-2.5 rounded-lg bg-[#eceeeb] hover:bg-[#e1e3e0] text-[#41493f] text-xs font-bold transition-colors flex items-center justify-center gap-1 flex-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">refresh</span>
                  <span>Limpiar</span>
                </button>
                <a
                  href="https://wa.me/593994773533?text=Deseo%20conocer%20disponibilidad%20de%20propiedades%20seleccionadas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-lg bg-[#326b00] hover:bg-[#245100] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 flex-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  <span>Consultar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Cards Showcase */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14 w-full">
        {/* Section Count and Sorting status */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#004215] tracking-tight">
                Portafolio Destacado
              </h2>
              <span className="w-2 h-2 rounded-full bg-[#326b00] animate-pulse" />
            </div>
            <p className="text-xs md:text-sm text-[#41493f]">
              Propiedades seleccionadas por su estado constructivo, plusvalía y titulación saneada en Ecuador
            </p>
          </div>

          {/* Action and Management Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Photo Security Guide Button */}
            {onOpenPhotoSecurityModal && (
              <button
                type="button"
                onClick={onOpenPhotoSecurityModal}
                className="px-3 py-2 rounded-lg bg-white border border-[#c0c9bc] hover:border-[#004215] text-[#004215] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                title="Conoce cómo funciona la seguridad y cómo subir tus fotos"
              >
                <span className="material-symbols-outlined text-[17px] text-[#326b00]">shield</span>
                <span>¿Quién puede cambiar fotos?</span>
              </button>
            )}

            {/* Property Counter */}
            <div className="px-3 py-2 rounded-lg bg-[#f2f4f1] border border-[#e1e3e0] text-xs text-[#41493f] font-semibold">
              <span className="tabular-nums">
                {filteredProperties.length} de {properties.length} inmuebles
              </span>
            </div>
          </div>
        </div>

        {/* Intuitive helper callout for changing images (visible ONLY in Admin Mode) */}
        {isAdmin ? (
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-[#caead8]/80 to-[#caead8]/40 border-2 border-[#326b00] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#004215] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#004215] text-[#aaf773] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#004215]">
                    Modo Administrador Habilitado
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#004215] bg-white px-2 py-0.5 rounded border border-[#326b00]/40">
                    Solo tú puedes ver esto
                  </span>
                </div>
                <p className="text-[#223e31] leading-relaxed">
                  Haz clic en el botón <b>"Editar"</b> sobre cualquier inmueble para modificar <b>textos, precios en USD, habitaciones, baños, metros (m²)</b> y fotografías. Los cambios se guardan directamente en tu navegador.
                </p>
                <p className="text-[11px] text-[#326b00] font-semibold">
                  🔒 Garantía de seguridad: Cuando publiques la página web, nadie en internet podrá cambiar ni alterar tus propiedades ni tus fotos.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 self-end md:self-center">
              {onAddNewProperty && (
                <button
                  type="button"
                  onClick={onAddNewProperty}
                  className="px-3.5 py-1.5 rounded-lg bg-[#004215] text-[#aaf773] hover:bg-[#1a5b28] hover:text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Agregar Inmueble</span>
                </button>
              )}
              {onOpenExportCatalog && (
                <button
                  type="button"
                  onClick={onOpenExportCatalog}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-black transition-colors cursor-pointer shadow-sm flex items-center gap-1.5 border border-amber-300"
                  title="Sincronizar y exportar catálogo para GitHub y Cloudflare"
                >
                  <span className="material-symbols-outlined text-[16px]">cloud_sync</span>
                  <span>Sincronizar con GitHub</span>
                </button>
              )}
              {onResetProperties && (
                <button
                  type="button"
                  onClick={onResetProperties}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffdad6] text-[#ba1a1a] hover:text-[#93000a] text-xs font-bold border border-[#c0c9bc] transition-colors cursor-pointer"
                  title="Restablecer propiedades a las originales de fábrica"
                >
                  Restablecer
                </button>
              )}
              {onOpenPhotoSecurityModal && (
                <button
                  type="button"
                  onClick={onOpenPhotoSecurityModal}
                  className="px-3 py-1.5 rounded-lg bg-white text-[#004215] hover:bg-[#eceeeb] border border-[#c0c9bc] text-xs font-bold transition-colors cursor-pointer"
                >
                  Guía de Seguridad
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Subtle visitor security badge */
          <div className="mb-6 p-2.5 rounded-lg bg-white border border-[#e1e3e0] flex items-center justify-between text-xs text-[#41493f]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#326b00]">verified</span>
              <span>
                Catálogo oficial verificado de <b>Inmo Astudillo</b>. Inmuebles auditados con garantía jurídica y titulación saneada.
              </span>
            </div>
            {onOpenPhotoSecurityModal && (
              <button
                type="button"
                onClick={onOpenPhotoSecurityModal}
                className="text-[11px] font-bold text-[#004215] hover:text-[#326b00] underline underline-offset-2 shrink-0 ml-2 cursor-pointer"
              >
                ¿Deseas personalizar las fotos y datos?
              </button>
            )}
          </div>
        )}

        {/* 3-Column Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onQuickView={onQuickView}
                onScheduleVisit={onScheduleVisit}
                onChangeImage={isAdmin ? onChangePropertyImage : undefined}
                onEditProperty={isAdmin ? onEditProperty : undefined}
                onDeleteProperty={isAdmin ? onDeleteProperty : undefined}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl p-8 border border-[#e1e3e0]">
            <div className="w-16 h-16 rounded-full bg-[#f2f4f1] flex items-center justify-center text-[#717a6e] mb-4">
              <span className="material-symbols-outlined text-[32px]">filter_alt_off</span>
            </div>
            <h3 className="text-lg font-bold text-[#191c1b] mb-1">
              No se encontraron propiedades bajo estos criterios
            </h3>
            <p className="text-xs text-[#41493f] max-w-md mb-6 leading-relaxed">
              Pruebe ajustando el rango de precio o seleccionando otra categoría en la barra superior.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-lg bg-[#004215] text-white text-xs font-bold hover:bg-[#1a5b28] transition-colors cursor-pointer"
            >
              Ver Todas las Propiedades
            </button>
          </div>
        )}
      </section>

      {/* Section: Legal Guarantee & Certified Title Assurance */}
      <section className="w-full bg-[#f2f4f1] py-16 border-t border-b border-[#e1e3e0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[#326b00] text-xs uppercase font-bold tracking-wider mb-2">
                <span className="material-symbols-outlined text-[18px]">security</span>
                <span>Seguridad Jurídica Patrimonial</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#004215] tracking-tight">
                Garantía Legal Inmo Astudillo
              </h2>
              <p className="text-sm text-[#41493f] mt-2 leading-relaxed">
                No comercializamos ninguna propiedad sin un expediente jurídico impecable. Cada inmueble cuenta con certificación notarial previa para su total tranquilidad.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white rounded-xl border border-[#c0c9bc] flex items-center gap-2 text-xs font-bold text-[#004215] shadow-sm">
                <span className="material-symbols-outlined text-[#326b00]">verified</span>
                <span>Auditado por Notaría Aliada</span>
              </div>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Pillar 1 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-[#e1e3e0] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#caead8] flex items-center justify-center text-[#223e31]">
                <span className="material-symbols-outlined text-[26px]">gavel</span>
              </div>
              <h3 className="text-lg font-bold text-[#004215]">Estudio de Títulos Exhaustivo</h3>
              <p className="text-xs text-[#41493f] leading-relaxed">
                Rastreo histórico de dominios de los últimos 15 años. Confirmación de legitimidad de herederos, personería jurídica y validez absoluta de facultades de venta.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#326b00] font-bold">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>0% Litigios Pendientes</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-[#e1e3e0] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#aef3b0]/60 flex items-center justify-center text-[#004215]">
                <span className="material-symbols-outlined text-[26px]">contract</span>
              </div>
              <h3 className="text-lg font-bold text-[#004215]">Escrituración Sin Sorpresas</h3>
              <p className="text-xs text-[#41493f] leading-relaxed">
                Coordinación directa con notarías aliadas. Minutas pre-redactadas y transparentes sin cláusulas abusivas ni comisiones ocultas de último minuto.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#326b00] font-bold">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Acompañamiento Notarial</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-7 rounded-2xl shadow-sm border border-[#e1e3e0] flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#aaf773]/60 flex items-center justify-center text-[#245100]">
                <span className="material-symbols-outlined text-[26px]">timer</span>
              </div>
              <h3 className="text-lg font-bold text-[#004215]">Gravámenes Verificados</h3>
              <p className="text-xs text-[#41493f] leading-relaxed">
                Emisión de certificados de gravámenes y no adeudo municipal actualizados al día de la negociación. Transferencia de dominio expedita y segura.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#326b00] font-bold">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Libre de Hipotecas</span>
              </div>
            </div>
          </div>

          {/* Action Banner: Direct WhatsApp & Private Dossier */}
          <div className="bg-gradient-to-r from-[#01260f] via-[#064e3b] to-[#022c22] rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-emerald-700/40 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-3 max-w-xl text-center lg:text-left relative z-10">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-amber-300">
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                <span className="text-[11px] uppercase font-extrabold tracking-wider bg-amber-400/20 px-3 py-0.5 rounded-full border border-amber-300/30">
                  Atención VIP a Inversionistas
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-snug">
                ¿Te envío la ficha técnica y te cuento cómo está la documentación en regla de estos lotes?
              </h3>
              <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
                Le enviamos por WhatsApp o correo la ficha catastral, planos arquitectónicos y avalúo comercial certificado sin ningún compromiso.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
              <a
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/30 hover:scale-102 active:scale-95"
                href="https://wa.me/593994773533?text=Hola,%20deseo%20recibir%20la%20ficha%20t%C3%A9cnica%20y%20conocer%20c%C3%B3mo%20est%C3%A1%20la%20documentaci%C3%B3n%20en%20regla%20de%20los%20lotes"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>WhatsApp Directo: +593 994773533</span>
              </a>

              <button
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-102 active:scale-95"
                onClick={() => {
                  const msg = encodeURIComponent(
                    'Hola, deseo agendar una cita en su oficina de Inmo Astudillo para revisar la ficha técnica y la documentación en regla de los lotes.'
                  );
                  window.open(`https://wa.me/593994773533?text=${msg}`, '_blank', 'noopener,noreferrer');
                }}
              >
                <span className="material-symbols-outlined text-[20px] text-emerald-700">event_available</span>
                <span>Agendar Cita en Oficina</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
