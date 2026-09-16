"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { getPublicLocation } from "@/modules/tasks/services/task-service";
import { formatMoney } from "@/modules/payments/services/payment-service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { formatPeruDateTime } from "@/shared/utils/date";
import { Avatar } from "@/components/ui/avatar";
import { MapView } from "@/components/domain/map-view";

export function ExecutorTaskDetailScreen() {
  const params = useParams<{ taskId: string }>();
  const router = useRouter();
  const taskId = params.taskId;
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const users = useAppStore((s) => s.users);
  const categories = useAppStore((s) => s.categories);
  const userId = useAppStore((s) => s.currentUserId);
  const applications = useAppStore((s) => s.applications);
  const apply = useAppStore((s) => s.applyToTask);
  const [message, setMessage] = useState("");
  if (!task) return <main className="ml-page"><h1 className="text-xl font-black">Tarea no encontrada</h1></main>;
  const requester = users.find((u) => u.id === task.requesterId);
  const category = categories.find((c) => c.id === task.categoryId);
  const location = getPublicLocation(task);
  const existing = applications.find((a) => a.taskId === task.id && a.executorId === userId);
  return <main className="ml-page"><div className="flex flex-col items-start gap-2 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between"><div className="ml-kicker">{category?.icon} {category?.name}</div><strong className="text-xl text-brand-700">{formatMoney(task.price)}</strong></div><h1 className="mt-2 text-2xl font-black leading-tight">{task.title}</h1><p className="mt-3 text-sm leading-6 text-[#475467]">{task.description}</p>
    <Card className="mt-5"><h2 className="font-black">Cuándo y dónde</h2><dl className="mt-3 grid gap-2 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted">Inicio</dt><dd className="font-bold">{formatPeruDateTime(task.scheduledStartAt)}</dd></div><div className="flex justify-between"><dt className="text-muted">Duración</dt><dd className="font-bold">{task.estimatedDurationMinutes / 60} h aprox.</dd></div><div className="flex justify-between"><dt className="text-muted">Zona</dt><dd className="font-bold">{location.district} · aprox. {location.approximateDistanceKm} km</dd></div></dl><div className="mt-4"><MapView district={location.district} /></div><p className="mt-3 rounded-xl bg-[#f8f9fb] p-3 text-xs leading-5 text-muted">🔒 La dirección exacta no se comparte durante la postulación. Se desbloquea solo si te seleccionan y el pago queda asegurado.</p></Card>
    {requester ? <Card className="mt-4"><div className="flex items-center gap-3"><Avatar name={`${requester.firstName} ${requester.lastName}`} /><div><div className="font-black">{requester.firstName} {requester.lastName}</div><Rating average={requester.requesterProfile.reputation.average} count={requester.requesterProfile.reputation.count} /></div></div></Card> : null}
    <Card className="mt-4"><h2 className="font-black">Condiciones</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#475467]">{task.conditions.map((c) => <li key={c}>{c}</li>)}</ul></Card>
    <Card className="mt-4"><h2 className="font-black">Postular</h2>{existing ? <div className="mt-3 rounded-2xl bg-[#eaf7ef] p-4 text-sm font-bold text-success">Ya te postulaste · {existing.status}</div> : <><p className="mt-1 text-xs text-muted">El precio es fijo. Puedes agregar un mensaje breve, pero no cambiar el monto.</p><textarea className="ml-input mt-3 min-h-24 resize-none" placeholder="Ej. Tengo experiencia con este tipo de trabajo y herramientas propias." value={message} onChange={(e) => setMessage(e.target.value)} /><div className="mt-3"><Button full onClick={() => { apply(task.id, message); router.push("/ejecutor/postulaciones"); }}>Me interesa</Button></div></>}</Card>
  </main>;
}
