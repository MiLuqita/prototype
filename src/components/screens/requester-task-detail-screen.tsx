"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { isEditableBeforeContract } from "@/modules/tasks/services/task-service";
import { TaskStatus } from "@/modules/tasks/types";
import { formatMoney } from "@/modules/payments/services/payment-service";
import { StatusBadge } from "@/components/domain/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/domain/map-view";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { formatPeruDateTime } from "@/shared/utils/date";

export function RequesterTaskDetailScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const categories = useAppStore((s) => s.categories);
  const allApplications = useAppStore((s) => s.applications);
  const apps = useMemo(() => allApplications.filter((a) => a.taskId === taskId), [allApplications, taskId]);
  const users = useAppStore((s) => s.users);
  const cancel = useAppStore((s) => s.cancelTask);
  if (!task) return <main className="ml-page"><h1 className="text-xl font-black">Tarea no encontrada</h1></main>;
  const category = categories.find((c) => c.id === task.categoryId);
  const executor = users.find((u) => u.id === task.selectedExecutorId);
  const editable = isEditableBeforeContract(task);
  return <main className="ml-page"><div className="flex flex-col items-start gap-3 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between"><div><div className="ml-kicker">{category?.icon} {category?.name}</div><h1 className="mt-1 text-2xl font-black leading-tight">{task.title}</h1></div><StatusBadge status={task.status} /></div><div className="mt-3 text-2xl font-black text-brand-700">{formatMoney(task.price)}</div><p className="mt-3 text-sm leading-6 text-[#475467]">{task.description}</p>
    <Card className="mt-5"><h2 className="font-black">Datos de la tarea</h2><dl className="mt-3 grid gap-2 text-sm"><div className="flex justify-between"><dt className="text-muted">Inicio</dt><dd className="font-bold">{formatPeruDateTime(task.scheduledStartAt)}</dd></div><div className="flex justify-between"><dt className="text-muted">Duración</dt><dd className="font-bold">{task.estimatedDurationMinutes / 60} h aprox.</dd></div><div className="flex justify-between"><dt className="text-muted">Zona pública</dt><dd className="font-bold">{task.location.public.district}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted">Dirección privada</dt><dd className="text-right font-bold">{task.location.private.exactAddress}</dd></div></dl><div className="mt-4"><MapView district={task.location.public.district} exactAddress={task.location.private.exactAddress} approximate={false} /></div></Card>
    {executor ? <Card className="mt-4"><div className="text-xs font-black uppercase tracking-wide text-muted">Ejecutor seleccionado</div><div className="mt-3 flex items-center gap-3"><Avatar name={`${executor.firstName} ${executor.lastName}`} /><div><div className="font-black">{executor.firstName} {executor.lastName}</div><Rating average={executor.executorProfile.reputation.average} count={executor.executorProfile.reputation.count} /></div></div></Card> : null}
    {[TaskStatus.Published, TaskStatus.WithApplicants].includes(task.status) ? <Link href={`/solicitante/tareas/${task.id}/postulantes`} className="mt-4 flex items-center justify-between rounded-card border border-brand-200 bg-brand-50 p-4"><div><div className="font-black text-brand-700">{apps.length} postulante{apps.length === 1 ? "" : "s"}</div><div className="text-xs text-muted">Compara experiencia y reputación antes de elegir.</div></div><span className="text-xl">›</span></Link> : null}
    <div className="mt-5 grid gap-3">
      {editable ? <><Button variant="secondary" full onClick={() => router.push(`/solicitante/tareas/${task.id}/editar`)}>Editar tarea</Button><Button variant="danger" full onClick={() => { if (confirm("¿Cancelar esta tarea?")) cancel(task.id); }}>Cancelar tarea</Button></> : null}
      {task.agreementId ? <Button variant="secondary" full onClick={() => router.push(`/solicitante/tareas/${task.id}/acuerdo`)}>Ver acuerdo</Button> : null}
      {task.status === TaskStatus.PaymentPending ? <Button full onClick={() => router.push(`/solicitante/tareas/${task.id}/pago`)}>Asegurar pago</Button> : null}
      {[TaskStatus.Confirmed, TaskStatus.Upcoming, TaskStatus.InProgress, TaskStatus.CompletionPending].includes(task.status) ? <Button variant="secondary" full onClick={() => router.push(`/solicitante/tareas/${task.id}/chat`)}>Abrir chat</Button> : null}
      {task.status === TaskStatus.InProgress ? <Button full onClick={() => router.push(`/solicitante/tareas/${task.id}/ampliacion`)}>Proponer ampliación</Button> : null}
      {task.status === TaskStatus.CompletionPending ? <Button full onClick={() => router.push(`/solicitante/tareas/${task.id}/finalizacion`)}>Revisar finalización</Button> : null}
      {task.status === TaskStatus.Disputed ? <Button variant="secondary" full onClick={() => router.push(`/solicitante/tareas/${task.id}/disputa`)}>Ver estado del problema</Button> : null}
      {task.status === TaskStatus.Completed ? <Button full onClick={() => router.push(`/solicitante/tareas/${task.id}/calificar`)}>Calificar experiencia</Button> : null}
    </div>
  </main>;
}
