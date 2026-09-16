import type { EntityId, ISODateString } from "@/shared/types/common";

export const PLATFORM_FEE_RATE = 0.035;

export enum PaymentType {
  Initial = "initial",
  Extension = "extension",
}

export enum PaymentStatus {
  AwaitingMethod = "Seleccionar método",
  Processing = "Procesando",
  Secured = "Pago asegurado",
  Rejected = "Pago rechazado",
  Captured = "Pago capturado",
}

export type MockPaymentMethod = "visa" | "mastercard" | "yape" | "plin";

export interface PaymentBreakdown {
  taskAmount: number;
  requesterFee: number;
  requesterTotal: number;
  executorFee: number;
  executorReceives: number;
}

export interface Payment {
  id: EntityId;
  taskId: EntityId;
  agreementId: EntityId;
  extensionId?: EntityId;
  type: PaymentType;
  amount: number;
  breakdown: PaymentBreakdown;
  method?: MockPaymentMethod;
  status: PaymentStatus;
  createdAt: ISODateString;
  securedAt?: ISODateString;
  capturedAt?: ISODateString;
  rejectedAt?: ISODateString;
}
