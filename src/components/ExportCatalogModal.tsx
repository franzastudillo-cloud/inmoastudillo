import React, { useState } from 'react';
import { Property } from '../types';

interface ExportCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onResetOfficial: () => void;
}

export const ExportCatalogModal: React.FC<ExportCatalogModalProps> = ({
  isOpen,
  onClose,
  properties,
  onResetOfficial,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const catalogCode = `import { Property } from '../types';

export const PROPERTIES_DATA: Property[] = ${JSON.stringify(properties, null, 2)};
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(catalogCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const blob = new Blob([catalogCode], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'propertiesData.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 text-slate-900 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">cloud_sync</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Sincronización con GitHub & Cloudflare
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Catálogo actual: {properties.length} propiedades activas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Instructions */}
        <div className="py-4 space-y-3 overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 leading-relaxed">
            <span className="font-bold flex items-center gap-1.5 text-emerald-900 mb-1">
              <span className="material-symbols-outlined text-[16px] text-emerald-700">verified</span>
              ¿Cómo funciona la actualización en tu dominio de Cloudflare?
            </span>
            <p>
              1. Las modificaciones que haces en la web se guardan <b>inmediatamente</b> en tu navegador.
            </p>
            <p className="mt-1">
              2. Para que tus nuevas propiedades se actualicen en <b>Cloudflare para todos tus visitantes del mundo</b>, este catálogo debe estar en tu repositorio de GitHub en el archivo: <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold">src/data/propertiesData.ts</code>.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? 'check_circle' : 'content_copy'}
              </span>
              <span>{copied ? '¡Código Copiado al Portapapeles!' : 'Copiar Archivo para GitHub'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Descargar propertiesData.ts</span>
            </button>
          </div>

          {/* Reset button if needed */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              ¿Quieres borrar cualquier dato de prueba y volver al catálogo oficial de Puyo?
            </span>
            <button
              onClick={() => {
                if (window.confirm('¿Deseas restablecer el catálogo oficial de Puyo Pastaza? Se actualizará en tu pantalla de inmediato.')) {
                  onResetOfficial();
                  onClose();
                }
              }}
              className="text-xs text-rose-700 hover:text-rose-900 font-bold hover:underline cursor-pointer"
            >
              Restablecer Oficial Puyo
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
