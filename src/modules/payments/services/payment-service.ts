import { PLATFORM_FEE_RATE, type PaymentBreakdown } from "@/modules/payments/types";

const money = (value: number) => Math.round(value * 100) / 100;

export function calculatePaymentBreakdown(amount: number): PaymentBreakdown {
  const fee = money(amount * PLATFORM_FEE_RATE);
  return {
    taskAmount: money(amount),
    requesterFee: fee,
    requesterTotal: money(amount + fee),
    executorFee: fee,
    executorReceives: money(amount - fee),
  };
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 2 }).format(amount);
}
