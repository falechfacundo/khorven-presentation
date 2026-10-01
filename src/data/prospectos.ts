export interface Prospecto {
  id: string;
  nombreNegocio: string;
  dolorPrincipal: string;
  /** Código HEX, ej: "#C8102E" */
  colorTema: string;
  /** Ruta relativa a /public, ej: "/prospectos/la-cabrera.svg" */
  logoUrl: string;
  /** URL completa de wa.me */
  whatsappLink: string;
}

const PROSPECTOS: readonly Prospecto[] = [
  {
    id: '001',
    nombreNegocio: 'La Cabrera Palermo',
    dolorPrincipal:
      'El 40% de las reservas se pierden por demora en la respuesta por Instagram y WhatsApp.',
    colorTema: '#C8102E',
    logoUrl: '/prospectos/la-cabrera.svg',
    whatsappLink:
      'https://wa.me/5491100000000?text=Hola%20Facundo%2C%20vi%20la%20propuesta%20para%20La%20Cabrera%20Palermo',
  },
  {
    id: '002',
    nombreNegocio: 'Clínica Dental Belgrano',
    dolorPrincipal:
      '6 de cada 10 consultas por turnos llegan fuera de horario y nadie las responde hasta el día siguiente.',
    colorTema: '#0EA5E9',
    logoUrl: '/prospectos/clinica-dental-belgrano.svg',
    whatsappLink:
      'https://wa.me/5491100000000?text=Hola%20Facundo%2C%20vi%20la%20propuesta%20para%20Cl%C3%ADnica%20Dental%20Belgrano',
  },
];

/*
 * Capa de acceso a datos. Los componentes UI solo dependen de estas funciones,
 * así que migrar a Cloudflare D1 implica cambiar únicamente su implementación
 * (ej: `env.DB.prepare('SELECT * FROM prospectos WHERE id = ?').bind(id).first<Prospecto>()`).
 */
export async function getProspectoById(id: string): Promise<Prospecto | null> {
  return PROSPECTOS.find((p) => p.id === id) ?? null;
}

export async function getAllProspectoIds(): Promise<string[]> {
  return PROSPECTOS.map((p) => p.id);
}
