import { Property } from '../types';

export const PROPERTIES_DATA: Property[] = [
  {
    id: 1,
    title: 'Ático Dúplex de Vanguardia con Terraza Panorámica',
    category: 'residential',
    price: 680000,
    priceFormatted: '$680,000 USD',
    priceLabel: 'Precio de Inversión',
    location: 'Chamberí, Calle de Zurbano 45',
    locationZone: 'Chamberí',
    address: 'Calle de Zurbano 45, Chamberí',
    shortDescription: 'Extraordinario ático de dos plantas con acabados en maderas nobles, cocina italiana integrada y vistas despejadas a la ciudad. Listo para escrituración inmediata.',
    description: 'Exclusivo ático dúplex situado en una de las vías más distinguidas de Chamberí. Distribución impecable en dos alturas conectadas por una escalera escultórica de acero y roble. Incluye terraza privada de 45 m² con orientación sur, domótica integral, climatización por aerotermia, bodega privada y dos plazas de garaje de acceso directo.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC16BTa8UPzzmcW70xItexI23vcbnJ1XHFgMAxPwzjwiaLdUJonEgtVGcb9GqpZC_kjmwNUF2Lx0u70AF-30u-v5VW05pKjMG1lagY8qBP3EW7ufFw8CzBNUOmDKaKIpwWD-bmpZNKjfZtBPpGuh_0Qy6oFfmAsrc3sDs5nqDCgDTCaZ3ETRfFUi8dowLOPMlxwXkciid5nWSM3CtN4HXwlYzbUPv9HiP6-r5qiC77buX23k0VBiOaIHQ',
    fallbackGradient: 'from-emerald-950 via-slate-900 to-emerald-900',
    photoCount: 18,
    badges: ['En Venta', 'Exclusivo'],
    specs: {
      surface: '210 m²',
      rooms: '3 Hab.',
      bathrooms: '3.5 Baños',
      parking: '2 Coch.'
    },
    highlights: [
      'Terraza privada panorámica de 45 m²',
      'Cocina italiana de diseñador con encimeras de cuarzo',
      'Certificación energética A+ con aerotermia',
      'Titulación saneada y libre de hipotecas'
    ],
    legalCertified: true,
    featured: true
  },
  {
    id: 2,
    title: 'Terreno Residencial / Lote Urbanizado de Alta Plusvalía',
    category: 'land',
    price: 185000,
    priceFormatted: '$185,000 USD',
    priceLabel: 'Oportunidad de Inversión',
    location: 'Sector Residencial Privado, Valle Verde',
    locationZone: 'Valle Verde',
    address: 'Urbanización Privada Valle Verde, Manzana C - Lote 14',
    shortDescription: 'Lote 100% plano listo para construir residencia personalizada dentro de urbanización con garita de seguridad, cableado subterráneo y áreas recreativas.',
    description: 'Lote residencial regular con topografía totalmente plana, situado en el corazón del exclusivo desarrollo Valle Verde. Cuenta con acometida subterránea de agua potable, electricidad trifásica, fibra óptica soterrada y alcantarillado con planta de tratamiento. Zona de alta proyección y seguridad privada 24/7 con control biométrico. Títulos de propiedad inscritos y listos para transferencia inmediata.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvtA4ieWVCzE-Qi-fKEdUhFnMPl1u5r5op31xocNzHTlECDgqGxK3w-pEe80XWX1xG-d_JrKIAmJ52zmSfVBlWo4QwB5Xgi5EMtOt-1pRqaayq1ZEvuaXvg9_7dXYkEhvdghLDnmhpKZbDl98zCplh7q6JBK77nlfOJDC1UYGLZ5lMcAw1nOA5hYxPqOjRxiDdPVhQcL8SRVCzVWQjkw2jHPzHWwOVzx5esWMNj_ia9iAuv6Pr1R4GQ',
    fallbackGradient: 'from-green-950 via-emerald-900 to-stone-900',
    photoCount: 12,
    badges: ['Terreno / Lote', 'Alta Plusvalía'],
    specs: {
      surface: '850 m²',
      landUse: 'Resid. R2',
      services: '100%',
      topography: 'Plano'
    },
    highlights: [
      'Topografía 100% plana sin necesidad de movimiento de tierras',
      'Urbanización cerrada con seguridad 24/7 y cámaras perimetrales',
      'Servicios básicos subterráneos completos (agua, luz, fibra óptica)',
      'Permiso de construcción aprobado para residencia unifamiliar'
    ],
    legalCertified: true,
    featured: true
  },
  {
    id: 3,
    title: 'Villa Minimalista con Piscina y Jardín Privado',
    category: 'residential',
    price: 940000,
    priceFormatted: '$940,000 USD',
    priceLabel: 'Propiedad Premium',
    location: 'La Moraleja, Paseo del Conde',
    locationZone: 'La Moraleja',
    address: 'Paseo del Conde 12, La Moraleja',
    shortDescription: 'Residencia de autor concebida con eficiencia energética integral, domótica de última generación, jardín perimetral privado y piscina climatizada sinfín.',
    description: 'Obra maestra de la arquitectura contemporánea que fusiona el diseño cúbico con la naturaleza circundante. Gran salón con techos de 3.4 metros de altura y ventanales correderos que desaparecen en los muros. Suite principal en planta baja con vestidor iluminado y sala de baño con hidromasaje. Piscina desbordante con depuración salina, zona chill-out con pérgola bioclimática y garaje cerrado para 3 vehículos.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvE7pu9VHL3E_e-t5sK6mRfswtagvhK0D9hL7jAgP7db_WxlUDEh9SdZOt-jDL7r418maE7IC23XKg25Gic-GOvHpIzHfVbt4YMllD_y1qZegbU6xbpyluPW87K1Wp_5csbrkOGndqCUpfgOxuOyS72meDl2GNwqnb1gTScDYFjLUH7ij7NeJ8zviuosPVAWKBPfVER6hYA793k8panf52kXyTjRgwHYHWxURMHG4R2Z84iopPO1EIjg',
    fallbackGradient: 'from-emerald-950 via-teal-950 to-neutral-900',
    photoCount: 24,
    badges: ['En Venta', 'Villa'],
    specs: {
      surface: '420 m²',
      rooms: '5 Hab.',
      bathrooms: '5 Baños',
      parking: '3 Coch.'
    },
    highlights: [
      'Piscina infinita con sistema de climatización y cloración salina',
      'Sistema domótico Lutron & KNX para iluminación y climatización',
      'Jardín paisajístico con olivos centenarios y riego automatizado',
      'Carpintería de aluminio Schüco con aislamiento acústico supremo'
    ],
    legalCertified: true,
    featured: true
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
    quote: 'Vendieron mi departamento en Salamanca en solo 3 semanas y al precio que habíamos acordado en la tasación. La gestión documental fue impecable.',
    author: 'Carlos Gómez del Prado',
    role: 'Vendedor en Madrid / Residencial',
    rating: 5,
    tag: 'Venta Rápida'
  },
  {
    quote: 'Como compradores primerizos estábamos desorientados con la hipoteca y el papeleo. El equipo de Astudillo nos acompañó paso a paso con una calidez inmensa.',
    author: 'Laura Méndez & Javier',
    role: 'Compradores en Retiro / Primera Vivienda',
    rating: 5,
    tag: 'Acompañamiento Notarial'
  },
  {
    quote: 'Invierto recurrentemente en activos residenciales. Su capacidad para detectar propiedades con potencial y el análisis de rentabilidad no tienen comparación.',
    author: 'Rodrigo A. Santillán',
    role: 'Inversor Inmobiliario',
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
