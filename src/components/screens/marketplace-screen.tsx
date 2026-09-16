"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { TaskStatus } from "@/modules/tasks/types";
import { TaskCard } from "@/components/domain/task-card";
import { EmptyState } from "@/components/ui/empty-state";

export function MarketplaceScreen() {
  const categories = useAppStore((s) => s.categories);
  const tasks = useAppStore((s) => s.tasks);
  const userId = useAppStore((s) => s.currentUserId);
  const [categoryId, setCategoryId] = useState("all");
  const [district, setDistrict] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(250);
  const [date, setDate] = useState("");
  const districts = [...new Set(tasks.map((t) => t.location.public.district))].sort();
  const filtered = useMemo(() => tasks.filter((task) => {
    if (![TaskStatus.Published, TaskStatus.WithApplicants].includes(task.status) || task.requesterId === userId) return false;
    if (categoryId !== "all" && task.categoryId !== categoryId) return false;
    if (district !== "all" && task.location.public.district !== district) return false;
    if (task.price < minPrice || task.price > maxPrice) return false;
    if (date && !task.scheduledStartAt.startsWith(date)) return false;
    return true;
  }), [tasks, userId, categoryId, district, minPrice, maxPrice, date]);
  return <main className="ml-page"><div className="ml-kicker">Explorar</div><h1 className="mt-1 text-2xl font-black">Cachuelos disponibles</h1><div className="mt-5 grid gap-3 rounded-card bg-white p-4 shadow-card"><div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2"><div><label className="ml-label">Categoría</label><select className="ml-input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}><option value="all">Todas</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div><div><label className="ml-label">Distrito / zona</label><select className="ml-input" value={district} onChange={(e) => setDistrict(e.target.value)}><option value="all">Todos</option>{districts.map((d) => <option key={d}>{d}</option>)}</select></div></div><div><label className="ml-label">Fecha</label><input className="ml-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div><div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2"><div><label className="ml-label">Precio mín.</label><input className="ml-input" type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} /></div><div><label className="ml-label">Precio máx.</label><input className="ml-input" type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /></div></div></div><div className="mt-5 text-sm font-black">{filtered.length} resultados</div><div className="mt-3 grid gap-3">{filtered.length ? filtered.map((task) => <TaskCard key={task.id} task={task} href={`/ejecutor/cachuelos/${task.id}`} />) : <EmptyState title="No encontramos tareas">Prueba ampliando el rango de precio o cambiando los filtros.</EmptyState>}</div></main>;
}
