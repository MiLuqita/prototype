"use client";

import { useParams } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/domain/status-badge";

const labels: Record<string, string> = { no_show: "No llegó", incomplete_work: "Trabajo incompleto", different_work: "Trabajo diferente", safety_issue: "Problema de seguridad", other: "Otro" };

export function DisputeScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const dispute = useAppStore((s) => s.disputes.find((d) => d.taskId === taskId));
  if (!task) return null;
  return <main className="ml-page"><div className="flex flex-col items-start gap-3 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between"><div><div className="ml-kicker">Incidencia registrada</div><h1 className="mt-1 text-2xl font-black">Estado del caso</h1></div><StatusBadge status={task.status} /></div><Card className="mt-5"><div className="text-3xl">⚠️</div><h2 className="mt-3 font-black">La tarea está en disputa</h2><p className="mt-2 text-sm leading-6 text-muted">El prototipo congela el cierre normal y mantiene visible el caso para ambas partes. La resolución real queda fuera del alcance de esta beta.</p>{dispute ? <div className="mt-4 rounded-2xl bg-[#fff5df] p-4 text-sm"><div className="font-black">Motivo: {labels[dispute.reason]}</div>{dispute.description ? <p className="mt-2 leading-5 text-[#475467]">{dispute.description}</p> : null}</div> : null}</Card><Card className="mt-4"><h2 className="font-black">Qué ocurre con el pago</h2><p className="mt-2 text-sm leading-6 text-muted">En este prototipo el pago queda en estado asegurado mientras la disputa está abierta. No se simula una decisión, devolución ni liberación manual.</p></Card></main>;
}
