import React, { useState } from 'react';
import { ViewType } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenValuation: () => void;
  onOpenSellerModal?: () => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
  onOpenPhotoSecurity?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenValuation,
  onOpenSellerModal,
  isAdmin = false,
  onToggleAdmin,
  onOpenPhotoSecurity,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: ViewType }[] = [
    { label: 'Inicio', view: 'inicio' },
    { label: 'Propiedades Seleccionadas', view: 'propiedades' },
    { label: 'Trámites de Compraventa', view: 'tramites' },
    { label: 'Contacto', view: 'contacto' },
  ];

  return (
    <>
      {/* Top Corporate Strip - Present in official branding (Image 7) */}
      <div className="bg-gradient-to-r from-[#003816] via-[#004d1f] to-[#013314] text-[#caead8] text-[12px] py-2 px-6 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+593994773533" 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[15px] text-amber-300">call</span>
              <span className="font-semibold">+593 994773533</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-200/80">
              <span className="material-symbols-outlined text-[15px] text-amber-300/80">schedule</span>
              <span>Lun - Sáb: 08:30 - 18:30</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-amber-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-amber-300/30">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              Licencia Profesional Acbrp - 005
            </span>
            <button
              onClick={onOpenValuation}
              className="text-amber-200 hover:text-white font-bold text-[11px] uppercase tracking-wider underline underline-offset-4 decoration-amber-400/60 transition-colors cursor-pointer"
            >
              Avalúo Comercial Gratuito
            </button>
            {onToggleAdmin && (
              <button
                onClick={onToggleAdmin}
                className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAdmin
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 font-extrabold shadow-sm'
                    : 'bg-emerald-950/90 text-emerald-300 hover:text-white hover:bg-emerald-900 border border-emerald-400/50 shadow-xs'
                }`}
                title={
                  isAdmin
                    ? 'Modo Administrador activado. Clic para BLOQUEAR y proteger contra cambios desde la red.'
                    : 'Modo Protegido en la Red activado. Nadie puede modificar la web sin tu clave de administrador.'
                }
              >
                <span className="material-symbols-outlined text-[13px]">
                  {isAdmin ? 'lock_open' : 'lock'}
                </span>
                <span>{isAdmin ? 'Edición Habilitada (Bloquear)' : 'Protegido en la Red'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-emerald-900/10 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Wordmark & Emblem */}
          <div className="flex items-center">
            <Logo onClick={() => onNavigate('inicio')} />
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`px-4 py-2 text-sm font-semibold transition-all rounded-xl whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-md shadow-emerald-900/15'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSellerModal || onOpenValuation}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs hover:border-amber-300"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">real_estate_agent</span>
              Vender con Nosotros
            </button>

            <a
              href="https://wa.me/593994773533?text=Hola,%20deseo%20asesoría%20con%20Inmo%20Astudillo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-4.5 py-2.5 rounded-xl transition-all shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/35 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="hidden sm:inline">0994773533</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-800 hover:bg-emerald-50 rounded-xl transition-colors"
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-emerald-900/10 px-6 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  currentView === item.view
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            ))}
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenValuation();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-amber-50 text-emerald-900 font-bold text-xs border border-amber-200"
              >
                Avalúo Comercial Gratuito
              </button>
              <a
                href="https://wa.me/593994773533"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                WhatsApp Directo: 0994773533
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
