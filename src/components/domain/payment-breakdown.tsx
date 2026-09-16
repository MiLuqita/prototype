import { calculatePaymentBreakdown, formatMoney } from "@/modules/payments/services/payment-service";

export function PaymentBreakdown({ amount, perspective }: { amount: number; perspective: "requester" | "executor" }) {
  const b = calculatePaymentBreakdown(amount);
  return (
    <div className="rounded-2xl bg-[#f8f9fb] p-4 text-sm">
      <div className="flex justify-between"><span>Precio del trabajo</span><strong>{formatMoney(b.taskAmount)}</strong></div>
      <div className="mt-2 flex justify-between text-muted"><span>Comisión Mi Luquita (3.5%)</span><span>{perspective === "requester" ? "+" : "−"}{formatMoney(perspective === "requester" ? b.requesterFee : b.executorFee)}</span></div>
      <div className="my-3 h-px bg-[#e1e5ea]" />
      <div className="flex justify-between text-base font-black"><span>{perspective === "requester" ? "Total a asegurar" : "Recibes"}</span><span>{formatMoney(perspective === "requester" ? b.requesterTotal : b.executorReceives)}</span></div>
    </div>
  );
}
