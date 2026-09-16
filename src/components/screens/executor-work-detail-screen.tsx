"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { canAccessChat, getLocationForUser } from "@/modules/tasks/services/task-service";
import { TaskStatus, type RevealedLocationView } from "@/modules/tasks/types";
import { formatMoney } from "@/modules/payments/services/payment-service";
import { StatusBadge } from "@/components/domain/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/domain/map-view";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { PaymentBreakdown } from "@/components/domain/payment-breakdown";

export function ExecutorWorkDetailScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const userId = useAppStore((s) => s.currentUserId);
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const users = useAppStore((s) => s.users);
  const payments = useAppStore((s) => s.payments);
  const agreement = useAppStore((s) => s.agreements.find((a) => a.taskId === taskId));
  const startTask = useAppStore((s) => s.startTask);
  const finishTask = useAppStore((s) => s.finishTask);
  if (!task) return <main className="ml-page"><h1 className="text-xl font-black">Trabajo no encontrado</h1></main>;
  const requester = users.find((u) => u.id === task.requesterId);
  const location = getLocationForUser(task, userId, payments);
  const revealed = "exactAddress" in location ? location as RevealedLocationView : null;
  const chatAllowed = canAccessChat(task, userId, payments);
  return <main className="ml-page"><div className="flex items-center justify-between gap-3"><div><div className="ml-kicker">Trabajo asignado</div><h1 className="mt-1 text-2xl font-black leading-tight">{task.title}</h1></div><StatusBadge status={task.status} /></div><div className="mt-3 text-xl font-black text-brand-700">{formatMoney(task.price)}</div>
    {requester ? <Card className="mt-5"><div className="flex items-center gap-3"><Avatar name={`${requester.firstName} ${requester.lastName}`} /><div><div className="text-xs font-bold text-muted">Solicitante</div><div className="font-black">{requester.firstName} {requester.lastName}</div><Rating average={requester.requesterProfile.reputation.average} count={requester.requesterProfile.reputation.count} compact /></div></div></Card> : null}
    <Card className="mt-4"><h2 className="font-black">Ubicación</h2>{revealed ? <><div className="mt-3 rounded-2xl bg-[#eaf7ef] p-3"><div className="text-xs font-black uppercase tracking-wide text-success">Dirección desbloqueada</div><div className="mt-1 font-black">{revealed.exactAddress}</div>{revealed.reference ? <div className="mt-1 text-sm text-muted">Referencia: {revealed.reference}</div> : null}</div><div className="mt-3"><MapView district={revealed.district} exactAddress={revealed.exactAddress} approximate={false} /></div></> : <><p className="mt-2 text-sm text-muted">{location.district} · aprox. {location.approximateDistanceKm} km</p><div className="mt-3"><MapView district={location.district} /></div><p className="mt-3 text-xs text-muted">🔒 La dirección exacta aparecerá después de que el pago esté asegurado.</p></>}</Card>
    {agreement ? <Card className="mt-4"><h2 className="font-black">Lo que recibirás</h2><div className="mt-3"><PaymentBreakdown amount={agreement.originalTerms.basePrice} perspective="executor" /></div></Card> : null}
    <div className="mt-5 grid gap-3">
      {agreement ? <Button variant="secondary" full onClick={() => router.push(`/ejecutor/tareas/${task.id}/acuerdo`)}>Ver acuerdo</Button> : null}
      {chatAllowed ? <Button variant="secondary" full onClick={() => router.push(`/ejecutor/tareas/${task.id}/chat`)}>Abrir chat</Button> : <div className="rounded-2xl bg-[#f2f4f7] p-4 text-sm font-bold text-muted">🔒 Chat bloqueado hasta que el pago esté asegurado.</div>}
      {[TaskStatus.Confirmed, TaskStatus.Upcoming].includes(task.status) ? <Button full onClick={() => startTask(task.id)}>Iniciar tarea</Button> : null}
      {task.status === TaskStatus.InProgress ? <><Button variant="secondary" full onClick={() => router.push(`/ejecutor/tareas/${task.id}/ampliacion`)}>Revisar ampliaciones</Button><Button full onClick={() => { finishTask(task.id); router.push(`/ejecutor/tareas/${task.id}/finalizacion`); }}>Terminé la tarea</Button></> : null}
      {task.status === TaskStatus.CompletionPending ? <Button variant="secondary" full onClick={() => router.push(`/ejecutor/tareas/${task.id}/finalizacion`)}>Ver finalización pendiente</Button> : null}
      {task.status === TaskStatus.Disputed ? <Button variant="secondary" full onClick={() => router.push(`/ejecutor/tareas/${task.id}/disputa`)}>Ver estado de disputa</Button> : null}
      {task.status === TaskStatus.Completed ? <Button full onClick={() => router.push(`/ejecutor/tareas/${task.id}/calificar`)}>Calificar al solicitante</Button> : null}
    </div>
  </main>;
}
