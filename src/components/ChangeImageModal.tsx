import React, { useState } from 'react';
import { Property } from '../types';
import { compressImageFile } from '../utils/imageCompressor';

interface ChangeImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onUpdateImage: (propertyId: number, newImageUrl: string) => void;
}

export const ChangeImageModal: React.FC<ChangeImageModalProps> = ({
  isOpen,
  onClose,
  property,
  onUpdateImage,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen || !property) return null;

  // Preset architectural photos
  const presets = [
    {
      label: 'Ático / Penthouse Moderno',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Villa con Piscina / Residencia',
      url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Terreno / Lote Verde Plano',
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Casa Residencial Contemporánea',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // Handle local file selection from computer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 0.82);
        if (compressed) {
          setImageUrl(compressed);
          setPreviewUrl(compressed);
        }
      } catch (err) {
        console.error('Error compressing image:', err);
      }
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewUrl || imageUrl;
    if (finalUrl) {
      onUpdateImage(property.id, finalUrl);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative border border-[#e1e3e0] my-8"
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
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#caead8] text-[#004215] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#326b00] uppercase tracking-wider block">
              Editor de Portafolio
            </span>
            <h3 className="text-lg font-bold text-[#004215]">
              Cambiar Imagen del Inmueble
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#41493f] mb-3">
          Modificando imagen para: <b>{property.title}</b>
        </p>

        {/* Security Reassurance Callout */}
        <div className="mb-4 p-2.5 rounded-lg bg-[#caead8]/60 border border-[#a9c9b7] flex items-center gap-2 text-[11px] text-[#004215]">
          <span className="material-symbols-outlined text-[18px] text-[#004215] shrink-0">
            verified_user
          </span>
          <span>
            <b>Seguridad total:</b> Los visitantes de tu página en internet <b>no pueden</b> modificar estas fotos. Solo tú en tu panel de control puedes ver este editor.
          </span>
        </div>

        {successMessage ? (
          <div className="py-8 flex flex-col items-center text-center space-y-3 bg-[#caead8]/40 rounded-xl p-6 border border-[#a9c9b7]">
            <span className="material-symbols-outlined text-[40px] text-[#004215]">
              check_circle
            </span>
            <h4 className="text-base font-bold text-[#004215]">¡Imagen Actualizada con Éxito!</h4>
            <p className="text-xs text-[#41493f]">
              La tarjeta del inmueble ahora muestra la nueva fotografía seleccionada.
            </p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex flex-col gap-4">
            {/* Live Preview Container */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#eceeeb] border border-[#e1e3e0]">
              <img
                src={previewUrl || imageUrl || property.imageUrl}
                alt="Vista previa de propiedad"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] font-medium">
                Vista Previa en Vivo
              </div>
            </div>

            {/* Option 1: Upload from device */}
            <div className="p-3.5 rounded-xl bg-[#f2f4f1] border border-[#e1e3e0] flex flex-col gap-2">
              <label className="text-[11px] font-bold text-[#004215] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
                Opción A: Subir foto desde tu computadora o celular
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="text-xs text-[#41493f] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#004215] file:text-white hover:file:bg-[#1a5b28] cursor-pointer"
              />
            </div>

            {/* Option 2: Paste URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider">
                Opción B: Pegar enlace de imagen (URL)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://ejemplo.com/mifoto.jpg"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  className="flex-1 bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                />
              </div>
            </div>

            {/* Option 3: Presets */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-[#717a6e] uppercase tracking-wider">
                Opción C: Seleccionar foto de alta calidad recomendada
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setPreviewUrl(preset.url);
                    }}
                    className="p-2 rounded-lg bg-[#f8faf7] hover:bg-[#caead8]/50 border border-[#e1e3e0] hover:border-[#326b00] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] font-semibold text-[#191c1b] block truncate">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Help note for code */}
            <div className="p-3 bg-[#caead8]/30 rounded-lg border border-[#a9c9b7] text-[11px] text-[#223e31] leading-relaxed">
              <span className="font-bold block mb-0.5">ℹ️ ¿Cómo guardarlo permanentemente en el código?</span>
              Las fotos de cada inmueble se configuran en el archivo <code>src/data/propertiesData.ts</code> dentro del campo <code>imageUrl: '...'</code>. O si lo prefieres, puedes decirme en el chat qué fotos poner y yo las guardo en el código por ti.
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                <span>Aplicar Nueva Imagen al Inmueble</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-lg bg-[#f2f4f1] text-[#41493f] hover:bg-[#e1e3e0] text-xs font-bold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
