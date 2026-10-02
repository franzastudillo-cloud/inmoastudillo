import React, { useState } from 'react';

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValuationModal: React.FC<ValuationModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Departamento / Casa');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const text = encodeURIComponent(
      `*Solicitud de Avalúo Comercial Gratuito - Inmo Astudillo*\n\n` +
      `👤 *Propietario:* ${contactName}\n` +
      `📱 *WhatsApp:* ${contactPhone}\n` +
      `📍 *Ubicación / Sector:* ${address}\n` +
      `🏠 *Tipo de Inmueble:* ${propertyType}\n\n` +
      `Hola, solicito el informe estimativo de valor comercial de mi propiedad.`
    );
    window.open(`https://wa.me/593994773533?text=${text}`, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-[#e1e3e0]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2f4f1] text-[#191c1b] hover:bg-[#e1e3e0] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#caead8] text-[#004215] flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="text-xl font-bold text-[#004215]">¡Solicitud de Avalúo Comercial Recibida!</h3>
            <p className="text-xs text-[#41493f] max-w-sm leading-relaxed">
              Nuestro perito en avalúos inmobiliarios iniciará el estudio comparativo de mercado para su inmueble en <b>{address}</b>. En menos de 24 horas recibirá el informe pericial sin costo ni exclusividad obligatoria.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#aaf773]/30 text-[#004215] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">calculate</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#004215]">Avalúo Comercial Gratuito</h3>
                <p className="text-xs text-[#41493f]">
                  Estudio de mercado con datos reales de cierre y rigor pericial
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5 text-center">
              <div className="bg-[#f8faf7] p-2 rounded-lg border border-[#e1e3e0]">
                <span className="text-[10px] font-bold text-[#326b00] block">✓ 100% Gratuito</span>
              </div>
              <div className="bg-[#f8faf7] p-2 rounded-lg border border-[#e1e3e0]">
                <span className="text-[10px] font-bold text-[#326b00] block">✓ Sin exclusividad</span>
              </div>
              <div className="bg-[#f8faf7] p-2 rounded-lg border border-[#e1e3e0]">
                <span className="text-[10px] font-bold text-[#326b00] block">✓ Entrega en 24h</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Dirección o Sector del Inmueble *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Av. Francisco de Orellana / Sector Los Álamos"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Tipo de Propiedad
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                >
                  <option>Departamento / Casa</option>
                  <option>Terreno / Lote Residencial</option>
                  <option>Finca / Quinta Campestre</option>
                  <option>Local Comercial / Edificio</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                    Su Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Rodrigo Santillán"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0994773533"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#326b00] hover:bg-[#245100] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
                  <span>Solicitar Avalúo Comercial Gratuito</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
