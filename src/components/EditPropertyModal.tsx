import React, { useState, useEffect } from 'react';
import { Property } from '../types';

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onSaveProperty: (updatedProperty: Property) => void;
}

export const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  isOpen,
  onClose,
  property,
  onSaveProperty,
}) => {
  const [formData, setFormData] = useState<Property | null>(null);
  const [customBadge, setCustomBadge] = useState('');
  const [customHighlight, setCustomHighlight] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'specs' | 'descriptions' | 'image'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({ ...property });
      setSavedSuccess(false);
    }
  }, [property]);

  if (!isOpen || !formData) return null;

  const handlePriceChange = (value: string) => {
    const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(numeric) + ' USD';

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            price: numeric,
            priceFormatted: formatted,
          }
        : null
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB para un óptimo rendimiento.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData((prev) => (prev ? { ...prev, imageUrl: base64 } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBadge = () => {
    if (customBadge.trim() && formData) {
      setFormData({
        ...formData,
        badges: [...formData.badges, customBadge.trim()],
      });
      setCustomBadge('');
    }
  };

  const handleRemoveBadge = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        badges: formData.badges.filter((_, i) => i !== index),
      });
    }
  };

  const handleAddHighlight = () => {
    if (customHighlight.trim() && formData) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, customHighlight.trim()],
      });
      setCustomHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        highlights: formData.highlights.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSaveProperty(formData);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full p-5 md:p-8 shadow-2xl relative border border-[#e1e3e0] my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#eceeeb] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#004215] text-[#aaf773] flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[26px]">edit_document</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#004215]">
                  Editar Información del Inmueble
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#aaf773]/40 text-[#004215] uppercase">
                  ID #{formData.id}
                </span>
              </div>
              <p className="text-xs text-[#41493f] mt-0.5">
                Modifica textos, precios, habitaciones, metros y fotos. Los cambios se guardan al instante.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f2f4f1] text-[#191c1b] hover:bg-[#e1e3e0] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#eceeeb] pt-3 pb-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'general'
                ? 'bg-[#004215] text-white'
                : 'text-[#41493f] hover:bg-[#f2f4f1]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>Título, Precio y Ubicación</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-[#004215] text-white'
                : 'text-[#41493f] hover:bg-[#f2f4f1]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span>Metros, Habitaciones y Baños</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('descriptions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'descriptions'
                ? 'bg-[#004215] text-white'
                : 'text-[#41493f] hover:bg-[#f2f4f1]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">notes</span>
            <span>Textos y Etiquetas</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'image'
                ? 'bg-[#004215] text-white'
                : 'text-[#41493f] hover:bg-[#f2f4f1]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
            <span>Foto de Portada</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 px-1 space-y-5">
          {savedSuccess && (
            <div className="p-3 bg-[#caead8] border border-[#326b00] rounded-xl flex items-center gap-2 text-[#004215] text-xs font-bold animate-in fade-in">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>¡Propiedad actualizada y guardada con éxito en la memoria del navegador!</span>
            </div>
          )}

          {/* TAB 1: General Info (Title, Price, Location) */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Título Principal del Inmueble *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej. Residencia Familiar Los Álamos"
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] font-semibold focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                    Precio Numérico (USD) *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-[#717a6e] font-bold text-xs">$</span>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      placeholder="145000"
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-7 pr-3 text-xs text-[#191c1b] font-bold focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>
                  <span className="text-[10px] text-[#717a6e] mt-1 block">
                    Formato en tarjeta: <b>{formData.priceFormatted}</b>
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                    Etiqueta de Precio
                  </label>
                  <input
                    type="text"
                    value={formData.priceLabel}
                    onChange={(e) => setFormData({ ...formData, priceLabel: e.target.value })}
                    placeholder="Ej. Precio Venta, Oportunidad, Negociable"
                    className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                    Tipo de Inmueble
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'residential' | 'land',
                      })
                    }
                    className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] font-semibold focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                  >
                    <option value="residential">Casa / Departamento / Residencial</option>
                    <option value="land">Terreno / Lote / Finca</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                    Sector / Ciudad (Ubicación Corta) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ej. Puyo - Sector Los Álamos"
                    className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Dirección Exacta o Referencia
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ej. Av. Alberto Zambrano y Calle Lucindo Ortega"
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Metros, Habitaciones, Baños y Especificaciones */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#f8faf7] rounded-xl border border-[#caead8] text-xs text-[#004215]">
                <span className="font-bold">Medidas Técnicas:</span> Configura la superficie en metros cuadrados (m²), el número de dormitorios, baños y parqueaderos que se mostrarán en la ficha y la tarjeta.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                    Superficie / Metros Cuadrados (m²) *
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#717a6e] text-[18px]">
                      straighten
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.specs.surface}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, surface: e.target.value },
                        })
                      }
                      placeholder="Ej. 280 m², 1,200 m², 5 Ha"
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#191c1b] font-bold focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>
                </div>

                {formData.category === 'residential' ? (
                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Habitaciones / Dormitorios
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#717a6e] text-[18px]">
                        bed
                      </span>
                      <input
                        type="text"
                        value={formData.specs.rooms || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specs: { ...formData.specs, rooms: e.target.value },
                          })
                        }
                        placeholder="Ej. 4, 3 Dormitorios"
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#191c1b] font-bold focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Uso de Suelo
                    </label>
                    <input
                      type="text"
                      value={formData.specs.landUse || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, landUse: e.target.value },
                        })
                      }
                      placeholder="Ej. Residencial / Comercial / Agrícola"
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>
                )}
              </div>

              {formData.category === 'residential' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Baños / Servicios
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#717a6e] text-[18px]">
                        shower
                      </span>
                      <input
                        type="text"
                        value={formData.specs.bathrooms || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specs: { ...formData.specs, bathrooms: e.target.value },
                          })
                        }
                        placeholder="Ej. 3, 2.5 Baños"
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#191c1b] font-bold focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Parqueaderos / Garaje
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-[#717a6e] text-[18px]">
                        garage
                      </span>
                      <input
                        type="text"
                        value={formData.specs.parking || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specs: { ...formData.specs, parking: e.target.value },
                          })
                        }
                        placeholder="Ej. 2, 1 Techado"
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#191c1b] font-bold focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Servicios Básicos
                    </label>
                    <input
                      type="text"
                      value={formData.specs.services || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, services: e.target.value },
                        })
                      }
                      placeholder="Ej. Agua, Luz, Vía Asfaltada"
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Topografía
                    </label>
                    <input
                      type="text"
                      value={formData.specs.topography || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, topography: e.target.value },
                        })
                      }
                      placeholder="Ej. 100% Plano, Semi-inclinado"
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Textos, Descripciones y Etiquetas */}
          {activeTab === 'descriptions' && (
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Resumen Corto (Aparece en la tarjeta) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Descripción concisa de los atractivos clave del inmueble"
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                  Descripción Detallada (Ficha Completa) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles constructivos, acabados, cercanía a servicios y bondades legales..."
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                />
              </div>

              {/* Badges / Etiquetas */}
              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1.5">
                  Etiquetas / Badges
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {formData.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-[#004215] text-[#aaf773] text-[11px] font-bold flex items-center gap-1.5"
                    >
                      <span>{b}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBadge(idx)}
                        className="hover:text-red-300 transition-colors text-xs cursor-pointer"
                        title="Eliminar etiqueta"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customBadge}
                    onChange={(e) => setCustomBadge(e.target.value)}
                    placeholder="Ej. Oportunidad, Acepta BIESS, Exclusiva"
                    className="flex-1 bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg px-3 py-2 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBadge();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddBadge}
                    className="px-3 py-2 rounded-lg bg-[#326b00] text-white text-xs font-bold hover:bg-[#245100] transition-colors cursor-pointer"
                  >
                    + Agregar
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1.5">
                  Puntos Destacados (Ficha técnica)
                </label>
                <div className="space-y-1.5 mb-2">
                  {formData.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#f8faf7] border border-[#e1e3e0] text-xs text-[#191c1b]"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#326b00] text-[16px]">
                          check_circle
                        </span>
                        {h}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-0.5"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customHighlight}
                    onChange={(e) => setCustomHighlight(e.target.value)}
                    placeholder="Ej. Escritura pública libre de gravamen"
                    className="flex-1 bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg px-3 py-2 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-3 py-2 rounded-lg bg-[#326b00] text-white text-xs font-bold hover:bg-[#245100] transition-colors cursor-pointer"
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Fotografía */}
          {activeTab === 'image' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-full sm:w-1/2 aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#326b00] shadow-md bg-[#eceeeb] relative">
                  <img
                    src={formData.imageUrl}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    Vista Previa Actual
                  </span>
                </div>

                <div className="w-full sm:w-1/2 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      Subir foto desde tu dispositivo
                    </label>
                    <label className="flex items-center justify-center gap-2 p-3 bg-[#caead8]/60 hover:bg-[#caead8] border-2 border-dashed border-[#326b00] rounded-xl text-xs font-bold text-[#004215] cursor-pointer transition-colors">
                      <span className="material-symbols-outlined text-[20px]">upload_file</span>
                      <span>Seleccionar imagen (JPG, PNG, WebP)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#41493f] uppercase tracking-wider block mb-1">
                      O pegar enlace directo URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-[#eceeeb] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] text-[#717a6e]">
              <span className="material-symbols-outlined text-[16px] text-[#326b00]">lock</span>
              <span>Guardado directo y permanente en tu navegador</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-[#e1e3e0] text-xs font-bold text-[#41493f] hover:bg-[#f2f4f1] transition-colors flex-1 sm:flex-none cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 flex-1 sm:flex-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
