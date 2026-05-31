import copy, { type FAQItem, type ServiceId } from '@data/copy';

export type { FAQItem };

export const FAQ_UNIVERSAL: FAQItem[] = copy.faq.universal;

export const FAQ_BY_SERVICE: Record<ServiceId, FAQItem[]> = copy.faq.byService;

export function getFAQs(serviceId: ServiceId): FAQItem[] {
  return [...FAQ_UNIVERSAL, ...FAQ_BY_SERVICE[serviceId]];
}
