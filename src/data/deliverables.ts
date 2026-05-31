import copy, { type Deliverable, type ServiceId } from '@data/copy';

export type { Deliverable };

export const DELIVERABLES: Record<ServiceId, Deliverable[]> = copy.deliverables.byService;
