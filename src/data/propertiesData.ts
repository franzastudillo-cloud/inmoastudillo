import { Property } from '../types';

export const PROPERTIES_DATA: Property[] = [
  {
    id: 1,
    title: 'Casa Moderna de 2 Pisos con Garaje Eléctrico en Barrio Cumandá',
    category: 'residential',
    price: 115000,
    priceFormatted: '$115,000 USD',
    priceLabel: 'Venta Directa',
    location: 'Barrio Cumandá, Puyo, Pastaza',
    locationZone: 'Barrio Cumandá',
    address: 'Barrio Cumandá, Sector Residencial Consolidado, Puyo',
    shortDescription: 'Imponente casa de 2 plantas con diseño moderno en Barrio Cumandá. Garaje eléctrico, master mini-suite con baño privado, 2 dormitorios y 3 baños completos.',
    description: 'Propiedad residencial destacada de Inmo Astudillo ubicada en el codiciado Barrio Cumandá de Puyo. Diseño de dos pisos cómodo y funcional: garaje eléctrico con portón automático, sala y comedor acogedores, cocina equipada con acabados de primera, 3 baños completos, dos dormitorios con armarios empotrados y una master mini-suite privada con su propio baño. Lista para entrega con escrituras saneadas y apta para crédito hipotecario BIESS o bancario.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-emerald-950 via-teal-950 to-slate-900',
    photoCount: 18,
    badges: ['Publicación Facebook', 'Barrio Cumandá', 'Garaje Eléctrico', 'En Venta'],
    specs: {
      surface: '220 m²',
      rooms: '3 Hab. + Mini-Suite',
      bathrooms: '3 Baños Completos',
      parking: '1 Garaje Eléctrico'
    },
    highlights: [
      'Garaje cerrado con portón eléctrico automatizado',
      'Master mini-suite con baño privado y clósets empotrados',
      '3 baños completos con acabados modernos',
      'Cocina, sala y comedor totalmente equipados y funcionales',
      'Escrituras públicas al día libres de gravámenes en Pastaza'
    ],
    legalCertified: true,
    featured: true
  },
  {
    id: 2,
    title: 'Terreno Esquinero Comercial de 805 m² en Puyo',
    category: 'land',
    price: 98000,
    priceFormatted: '$98,000 USD',
    priceLabel: 'Oportunidad de Inversión',
    location: 'Sector Comercial Estratégico, Puyo, Pastaza',
    locationZone: 'Puyo',
    address: 'Esquina Comercial de Alto Flujo, Puyo, Pastaza',
    shortDescription: 'Excelente lote esquinero de 805 m² con ubicación comercial de alta plusvalía y vistas impresionantes en Puyo. Ideal para edificación o negocios.',
    description: 'Gran oportunidad de inversión presentada por Inmo Astudillo: lote esquinero de 805 m² en una de las mejores ubicaciones comerciales de Puyo. Vista panorámica privilegiada, doble frente a calles principales, topografía favorable y todos los servicios básicos al pie. Ideal para plaza comercial, oficinas, concesionaria o conjunto habitacional.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-amber-950 via-emerald-950 to-slate-900',
    photoCount: 14,
    badges: ['Lote Esquinero', '805 m²', 'Comercial Puyo', 'Alta Plusvalía'],
    specs: {
      surface: '805 m²',
      landUse: 'Comercial / Resid.',
      services: '100% Factibilidad',
      topography: 'Esquinero Regular'
    },
    highlights: [
      '805 m² de superficie con amplio frente esquinero a dos vías',
      'Ubicación comercial privilegiada con impresionante vista en Puyo',
      'Factibilidad total de servicios básicos (agua, luz, alcantarillado)',
      'Escritura pública libre de hipotecas y lista para traspaso'
    ],
    legalCertified: true,
    featured: true
  },
  {
    id: 3,
    title: 'Lote Residencial Urbanizado de Alta Plusvalía en Puyo',
    category: 'land',
    price: 45000,
    priceFormatted: '$45,000 USD',
    priceLabel: 'Oportunidad de Inversión',
    location: 'Sector Los Ángeles / El Dorado, Puyo, Pastaza',
    locationZone: 'Puyo',
    address: 'Sector Los Ángeles, Calle de Acceso Principal, Puyo',
    shortDescription: 'Lote 100% plano listo para construir residencia personalizada dentro de zona de alta plusvalía. Servicios completos y escrituración inmediata.',
    description: 'Excelente lote residencial de topografía totalmente plana, situado en uno de los sectores de mayor crecimiento y plusvalía de Puyo. Cuenta con acometida de agua potable, electricidad, alcantarillado y fibra óptica disponible. Documentación totalmente al día en el Registro de la Propiedad del Cantón Pastaza, libre de hipotecas y gravámenes. Apto para financiamiento con BIESS o banca privada.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-emerald-950 via-slate-900 to-emerald-900',
    photoCount: 12,
    badges: ['Lote en Puyo', 'Escritura Inmediata', 'Califica BIESS'],
    specs: {
      surface: '450 m²',
      landUse: 'Residencial',
      services: '100% Activos',
      topography: '100% Plano'
    },
    highlights: [
      'Topografía regular plana sin necesidad de relleno ni movimiento de tierras',
      'Escritura pública individualizada inscrita en el Registro de la Propiedad',
      'Servicios básicos completos al pie del lote (agua, luz, alcantarillado)',
      'Apto para crédito hipotecario BIESS o banca privada'
    ],
    legalCertified: true,
    featured: true
  },
  {
    id: 4,
    title: 'Casa Residencial Familiar con Acabados de Primera en Puyo',
    category: 'residential',
    price: 118000,
    priceFormatted: '$118,000 USD',
    priceLabel: 'Venta Directa',
    location: 'Sector Barrio Obrero / Las Palmas, Puyo, Pastaza',
    locationZone: 'Barrio Obrero',
    address: 'Barrio Obrero, Sector Residencial Consolidado, Puyo',
    shortDescription: 'Hermosa casa familiar con finos acabados en madera de cedro, sala a doble altura, jardín frontal, área BBQ y garaje cerrado para 2 vehículos.',
    description: 'Imponente casa residencial diseñada para brindar confort y seguridad a toda la familia. Distribución en dos plantas: sala principal amplia con doble altura, comedor, cocina estilo americano con muebles de madera sólida y mesones de granito. Master suite con vestidor y baño privado, más 2 dormitorios con baño compartido. Amplio patio posterior con área de lavandería cubierta y zona BBQ. Cero gravámenes y lista para traspaso notarial.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-green-950 via-emerald-900 to-stone-900',
    photoCount: 16,
    badges: ['Casa en Venta', 'Exclusivo Puyo', 'Garantía Notarial'],
    specs: {
      surface: '260 m²',
      rooms: '3 Hab.',
      bathrooms: '2.5 Baños',
      parking: '2 Coch.'
    },
    highlights: [
      'Construcción de hormigón armado con acabados en porcelanato y cedro',
      'Zona BBQ techada y patio posterior con cerramiento perimetral alto',
      'Línea telefónica, agua caliente con calefón y fibra óptica instalada',
      'Titulación saneada y libre de hipotecas en Pastaza'
    ],
    legalCertified: true,
    featured: true
  },
  {
    id: 5,
    title: 'Quinta Vacacional con Árboles Frutales y Río Cristalino',
    category: 'land',
    price: 78000,
    priceFormatted: '$78,000 USD',
    priceLabel: 'Oportunidad Amazónica',
    location: 'Vía a Fátima / San Javier, Pastaza',
    locationZone: 'Fátima',
    address: 'Vía a Fátima Km 4, Pastaza',
    shortDescription: 'Amplia quinta vacacional de 3,500 m² con orilla de río, árboles frutales amazónicos, cabaña rústica habitable y acceso carrozable asfaltado.',
    description: 'Extraordinaria propiedad campestre perfecta para descanso, turismo ecológico o quinta familiar en Pastaza. Rodeada de exuberante vegetación y con acceso a un río de agua limpia. Cuenta con cabaña rústica de dos ambientes, acometida eléctrica y agua de vertiente natural. Acceso directo por vía asfaltada y alumbrado público. Libre de prohibiciones de enajenar.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-emerald-950 via-teal-950 to-neutral-900',
    photoCount: 14,
    badges: ['Quinta / Finca', 'Río & Naturaleza', 'Alta Plusvalía'],
    specs: {
      surface: '3,500 m²',
      landUse: 'Campestre',
      services: 'Agua / Luz',
      topography: 'Semi-plano'
    },
    highlights: [
      'Lindero natural con estero y río de aguas cristalinas',
      'Plantación de árboles frutales amazónicos en producción',
      'Acceso carrozable en perfecto estado a solo 10 minutos del centro de Puyo',
      'Escritura pública notarial sin gravámenes'
    ],
    legalCertified: true,
    featured: true
  },
  {
    id: 6,
    title: 'Departamento Moderno a Estrenar en el Centro de Puyo',
    category: 'residential',
    price: 68000,
    priceFormatted: '$68000 USD',
    priceLabel: 'Entrega Inmediata',
    location: 'Calle Lucindo Ortega y Ceslao Marín, Puyo Centro',
    locationZone: 'Puyo Centro',
    address: 'Calle Lucindo Ortega, Edificio Central, Puyo',
    shortDescription: 'Departamento de 3 dormitorios con vista panorámica, balcón, parqueadero cubierto y bodega. Cerca de notarías, bancos y comercios.',
    description: 'Ubicación inmejorable en el corazón comercial y administrativo de Puyo. Departamento en edificio residencial con ascensor, sistema contra incendios y control de accesos. Sala-comedor con amplios ventanales, cocina con anaqueles de primera y área de máquinas independiente. Califica para crédito hipotecario con cualquier entidad financiera o BIESS.',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-slate-950 via-emerald-950 to-emerald-900',
    photoCount: 15,
    badges: ['Departamento', 'Centro de Puyo', 'Estreno'],
    specs: {
      surface: '115 m²',
      rooms: '3 Hab.',
      bathrooms: '2 Baños',
      parking: '1 Coch.'
    },
    highlights: [
      'Ubicación céntrica privilegiada a pasos de bancos y notarías',
      'Propiedad Horizontal (PH) debidamente legalizada con clave catastral propia',
      'Parqueadero cubierto y bodega privada en subsuelo',
      'Asesoría completa en tramitación notarial y crédito hipotecario'
    ],
    legalCertified: true,
    featured: false
  },
  {
    id: 7,
    title: 'Terreno Comercial Estratégico sobre Vía Principal en Puyo',
    category: 'land',
    price: 135000,
    priceFormatted: '$135,000 USD',
    priceLabel: 'Comercial Premium',
    location: 'Av. Alberto Zambrano, Puyo, Pastaza',
    locationZone: 'Av. Alberto Zambrano',
    address: 'Av. Alberto Zambrano, frente a zona de alto flujo, Puyo',
    shortDescription: 'Lote comercial de 800 m² con 20 metros de frente a la avenida principal. Ideal para distribuidora, concesionario o edificio de oficinas.',
    description: 'Propiedad con potencial comercial inigualable en la arteria vial de mayor circulación de Puyo. Topografía plana, uso de suelo comercial-residencial múltiple con permiso para edificación en altura. Factibilidad para todos los servicios de alta demanda. Escritura pública lista para transferencia inmediata sin ningún tipo de litigio ni gravamen.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-amber-950 via-stone-900 to-emerald-950',
    photoCount: 10,
    badges: ['Comercial', 'Av. Principal', 'Inversión Segura'],
    specs: {
      surface: '800 m²',
      landUse: 'Comercial',
      services: '100% Factibilidad',
      topography: 'Plano Regular'
    },
    highlights: [
      '20 metros de frente sobre avenida principal de alto tráfico comercial',
      'Uso de suelo comercial de alto impacto con factibilidad municipal',
      'Estudio de títulos realizado y certificado de gravámenes actualizado',
      'Negociación directa y transparente con Inmo Astudillo'
    ],
    legalCertified: true,
    featured: false
  }
];

