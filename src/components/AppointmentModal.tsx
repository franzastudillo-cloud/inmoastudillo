import React, { useState, useEffect } from 'react';
import { Property } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
}) => {
  const [propertyTitle, setPropertyTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('Mañanas (09:00 - 12:30)');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProperty) {
      const precioFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(selectedProperty.precio);
      setPropertyTitle(`${selectedProperty.titulo} (${precioFmt} USD)`);
    } else {
      setPropertyTitle('Asesoría Inmobiliaria y Visita Presencial en Puyo');
    }
  }, [selectedProperty, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const text = encodeURIComponent(
      `*Nueva Solicitud de Cita - Inmo Astudillo*\n\n` +
      `👤 *Cliente:* ${fullName}\n` +
      `📱 *Teléfono:* ${phone}\n` +
      `🏠 *Inmueble / Lote:* ${propertyTitle}\n` +
      `⏰ *Preferencia Horario:* ${timeSlot}\n\n` +
      `Hola, deseo confirmar disponibilidad y coordinar la cita.`
    );
    window.open(`https://wa.me/593994773533?text=${text}`, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
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
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-[#004215]">¡Cita Registrada con Éxito!</h3>
            <p className="text-xs text-[#41493f] max-w-xs leading-relaxed">
              Un asesor inmobiliario colegiado de Inmo Astudillo se comunicará al <b>{phone || 'su número'}</b> en menos de 30 minutos para confirmar los detalles de la visita.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#caead8] text-[#004215] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#004215]">Agendar Visita Personalizada</h3>
                <p className="text-xs text-[#41493f]">
                  Un asesor especialista lo acompañará en la inspección técnica del inmueble
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Inmueble o Trámite de Interés
                </label>
                <input
                  type="text"
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  placeholder="Ej: Casa en Barrio Cumandá, Asesoría Notarial..."
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00] font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ing. Carlos Mendoza"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  placeholder="0994773533 o +593..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Preferencia de Horario
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                >
                  <option>Mañanas (09:00 - 12:30)</option>
                  <option>Tardes (14:30 - 17:30)</option>
                  <option>Fines de semana (Previa cita coordinada)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Confirmar y Enviar Solicitud</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
