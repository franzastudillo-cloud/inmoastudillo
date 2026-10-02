import React, { useState } from 'react';
import { Property, ViewType } from '../types';
import { PROPERTIES_DATA, TESTIMONIALS } from '../data/propertiesData';
import { PropertyCard } from '../components/PropertyCard';

interface HomeViewProps {
  onQuickView: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
  onNavigate: (view: ViewType) => void;
  onOpenValuation: () => void;
  properties?: Property[];
  isAdmin?: boolean;
  onChangePropertyImage?: (property: Property) => void;
  onEditProperty?: (property: Property) => void;
  onAddNewProperty?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onQuickView,
  onScheduleVisit,
  onNavigate,
  onOpenValuation,
  properties = PROPERTIES_DATA,
  isAdmin = false,
  onChangePropertyImage,
  onEditProperty,
  onAddNewProperty,
}) => {
  // Search Bar State
  const [searchIntent, setSearchIntent] = useState<'comprar' | 'alquilar' | 'proyectos'>('comprar');
  const [searchLocation, setSearchLocation] = useState('Puyo, Pastaza, Ecuador');
  const [searchType, setSearchType] = useState('Departamentos & Áticos');
  const [searchBudget, setSearchBudget] = useState('Hasta $800,000 USD');

  // Featured Portfolio Category Filter in Home
  const [homeCategory, setHomeCategory] = useState<'all' | 'residential' | 'land'>('all');
  const [quickAddress, setQuickAddress] = useState('');

  const filteredFeatured = properties.filter((p) => {
    if (homeCategory === 'all') return true;
    return p.category === homeCategory;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('propiedades');
  };

  const handleQuickValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const addr = quickAddress.trim() || 'Sector Puyo / Pastaza (a coordinar)';
    const text = encodeURIComponent(
      `*Solicitud de Avalúo Comercial Gratuito - Inmo Astudillo*\n\n` +
      `📍 *Ubicación / Dirección:* ${addr}\n` +
      `📋 *Solicitud:* Deseo conocer el valor comercial exacto de mi propiedad para venta.\n\n` +
      `Hola Cbr. Daniel Astudillo, deseo coordinar la inspección pericial sin costo para mi inmueble.`
    );
    window.open(`https://wa.me/593994773533?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. CINEMATIC HERO SECTION WITH REAL ESTATE VIDEO BACKGROUND */}
      <section className="relative w-full bg-[#002107] text-white pt-16 pb-24 md:pb-32 px-6 lg:px-12 overflow-hidden">
        {/* Dynamic 10-Second Real Estate Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/videos/inmobiliaria-bg.mp4" type="video/mp4" />
          </video>
          {/* Emerald Gradient Overlay for optimal legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00180a]/92 via-[#064e3b]/80 to-[#022c22]/95" />
          <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#064e3b]/30 to-[#022c22]/85" />
        </div>

        {/* Architectural atmospheric background lights - Vibrant Emerald & Warm Amber Gold */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Eyebrow badge with Live Video Indicator and Warm Amber Accent */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 text-amber-300 border border-amber-300/35 text-xs font-bold uppercase tracking-wider mb-6 shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Bienes Raíces & Trámites Notariales en Ecuador · Pastaza & Puyo</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl text-balance drop-shadow-sm">
            Encuentra el hogar de tus sueños con{' '}
            <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
              InmoAstudillo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-2xl leading-relaxed drop-shadow-xs">
            Más de una década conectando familias e inversionistas con casas, terrenos y departamentos en Pastaza y todo el Ecuador. Transparencia certificada, avalúo comercial preciso y blindaje notarial en cada paso.
          </p>
        </div>
      </section>

      {/* 2. FLOATING MULTI-CRITERIA SEARCH MODULE */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 -mt-16 md:-mt-20 relative z-20 w-full">
        <div className="bg-white/98 rounded-3xl shadow-[0_20px_50px_-10px_rgba(6,95,70,0.15)] p-5 md:p-6 border border-emerald-900/10 backdrop-blur-md">
          {/* Intent Tabs with Dynamic Vibrant Indicators */}
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <button
              onClick={() => setSearchIntent('comprar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                searchIntent === 'comprar'
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-md shadow-emerald-900/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-amber-300">key</span>
              <span>Comprar</span>
            </button>

            <button
              onClick={() => setSearchIntent('alquilar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                searchIntent === 'alquilar'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-900/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-sky-200">apartment</span>
              <span>Alquilar</span>
            </button>

            <button
              onClick={() => setSearchIntent('proyectos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                searchIntent === 'proyectos'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-900/15'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-amber-200">domain</span>
              <span>Proyectos Nuevos</span>
            </button>
          </div>

          {/* Search Fields Grid */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-center">
            {/* Ubicación */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Ubicación
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-emerald-600 text-[18px]">
                  location_on
                </span>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Ciudad o Sector..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Tipo de Inmueble */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Tipo de Inmueble
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-sky-600 text-[18px]">
                  home
                </span>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-8 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white appearance-none cursor-pointer transition-all"
                >
                  <option>Departamentos & Áticos</option>
                  <option>Casas & Villas</option>
                  <option>Terrenos & Lotes</option>
                  <option>Locales Comerciales</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 text-slate-400 pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Presupuesto */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Presupuesto Máx.
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-amber-600 text-[18px]">
                  payments
                </span>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-8 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white appearance-none cursor-pointer transition-all"
                >
                  <option>Hasta $200,000 USD</option>
                  <option>Hasta $500,000 USD</option>
                  <option>Hasta $800,000 USD</option>
                  <option>Más de $800,000 USD</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 text-slate-400 pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Submit Button with Energetic Gradient */}
            <div className="flex flex-col gap-1 justify-end">
              <label className="text-[10px] font-bold text-transparent select-none">
                Buscar
              </label>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 hover:shadow-lg cursor-pointer active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Buscar Propiedades</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. PORTAFOLIO SELECCIONADO (FEATURED SECTION) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#326b00] uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">domain</span>
              <span>Portafolio Seleccionado</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#004215] tracking-tight">
              Propiedades Exclusivas
            </h2>
            <p className="text-xs md:text-sm text-[#41493f] mt-1 max-w-xl">
              Inmuebles cuidadosamente verificados con garantía legal, excelente rentabilidad y acabados de primera categoría.
            </p>
          </div>

          <button
            onClick={() => onNavigate('propiedades')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004215] hover:text-[#326b00] transition-colors cursor-pointer group"
          >
            <span>Ver Catálogo Completo</span>
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Home category filter chips */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <button
            onClick={() => setHomeCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              homeCategory === 'all'
                ? 'bg-gradient-to-r from-stone-900 to-emerald-950 text-amber-300 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos los Inmuebles ({PROPERTIES_DATA.length})
          </button>
          <button
            onClick={() => setHomeCategory('residential')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              homeCategory === 'residential'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-md shadow-emerald-900/15'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🏡 Casas y Departamentos
          </button>
          <button
            onClick={() => setHomeCategory('land')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              homeCategory === 'land'
                ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-900/15'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🌄 Terrenos y Lotes
          </button>
        </div>

        {/* Admin Callout: Full Editing Enabled */}
        {isAdmin && (
          <div className="mb-6 p-4.5 rounded-2xl bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 border-2 border-amber-300 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-800 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">edit_document</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-stone-900">
                    Modo Edición Total para Administrador
                  </span>
                  <span className="text-[10px] uppercase font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                    Activo
                  </span>
                </div>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Ya puedes editar <b>textos, precios en USD, habitaciones, baños, metros cuadrados (m²)</b> y fotografías. Haz clic en el botón <b>«Editar»</b> sobre cualquier inmueble.
                </p>
              </div>
            </div>

            {onAddNewProperty && (
              <button
                type="button"
                onClick={onAddNewProperty}
                className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-md shadow-amber-900/15 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Agregar Propiedad</span>
              </button>
            )}
          </div>
        )}

        {/* 3 Grid Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatured.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onQuickView={onQuickView}
              onScheduleVisit={onScheduleVisit}
              onChangeImage={isAdmin ? onChangePropertyImage : undefined}
              onEditProperty={isAdmin ? onEditProperty : undefined}
            />
          ))}
        </div>
      </section>

      {/* 4. SOLUCIONES INMOBILIARIAS CON RIGOR TÉCNICO (SERVICES) */}
      <section className="w-full bg-gradient-to-b from-[#f8faf8] via-emerald-50/30 to-[#f8faf8] py-20 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300/40">
              Servicios Integrales
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Soluciones inmobiliarias con rigor técnico
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2">
              Desde el avalúo comercial de mercado hasta el cierre de la escritura pública ante notario. Cubrimos todas las fases con total respaldo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Comprar & Invertir (Emerald Theme) */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-[0_4px_20px_rgba(6,95,70,0.06)] hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between gap-6 group">
              <div className="flex flex-col gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">trending_up</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Comprar & Invertir
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Curaduría de activos residenciales y comerciales de alta rentabilidad con estudios de plusvalía y retorno proyectado.
                </p>
              </div>
              <button
                onClick={() => onNavigate('propiedades')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                <span>Explorar Oportunidades</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>

            {/* Card 2: Vender tu Inmueble (Warm Amber/Orange Theme) */}
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(217,119,6,0.06)] hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between gap-6 group">
              <div className="flex flex-col gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">store</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Vender tu Inmueble
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Estrategia de marketing 360°, fotografía editorial, video tour y filtrado cualificado de compradores reales sin pérdidas de tiempo.
                </p>
              </div>
              <button
                onClick={onOpenValuation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
              >
                <span>Iniciar Venta</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>

            {/* Card 3: Avalúa tu Propiedad (Sky/Cyan Theme) */}
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-[0_4px_20px_rgba(2,132,199,0.06)] hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between gap-6 group">
              <div className="flex flex-col gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">calculate</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  Avalúa tu Propiedad
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Valoración algorítmica y pericial basada en ventas comparables recientes. Conoce el valor real competitivo en 24 horas.
                </p>
              </div>
              <button
                onClick={onOpenValuation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 transition-colors cursor-pointer"
              >
                <span>Solicitar Valoración</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>

            {/* Card 4: Asesoría Legal (Noble Violet/Indigo Theme) */}
            <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-[0_4px_20px_rgba(124,58,237,0.06)] hover:shadow-xl hover:border-purple-300 transition-all flex flex-col justify-between gap-6 group">
              <div className="flex flex-col gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white flex items-center justify-center shadow-md shadow-purple-500/25 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">gavel</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  Asesoría Legal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Revisión de títulos registrales, redacción de arras, gestión fiscal, sucesiones y asistencia notarial personalizada hasta la firma.
                </p>
              </div>
              <button
                onClick={() => onNavigate('tramites')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800 transition-colors cursor-pointer"
              >
                <span>Consultar con Abogado</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ¿POR QUÉ INMO ASTUDILLO ES TU MEJOR ALIADO? */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Consultation Image with trust badge */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#e1e3e0] bg-[#004215] aspect-[4/3] relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC16BTa8UPzzmcW70xItexI23vcbnJ1XHFgMAxPwzjwiaLdUJonEgtVGcb9GqpZC_kjmwNUF2Lx0u70AF-30u-v5VW05pKjMG1lagY8qBP3EW7ufFw8CzBNUOmDKaKIpwWD-bmpZNKjfZtBPpGuh_0Qy6oFfmAsrc3sDs5nqDCgDTCaZ3ETRfFUi8dowLOPMlxwXkciid5nWSM3CtN4HXwlYzbUPv9HiP6-r5qiC77buX23k0VBiOaIHQ"
                alt="Reunión y asesoría legal con clientes"
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white/95 backdrop-blur-md p-4.5 rounded-2xl shadow-xl border border-amber-200 flex items-center gap-3.5 max-w-xs">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-stone-900 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-stone-900">100% Seguro</span>
                <span className="text-[10px] text-slate-500 font-medium">Garantía Jurídica y Notarial</span>
                <span className="text-[9px] text-amber-700 font-bold tracking-wider">MÁXIMA TRANSPARENCIA REGISTRAL</span>
              </div>
            </div>
          </div>

          {/* Right: Narrative & 3 Key Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6 pt-6 lg:pt-0">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                <span className="w-8 h-[2px] bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full" />
                <span>Nuestra Propuesta de Valor</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                ¿Por qué Inmo Astudillo es tu mejor aliado?
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed">
                Entendemos que una propiedad no es solo una transacción: es tu patrimonio, tu seguridad y el hogar donde se construyen tus recuerdos más valiosos.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Pillar 1: Sky Theme */}
              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-sky-50/70 to-white border border-sky-100/90 shadow-sm hover:border-sky-300 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Transparencia Total</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Honorarios claros, informes de visitas documentados y comunicación directa semanal con tu asesor asignado.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Amber Theme */}
              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-amber-50/70 to-white border border-amber-100/90 shadow-sm hover:border-amber-300 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Acompañamiento Integral</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Te guiamos desde la selección hasta la entrega de llaves, coordinando bancos, tasadoras y notaría sin estrés para ti.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Emerald Theme */}
              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-gradient-to-r from-emerald-50/70 to-white border border-emerald-100/90 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Compromiso Real de Venta</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Si no vendemos en el plazo pactado, no cobramos comisión. Tu éxito comercial es exactamente nuestro objetivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LA VOZ DE NUESTROS CLIENTES (TESTIMONIALS) */}
      <section className="w-full bg-gradient-to-b from-[#f8faf8] via-amber-50/20 to-[#f8faf8] py-20 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300/40">
              Experiencias Reales
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              La voz de nuestros clientes
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2">
              La confianza se gana con hechos. Descubre lo que dicen las familias y propietarios que eligieron Inmo Astudillo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => {
              const avatarGradients = [
                'bg-gradient-to-br from-emerald-500 to-teal-700',
                'bg-gradient-to-br from-sky-500 to-blue-700',
                'bg-gradient-to-br from-amber-500 to-orange-600',
              ];
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-amber-200 transition-all flex flex-col justify-between gap-5 group"
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[20px] fill-1 text-amber-400">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3.5 border-t border-slate-100">
                    <div className={`w-11 h-11 rounded-2xl ${avatarGradients[idx % avatarGradients.length]} text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm`}>
                      {t.author.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{t.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. QUICK VALUATION LEAD CAPTURE BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="bg-gradient-to-r from-[#01260f] via-[#064e3b] to-[#022c22] rounded-3xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden border border-emerald-700/40">
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-12 -right-12 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-300/30">
              Para Propietarios
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold mt-4 tracking-tight leading-snug">
              ¿Quieres vender o avaluar tu propiedad al mejor valor de mercado?
            </h3>
            <p className="text-xs md:text-sm text-emerald-100/90 mt-2 leading-relaxed">
              Nuestros peritos realizan un estudio comparativo exhaustivo con datos reales de cierre.
            </p>

            <form
              onSubmit={handleQuickValuationSubmit}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={quickAddress}
                onChange={(e) => setQuickAddress(e.target.value)}
                placeholder="Ingresa la dirección o sector de tu inmueble (Ej. Puyo centro, Shell...)"
                className="flex-1 bg-white text-slate-900 placeholder-slate-400 px-4.5 py-3.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
              />
              <button
                type="submit"
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-950/20 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Solicitar Avalúo por WhatsApp</span>
              </button>
            </form>

            <div className="flex items-center gap-2 mt-3 text-xs">
              <span className="text-emerald-200/80">¿Deseas agregar más datos periciales?</span>
              <button
                type="button"
                onClick={onOpenValuation}
                className="text-amber-300 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Llenar formulario completo</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-5 text-[11px] text-emerald-100/90">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-300">check_circle</span>
                100% Gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-300">check_circle</span>
                Sin exclusividad obligatoria
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-300">check_circle</span>
                Entrega pericial en 24 horas
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