export const CONVEYANCING_STEPS = [
  {
    step: 'PASO 01',
    title: 'Estudio de Títulos',
    time: '24 a 48 Horas',
    icon: 'gavel',
    badge: 'Legal',
    description: 'Revisión exhaustiva de escrituras matrices, linderos, historial de traslación de dominio y certificado de gravámenes para descartar embargos o prohibiciones de enajenar.'
  },
  {
    step: 'PASO 02',
    title: 'Promesa de Compraventa',
    time: 'Blindaje de Seña',
    icon: 'edit_note',
    badge: 'Minuta',
    description: 'Redacción personalizada del contrato preparatorio con cláusula penal de arras, calendario de pagos, asignación de gastos y reconocimiento de firmas ante Notario.'
  },
  {
    step: 'PASO 03',
    title: 'Liquidación de Impuestos',
    time: 'Liquidación Oficial',
    icon: 'account_balance',
    badge: 'Tributario',
    description: 'Tramitación municipal de alcabalas, plusvalía, utilidades, certificado de no adeudar al Municipio/Consejo Provincial y solvencia de administración en propiedad horizontal.'
  },
  {
    step: 'PASO 04',
    title: 'Escritura Pública Notarial',
    time: 'Notaría Asignada',
    icon: 'draw',
    badge: 'Notarial',
    description: 'Elaboración de minuta por abogado patrocinador, coordinación de turno notarial preferente, lectura de clausulado y firma presencial o con poder especial verificado.'
  },
  {
    step: 'PASO 05 FINAL',
    title: 'Inscripción y Llaves',
    time: 'Posesión Garantizada',
    icon: 'key',
    badge: 'Registro',
    description: 'Ingreso e inscripción en el Registro de la Propiedad respectivo, emisión de la razón de inscripción certificada y entrega protocolizada de llaves y posesión jurídica.'
  }
];

