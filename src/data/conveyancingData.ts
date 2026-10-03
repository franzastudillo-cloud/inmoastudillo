export interface ConveyancingStep {
  step: string;
  icon: string;
  title: string;
  description: string;
  time: string;
}

export interface LegalService {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export const CONVEYANCING_STEPS: ConveyancingStep[] = [
  {
    step: 'Paso 01',
    icon: 'verified_user',
    title: 'Estudio de Títulos y Certificado de Gravámenes',
    description: 'Verificación minuciosa en el Registro de la Propiedad de Pastaza para garantizar que el inmueble no tenga hipotecas, embargos o prohibiciones de enajenar.',
    time: '2 - 3 Días Laborables'
  },
  {
    step: 'Paso 02',
    icon: 'history_edu',
    title: 'Promesa de Compraventa Notariada',
    description: 'Redacción y firma de la promesa formal con cláusulas de arras, plazos estrictos y condiciones de pago seguras ante Notaría.',
    time: '1 - 2 Días Laborables'
  },
  {
    step: 'Paso 03',
    icon: 'receipt_long',
    title: 'Liquidación de Impuestos Municipales y Provinciales',
    description: 'Pago de alcabalas, plusvalía (impuesto sobre utilidades), consejo provincial y tasas administrativas en el GAD Municipal de Pastaza.',
    time: '3 - 5 Días Laborables'
  },
  {
    step: 'Paso 04',
    icon: 'edit_document',
    title: 'Minuta y Firma de Escritura Pública Definitiva',
    description: 'Comparecencia de comprador y vendedor ante el Notario Público para la firma del instrumento público de transferencia de dominio.',
    time: '1 Día Hábil'
  },
  {
    step: 'Paso 05',
    icon: 'task_alt',
    title: 'Inscripción en el Registro de la Propiedad y Catastro',
    description: 'Inscripción definitiva del título registral y actualización catastral en el Municipio de Pastaza para la entrega final de escrituras.',
    time: '5 - 8 Días Laborables'
  }
];

export const LEGAL_SERVICES: LegalService[] = [
  {
    id: 'titulos',
    icon: 'gavel',
    title: 'Estudio de Títulos y Saneamiento Legal',
    description: 'Auditoría jurídica completa de los antecedentes de dominio para evitar nulidades o reclamos de terceros.',
    tags: ['Revisión 15 años de antecedentes', 'Verificación de linderos', 'Libre de litigios']
  },
  {
    id: 'promesas',
    icon: 'draw',
    title: 'Contratos de Promesa de Compraventa',
    description: 'Blindaje con cláusulas penales e indemnizatorias en caso de incumplimiento de cualquiera de las partes.',
    tags: ['Notarización inmediata', 'Reserva de fondos en custodia', 'Plazos claros']
  },
  {
    id: 'hipotecas',
    icon: 'account_balance',
    title: 'Gestión de Créditos BIESS y Banca Privada',
    description: 'Acompañamiento técnico para la aprobación y desembolso de préstamos hipotecarios en Pastaza.',
    tags: ['Minutas modelo BIESS', 'Carpetas completas', 'Seguimiento con peritos']
  },
  {
    id: 'particiones',
    icon: 'pie_chart',
    title: 'Posesiones Efectivas y Partición Hereditaria',
    description: 'Trámite notarial y municipal para declarar herederos y adjudicar bienes sin conflictos.',
    tags: ['Partición extrajudicial', 'Inscripción en Registro', 'Liquidación de sociedad conyugal']
  },
  {
    id: 'fraccionamiento',
    icon: 'domain_add',
    title: 'Subdivisiones, Fraccionamientos y Planimetrías',
    description: 'Elaboración de planos geo-referenciados y aprobación de planos ante el Departamento de Planificación Municipal.',
    tags: ['Líneas de fábrica', 'Planimetrías UTM WGS-84', 'Permisos de parcelación']
  },
  {
    id: 'cancelaciones',
    icon: 'lock_open',
    title: 'Levantamiento de Hipotecas y Prohibiciones',
    description: 'Cancelación notarial y registral de gravámenes una vez saldada la obligación financiera.',
    tags: ['Oficio de cancelación', 'Marginación en escritura matriz', 'Certificado limpio']
  }
];

export const FAQS: FaqItem[] = [
  {
    q: '¿Quién paga los gastos de escrituración en Ecuador?',
    a: 'Por costumbre comercial y legal en Ecuador: el vendedor asume el impuesto de plusvalía (utilidad) si existiere, y el comprador asume las alcabalas, la tasa del Consejo Provincial, los honorarios notariales y los derechos de inscripción en el Registro de la Propiedad.'
  },
  {
    q: '¿Cuánto tiempo tarda en promedio todo el proceso de escrituración?',
    a: 'Para una compraventa al contado el proceso toma entre 10 y 15 días laborables. En el caso de créditos hipotecarios (BIESS o banca privada) suele tomar entre 30 y 45 días debido al avalúo pericial y control de legalidad bancaria.'
  },
  {
    q: '¿Qué documentos necesita el vendedor para iniciar la venta?',
    a: 'Escritura pública anterior con razón de inscripción, Certificado de Gravámenes actualizado (menos de 30 días de emisión), Carta de pago de impuesto predial del año en curso, y cédulas y certificados de votación vigentes de los cónyuges.'
  },
  {
    q: '¿Por qué es indispensable un Certificado de Gravámenes vigente?',
    a: 'Porque es el único documento oficial emitido por el Registrador de la Propiedad que acredita que el vendedor es el único dueño legítimo y que el bien no tiene embargos, hipotecas ocultas ni prohibiciones judiciales.'
  }
];
