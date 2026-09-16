"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { TaskStatus } from "@/modules/tasks/types";
import { TaskCard } from "@/components/domain/task-card";
import { EmptyState } from "@/components/ui/empty-state";

type Tab = "activas" | "proximas" | "completadas" | "canceladas";

export function RequesterTasksScreen() {
  const userId = useAppStore((s) => s.currentUserId);
  const allTasks = useAppStore((s) => s.tasks);
  const tasks = useMemo(() => allTasks.filter((t) => t.requesterId === userId), [allTasks, userId]);
  const [tab, setTab] = useState<Tab>("activas");
  const filtered = tasks.filter((t) => tab === "completadas" ? t.status === TaskStatus.Completed : tab === "canceladas" ? t.status === TaskStatus.Cancelled : tab === "proximas" ? [TaskStatus.Confirmed, TaskStatus.Upcoming].includes(t.status) : ![TaskStatus.Completed, TaskStatus.Cancelled, TaskStatus.Confirmed, TaskStatus.Upcoming].includes(t.status));

  return <main className="ml-page"><div className="ml-kicker">Solicitante</div><h1 className="mt-1 text-2xl font-black">Mis tareas</h1><div className="ml-scroll-row mt-4 flex gap-2 overflow-x-auto pb-2">{(["activas","proximas","completadas","canceladas"] as Tab[]).map((item) => <button key={item} onClick={() => setTab(item)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-black capitalize ${tab === item ? "bg-ink text-white" : "bg-white text-muted"}`}>{item}</button>)}</div><div className="mt-3 grid gap-3">{filtered.length ? filtered.map((task) => <TaskCard key={task.id} task={task} href={`/solicitante/tareas/${task.id}`} showStatus />) : <EmptyState title="Nada por aquí">No tienes tareas en esta sección.</EmptyState>}</div></main>;
}
