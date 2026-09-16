"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "@/store/app-store";
import { TaskStatus } from "@/modules/tasks/types";
import { TaskCard } from "@/components/domain/task-card";
import { Card } from "@/components/ui/card";

export function RequesterHome() {
  const { currentUserId, users, tasks: allTasks } = useAppStore(
    useShallow((state) => ({
      currentUserId: state.currentUserId,
      users: state.users,
      tasks: state.tasks,
    }))
  );

  const user = useMemo(
    () => users.find((candidate) => candidate.id === currentUserId) ?? null,
    [users, currentUserId]
  );

  const tasks = useMemo(
    () => allTasks.filter((task) => task.requesterId === currentUserId),
    [allTasks, currentUserId]
  );

  const active = useMemo(
    () => tasks.filter((task) => ![TaskStatus.Completed, TaskStatus.Cancelled].includes(task.status)).slice(0, 3),
    [tasks]
  );

  const searchingCount = useMemo(
    () => tasks.filter((task) => [TaskStatus.WithApplicants, TaskStatus.Published].includes(task.status)).length,
    [tasks]
  );

  const coordinationCount = useMemo(
    () => tasks.filter((task) => [TaskStatus.Upcoming, TaskStatus.InProgress, TaskStatus.CompletionPending].includes(task.status)).length,
    [tasks]
  );

  return (
    <main className="ml-page">
      <section className="rounded-[28px] bg-ink p-5 text-white shadow-card sm:p-6">
        <div className="text-sm text-white/70">Hola, {user?.firstName ?? ""} 👋</div>
        <h1 className="mt-1 text-2xl font-black tracking-[-.035em] sm:text-[1.7rem]">¿Qué necesitas resolver hoy?</h1>
        <p className="mt-2 text-sm leading-6 text-white/70">Publica tu tarea, recibe postulantes y elige quién la hará.</p>
        <Link href="/solicitante/tareas/nueva" className="mt-5 inline-flex rounded-control bg-brand-500 px-4 py-3 text-sm font-black text-white">+ Publicar una tarea</Link>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Card>
          <div className="text-2xl font-black">{searchingCount}</div>
          <div className="mt-1 text-xs font-bold text-muted">Buscando ejecutor</div>
        </Card>
        <Card>
          <div className="text-2xl font-black">{coordinationCount}</div>
          <div className="mt-1 text-xs font-bold text-muted">En coordinación</div>
        </Card>
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        <h2 className="ml-section-title">Tus tareas activas</h2>
        <Link href="/solicitante/tareas" className="shrink-0 text-sm font-black text-brand-700">Ver todas</Link>
      </div>

      <div className="mt-3 grid gap-3">
        {active.map((task) => (
          <TaskCard key={task.id} task={task} href={`/solicitante/tareas/${task.id}`} showStatus />
        ))}
      </div>

      <Link href="/demo" className="mt-7 block rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-4 text-sm font-bold leading-6 text-brand-700">🧪 Abrir panel Demo para probar pagos rechazados, tiempo simulado y estados.</Link>
    </main>
  );
}
