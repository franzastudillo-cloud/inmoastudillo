import React, { useState } from 'react';
import { ViewType } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
  onOpenValuation: () => void;
  onOpenSeoStrategy?: () => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
  onOpenPhotoSecurity?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenValuation,
  onOpenSeoStrategy,
  isAdmin = false,
  onToggleAdmin,
  onOpenPhotoSecurity,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Save locally in browser
      try {
        const existing = JSON.parse(localStorage.getItem('inmo_astudillo_subscribers') || '[]');
        existing.push({ email: email.trim(), date: new Date().toISOString() });
        localStorage.setItem('inmo_astudillo_subscribers', JSON.stringify(existing));
      } catch (err) {
        console.error(err);
      }

      setSubscribed(true);
      const text = encodeURIComponent(
        `Hola Cbr. Daniel Astudillo, deseo suscribirme a las alertas de nuevas propiedades y oportunidades de Inmo Astudillo.\n\n📧 Correo de contacto: ${email.trim()}`
      );

      setTimeout(() => {
        window.open(`https://wa.me/593994773533?text=${text}`, '_blank', 'noopener,noreferrer');
        setSubscribed(false);
        setEmail('');
      }, 600);
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#f8faf8] to-[#f1f4f1] border-t border-slate-200/80 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand & Brokerage License */}
        <div className="flex flex-col gap-4">
          <Logo onClick={() => onNavigate('inicio')} />
          
          <p className="text-xs text-slate-600 leading-relaxed">
            Especialistas en intermediación inmobiliaria residencial y de inversión. Compromiso, rigor arquitectónico y transparencia total para encontrar el hogar que sueñas.
          </p>

          <div className="flex items-center gap-2.5 pt-2 text-emerald-900">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold leading-tight text-slate-900">Licencia Inmobiliaria Profesional</span>
              <span className="text-[10px] text-slate-500">Cbr. Daniel Astudillo · Acbir Pastaza</span>
            </div>
          </div>

          {/* Socials / Channels with Dynamic Vibrant Colors */}
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href="https://wa.me/593994773533"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center transition-all hover:scale-105 shadow-md shadow-[#25D366]/25"
              title="WhatsApp Directo"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </a>
            <a
              href="tel:+593994773533"
              className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              title="Llamada Telefónica"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </a>
            <a
              href="mailto:consultas@inmoastudillo.com"
              className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              title="Correo Electrónico"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Navegación
          </span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-600">
            <li>
              <button 
                onClick={() => onNavigate('inicio')}
                className="hover:text-emerald-700 hover:underline transition-colors text-left cursor-pointer"
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('propiedades')}
                className="hover:text-emerald-700 hover:underline transition-colors text-left cursor-pointer"
              >
                Catálogo de Inmuebles Seleccionados
              </button>
            </li>
            <li>
              <button 
                onClick={onOpenValuation}
                className="hover:text-amber-700 hover:underline transition-colors text-left cursor-pointer font-semibold text-emerald-800"
              >
                Avalúo Comercial Gratuito
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('tramites')}
                className="hover:text-emerald-700 hover:underline transition-colors text-left cursor-pointer"
              >
                Trámites Notariales & Compraventa
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('contacto')}
                className="hover:text-emerald-700 hover:underline transition-colors text-left cursor-pointer"
              >
                Contacto & Ubicación de Sede
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Headquarters with Colorful Icons */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Contacto & Sede
          </span>
          <div className="flex flex-col gap-3 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">location_on</span>
              <span>Calle Lucindo Ortega y 9 de Octubre, Puyo, Pastaza, Ecuador</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-[#25D366] shrink-0">chat</span>
              <a 
                href="https://wa.me/593994773533" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#25D366] font-bold text-slate-900 transition-colors"
              >
                +593 994773533
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-sky-600 shrink-0">mail</span>
              <a href="mailto:danielastudillo@hotmail.com" className="hover:text-sky-700">danielastudillo@hotmail.com</a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0">schedule</span>
              <span>L - V: 09:00 - 20:00 · S: 10:00 - 14:00</span>
            </div>
          </div>
        </div>

        {/* Column 4: Newsletter & Real Estate Alerts */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Novedades & Alertas
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            Suscríbete a alertas de nuevas propiedades e informes periciales del mercado inmobiliario.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
            <input
              type="email"
              required
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/15 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">
                {subscribed ? 'check_circle' : 'chat'}
              </span>
              <span>
                {subscribed ? '¡Conectando con WhatsApp...!' : 'Suscribirme por WhatsApp'}
              </span>
            </button>
            <span className="text-[10px] text-slate-500">
              Privacidad protegida. Cero spam.
            </span>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#e9eee9] py-5 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>© 2024-2026 Inmo Astudillo. Todos los derechos reservados.</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-emerald-700 font-bold">Seguridad y Claridad Inmobiliaria</span>
            <span className="hidden md:inline text-slate-300">|</span>
            {onOpenPhotoSecurity && (
              <button
                onClick={onOpenPhotoSecurity}
                className="inline-flex items-center gap-1 text-slate-700 font-bold hover:text-emerald-700 transition-colors cursor-pointer bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs"
                title="¿Quién puede cambiar fotos? Información de seguridad"
              >
                <span className="material-symbols-outlined text-[15px] text-emerald-600">shield</span>
                <span>Seguridad de Fotos</span>
              </button>
            )}
            <span className="hidden md:inline text-slate-300">|</span>
            {onToggleAdmin && (
              <button
                onClick={onToggleAdmin}
                className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer text-xs ${
                  isAdmin
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-md font-bold'
                    : 'text-slate-400 hover:text-slate-700 hover:underline px-1 py-0.5'
                }`}
                title={
                  isAdmin
                    ? 'Edición habilitada. Clic para bloquear y proteger el sitio en la red.'
                    : 'Acceso privado para el administrador'
                }
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isAdmin ? 'lock_open' : 'lock'}
                </span>
                <span>{isAdmin ? 'Modo Editor Activo (Bloquear)' : 'Administración'}</span>
              </button>
            )}
            {onOpenSeoStrategy && (
              <>
                <span className="hidden md:inline text-slate-300">|</span>
                <button
                  onClick={onOpenSeoStrategy}
                  className="inline-flex items-center gap-1 text-slate-700 font-bold hover:text-emerald-700 transition-colors cursor-pointer bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px] text-amber-600">travel_explore</span>
                  <span>SEO Ecuador & Keywords</span>
                </button>
              </>
            )}
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline hover:underline cursor-pointer">Aviso Legal</span>
            <span className="hidden md:inline hover:underline cursor-pointer">Política de Privacidad</span>
            <span className="hidden md:inline hover:underline cursor-pointer">Código de Ética Inmobiliario</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
