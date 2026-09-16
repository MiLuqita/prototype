"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { TaskStatus } from "@/modules/tasks/types";
import { TaskCard } from "@/components/domain/task-card";

export function ExecutorHome() {
  const categories = useAppStore((s) => s.categories);
  const tasks = useAppStore((s) => s.tasks);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const [categoryId, setCategoryId] = useState("all");
  const [maxPrice, setMaxPrice] = useState(300);
  const available = useMemo(() => tasks.filter((task) => [TaskStatus.Published, TaskStatus.WithApplicants].includes(task.status) && task.requesterId !== currentUserId && (categoryId === "all" || task.categoryId === categoryId) && task.price <= maxPrice), [tasks, currentUserId, categoryId, maxPrice]);
  return (
    <main className="ml-page">
      <div><div className="ml-kicker">Cachuelos cerca de ti</div><h1 className="mt-1 text-2xl font-black tracking-[-.035em]">Encuentra una tarea que te cuadre</h1><p className="mt-2 text-sm text-muted">La dirección exacta se mantiene privada hasta que seas seleccionado y el pago esté asegurado.</p></div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2"><button onClick={() => setCategoryId("all")} className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${categoryId === "all" ? "bg-ink text-white" : "bg-white text-muted"}`}>Todas</button>{categories.map((c) => <button key={c.id} onClick={() => setCategoryId(c.id)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${categoryId === c.id ? "bg-ink text-white" : "bg-white text-muted"}`}>{c.icon} {c.name}</button>)}</div>
      <div className="mt-2 rounded-2xl bg-white p-3"><div className="flex items-center justify-between text-xs font-bold text-muted"><span>Pago máximo</span><span>S/{maxPrice}</span></div><input aria-label="Pago máximo" className="mt-2 w-full accent-[#f97316]" type="range" min="30" max="300" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /></div>
      <div className="mt-5 flex items-center justify-between"><h2 className="ml-section-title">{available.length} tareas disponibles</h2><Link href="/ejecutor/cachuelos" className="text-sm font-black text-brand-700">Más filtros</Link></div>
      <div className="mt-3 grid gap-3">{available.slice(0, 10).map((task) => <TaskCard key={task.id} task={task} href={`/ejecutor/cachuelos/${task.id}`} />)}</div>
    </main>
  );
}
