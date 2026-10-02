import React, { useState } from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover or open */}
      <div 
        className={`bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-100 text-xs font-semibold text-slate-800 flex items-center gap-3 transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none sm:opacity-100 sm:pointer-events-auto sm:translate-x-0'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
        <div className="flex flex-col">
          <span className="text-[10px] text-emerald-700 font-bold leading-tight">Asesor en línea · Pastaza</span>
          <span className="text-slate-900 font-extrabold">¿En qué podemos ayudarte hoy?</span>
        </div>
      </div>

      <a
        href="https://wa.me/593994773533?text=Hola,%20solicito%20información%20inmobiliaria%20o%20notarial%20con%20Inmo%20Astudillo"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
        </svg>
      </a>
    </div>
  );
};
