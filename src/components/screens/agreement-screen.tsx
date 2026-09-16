"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { PaymentBreakdown } from "@/components/domain/payment-breakdown";
import { formatPeruDateTime } from "@/shared/utils/date";

export function AgreementScreen({ perspective }: { perspective: "requester" | "executor" }) {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const agreement = useAppStore((s) => s.agreements.find((a) => a.taskId === taskId));
  const users = useAppStore((s) => s.users);
  const accept = useAppStore((s) => s.acceptAgreementAsExecutor);
  if (!task || !agreement) return <main className="ml-page"><h1 className="text-xl font-black">Acuerdo no disponible</h1></main>;
  const requester = users.find((u) => u.id === agreement.requesterId);
  const executor = users.find((u) => u.id === agreement.executorId);
  return <main className="ml-page"><div className="ml-kicker">Acuerdo de tarea</div><h1 className="mt-1 text-2xl font-black">{agreement.originalTerms.title}</h1><p className="mt-2 text-sm leading-6 text-muted">Este resumen fija el alcance original. Las ampliaciones posteriores se agregarán como extensiones y nunca reducirán el importe original.</p>
    <Card className="mt-5"><h2 className="font-black">Partes</h2><div className="mt-3 grid gap-3">{requester ? <div className="flex items-center gap-3"><Avatar name={`${requester.firstName} ${requester.lastName}`} /><div><div className="text-xs font-bold text-muted">Solicitante</div><div className="font-black">{requester.firstName} {requester.lastName}</div><Rating average={requester.requesterProfile.reputation.average} count={requester.requesterProfile.reputation.count} compact /></div></div> : null}{executor ? <div className="flex items-center gap-3"><Avatar name={`${executor.firstName} ${executor.lastName}`} /><div><div className="text-xs font-bold text-muted">Ejecutor</div><div className="font-black">{executor.firstName} {executor.lastName}</div><Rating average={executor.executorProfile.reputation.average} count={executor.executorProfile.reputation.count} compact /></div></div> : null}</div></Card>
    <Card className="mt-4"><h2 className="font-black">Alcance acordado</h2><p className="mt-2 text-sm leading-6 text-[#475467]">{agreement.originalTerms.description}</p><dl className="mt-4 grid gap-2 text-sm"><div className="flex justify-between"><dt className="text-muted">Inicio</dt><dd className="font-bold">{formatPeruDateTime(agreement.originalTerms.scheduledStartAt)}</dd></div><div className="flex justify-between"><dt className="text-muted">Duración</dt><dd className="font-bold">{agreement.originalTerms.estimatedDurationMinutes / 60} h aprox.</dd></div><div className="flex justify-between"><dt className="text-muted">Zona</dt><dd className="font-bold">{agreement.originalTerms.district}</dd></div></dl><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#475467]">{agreement.originalTerms.conditions.map((c) => <li key={c}>{c}</li>)}</ul></Card>
    <Card className="mt-4"><h2 className="font-black">Dinero</h2><div className="mt-3"><PaymentBreakdown amount={agreement.originalTerms.basePrice} perspective={perspective} /></div></Card>
    <Card className="mt-4"><h2 className="font-black">Aceptación</h2><div className="mt-3 grid gap-2 text-sm"><div className="flex justify-between"><span>Solicitante</span><strong className={agreement.acceptance.requesterAccepted ? "text-success" : "text-muted"}>{agreement.acceptance.requesterAccepted ? "Aceptado" : "Pendiente"}</strong></div><div className="flex justify-between"><span>Ejecutor</span><strong className={agreement.acceptance.executorAccepted ? "text-success" : "text-muted"}>{agreement.acceptance.executorAccepted ? "Aceptado" : "Pendiente"}</strong></div></div></Card>
    <div className="mt-5">{perspective === "executor" && !agreement.acceptance.executorAccepted ? <Button full onClick={() => accept(agreement.id)}>Aceptar acuerdo</Button> : perspective === "requester" ? <Button full onClick={() => router.push(`/solicitante/tareas/${task.id}/pago`)}>Continuar al pago simulado</Button> : <Button full variant="secondary" onClick={() => router.push(`/ejecutor/tareas/${task.id}`)}>Volver a la tarea</Button>}</div>
  </main>;
}
