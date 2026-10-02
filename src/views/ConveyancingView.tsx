import React, { useState } from 'react';
import { CONVEYANCING_STEPS, LEGAL_SERVICES, FAQS } from '../data/propertiesData';

interface ConveyancingViewProps {
  onOpenAppointmentModal: () => void;
}

export const ConveyancingView: React.FC<ConveyancingViewProps> = ({ onOpenAppointmentModal }) => {
  // Checklist State
  const [role, setRole] = useState<'vendedor' | 'comprador'>('vendedor');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'v-1': false,
    'v-2': false,
    'v-3': false,
    'v-4': false,
  });

  // Calculator State
  const [salePrice, setSalePrice] = useState<number>(85000);
  const [modalidad, setModalidad] = useState<'contado' | 'biess' | 'banco'>('contado');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [procedureType, setProcedureType] = useState('Compraventa Completa');
  const [propertyLocation, setPropertyLocation] = useState('Puyo / Pastaza / Quito');
  const [propertyNotes, setPropertyNotes] = useState('');

  // Security banner image state (persisted in localStorage or default to inmoastudillo-puyo.jpg)
  const [securityImg, setSecurityImg] = useState<string>(() => {
    return localStorage.getItem('inmo_security_image') || '/inmoastudillo-puyo.jpg';
  });
  const securityFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleSecurityImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setSecurityImg(dataUrl);
      localStorage.setItem('inmo_security_image', dataUrl);
      try {
        await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl,
            filename: 'inmoastudillo-puyo.jpg',
          }),
        });
      } catch (err) {
        console.error('Failed to sync image to server:', err);
      }
    };
    reader.readAsDataURL(file);
  };
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Toggle checkmark in checklist
  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculations for Ecuadorian Notarial & Property Register fees
  // 1. Alcabala: typically 1.0% to 1.1% of municipal valuation/sale price in Ecuador
  const alcabalaFee = Math.round(salePrice * 0.011);

  // 2. Notary fee based on Official Consejo de la Judicatura brackets in Ecuador
  const calculateNotaryFee = (val: number) => {
    if (val <= 10000) return 90;
    if (val <= 30000) return 160;
    if (val <= 60000) return 240;
    if (val <= 100000) return 310;
    if (val <= 200000) return 460;
    return Math.round(460 + (val - 200000) * 0.001);
  };
  const notaryFee = calculateNotaryFee(salePrice);

  // 3. Property Register Registration Fee (Registro de la Propiedad)
  const calculateRegisterFee = (val: number) => {
    if (val <= 20000) return 120;
    if (val <= 50000) return 200;
    if (val <= 100000) return 275;
    if (val <= 200000) return 380;
    return Math.round(380 + (val - 200000) * 0.0008);
  };
  const registerFee = calculateRegisterFee(salePrice);

  const financingExtra = modalidad === 'biess' ? 180 : modalidad === 'banco' ? 220 : 0;
  const totalConveyancingCost = alcabalaFee + notaryFee + registerFee + financingExtra;

  const vendorDocs = [
    {
      id: 'v-1',
      title: '1. Escritura Original',
      subtitle: 'Copia certificada de la escritura de adquisición inscrita en el Registro de la Propiedad correspondiente.',
      tag: 'Indispensable',
    },
    {
      id: 'v-2',
      title: '2. Certificado de Gravámenes',
      subtitle: 'Con vigencia menor a 30 días, libre de hipotecas, prohibiciones de gravar o demandas pendientes.',
      tag: 'Tramitamos por Ud.',
    },
    {
      id: 'v-3',
      title: '3. Impuesto Predial',
      subtitle: 'Comprobante de pago del impuesto predial municipal del año en curso cancelado en su totalidad.',
      tag: 'Año en curso',
    },
    {
      id: 'v-4',
      title: '4. Cédulas y Votación',
      subtitle: 'Cédulas de ciudadanía y certificados de votación actualizados de todos los propietarios y sus cónyuges.',
      tag: 'Vigentes',
    },
  ];

  const buyerDocs = [
    {
      id: 'c-1',
      title: '1. Cédulas y Votación',
      subtitle: 'Documentos de identidad originales y papeletas de votación del comprador y su cónyuge.',
      tag: 'Indispensable',
    },
    {
      id: 'c-2',
      title: '2. Aprobación Crediticia',
      subtitle: 'Carta formal de crédito hipotecario aprobado (BIESS o Banco) si la compra no es de contado.',
      tag: 'Si aplica crédito',
    },
    {
      id: 'c-3',
      title: '3. Justificación de Fondos',
      subtitle: 'Comprobante de procedencia lícita de fondos para transferencias y seña de promesa de compraventa.',
      tag: 'Bancario',
    },
    {
      id: 'c-4',
      title: '4. Poder Especial Notarial',
      subtitle: 'Solo en caso de que uno de los compradores comparezca mediante representante legal o apoderado.',
      tag: 'Opcional',
    },
  ];

  const activeDocs = role === 'vendedor' ? vendorDocs : buyerDocs;
  const readyCount = activeDocs.filter((d) => checkedDocs[d.id]).length;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setClientName('');
      setClientPhone('');
      setPropertyNotes('');
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full bg-[#f8faf7]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gradient-to-b from-[#f2f4f1] via-[#f8faf7] to-[#f8faf7] px-6 lg:px-12 py-12 md:py-16 border-b border-[#e1e3e0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Highlights */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#caead8] text-[#032015] w-fit border border-[#a9c9b7]">
              <span className="material-symbols-outlined text-[16px] text-[#004215]">gavel</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#004215]">
                Departamento Jurídico e Inmobiliario
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-[#004215] tracking-tight leading-tight">
              Trámites de Compraventa Inmobiliaria Seguros y Sin Complicaciones
            </h1>

            <p className="text-sm md:text-base text-[#41493f] leading-relaxed">
              Le acompañamos en cada etapa legal, notarial y registral. Garantizamos que su compra o venta se realice con 100% de transparencia, celeridad y blindaje patrimonial en el Ecuador.
            </p>

            {/* Micro Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e1e3e0] shadow-sm">
                <span className="material-symbols-outlined text-[22px] text-[#004215]">assignment_turned_in</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#191c1b]">Abogados Inmobiliarios</span>
                  <span className="text-[10px] text-[#717a6e]">Especialistas Colegiados</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e1e3e0] shadow-sm">
                <span className="material-symbols-outlined text-[22px] text-[#326b00]">timer</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#191c1b]">Gravámenes en 24h</span>
                  <span className="text-[10px] text-[#717a6e]">Verificación Express</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#e1e3e0] shadow-sm">
                <span className="material-symbols-outlined text-[22px] text-[#004215]">handshake</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#191c1b]">Gestión Notarial</span>
                  <span className="text-[10px] text-[#717a6e]">Paso a paso integral</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenAppointmentModal}
                className="py-3 px-6 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Solicitar Asesoría Legal Inmediata</span>
              </button>

              <a
                href="https://wa.me/593994773533?text=Hola,%20deseo%20la%20Guía%20de%20Requisitos%20de%20Compraventa%20Inmo%20Astudillo"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-lg bg-white hover:bg-[#eceeeb] text-[#004215] border border-[#c0c9bc] text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px] text-[#326b00]">description</span>
                <span>Guía de Requisitos PDF (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Blindaje Legal Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-[#e1e3e0] relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#e1e3e0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#004215] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">shield</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#004215]">Blindaje Legal Inmo Astudillo</h3>
                    <span className="text-[11px] text-[#717a6e]">Trámite Seguro · Sin Riesgos</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#aaf773] text-[#245100] uppercase">
                  100% Eficaz
                </span>
              </div>

              {/* 4 Steps timeline */}
              <div className="flex flex-col gap-4 mt-5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#004215] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#191c1b]">Estudio de Títulos</span>
                      <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
                    </div>
                    <span className="text-[11px] text-[#41493f]">Libre de gravámenes e hipotecas</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#004215] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#191c1b]">Minuta & Arras</span>
                      <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
                    </div>
                    <span className="text-[11px] text-[#41493f]">Protección patrimonial para ambas partes</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#004215] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#191c1b]">Firma Notarial y Registro</span>
                      <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
                    </div>
                    <span className="text-[11px] text-[#41493f]">Protocolización e inscripción final</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#326b00] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#191c1b]">Cero Sorpresas Notariales</span>
                      <span className="material-symbols-outlined text-[16px] text-[#326b00]">check_circle</span>
                    </div>
                    <span className="text-[11px] text-[#41493f]">Liquidación previa de alcabalas, plusvalías y aranceles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROCESO INTEGRAL EN 5 PASOS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#326b00] bg-[#caead8] px-3 py-1 rounded-full">
            Ruta Jurídica Clara
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#004215] mt-3 tracking-tight">
            Proceso Integral de Compraventa en 5 Pasos
          </h2>
          <p className="text-xs md:text-sm text-[#41493f] mt-2">
            Desde la primera revisión en el Registro de la Propiedad hasta la entrega formal de llaves, gestionamos cada trámite municipal y notarial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CONVEYANCING_STEPS.map((s, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl flex flex-col justify-between gap-4 border transition-all duration-200 ${
                idx === 4
                  ? 'bg-[#004215] text-white border-[#004215] shadow-lg'
                  : 'bg-white text-[#191c1b] border-[#e1e3e0] shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      idx === 4 ? 'text-[#aef3b0]' : 'text-[#326b00]'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      idx === 4 ? 'text-[#aaf773]' : 'text-[#004215]'
                    }`}
                  >
                    {s.icon}
                  </span>
                </div>

                <h3 className={`text-sm font-bold ${idx === 4 ? 'text-white' : 'text-[#004215]'}`}>
                  {s.title}
                </h3>

                <p
                  className={`text-[11px] leading-relaxed ${
                    idx === 4 ? 'text-[#e1e3e0]' : 'text-[#41493f]'
                  }`}
                >
                  {s.description}
                </p>
              </div>

              <div
                className={`pt-3 border-t text-[10px] font-bold flex items-center gap-1.5 ${
                  idx === 4
                    ? 'border-white/20 text-[#aaf773]'
                    : 'border-[#eceeeb] text-[#326b00]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CHECKLIST REQUERIDO PARA LA COMPRAVENTA (INTERACTIVE) */}
      <section className="w-full bg-[#f2f4f1] py-16 border-t border-b border-[#e1e3e0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#326b00]">
                Documentación Sin Errores
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#004215] mt-1 tracking-tight">
                Checklist Requerido para la Compraventa
              </h2>
              <p className="text-xs md:text-sm text-[#41493f] mt-1">
                Seleccione su rol y marque interactivamente los recaudos con los que ya cuenta. Nuestro equipo gestiona los certificados que tenga pendientes.
              </p>
            </div>

            {/* Role switch */}
            <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#c0c9bc]">
              <button
                onClick={() => setRole('vendedor')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  role === 'vendedor'
                    ? 'bg-[#004215] text-white shadow-sm'
                    : 'text-[#41493f] hover:text-[#004215]'
                }`}
              >
                Soy Vendedor
              </button>
              <button
                onClick={() => setRole('comprador')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  role === 'comprador'
                    ? 'bg-[#004215] text-white shadow-sm'
                    : 'text-[#41493f] hover:text-[#004215]'
                }`}
              >
                Soy Comprador
              </button>
            </div>
          </div>

          {/* Interactive Checklist Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {activeDocs.map((doc) => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between gap-4 select-none ${
                    isChecked
                      ? 'bg-[#caead8]/50 border-[#326b00] shadow-sm'
                      : 'bg-white border-[#e1e3e0] hover:border-[#326b00]/50 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-[#004215]">{doc.title}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-[#326b00] text-white'
                          : 'border-2 border-[#c0c9bc] text-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#41493f] leading-relaxed">
                    {doc.subtitle}
                  </p>

                  <div className="pt-2 border-t border-[#eceeeb] flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#326b00] bg-white px-2 py-0.5 rounded border border-[#e1e3e0]">
                      {doc.tag}
                    </span>
                    <span className="text-[#717a6e]">
                      {isChecked ? 'Listo ✓' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Helper Callout */}
          <div className="bg-[#004215] text-white p-5 md:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[28px] text-[#aaf773] shrink-0">
                help_outline
              </span>
              <div className="text-xs">
                <span className="font-bold block text-sm mb-0.5">
                  ¿Le falta algún documento o certificado municipal? ({readyCount} de 4 recaudos listos)
                </span>
                Nosotros gestionamos certificados catastrales, no adeudar y gravámenes directamente por usted.
              </div>
            </div>

            <a
              href="https://wa.me/593994773533?text=Hola,%20necesito%20que%20me%20ayuden%20con%20el%20trámite%20de%20documentación%20inmobiliaria"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-lg bg-[#aaf773] text-[#0b2000] hover:bg-[#8fda5a] text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
            >
              Encargar Trámite a Inmo Astudillo
            </a>
          </div>
        </div>
      </section>

      {/* 4. SERVICIOS JURÍDICOS INMOBILIARIOS ESPECIALIZADOS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#326b00]">
            Especialistas Notariales
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#004215] mt-1 tracking-tight">
            Servicios Jurídicos Inmobiliarios Especializados
          </h2>
          <p className="text-xs md:text-sm text-[#41493f] mt-1">
            Solucionamos inconvenientes técnicos y registrales previos a la compraventa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEGAL_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white p-6 rounded-2xl border border-[#e1e3e0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#caead8] text-[#004215] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">{srv.icon}</span>
                </div>
                <h3 className="text-base font-bold text-[#004215] leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#41493f] leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#eceeeb] flex flex-col gap-1.5">
                {srv.tags.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#191c1b]">
                    <span className="material-symbols-outlined text-[14px] text-[#326b00]">check</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALCULADORA REFERENCIAL DE GASTOS DE ESCRITURACIÓN */}
      <section className="w-full bg-[#f2f4f1] py-16 border-t border-b border-[#e1e3e0]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#326b00]">
              Transparencia Financiera
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#004215] mt-1 tracking-tight">
              Calculadora Referencial de Gastos de Escrituración
            </h2>
            <p className="text-xs md:text-sm text-[#41493f] mt-1">
              Estime con claridad los valores estimados de alcabalas municipales, aranceles notariales y derechos registrales en el Ecuador.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-8 rounded-2xl border border-[#e1e3e0] shadow-xl">
            {/* Input Controls */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#191c1b] uppercase tracking-wider">
                    Valor Comercial / Avalúo de Compraventa (USD)
                  </label>
                  <span className="text-sm font-extrabold text-[#004215] bg-[#caead8] px-2.5 py-0.5 rounded tabular-nums">
                    ${salePrice.toLocaleString()} USD
                  </span>
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-3 text-sm font-bold text-[#717a6e]">$</span>
                  <input
                    type="number"
                    min="10000"
                    max="1500000"
                    step="5000"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                    className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg py-2.5 pl-8 pr-4 text-sm font-bold text-[#004215] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                  />
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  className="w-full mt-3 accent-[#004215] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#717a6e] mt-1">
                  <span>$10,000</span>
                  <span>$250,000</span>
                  <span>$500,000+</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#191c1b] uppercase tracking-wider block mb-2">
                  Modalidad de Adquisición
                </label>
                <select
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value as any)}
                  className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] font-medium focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                >
                  <option value="contado">Compraventa de Contado (Fondos Propios)</option>
                  <option value="biess">Crédito Hipotecario BIESS</option>
                  <option value="banco">Crédito Hipotecario Banca Privada</option>
                </select>
              </div>

              {/* Note on who pays what */}
              <div className="p-3.5 rounded-xl bg-[#f8faf7] border border-[#eceeeb] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-[#326b00] shrink-0 mt-0.5">info</span>
                <span className="text-[11px] text-[#41493f] leading-relaxed">
                  <b>Distribución habitual según la ley:</b> Comprador asume alcabala municipal, arancel notarial e inscripción en el Registro de la Propiedad. Vendedor asume plusvalía/utilidad municipal y levantamiento de hipoteca previa si existiese.
                </span>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 bg-[#f8faf7] p-6 rounded-xl border border-[#e1e3e0] flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e0]">
                  <span className="text-xs font-bold text-[#191c1b] uppercase tracking-wider">
                    Desglose Referencial
                  </span>
                  <span className="text-[10px] font-bold text-[#326b00] bg-[#aaf773] px-2 py-0.5 rounded">
                    Aranceles Oficiales
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 mt-4 text-xs text-[#41493f]">
                  <div className="flex justify-between items-center">
                    <span>1. Impuesto de Alcabala Municipal (~1.1%):</span>
                    <span className="font-bold text-[#191c1b] tabular-nums">
                      ${alcabalaFee.toLocaleString()}.00
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>2. Aranceles Notariales Regulados:</span>
                    <span className="font-bold text-[#191c1b] tabular-nums">
                      ${notaryFee.toLocaleString()}.00
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>3. Derechos de Inscripción (Registro Prop.):</span>
                    <span className="font-bold text-[#191c1b] tabular-nums">
                      ${registerFee.toLocaleString()}.00
                    </span>
                  </div>

                  {financingExtra > 0 && (
                    <div className="flex justify-between items-center text-[#004215]">
                      <span>4. Trámite de Gravamen Hipotecario:</span>
                      <span className="font-bold tabular-nums">${financingExtra}.00</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e1e3e0]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#717a6e] block">
                  Total Estimado de Gastos
                </span>
                <div className="text-3xl font-extrabold text-[#004215] tracking-tight tabular-nums my-1">
                  ${totalConveyancingCost.toLocaleString()}.00
                </div>

                <a
                  href={`https://wa.me/593994773533?text=${encodeURIComponent(
                    `Hola, coticé gastos de escrituración para un valor de $${salePrice.toLocaleString()} USD (${modalidad}). Deseo la liquidación exacta.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 py-2.5 px-4 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">request_quote</span>
                  <span>Cotizar Liquidación Exacta</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GARANTÍA DE SEGURIDAD JURÍDICA & BLINDAJE NOTARIAL */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="bg-gradient-to-b from-[#f8faf8] via-white to-[#f8faf8] rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-sm">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-full border border-emerald-300/60 shadow-xs">
              <span className="material-symbols-outlined text-[15px] text-emerald-700">verified_user</span>
              Garantía Registral & Notarial InmoAstudillo
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#004215] mt-3 tracking-tight">
              Blindaje Jurídico y Seguridad Notarial Total
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-2 leading-relaxed">
              Tu patrimonio protegido en cada paso: cero vicios ocultos, escrituración transparente y respaldo legal directo ante Notaría Pública y el Registro de la Propiedad.
            </p>
          </div>

          {/* Two-Column Security Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Professional Security Image */}
            <div className="lg:col-span-5 relative">
              <input
                type="file"
                ref={securityFileInputRef}
                onChange={handleSecurityImageUpload}
                accept="image/*"
                className="hidden"
              />
              <div 
                className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 aspect-[4/3] sm:aspect-square lg:aspect-[4/3] group cursor-pointer"
                onClick={() => securityFileInputRef.current?.click()}
                title="Haz clic para seleccionar o actualizar la foto de seguridad (inmoastudillo-puyo.jpg)"
              >
                <img
                  src={securityImg}
                  alt="Firma y blindaje legal notarial en InmoAstudillo"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash')) {
                      target.src = 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80';
                    }
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Direct Upload Button */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      securityFileInputRef.current?.click();
                    }}
                    className="bg-black/75 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/20 hover:border-amber-300 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px] text-amber-300">photo_camera</span>
                    <span>Cambiar / Subir Foto</span>
                  </button>
                </div>

                {/* Badges only shown if using external fallback without embedded badges */}
                {!securityImg.startsWith('data:image') && !securityImg.includes('inmoastudillo') && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4 flex items-center gap-1">
                      <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md text-[10px] font-extrabold text-emerald-900 flex items-center gap-1 border border-emerald-200">
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">shield</span>
                        <span>100% Blindaje Legal</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-200 text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">gavel</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900">Auditoría Registral Previa</span>
                          <span className="text-[10px] text-slate-500 font-medium">Licencia Profesional Acbrp - 005</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Hover instruction helper */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center pointer-events-none">
                  <div className="bg-white/95 text-slate-900 px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 border border-emerald-100">
                    <span className="material-symbols-outlined text-[18px] text-emerald-700">upload_file</span>
                    <span>Seleccionar inmoastudillo-puyo.jpg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 4 Security Guarantees */}
            <div className="lg:col-span-7 flex flex-col gap-3.5">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 hover:border-emerald-300 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                  <span className="material-symbols-outlined text-[19px]">policy</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">1. Estudio de Títulos y Certificado de Gravamen</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Constatación en el Registro de la Propiedad de Pastaza de que el inmueble esté libre de prendas, litigios, hipotecas o embargos.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 hover:border-emerald-300 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 border border-teal-100">
                  <span className="material-symbols-outlined text-[19px]">description</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">2. Promesas y Minutas Blindadas por Abogado Notarial</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Contratos con cláusulas equitativas que aseguran el valor entregado en arras o anticipo y estipulan plazos y penalidades claras.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 hover:border-emerald-300 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 border border-amber-100">
                  <span className="material-symbols-outlined text-[19px]">calculate</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">3. Liquidación Transparente de Impuestos Municipales</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Determinación oficial y cálculo exacto de alcabalas, plusvalías y cartas prediales sin cobros indebidos.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5 hover:border-emerald-300 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                  <span className="material-symbols-outlined text-[19px]">key</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">4. Entrega Segura de Llaves y Posesión Inmediata</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    Acompañamiento en el acto solemne de entrega y recepción pacífica del bien inmueble una vez asentada la firma en Notaría.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAppointmentModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/15 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[17px]">calendar_month</span>
                  <span>Agendar Asesoría Notarial Sin Costo</span>
                </button>

                <a
                  href="https://wa.me/593994773533?text=Hola%20Cbr.%20Franz%20Astudillo,%20deseo%20asesor%C3%ADa%20segura%20para%20un%20tr%C3%A1mite%20notarial."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px] text-emerald-600">chat</span>
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AGENDE SU CITA NOTARIAL */}
      <section className="w-full bg-[#f2f4f1] py-16 border-t border-[#e1e3e0]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-2xl border border-[#e1e3e0] shadow-xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Broker profile card */}
            <div className="lg:col-span-5 bg-[#f8faf7] p-6 rounded-xl border border-[#e1e3e0] flex flex-col gap-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#004215] text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-[#aaf773]">
                  DA
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#326b00]">
                    Atención Personalizada
                  </span>
                  <h3 className="text-lg font-bold text-[#004215]">Cbr. Daniel Astudillo</h3>
                  <span className="text-xs text-[#41493f]">Agente Inmobiliario Licenciado</span>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-[#e1e3e0] text-xs text-[#41493f] leading-relaxed">
                <i>"Revisamos su documentación previa sin costo para indicarle la viabilidad jurídica inmediata de su operación."</i>
              </div>

              <div className="flex flex-col gap-2 text-xs text-[#41493f]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#004215]">phone_in_talk</span>
                  <span>Línea Telefónica Directa: <b>0994773533</b></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#004215]">handshake</span>
                  <span>Atención presencial en Notarías y oficinas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#004215]">verified</span>
                  <span>Respaldados por Acbir Pastaza</span>
                </div>
              </div>

              <a
                href="https://wa.me/593994773533?text=Hola%20Daniel,%20solicito%20consulta%20inmobiliaria%20directa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-[#326b00] hover:bg-[#245100] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Escribir por WhatsApp Directo</span>
              </a>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#326b00]">
                  Agende su Cita Notarial
                </span>
                <h3 className="text-xl font-bold text-[#004215]">
                  Solicitud de Consulta Inmobiliaria
                </h3>
                <p className="text-xs text-[#41493f] mt-0.5">
                  Complete el formulario y un especialista legal se comunicará en menos de 2 horas hábiles.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center flex flex-col items-center gap-2 bg-[#caead8]/30 rounded-xl p-6 border border-[#a9c9b7]">
                  <span className="material-symbols-outlined text-[36px] text-[#004215]">check_circle</span>
                  <h4 className="text-base font-bold text-[#004215]">¡Solicitud Notarial Enviada!</h4>
                  <p className="text-xs text-[#41493f]">
                    Cbr. Daniel Astudillo revisará los antecedentes indicados y le contactará a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-[#41493f] uppercase block mb-1">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Roberto Sánchez"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#41493f] uppercase block mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0994773533"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-[#41493f] uppercase block mb-1">
                        Tipo de Trámite
                      </label>
                      <select
                        value={procedureType}
                        onChange={(e) => setProcedureType(e.target.value)}
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      >
                        <option>Compraventa Completa</option>
                        <option>Promesa de Compraventa con Arras</option>
                        <option>Levantamiento de Hipoteca</option>
                        <option>Posesión Efectiva y Herencias</option>
                        <option>Crédito BIESS / Banco</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#41493f] uppercase block mb-1">
                        Ubicación del Inmueble
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Puyo / Pastaza / Cumbayá"
                        value={propertyLocation}
                        onChange={(e) => setPropertyLocation(e.target.value)}
                        className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#41493f] uppercase block mb-1">
                      Detalles del Inmueble o Dudas
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Indique si el predio tiene gravámenes, si la compra es al contado o con financiamiento bancario..."
                      value={propertyNotes}
                      onChange={(e) => setPropertyNotes(e.target.value)}
                      className="w-full bg-[#f2f4f1] border border-[#e1e3e0] rounded-lg p-2.5 text-xs text-[#191c1b] focus:outline-none focus:ring-2 focus:ring-[#326b00]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#004215] hover:bg-[#1a5b28] text-white text-xs font-bold transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 mt-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    <span>Agendar Consulta Jurídica Gratuita</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PREGUNTAS FRECUENTES (FAQS ACCORDION) */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#326b00]">
            Preguntas Frecuentes
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#004215] mt-1 tracking-tight">
            Respuestas Claras a Dudas Legales Comunes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#e1e3e0] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f8faf7] transition-colors"
                >
                  <span className="text-sm font-bold text-[#004215]">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#326b00] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#41493f] leading-relaxed border-t border-[#eceeeb] bg-[#f8faf7]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. BOTTOM CONVEYANCING BANNER */}
      <section className="w-full bg-[#004215] py-14 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#aef3b0]">
            Tranquilidad · Eficacia · Garantía Jurídica
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Su patrimonio en las mejores manos profesionales
          </h2>
          <p className="text-xs md:text-sm text-[#caead8] max-w-xl leading-relaxed">
            "Donde los sueños se hacen realidad". Contáctenos hoy mismo y reciba asesoría personalizada para su trámite notarial o de compraventa.
          </p>
          <a
            href="https://wa.me/593994773533?text=Hola,%20solicito%20asesoría%20notarial%20inmediata"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 py-3 px-6 rounded-lg bg-[#aaf773] hover:bg-[#8fda5a] text-[#0b2000] text-xs font-bold transition-all shadow-lg flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Contactar por WhatsApp: 0994773533</span>
          </a>
        </div>
      </section>
    </div>
  );
};
