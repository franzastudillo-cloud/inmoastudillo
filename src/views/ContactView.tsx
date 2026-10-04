import React, { useState } from 'react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = encodeURIComponent(
      `*Consulta desde la Web - Inmo Astudillo*\n\n` +
      `👤 *Nombre:* ${name.trim()}\n` +
      `📱 *Teléfono / WhatsApp:* ${phone.trim()}\n` +
      `✉️ *Correo Electrónico:* ${email.trim()}\n\n` +
      `💬 *Mensaje o Consulta:*\n${message.trim()}`
    );

    // Open WhatsApp directly with all form fields filled in
    window.open(`https://wa.me/593994773533?text=${formattedMessage}`, '_blank', 'noopener,noreferrer');

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full bg-[#f8faf7]">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[#f2f4f1] to-[#f8faf7] py-14 px-6 lg:px-12 border-b border-[#e1e3e0]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#326b00] bg-[#caead8] px-3 py-1 rounded-full">
            Atención Personalizada
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#004215] mt-3 tracking-tight">
            Contacto & Ubicación de Sede
          </h1>
          <p className="text-xs md:text-sm text-[#41493f] mt-2 max-w-xl mx-auto leading-relaxed">
            Estamos a su entera disposición en nuestras oficinas principales de Puyo, Pastaza, o a través de nuestros canales digitales inmediatos.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office & Broker Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e1e3e0] shadow-sm flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#326b00]">
                  Sede Central Inmobiliaria
                </span>
                <h3 className="text-xl font-bold text-[#004215] mt-1">Inmo Astudillo</h3>
                <p className="text-xs text-[#41493f] mt-1">
                  Atención notarial, legal y de corretaje patrimonial con Cbr. Daniel Astudillo.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs text-[#41493f]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#caead8] text-[#004215] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#191c1b] block">Dirección de Oficina</span>
                    <span>Calle Lucindo Ortega y 9 de Octubre, Puyo, Pastaza, Ecuador</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#caead8] text-[#004215] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">phone</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#191c1b] block">Línea Telefónica Directa</span>
                    <a href="tel:+593994773533" className="hover:text-[#004215] font-semibold">
                      +593 994773533
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#caead8] text-[#004215] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#191c1b] block">Correo Electrónico</span>
                    <a href="mailto:danielastudillo@hotmail.com" className="hover:text-[#004215]">
                      danielastudillo@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#caead8] text-[#004215] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#191c1b] block">Horario de Atención</span>
                    <span>Lunes a Viernes: 08:30 - 19:00</span>
                    <span className="block text-[11px] text-[#717a6e]">Sábados: 09:00 - 14:00 (Previa cita)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2 border-t border-[#eceeeb]">
                <a
                  href="https://wa.me/593994773533?text=Hola,%20deseo%20comunicarme%20con%20Inmo%20Astudillo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-[#326b00] hover:bg-[#245100] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Chatear por WhatsApp Directo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e1e3e0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#326b00]">
                Escríbanos un Mensaje
              </span>
              <h3 className="text-xl font-bold text-[#004215] mt-1">
                ¿En qué podemos colaborar con su propiedad?
              </h3>
              <p className="text-xs text-[#41493f] mt-1 mb-6">
                Respondemos a todas las consultas en un plazo inferior a 2 horas laborables.
              </p>

              {sent ? (
                <div className="py-12 flex flex-col items-center text-center space-y-3 bg-[#caead8]/30 rounded-xl p-6 border border-[#a9c9b7]">
                  <span className="material-symbols-outlined text-[40px] text-[#004215]">
                    mark_email_read
                  </span>
                  <h4 className="text-lg font-bold text-[#004215]">¡Mensaje Preparado en WhatsApp!</h4>
                  <p className="text-xs text-[#41493f] max-w-sm">
                    Se ha abierto WhatsApp con todos sus datos listos para enviar al Cbr. Daniel Astudillo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Ing. Mateo Paredes"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Mensaje o Consulta *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describa su requerimiento (compra, venta, avalúo, trámite notarial o consulta de titulación)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2 active:scale-[0.99]"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Enviar Mensaje a Inmo Astudillo</span>
                  </button>
                  <p className="text-[11px] text-center text-[#717a6e]">
                    Al hacer clic, se abrirá WhatsApp con el mensaje estructurado para que el cliente solo tenga que presionar enviar.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
