"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { ExtensionStatus } from "@/modules/agreements/types";
import { formatMoney } from "@/modules/payments/services/payment-service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ExtensionScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const activeProfile = useAppStore((s) => s.activeProfile);
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const agreement = useAppStore((s) => s.agreements.find((a) => a.taskId === taskId));
  const propose = useAppStore((s) => s.proposeExtension);
  const respond = useAppStore((s) => s.respondExtension);
  const secure = useAppStore((s) => s.secureExtensionPayment);
  const [minutes, setMinutes] = useState(60);
  const [scope, setScope] = useState("");
  const [amount, setAmount] = useState(30);
  if (!task || !agreement) return <main className="ml-page"><h1 className="text-xl font-black">No hay acuerdo para esta tarea</h1></main>;
  return <main className="ml-page"><div className="ml-kicker">Trabajo adicional</div><h1 className="mt-1 text-2xl font-black">Ampliaciones del acuerdo</h1><p className="mt-2 text-sm leading-6 text-muted">El monto original de {formatMoney(agreement.originalTerms.basePrice)} no se modifica ni se reduce. Cada extra se registra y asegura por separado antes de ejecutarse.</p>
    {activeProfile === "requester" ? <Card className="mt-5"><h2 className="font-black">Proponer una ampliación</h2><div className="mt-4 grid gap-4"><div><label className="ml-label">Duración adicional</label><select className="ml-input" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}><option value={30}>30 minutos</option><option value={60}>1 hora</option><option value={90}>1.5 horas</option><option value={120}>2 horas</option></select></div><div><label className="ml-label">Nuevo alcance</label><textarea className="ml-input min-h-24 resize-none" placeholder="Describe exactamente qué trabajo adicional necesitas." value={scope} onChange={(e) => setScope(e.target.value)} /></div><div><label className="ml-label">Monto adicional (S/)</label><input className="ml-input" type="number" min="1" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div><Button full disabled={!scope.trim() || amount <= 0} onClick={() => { propose(task.id, minutes, scope, amount); setScope(""); }}>Enviar propuesta al ejecutor</Button></div></Card> : null}
    <div className="mt-5 grid gap-3"><h2 className="ml-section-title">Historial de ampliaciones</h2>{agreement.extensions.length === 0 ? <div className="rounded-2xl bg-white p-4 text-sm text-muted">Todavía no se registraron ampliaciones.</div> : agreement.extensions.map((ext) => <Card key={ext.id}><div className="flex flex-col items-start gap-3 min-[380px]:flex-row min-[380px]:justify-between"><div><div className="font-black">+ {ext.additionalDurationMinutes} min · {formatMoney(ext.additionalAmount)}</div><p className="mt-2 text-sm leading-6 text-[#475467]">{ext.additionalScope}</p></div><Badge tone={ext.status === ExtensionStatus.Secured ? "success" : ext.status === ExtensionStatus.Rejected ? "danger" : "warning"}>{ext.status}</Badge></div>
      {activeProfile === "executor" && ext.status === ExtensionStatus.Proposed ? <div className="mt-4 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2"><Button variant="secondary" onClick={() => respond(task.id, ext.id, false)}>Rechazar</Button><Button onClick={() => respond(task.id, ext.id, true)}>Aceptar</Button></div> : null}
      {activeProfile === "requester" && ext.status === ExtensionStatus.PaymentPending ? <div className="mt-4"><Button full onClick={() => secure(task.id, ext.id)}>Asegurar pago adicional (simulado)</Button></div> : null}
      {ext.status === ExtensionStatus.Secured ? <p className="mt-3 text-xs font-bold text-success">✓ Pago adicional asegurado. El nuevo alcance ya forma parte del acuerdo.</p> : null}
    </Card>)}</div>
  </main>;
}
