import React, { useState } from 'react';

interface AdminSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminSecurityModal: React.FC<AdminSecurityModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = password.trim().toLowerCase();
    // Authorized master keys requested by Cbr. Franz Astudillo
    if (clean === 'judan1618' || clean === 'arturoastu') {
      setError(false);
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 animate-in zoom-in-95 duration-200 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[26px]">shield_person</span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Seguridad Inmobiliaria
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              Acceso de Administrador
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-5">
          La página se encuentra <b>protegida contra modificaciones desde la red</b>. Para habilitar la edición de fotos, precios y textos, ingresa tu clave autorizada de propietario:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
              Clave de Seguridad
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">
                key
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Ingresa tu clave de acceso..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-9 pr-10 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  error
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-emerald-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {error && (
              <span className="text-[11px] text-rose-600 font-bold mt-1.5 block flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                Clave incorrecta. El sitio permanece protegido.
              </span>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="submit"
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/15 cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">lock_open</span>
              <span>Desbloquear Edición</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-emerald-800 font-bold">
            <span className="material-symbols-outlined text-[15px]">verified_user</span>
            Solo Cbr. Franz Astudillo
          </span>
          <span className="text-slate-400">
            Licencia Profesional Acbrp - 005
          </span>
        </div>
      </div>
    </div>
  );
};
