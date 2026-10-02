import React, { useState } from 'react';

interface SeoStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoStrategyModal: React.FC<SeoStrategyModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const keywordCategories = [
    {
      title: '1. Búsquedas Locales en Pastaza & Puyo (Máxima Intención de Compra)',
      intent: 'Alta conversión directa en tu ciudad sede',
      keywords: [
        'inmobiliaria en puyo pastaza',
        'bienes raíces puyo ecuador',
        'terrenos en venta puyo pastaza',
        'casas en venta en puyo',
        'fincas en venta pastaza amazonia',
        'agente inmobiliario puyo daniel astudillo'
      ]
    },
    {
      title: '2. Búsquedas Notariales & Trámites Inmobiliarios en Ecuador',
      intent: 'Tráfico educativo y captación de clientes para escrituración',
      keywords: [
        'tramites de compraventa de casa en ecuador',
        'requisitos para compraventa notarial ecuador',
        'calculadora de gastos de escrituracion ecuador',
        'impuesto de alcabala municipal y plusvalia ecuador',
        'estudio de titulos certificado de gravamenes',
        'compraventa con credito hipotecario biess'
      ]
    },
    {
      title: '3. Inversión Patrimonial & Venta Exclusiva en Ecuador',
      intent: 'Inversionistas que buscan terrenos urbanizados y residencias',
      keywords: [
        'inmobiliaria de confianza en ecuador',
        'lotes urbanizados de alta plusvalia ecuador',
        'tasacion pericial de inmuebles ecuador',
        'venta segura de departamentos y casas',
        'acbir pastaza corredores inmobiliarios'
      ]
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-[#e1e3e0] my-8 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#f2f4f1] text-[#191c1b] hover:bg-[#e1e3e0] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#caead8] text-[#004215] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">travel_explore</span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#326b00] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#326b00]" />
              Configurado e Indexable para Google Ecuador
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#004215] tracking-tight">
              Estrategia de Posicionamiento SEO & Palabras Clave
            </h2>
          </div>
        </div>

        {/* Status of implemented SEO technical factors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#f8faf7] border border-[#e1e3e0]">
            <span className="text-[10px] uppercase font-bold text-[#717a6e] block">Etiqueta Title & Meta</span>
            <span className="text-xs font-bold text-[#004215] flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
              Optimizadas (es-EC)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#f8faf7] border border-[#e1e3e0]">
            <span className="text-[10px] uppercase font-bold text-[#717a6e] block">Geolocalización Pastaza</span>
            <span className="text-xs font-bold text-[#004215] flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
              Geo-tags Puyo (EC-Y)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#f8faf7] border border-[#e1e3e0]">
            <span className="text-[10px] uppercase font-bold text-[#717a6e] block">Schema.org JSON-LD</span>
            <span className="text-xs font-bold text-[#004215] flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
              RealEstateAgent + FAQPage
            </span>
          </div>
        </div>

        {/* Primary Keywords for Google Search in Ecuador */}
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-[#191c1b] uppercase tracking-wider">
            Palabras Clave Principales Implementadas en la Web
          </h3>

          {keywordCategories.map((cat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#f2f4f1] border border-[#e1e3e0]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <span className="text-xs font-bold text-[#004215]">{cat.title}</span>
                <span className="text-[10px] text-[#326b00] font-semibold">{cat.intent}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.keywords.map((kw, kIdx) => {
                  const keyId = `${idx}-${kIdx}`;
                  const isCopied = copiedKey === keyId;
                  return (
                    <button
                      key={kIdx}
                      onClick={() => copyToClipboard(kw, keyId)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#c0c9bc] text-xs text-[#191c1b] hover:border-[#004215] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs group"
                      title="Haz clic para copiar esta palabra clave"
                    >
                      <span className="text-[#326b00] font-bold">#</span>
                      <span>{kw}</span>
                      <span className="material-symbols-outlined text-[14px] text-[#717a6e] group-hover:text-[#004215]">
                        {isCopied ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Action Steps to Dominate Google Ecuador */}
        <div className="mt-6 pt-6 border-t border-[#eceeeb]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#004215] mb-3">
            Guía de 4 Pasos para Acelerar el Posicionamiento en Google Ecuador
          </h4>

          <div className="space-y-3 text-xs text-[#41493f]">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e1e3e0]">
              <span className="w-5 h-5 rounded-full bg-[#004215] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <b className="text-[#191c1b]">Ficha de Google Business Profile (Google Maps):</b>
                <p className="mt-0.5 leading-relaxed">
                  Crea o verifica la ficha con el nombre exacto <i>"Inmo Astudillo - Bienes Raíces y Trámites Notariales"</i> en Calle Lucindo Ortega y 9 de Octubre, Puyo, Pastaza. Enlaza este sitio web y el teléfono 0994773533.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e1e3e0]">
              <span className="w-5 h-5 rounded-full bg-[#004215] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <b className="text-[#191c1b]">Google Search Console:</b>
                <p className="mt-0.5 leading-relaxed">
                  Verifica la propiedad en Google Search Console y solicita la indexación de las 3 páginas clave: Inicio, Portafolio Seleccionado y Trámites de Compraventa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e1e3e0]">
              <span className="w-5 h-5 rounded-full bg-[#004215] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <b className="text-[#191c1b]">Reseñas de Clientes en Pastaza:</b>
                <p className="mt-0.5 leading-relaxed">
                  Pide a clientes satisfechos (compradores y vendedores) que dejen una reseña en Google mencionando palabras como <i>"excelente asesoría en compraventa en Puyo"</i> o <i>"rápida gestión notarial"</i>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e1e3e0]">
              <span className="w-5 h-5 rounded-full bg-[#004215] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <b className="text-[#191c1b]">Respaldo Acbir Pastaza:</b>
                <p className="mt-0.5 leading-relaxed">
                  El respaldo oficial de la Asociación de Corredores de Bienes Raíces (Acbir) genera autoridad temática (E-E-A-T) ante los algoritmos de búsqueda de Google.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="mt-6 pt-4 border-t border-[#eceeeb] flex items-center justify-between">
          <span className="text-[11px] text-[#717a6e]">
            Configuración SEO 100% activa en el código fuente.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
