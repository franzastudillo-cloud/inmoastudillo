import React from 'react';
import { Property } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
  onConfirmDelete: (property: Property) => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  property,
  onClose,
  onConfirmDelete,
}) => {
  if (!isOpen || !property) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 text-slate-900 flex flex-col text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon with Glow */}
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200 shadow-inner">
          <span className="material-symbols-outlined text-[32px]">delete_forever</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          ¿Eliminar esta Propiedad?
        </h3>

        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Estás a punto de eliminar de forma permanente el siguiente inmueble de tu catálogo:
        </p>

        {/* Property preview card */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left flex items-center gap-3">
          {property.imageUrl && (
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-slate-900 truncate">
              {property.title}
            </h4>
            <p className="text-[11px] font-bold text-emerald-800 mt-0.5">
              {property.priceFormatted}
            </p>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">
              {property.location}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-rose-700 bg-rose-50 border border-rose-200/80 rounded-xl p-2.5 mb-5 font-semibold">
          ⚠️ El inmueble se retirará de la página de inicio y del catálogo de propiedades.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmDelete(property);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-extrabold text-xs shadow-md shadow-rose-900/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">delete</span>
            <span>Sí, Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
