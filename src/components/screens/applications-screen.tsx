"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { ApplicationStatus } from "@/modules/applications/types";
import { TaskCard } from "@/components/domain/task-card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

type Filter = "todas" | "pendientes" | "seleccionadas" | "no-seleccionadas";

export function ApplicationsScreen() {
  const userId = useAppStore((s) => s.currentUserId);
  const allApplications = useAppStore((s) => s.applications);
  const applications = useMemo(() => allApplications.filter((a) => a.executorId === userId), [allApplications, userId]);
  const tasks = useAppStore((s) => s.tasks);
  const [filter, setFilter] = useState<Filter>("todas");
  const filtered = applications.filter((a) => filter === "todas" || (filter === "pendientes" && a.status === ApplicationStatus.Submitted) || (filter === "seleccionadas" && a.status === ApplicationStatus.Selected) || (filter === "no-seleccionadas" && a.status === ApplicationStatus.NotSelected));

  return <main className="ml-page"><div className="ml-kicker">Ejecutor</div><h1 className="mt-1 text-2xl font-black">Mis postulaciones</h1><div className="ml-scroll-row mt-4 flex gap-2 overflow-x-auto pb-2">{(["todas","pendientes","seleccionadas","no-seleccionadas"] as Filter[]).map((item) => <button key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${filter === item ? "bg-ink text-white" : "bg-white text-muted"}`}>{item.replace("-", " ")}</button>)}</div><div className="mt-3 grid gap-4">{filtered.length ? filtered.map((a) => { const task = tasks.find((t) => t.id === a.taskId); if (!task) return null; const tone = a.status === ApplicationStatus.Selected ? "success" : a.status === ApplicationStatus.NotSelected ? "neutral" : "brand"; const href = a.status === ApplicationStatus.Selected ? `/ejecutor/tareas/${task.id}` : `/ejecutor/cachuelos/${task.id}`; return <div key={a.id}><div className="mb-2 flex min-w-0 items-center justify-between gap-2"><Badge tone={tone}>{a.status}</Badge>{a.message ? <span className="truncate text-xs text-muted">Mensaje enviado</span> : null}</div><TaskCard task={task} href={href} /></div>; }) : <EmptyState title="Aún no tienes postulaciones">Explora cachuelos y toca “Me interesa” en los que te convengan.</EmptyState>}</div></main>;
}
