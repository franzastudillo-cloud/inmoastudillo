import React, { useState, useEffect } from 'react';

interface SellerWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenValuation: () => void;
}

export const SellerWelcomeModal: React.FC<SellerWelcomeModalProps> = ({
  isOpen,
  onClose,
  onOpenValuation,
}) => {
  const [propertyType, setPropertyType] = useState('Casa');
  const [locationOrDetails, setLocationOrDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = locationOrDetails.trim() || 'No especificado aún';
    const contactPhone = phone.trim() || 'Directo por WhatsApp';
    const msg = encodeURIComponent(
      `Hola Cbr. Daniel Astudillo, deseo que me ayuden a vender mi propiedad.\n\n` +
      `📌 Tipo: ${propertyType}\n` +
      `📍 Ubicación / Detalles: ${details}\n` +
      `📞 Teléfono de contacto: ${contactPhone}\n\n` +
      `¿Podríamos coordinar un avalúo comercial gratuito y conocer su plan de venta?`
    );

    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/593994773533?text=${msg}`, '_blank', 'noopener,noreferrer');
      onClose();
    }, 900);
  };

  const handleDirectWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hola Cbr. Daniel Astudillo, deseo que Inmo Astudillo me ayude a vender mi propiedad en Pastaza al mejor valor de mercado. ¿Podemos conversar?'
    );
    window.open(`https://wa.me/593994773533?text=${msg}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with architectural blur */}
      <div 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border border-emerald-900/15 overflow-hidden z-10 transition-all duration-300 animate-in zoom-in-95 my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Banner with Dynamic Gradient & Ambient Lights */}
        <div className="relative bg-gradient-to-r from-[#01260f] via-[#064e3b] to-[#022c22] p-6 sm:p-8 text-white overflow-hidden shrink-0">
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 z-20 hover:scale-105"
            aria-label="Cerrar ventana"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="relative z-10 max-w-lg">
            {/* Real Estate Marketing Hook Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/35 text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Especial Propietarios · Pastaza & Ecuador</span>
            </div>

            {/* Primary Catchy Title Requested by User */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug drop-shadow-sm">
              ¿Quieres que te ayudemos a vender tu propiedad{' '}
              <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                al mejor valor de mercado?
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Conectamos tu inmueble con compradores reales calificados. Nos encargamos de todo: avalúo pericial, marketing 360°, fotos profesionales y cierre con 100% de blindaje legal notarial.
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* 3 Pillars of Professional Real Estate Marketing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col gap-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">calculate</span>
              </div>
              <h4 className="text-xs font-bold text-stone-900">Avalúo Gratuito</h4>
              <p className="text-[11px] text-stone-600 leading-tight">
                Estudio pericial exacto en 24 horas para no regalar tu patrimonio.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-col gap-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">videocam</span>
              </div>
              <h4 className="text-xs font-bold text-stone-900">Marketing & Dron</h4>
              <p className="text-[11px] text-stone-600 leading-tight">
                Fotografía editorial, video aéreo y difusión en portales de alta demanda.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/90 flex flex-col gap-1.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">gavel</span>
              </div>
              <h4 className="text-xs font-bold text-stone-900">Blindaje Notarial</h4>
              <p className="text-[11px] text-stone-600 leading-tight">
                Gestión de escrituras, alcabalas y Registro de la Propiedad sin riesgos.
              </p>
            </div>
          </div>

          {/* Quick Express Lead Form */}
          <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/90">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-emerald-700">real_estate_agent</span>
                <span>Cuéntanos brevemente sobre tu propiedad:</span>
              </span>
              <span className="text-[10px] text-amber-700 font-extrabold uppercase tracking-wide bg-amber-100 px-2 py-0.5 rounded-full">
                Sin compromiso
              </span>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Property Type Selector */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Tipo de Inmueble
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
                  >
                    <option value="Casa o Villa">Casa o Villa</option>
                    <option value="Terreno o Lote">Terreno o Lote</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Local Comercial o Edificio">Local Comercial / Edificio</option>
                    <option value="Finca o Quinta">Finca o Quinta</option>
                  </select>
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Tu Teléfono o WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 0994773533"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Location or Details */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Sector o Dirección aproximada (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Puyo centro, Shell, Mera, o sector específico..."
                  value={locationOrDetails}
                  onChange={(e) => setLocationOrDetails(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 cursor-pointer active:scale-98 disabled:opacity-75"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {submitted ? 'check_circle' : 'send'}
                  </span>
                  <span>
                    {submitted ? '¡Conectando con el Asesor...!' : 'Enviar Datos y Solicitar Asesoría'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full sm:w-auto py-3 px-4.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 cursor-pointer active:scale-98 shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Directo</span>
                </button>
              </div>
            </form>
          </div>

          {/* Alternative Secondary Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenValuation();
              }}
              className="inline-flex items-center gap-1.5 text-emerald-800 font-bold hover:text-emerald-950 underline underline-offset-4 decoration-amber-400 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">calculate</span>
              <span>¿Solo deseas saber el avalúo comercial exacto? Haz clic aquí</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
            >
              Explorar propiedades por ahora →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
