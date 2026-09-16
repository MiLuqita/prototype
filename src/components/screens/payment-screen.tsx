"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { PaymentStatus, type MockPaymentMethod } from "@/modules/payments/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentBreakdown } from "@/components/domain/payment-breakdown";

export function PaymentScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const payment = useAppStore((s) => s.payments.find((p) => p.taskId === taskId && p.type === "initial"));
  const nextFail = useAppStore((s) => s.nextPaymentShouldFail);
  const securePayment = useAppStore((s) => s.securePayment);
  const [method, setMethod] = useState<MockPaymentMethod>("visa");
  if (!task || !payment) return <main className="ml-page"><h1 className="text-xl font-black">Pago no disponible</h1></main>;
  const processing = payment.status === PaymentStatus.Processing;
  const secured = [PaymentStatus.Secured, PaymentStatus.Captured].includes(payment.status);
  const rejected = payment.status === PaymentStatus.Rejected;
  return <main className="ml-page"><div className="ml-kicker">Pago simulado</div><h1 className="mt-1 text-2xl font-black">Asegura el pago antes de empezar</h1><p className="mt-2 text-sm leading-6 text-muted">En producción este paso se conectará al proveedor de pagos. Aquí solo simulamos los estados; no se procesa dinero real.</p>
    <Card className="mt-5"><h2 className="font-black">Resumen</h2><div className="mt-3"><PaymentBreakdown amount={task.price} perspective="requester" /></div></Card>
    <Card className="mt-4"><h2 className="font-black">Método</h2><div className="mt-3 grid grid-cols-2 gap-2">{(["visa","mastercard","yape","plin"] as MockPaymentMethod[]).map((m) => <button key={m} disabled={processing || secured} onClick={() => setMethod(m)} className={`rounded-control border px-3 py-3 text-sm font-black uppercase ${method === m ? "border-brand-500 bg-brand-50 text-brand-700" : "border-[#d9dde6]"}`}>{m}</button>)}</div></Card>
    {nextFail && !secured ? <div className="mt-4 rounded-2xl border border-[#ffd5cf] bg-[#fff1f0] p-4 text-sm font-bold text-danger">🧪 Demo: el siguiente intento está configurado para ser rechazado.</div> : null}
    {processing ? <div className="mt-4 rounded-2xl bg-[#fff5df] p-4 text-sm font-bold text-warning">Procesando pago simulado…</div> : null}
    {rejected ? <div className="mt-4 rounded-2xl border border-[#ffd5cf] bg-[#fff1f0] p-4"><div className="font-black text-danger">Pago rechazado</div><p className="mt-1 text-sm text-[#475467]">Prueba nuevamente con otro método. La tarea sigue sin confirmar y el chat/dirección continúan bloqueados.</p></div> : null}
    {secured ? <div className="mt-4 rounded-2xl border border-[#caead6] bg-[#eaf7ef] p-4"><div className="font-black text-success">✓ Pago asegurado</div><p className="mt-1 text-sm text-[#475467]">La tarea quedó confirmada. El ejecutor ya puede acceder al chat y a la dirección exacta.</p></div> : null}
    <div className="mt-5">{secured ? <Button full onClick={() => router.push(`/solicitante/tareas/${task.id}`)}>Volver a la tarea</Button> : <Button full disabled={processing} onClick={() => securePayment(task.id, method)}>{rejected ? "Reintentar pago" : "Asegurar pago"}</Button>}</div>
  </main>;
}
