import React, { useState, useEffect } from 'react';
import {
  Propiedad,
  listarPropiedades,
  hayAdmin,
  iniciarSesion,
  cerrarSesion,
  crearPropiedad,
  eliminarPropiedad,
} from '../lib/api';
import { comprimirFoto } from '../lib/comprimirFoto';

interface AdminViewProps {
  onBackToHome?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onBackToHome }) => {
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [comprobandoSesion, setComprobandoSesion] = useState(true);
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [iniciando, setIniciando] = useState(false);

  // Publications list
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [cargandoLista, setCargandoLista] = useState(false);
  const [errorLista, setErrorLista] = useState<string | null>(null);

  // Form mode: 'list' or 'create'
  const [modo, setModo] = useState<'list' | 'create'>('list');

  // Creation form state
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState<'casa' | 'terreno' | 'departamento' | 'quinta'>('casa');
  const [precio, setPrecio] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [banos, setBanos] = useState('');
  const [parqueaderos, setParqueaderos] = useState('');
  const [enlacePublicacion, setEnlacePublicacion] = useState('');

  // Selected files with local preview URLs
  const [fotosSeleccionadas, setFotosSeleccionadas] = useState<{ file: File; preview: string }[]>([]);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState<string | null>(null);
  const [estadoCompresion, setEstadoCompresion] = useState<string | null>(null);

  // Check session on mount
  const verificarSesion = async () => {
    setComprobandoSesion(true);
    try {
      const tieneAdmin = await hayAdmin();
      setAutenticado(tieneAdmin);
      if (tieneAdmin) {
        cargarPublicaciones();
      }
    } catch {
      setAutenticado(false);
    } finally {
      setComprobandoSesion(false);
    }
  };

  useEffect(() => {
    verificarSesion();
  }, []);

  const cargarPublicaciones = async () => {
    setCargandoLista(true);
    setErrorLista(null);
    try {
      const lista = await listarPropiedades();
      setPropiedades(Array.isArray(lista) ? lista : []);
    } catch (e: any) {
      setErrorLista(e.message || 'No se pudieron cargar las publicaciones.');
    } finally {
      setCargandoLista(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setErrorLogin(null);
    setIniciando(true);
    try {
      await iniciarSesion(password);
      setPassword('');
      setAutenticado(true);
      setModo('list');
      cargarPublicaciones();
    } catch (err: any) {
      setErrorLogin(err.message || 'Contraseña incorrecta');
    } finally {
      setIniciando(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await cerrarSesion();
    } catch (e) {
      console.error(e);
    }
    setAutenticado(false);
    setModo('list');
  };

  // Delete handler
  const handleEliminar = async (id: string, tituloPropiedad: string) => {
    const ok = window.confirm(`¿Eliminar "${tituloPropiedad}"?\n\nSe borrarán también sus fotos. ¿Continuar?`);
    if (!ok) return;

    try {
      await eliminarPropiedad(id);
      cargarPublicaciones();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar la publicación.');
    }
  };

  // Photo picker handler
  const handleSeleccionarFotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const nuevas = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFotosSeleccionadas((prev) => [...prev, ...nuevas]);
    // reset input
    e.target.value = '';
  };

  // Remove photo from selection
  const handleQuitarFoto = (index: number) => {
    setFotosSeleccionadas((prev) => {
      const target = prev[index];
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((_, idx) => idx !== index);
    });
  };

  // Move photo to cover (first position)
  const handleMoverAPortada = (index: number) => {
    if (index === 0) return;
    setFotosSeleccionadas((prev) => {
      const clon = [...prev];
      const [item] = clon.splice(index, 1);
      clon.unshift(item);
      return clon;
    });
  };

  // Reset form
  const resetFormulario = () => {
    setTitulo('');
    setTipo('casa');
    setPrecio('');
    setUbicacion('');
    setDescripcion('');
    setSuperficie('');
    setHabitaciones('');
    setBanos('');
    setParqueaderos('');
    setEnlacePublicacion('');
    fotosSeleccionadas.forEach((f) => URL.revokeObjectURL(f.preview));
    setFotosSeleccionadas([]);
    setErrorGuardar(null);
    setEstadoCompresion(null);
  };

  // Submit creation form
  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorGuardar(null);

    // Validate photo count
    if (fotosSeleccionadas.length < 3 || fotosSeleccionadas.length > 10) {
      setErrorGuardar(`Debes subir entre 3 y 10 fotos (actualmente tienes ${fotosSeleccionadas.length}).`);
      return;
    }

    setGuardando(true);
    setEstadoCompresion('Comprimiendo y optimizando fotos en WebP...');

    try {
      // Compress each photo before uploading
      const fotosComprimidas: File[] = [];
      for (let i = 0; i < fotosSeleccionadas.length; i++) {
        setEstadoCompresion(`Comprimiendo foto ${i + 1} de ${fotosSeleccionadas.length}...`);
        const comprimida = await comprimirFoto(fotosSeleccionadas[i].file);
        fotosComprimidas.push(comprimida);
      }

      setEstadoCompresion('Enviando publicación a Cloudflare D1 y R2...');

      const form = new FormData();
      form.append('titulo', titulo.trim());
      form.append('tipo', tipo);
      form.append('precio', precio.trim());
      form.append('ubicacion', ubicacion.trim());
      form.append('descripcion', descripcion.trim());
      form.append('superficie', superficie.trim());
      form.append('habitaciones', habitaciones.trim());
      form.append('banos', banos.trim());
      form.append('parqueaderos', parqueaderos.trim());
      form.append('enlacePublicacion', enlacePublicacion.trim());

      for (const f of fotosComprimidas) {
        form.append('fotos', f);
      }

      await crearPropiedad(form);
      resetFormulario();
      setModo('list');
      cargarPublicaciones();
    } catch (err: any) {
      setErrorGuardar(err.message || 'Error al crear la publicación.');
    } finally {
      setGuardando(false);
      setEstadoCompresion(null);
    }
  };

  // Loading Session Screen
  if (comprobandoSesion) {
    return (
      <div className="min-h-screen bg-[#f8faf7] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600">Verificando sesión segura...</p>
        </div>
      </div>
    );
  }

  // Not Logged In: Password Form
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[#002d12] to-slate-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-emerald-900/20 text-slate-900 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-950 text-amber-300 flex items-center justify-center mx-auto mb-4 shadow-md">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>

          <h1 className="text-xl font-black text-center text-[#003816] tracking-tight">
            Panel de Administración
          </h1>
          <p className="text-xs text-center text-slate-600 mt-1 mb-6">
            Inmo Astudillo · Gestión de Propiedades en Cloudflare
          </p>

          {errorLogin && (
            <div className="p-3.5 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorLogin}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
              />
            </div>

            <button
              type="submit"
              disabled={iniciando || !password.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-950 hover:from-emerald-700 hover:to-teal-900 text-amber-300 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40"
            >
              {iniciando ? (
                <>
                  <span className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">key</span>
                  <span>Ingresar al Administrador</span>
                </>
              )}
            </button>
          </form>

          {onBackToHome && (
            <div className="mt-6 text-center border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={onBackToHome}
                className="text-xs font-bold text-slate-500 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                ← Volver al sitio web principal
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Logged In: Only "Crear publicación", "Eliminar", and "Cerrar sesión"
  return (
    <div className="min-h-screen bg-[#f8faf7] text-slate-900 pb-24">
      {/* Admin Top Bar */}
      <header className="bg-gradient-to-r from-emerald-950 via-[#003816] to-teal-950 text-white border-b border-emerald-800 px-6 py-4 shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <div>
              <span className="text-xs font-black text-white tracking-wide block leading-none">
                Administración Inmo Astudillo
              </span>
              <span className="text-[10px] text-amber-300 font-medium">Cloudflare D1 & R2 Activo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-xs font-bold text-white transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Ver Sitio Web</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-700 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        {/* Navigation Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#003816] tracking-tight">
              {modo === 'create' ? 'Crear Nueva Publicación' : 'Publicaciones Registradas'}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {modo === 'create'
                ? 'Ingresa los datos y sube entre 3 y 10 fotos optimizadas automáticamente.'
                : `Total: ${propiedades.length} propiedades activas en base de datos D1.`}
            </p>
          </div>

          <div>
            {modo === 'list' ? (
              <button
                type="button"
                onClick={() => {
                  resetFormulario();
                  setModo('create');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#003816] hover:bg-[#004d1e] text-amber-300 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Crear publicación</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  resetFormulario();
                  setModo('list');
                }}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Volver a la lista</span>
              </button>
            )}
          </div>
        </div>

        {/* ----------------- MODE: CREATE FORM ----------------- */}
        {modo === 'create' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 max-w-4xl mx-auto">
            {errorGuardar && (
              <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span>{errorGuardar}</span>
              </div>
            )}

            {estadoCompresion && (
              <div className="p-4 mb-6 rounded-2xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 flex items-center gap-2 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
                <span>{estadoCompresion}</span>
              </div>
            )}

            <form onSubmit={handleCrear} className="space-y-6">
              {/* Photo Requirements Callout Block */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-xs text-emerald-950 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-emerald-900 text-sm mb-1">
                  <span className="material-symbols-outlined text-[20px] text-emerald-700">photo_library</span>
                  <span>REQUISITOS DE FOTOS</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed font-medium">
                  <li><b>Formatos:</b> JPG, PNG o WebP (no HEIC; en iPhone elegir &quot;Más compatible&quot;).</li>
                  <li><b>Peso:</b> máximo 8 MB por foto al elegirla; se reduce a WebP de máximo 1600 px del lado largo y menos de 400 KB.</li>
                  <li><b>Orientación:</b> Horizontales, proporción 4:3 o 16:9. Portada: la mejor foto de la fachada.</li>
                  <li><b>Cantidad:</b> De 3 a 10 fotos por publicación.</li>
                  <li>Sin marcas de agua, textos ni capturas de pantalla.</li>
                  <li>Solo fotos propias de la propiedad.</li>
                </ul>
              </div>

              {/* Photo Selector */}
              <div>
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block mb-2">
                  Fotos de la Propiedad (Mínimo 3, Máximo 10) *
                </label>

                <div className="flex items-center gap-3">
                  <label className="px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-extrabold text-xs cursor-pointer shadow-md transition-all flex items-center gap-2 active:scale-95">
                    <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                    <span>Seleccionar fotos</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={handleSeleccionarFotos}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs font-bold text-slate-500">
                    {fotosSeleccionadas.length} foto(s) seleccionada(s)
                  </span>
                </div>

                {/* Thumbnails list with reorder and delete */}
                {fotosSeleccionadas.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                    {fotosSeleccionadas.map((item, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-xl overflow-hidden border-2 bg-slate-100 aspect-[4/3] group shadow-sm ${
                          idx === 0 ? 'border-amber-500 ring-2 ring-amber-400/40' : 'border-slate-200'
                        }`}
                      >
                        <img src={item.preview} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />

                        {idx === 0 && (
                          <div className="absolute top-1.5 left-1.5 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                            PORTADA
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleMoverAPortada(idx)}
                              className="px-2 py-1 bg-amber-400 text-slate-950 text-[10px] font-black rounded-lg cursor-pointer hover:bg-amber-300"
                              title="Hacer foto de portada (primera foto)"
                            >
                              Portada
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleQuitarFoto(idx)}
                            className="p-1.5 bg-rose-600 text-white rounded-lg cursor-pointer hover:bg-rose-700"
                            title="Quitar esta foto"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Título de la Propiedad (Máx 120 caracteres) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="ej: Casa Moderna de 2 Pisos en Barrio Cumandá"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Tipo de Propiedad *
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50 cursor-pointer"
                  >
                    <option value="casa">Casa</option>
                    <option value="terreno">Terreno</option>
                    <option value="departamento">Departamento</option>
                    <option value="quinta">Quinta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Precio en USD (Entero) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="ej: 115000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Ubicación (Máx 150 caracteres) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={150}
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    placeholder="ej: Barrio Cumandá, Puyo, Pastaza"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                </div>
              </div>

              {/* Technical Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                    Superficie (m²)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={superficie}
                    onChange={(e) => setSuperficie(e.target.value)}
                    placeholder="ej: 220"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                    Habitaciones
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={habitaciones}
                    onChange={(e) => setHabitaciones(e.target.value)}
                    placeholder="ej: 3"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                    Baños
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={banos}
                    onChange={(e) => setBanos(e.target.value)}
                    placeholder="ej: 2"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                    Parqueaderos
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={parqueaderos}
                    onChange={(e) => setParqueaderos(e.target.value)}
                    placeholder="ej: 1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Enlace opcional de Facebook o Instagram (https://)
                </label>
                <input
                  type="url"
                  value={enlacePublicacion}
                  onChange={(e) => setEnlacePublicacion(e.target.value)}
                  placeholder="ej: https://www.facebook.com/share/p/1FrRzwdY6E/"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Descripción (Máx 3000 caracteres)
                </label>
                <textarea
                  rows={4}
                  maxLength={3000}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Detalles sobre escrituras, acabados, distribución y servicios básicos..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-slate-50"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModo('list')}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando || fotosSeleccionadas.length < 3 || fotosSeleccionadas.length > 10}
                  className="px-6 py-2.5 rounded-xl bg-[#003816] hover:bg-[#004d1e] text-amber-300 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-40"
                >
                  {guardando ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">publish</span>
                      <span>Crear Publicación</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- MODE: LIST VIEW ----------------- */}
        {modo === 'list' && (
          <div>
            {cargandoLista && (
              <div className="py-16 text-center">
                <div className="w-8 h-8 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500">Cargando publicaciones...</p>
              </div>
            )}

            {!cargandoLista && errorLista && (
              <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center text-xs font-bold text-rose-700 mb-6">
                <p>{errorLista}</p>
                <button
                  type="button"
                  onClick={cargarPublicaciones}
                  className="mt-3 px-4 py-1.5 bg-[#003816] text-amber-300 rounded-lg"
                >
                  Reintentar
                </button>
              </div>
            )}

            {!cargandoLista && !errorLista && propiedades.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">folder_open</span>
                <h3 className="text-base font-bold text-slate-800">No hay publicaciones creadas</h3>
                <p className="text-xs text-slate-500 mt-1 mb-5">
                  Haz clic en el botón para publicar tu primer inmueble con fotos en Cloudflare.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    resetFormulario();
                    setModo('create');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#003816] text-amber-300 font-extrabold text-xs shadow-md"
                >
                  + Crear primera publicación
                </button>
              </div>
            )}

            {!cargandoLista && !errorLista && propiedades.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propiedades.map((p) => {
                  const portada = p.fotos && p.fotos.length > 0 ? p.fotos[0] : '';
                  const precioFmt = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(p.precio) + ' USD';

                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                        {portada ? (
                          <img src={portada} alt={p.titulo} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined text-3xl">photo</span>
                          </div>
                        )}
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 text-amber-300 text-[10px] font-black uppercase">
                          {p.tipo}
                        </span>
                        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-emerald-950/95 text-amber-300 text-xs font-black">
                          {precioFmt}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{p.titulo}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{p.ubicacion}</p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {p.fotos.length} foto(s) · Creado el {new Date(p.creadoEn).toLocaleDateString('es-EC')}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                          {p.enlacePublicacion ? (
                            <a
                              href={p.enlacePublicacion}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-0.5"
                            >
                              <span>Ver enlace</span>
                              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400">Sin enlace externo</span>
                          )}

                          {/* ONLY DELETE ACTION ALLOWED */}
                          <button
                            type="button"
                            onClick={() => handleEliminar(p.id, p.titulo)}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 active:scale-95 border border-rose-200"
                            title="Eliminar esta publicación"
                          >
                            <span className="material-symbols-outlined text-[15px]">delete</span>
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