export const LEGAL_SERVICES = [
  {
    id: 'hipotecas',
    title: 'Levantamiento de Hipotecas y Gravámenes',
    icon: 'lock_open',
    description: 'Cancelación de hipotecas abiertas o cerradas ante entidades bancarias, cooperativas y BIESS. Minuta y razón de cancelación registral.',
    tags: ['Finiquito y cartas de pago', 'Cancelación notarial express']
  },
  {
    id: 'ph',
    title: 'Declaratorias de Propiedad Horizontal (PH)',
    icon: 'domain',
    description: 'Elaboración de reglamento interno, cuadro de alícuotas, protocolización de planos arquitectónicos aprobados y fraccionamiento para departamentos y oficinas.',
    tags: ['Asignación de claves catastrales individuales', 'Reglamentos de copropiedad']
  },
  {
    id: 'herencias',
    title: 'Posesiones Efectivas y Herencias',
    icon: 'groups',
    description: 'Trámite notarial de posesión efectiva proindiviso, pago de impuesto a la herencia en el SRI y particiones extrajudiciales o de mutuo acuerdo.',
    tags: ['Declaración de herederos', 'Formulario SRI de herencias']
  },
  {
    id: 'planimetrias',
    title: 'Regularización de Terrenos y Planimetrías',
    icon: 'landscape',
    description: 'Aclaración de linderos, corrección de medidas catastrales, rectificación de áreas con excedentes o diferencias y actualización en Catastros Municipales.',
    tags: ['Levantamiento topográfico georreferenciado', 'Escrituras aclaratorias']
  },
  {
    id: 'biess',
    title: 'Asesoría de Crédito BIESS / Banca Privada',
    icon: 'account_balance',
    description: 'Armado integral de la carpeta crediticia para avalúo pericial, minutas con garantía hipotecaria a favor de la institución financiera y desembolso expedito.',
    tags: ['Cumplimiento de requisitos BIESS', 'Acompañamiento hasta la liquidación final']
  },
  {
    id: 'arrendamiento',
    title: 'Contratos de Arrendamiento Blindados',
    icon: 'security',
    description: 'Contratos civiles o mercantiles de arriendo con cláusulas arbitrales de desahucio rápido, garantías líquidas y reconocimiento notarial de firmas.',
    tags: ['Cláusula de mediación y arbitraje', 'Inventario notariado del inmueble']
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Vendieron nuestra casa en el Barrio Obrero de Puyo en solo 3 semanas y al precio justo del avalúo pericial. La gestión notarial y el pago fueron 100% seguros y transparentes.',
    author: 'Lic. Marco Vinicio Paredes',
    role: 'Vendedor en Puyo / Residencial',
    rating: 5,
    tag: 'Venta Rápida'
  },
  {
    quote: 'Compramos nuestro primer lote en Pastaza con asesoría de Inmo Astudillo. Nos revisaron el certificado de gravámenes y la planimetría para evitar problemas. Excelente respaldo legal.',
    author: 'Fam. Barahona Viteri',
    role: 'Compradores en Puyo / Lote Urbano',
    rating: 5,
    tag: 'Acompañamiento Notarial'
  },
  {
    quote: 'Invierto frecuentemente en terrenos y propiedades en la Amazonía. La honestidad del Cbr. Daniel Astudillo y su conocimiento notarial hacen que cada compra sea una inversión segura.',
    author: 'Ing. Rodrigo Santillán',
    role: 'Inversionista Inmobiliario en Pastaza',
    rating: 5,
    tag: 'Inversión Patrimonial'
  }
];

