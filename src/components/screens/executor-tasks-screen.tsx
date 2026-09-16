"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { TaskStatus } from "@/modules/tasks/types";
import { TaskCard } from "@/components/domain/task-card";
import { EmptyState } from "@/components/ui/empty-state";

type Tab = "proximos" | "activos" | "completados";

export function ExecutorTasksScreen() {
  const userId = useAppStore((s) => s.currentUserId);
  const allTasks = useAppStore((s) => s.tasks);
  const tasks = useMemo(() => allTasks.filter((t) => t.selectedExecutorId === userId), [allTasks, userId]);
  const [tab, setTab] = useState<Tab>("proximos");
  const filtered = tasks.filter((t) => tab === "proximos" ? [TaskStatus.ExecutorSelected, TaskStatus.PaymentPending, TaskStatus.Confirmed, TaskStatus.Upcoming].includes(t.status) : tab === "activos" ? [TaskStatus.InProgress, TaskStatus.CompletionPending, TaskStatus.Disputed].includes(t.status) : t.status === TaskStatus.Completed);

  return <main className="ml-page"><div className="ml-kicker">Ejecutor</div><h1 className="mt-1 text-2xl font-black">Mis trabajos</h1><div className="ml-scroll-row mt-4 flex gap-2 overflow-x-auto pb-2">{(["proximos","activos","completados"] as Tab[]).map((item) => <button key={item} onClick={() => setTab(item)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${tab === item ? "bg-ink text-white" : "bg-white text-muted"}`}>{item}</button>)}</div><div className="mt-3 grid gap-3">{filtered.length ? filtered.map((task) => <TaskCard key={task.id} task={task} href={`/ejecutor/tareas/${task.id}`} showStatus />) : <EmptyState title="Nada por aquí">Tus trabajos seleccionados aparecerán en esta sección.</EmptyState>}</div></main>;
}
