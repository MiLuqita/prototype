import type { EntityId, ISODateString } from "@/shared/types/common";

export interface AgreementTerms {
  title: string;
  description: string;
  categoryId: EntityId;
  scheduledStartAt: ISODateString;
  estimatedDurationMinutes: number;
  basePrice: number;
  district: string;
  conditions: string[];
}

export interface AgreementAcceptance {
  requesterAccepted: boolean;
  executorAccepted: boolean;
  requesterAcceptedAt?: ISODateString;
  executorAcceptedAt?: ISODateString;
}

export enum ExtensionStatus {
  Proposed = "Propuesta",
  Accepted = "Aceptada",
  Rejected = "Rechazada",
  PaymentPending = "Pago pendiente",
  Secured = "Pago asegurado",
}

export interface AgreementExtension {
  id: EntityId;
  additionalDurationMinutes: number;
  additionalScope: string;
  additionalAmount: number;
  status: ExtensionStatus;
  proposedAt: ISODateString;
  resolvedAt?: ISODateString;
  paymentId?: EntityId;
}

export interface Agreement {
  id: EntityId;
  taskId: EntityId;
  requesterId: EntityId;
  executorId: EntityId;
  originalTerms: AgreementTerms;
  acceptance: AgreementAcceptance;
  extensions: AgreementExtension[];
  createdAt: ISODateString;
}

export type DisputeReason = "no_show" | "incomplete_work" | "different_work" | "safety_issue" | "other";

export interface Dispute {
  id: EntityId;
  taskId: EntityId;
  reportedByUserId: EntityId;
  reason: DisputeReason;
  description?: string;
  createdAt: ISODateString;
}
