import { PaymentStatus, PaymentType, type Payment, PLATFORM_FEE_RATE } from "@/modules/payments/types";

const breakdown = (amount: number) => {
  const fee = Math.round(amount * PLATFORM_FEE_RATE * 100) / 100;
  return { taskAmount: amount, requesterFee: fee, requesterTotal: amount + fee, executorFee: fee, executorReceives: amount - fee };
};

export const mockPayments: Payment[] = [
  { id: "p-exec-selected", taskId: "t-exec-selected", agreementId: "a-exec-selected", type: PaymentType.Initial, amount: 55, breakdown: breakdown(55), status: PaymentStatus.AwaitingMethod, createdAt: "2026-09-09T12:00:00-05:00" },
  { id: "p-exec-active", taskId: "t-exec-active", agreementId: "a-exec-active", type: PaymentType.Initial, amount: 90, breakdown: breakdown(90), method: "yape", status: PaymentStatus.Secured, createdAt: "2026-09-08T13:10:00-05:00", securedAt: "2026-09-08T13:11:00-05:00" },
  { id: "p-exec-extension", taskId: "t-exec-active", agreementId: "a-exec-active", extensionId: "ex-exec-secured", type: PaymentType.Extension, amount: 15, breakdown: breakdown(15), method: "visa", status: PaymentStatus.Secured, createdAt: "2026-09-09T19:50:00-05:00", securedAt: "2026-09-09T19:50:00-05:00" },
  { id: "p-exec-done", taskId: "t-exec-done", agreementId: "a-exec-done", type: PaymentType.Initial, amount: 38, breakdown: breakdown(38), method: "plin", status: PaymentStatus.Captured, createdAt: "2026-09-07T13:10:00-05:00", securedAt: "2026-09-07T13:11:00-05:00", capturedAt: "2026-09-08T17:10:00-05:00" },
  { id: "p-exec-upcoming", taskId: "t-exec-upcoming", agreementId: "a-exec-upcoming", type: PaymentType.Initial, amount: 75, breakdown: breakdown(75), method: "visa", status: PaymentStatus.Secured, createdAt: "2026-09-08T16:30:00-05:00", securedAt: "2026-09-08T16:31:00-05:00" },
  { id: "p-demo-pay", taskId: "t-demo-pay", agreementId: "a-demo-pay", type: PaymentType.Initial, amount: 100, breakdown: breakdown(100), status: PaymentStatus.AwaitingMethod, createdAt: "2026-09-09T09:10:00-05:00" },
  { id: "p-demo-upcoming", taskId: "t-demo-upcoming", agreementId: "a-demo-upcoming", type: PaymentType.Initial, amount: 40, breakdown: breakdown(40), method: "yape", status: PaymentStatus.Secured, createdAt: "2026-09-08T18:10:00-05:00", securedAt: "2026-09-08T18:11:00-05:00" },
  { id: "p-demo-active", taskId: "t-demo-active", agreementId: "a-demo-active", type: PaymentType.Initial, amount: 120, breakdown: breakdown(120), method: "visa", status: PaymentStatus.Secured, createdAt: "2026-09-08T17:10:00-05:00", securedAt: "2026-09-08T17:11:00-05:00" },
  { id: "p-demo-finish", taskId: "t-demo-finish", agreementId: "a-demo-finish", type: PaymentType.Initial, amount: 85, breakdown: breakdown(85), method: "plin", status: PaymentStatus.Secured, createdAt: "2026-09-08T11:10:00-05:00", securedAt: "2026-09-08T11:11:00-05:00" },
  { id: "p-demo-done", taskId: "t-demo-done", agreementId: "a-demo-done", type: PaymentType.Initial, amount: 45, breakdown: breakdown(45), method: "mastercard", status: PaymentStatus.Captured, createdAt: "2026-09-07T17:10:00-05:00", securedAt: "2026-09-07T17:11:00-05:00", capturedAt: "2026-09-08T12:30:00-05:00" },
  { id: "p-demo-dispute", taskId: "t-demo-dispute", agreementId: "a-demo-dispute", type: PaymentType.Initial, amount: 90, breakdown: breakdown(90), method: "visa", status: PaymentStatus.Secured, createdAt: "2026-09-06T14:10:00-05:00", securedAt: "2026-09-06T14:11:00-05:00" },
];
