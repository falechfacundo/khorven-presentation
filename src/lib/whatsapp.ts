import { esProspectoGenerico, type Prospecto } from '@data/prospectos';

/** Cómo nombra el cliente a su negocio en el mensaje (en la propuesta genérica, "mi negocio"). */
export function nombreEnMensaje(prospecto: Prospecto): string {
  return esProspectoGenerico(prospecto) ? 'mi negocio' : prospecto.nombreNegocio;
}

/** Solo los dígitos del número (sin +, espacios ni guiones), tomado del link de wa.me del prospecto. */
export function getWhatsappNumber(prospecto: Prospecto): string {
  return new URL(prospecto.whatsappLink).pathname.replace(/[^0-9]/g, '');
}

/** Link de WhatsApp al número del prospecto con un mensaje prellenado. */
export function getWhatsappUrl(prospecto: Prospecto, mensaje: string): string {
  return `https://wa.me/${getWhatsappNumber(prospecto)}?text=${encodeURIComponent(mensaje)}`;
}

/** Link de WhatsApp con el mensaje prellenado para el CTA principal. */
export function getWhatsappCtaUrl(prospecto: Prospecto): string {
  const mensajePrellenado = `Hola Ezequiel, vi la propuesta para ${nombreEnMensaje(prospecto)}. Me interesa ver cómo funcionaría el Paquete Sistema para automatizar nuestras consultas.`;
  return getWhatsappUrl(prospecto, mensajePrellenado);
}
