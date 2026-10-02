import React from 'react';

interface PhotoSecurityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnableAdmin?: () => void;
  isAdmin?: boolean;
}

export const PhotoSecurityGuideModal: React.FC<PhotoSecurityGuideModalProps> = ({
  isOpen,
  onClose,
  onEnableAdmin,
  isAdmin,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-[#e1e3e0] my-8 text-[#191c1b]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2f4f1] text-[#191c1b] hover:bg-[#e1e3e0] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#e1e3e0]">
          <div className="w-12 h-12 rounded-xl bg-[#004215] text-[#aaf773] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[26px]">shield</span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#caead8] text-[#004215] text-[10px] font-bold uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#326b00]"></span>
              Seguridad & Control del Propietario
            </div>
            <h3 className="text-xl font-extrabold text-[#004215] tracking-tight">
              ¿Quién puede modificar las fotos de la página?
            </h3>
          </div>
        </div>

        {/* Question 1: Can anyone change photos on the published site? */}
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#caead8]/35 border border-[#326b00]/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#004215] text-[24px] shrink-0 mt-0.5">
              lock
            </span>
            <div className="text-xs space-y-1.5">
              <h4 className="font-extrabold text-[#004215] text-sm">
                1. ¿Cuando se publique la página, alguien podrá modificar las fotos?
              </h4>
              <p className="text-[#223e31] leading-relaxed">
                <b>NO, rotundamente nadie.</b> Cuando tu página web se publica en internet, queda completamente <b>protegida y en modo de solo lectura</b> para el público.
              </p>
              <p className="text-[#223e31] leading-relaxed">
                Los clientes, compradores o cualquier persona que entre a tu web solo podrán: ver las fotografías en alta resolución, consultar la información, agendar visitas y escribirte a tu WhatsApp directo (0994773533).
                <b> Ningún visitante externo tiene permisos ni botones para editar, subir o borrar fotos.</b>
              </p>
            </div>
          </div>

          {/* Question 2: How do YOU change the images? */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-[#004215] text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[#326b00] text-[20px]">
                add_photo_alternate
              </span>
              2. ¿Cómo puedes TÚ cambiar las fotos de los inmuebles?
            </h4>
            <p className="text-xs text-[#41493f] leading-relaxed">
              Dispones de tres formas muy fáciles y seguras:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Option A: Admin button */}
              <div className="p-3.5 rounded-xl bg-[#f8faf7] border border-[#e1e3e0] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#caead8] text-[#004215] flex items-center justify-center font-bold text-xs mb-2">
                    A
                  </div>
                  <h5 className="font-bold text-xs text-[#004215] mb-1">
                    Desde la misma pantalla (Modo Admin)
                  </h5>
                  <p className="text-[11px] text-[#41493f] leading-relaxed">
                    Activa el <b>Modo Administrador</b> arriba. Aparecerá el botón <b>"Cambiar Foto"</b> sobre cada propiedad. Puedes subir fotos desde tu computadora o celular con vista previa al instante.
                  </p>
                </div>
              </div>

              {/* Option B: Ask in Chat */}
              <div className="p-3.5 rounded-xl bg-[#f8faf7] border border-[#326b00]/30 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#004215] text-[#aaf773] flex items-center justify-center font-bold text-xs mb-2">
                    B
                  </div>
                  <h5 className="font-bold text-xs text-[#004215] mb-1">
                    Pidiéndomelo en el Chat (Recomendado)
                  </h5>
                  <p className="text-[11px] text-[#41493f] leading-relaxed">
                    Sube tus fotos aquí al chat o envíame los enlaces y dime: <i>"Pon esta foto para el terreno de Puyo"</i>. Yo la grabo directamente en el código fuente para siempre.
                  </p>
                </div>
              </div>

              {/* Option C: Direct Code */}
              <div className="p-3.5 rounded-xl bg-[#f8faf7] border border-[#e1e3e0] flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#eceeeb] text-[#191c1b] flex items-center justify-center font-bold text-xs mb-2">
                    C
                  </div>
                  <h5 className="font-bold text-xs text-[#004215] mb-1">
                    En el archivo de datos
                  </h5>
                  <p className="text-[11px] text-[#41493f] leading-relaxed">
                    En el archivo <code>src/data/propertiesData.ts</code>, cambiando el enlace en el campo <code>imageUrl: '...'</code> de cada propiedad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action in Modal */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e1e3e0]">
            <div className="text-[11px] text-[#41493f]">
              Estado actual: {isAdmin ? (
                <span className="font-bold text-[#004215]">Modo Administrador ACTIVADO</span>
              ) : (
                <span className="font-medium text-[#717a6e]">Modo Público (Visitante regular)</span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onEnableAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    onEnableAdmin();
                  }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isAdmin
                      ? 'bg-[#f2f4f1] text-[#41493f] hover:bg-[#e1e3e0]'
                      : 'bg-[#004215] hover:bg-[#1a5b28] text-white shadow-sm'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isAdmin ? 'visibility' : 'admin_panel_settings'}
                  </span>
                  <span>{isAdmin ? 'Desactivar Modo Admin' : 'Activar Modo Admin Ahora'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#f2f4f1] text-[#41493f] hover:bg-[#e1e3e0] text-xs font-bold transition-colors cursor-pointer"
              >
                Entendido, cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