export const LEGAL_TESTIMONIALS = [
  {
    quote: 'Compramos nuestra casa con crédito hipotecario del BIESS. En Inmo Astudillo subsanaron una inconsistencia de linderos en el catastro en tiempo récord. Firmamos sin ninguna traba notarial.',
    author: 'Fam. Morales Espinosa',
    role: 'Compraventa Casa en Urbanización',
    rating: 5,
    tag: 'Crédito BIESS'
  },
  {
    quote: 'Como vendedor, me preocupaba el desembolso y el cálculo de la plusvalía. El equipo legal coordinó todo con la notaría y el pago se recibió inmediatamente al momento de la firma. Gran profesionalismo.',
    author: 'Ing. Eduardo Cevallos',
    role: 'Venta de Departamento PH',
    rating: 5,
    tag: 'Liquidación Plusvalía'
  },
  {
    quote: 'Teníamos una propiedad heredada entre cuatro hermanos. Gestionaron la posesión efectiva y la venta simultánea a los compradores de forma impecable y transparente para todos.',
    author: 'Dra. Lucía Andrade',
    role: 'Herencia & Venta Inmobiliaria',
    rating: 5,
    tag: 'Posesión Efectiva'
  }
];

export const FAQS = [
  {
    q: '¿Cuánto tiempo demora un trámite de compraventa completo?',
    a: 'En compraventas de contado con títulos saneados, el proceso desde la promesa de compraventa hasta la firma de la escritura suele tomar entre 8 y 15 días laborables. En operaciones con financiamiento bancario o BIESS, el tiempo estimado oscila entre 35 y 60 días, sujeto a los avalúos y comités de crédito de la institución.'
  },
  {
    q: '¿Quién asume el pago de las alcabalas y la plusvalía?',
    a: 'Por disposición del Código Orgánico de Organización Territorial (COOTAD) en Ecuador, el impuesto de alcabalas y los derechos de inscripción registral corresponden al Comprador. Por su parte, el impuesto a la utilidad o plusvalía municipal es de cargo exclusivo del Vendedor, salvo acuerdo contractual expreso en la promesa de compraventa.'
  },
  {
    q: '¿Puedo vender una propiedad si aún tiene una hipoteca vigente?',
    a: 'Sí, es una operación habitual y 100% segura mediante una cláusula de cancelación simultánea de hipoteca o subrogación de deuda. En Inmo Astudillo coordinamos con la entidad acreedora la liquidación del saldo adeudado para que la cancelación y la nueva escritura se firmen en el mismo acto notarial.'
  },
  {
    q: '¿Por qué es indispensable firmar una promesa de compraventa con arras?',
    a: 'La promesa de compraventa notariada otorga plena seguridad jurídica a ambas partes: fija el precio inalterable, establece plazos taxativos para la entrega de documentos y previene el desistimiento arbitrario mediante la cláusula penal de arras (art. 1744 del Código Civil).'
  }
];
