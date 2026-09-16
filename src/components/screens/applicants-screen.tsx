"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ApplicationStatus } from "@/modules/applications/types";

export function ApplicantsScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const allApplications = useAppStore((s) => s.applications);
  const apps = useMemo(() => allApplications.filter((a) => a.taskId === taskId), [allApplications, taskId]);
  const users = useAppStore((s) => s.users);
  const select = useAppStore((s) => s.selectExecutor);
  if (!task) return null;
  const active = apps.filter((a) => a.status === ApplicationStatus.Submitted);
  return <main className="ml-page"><div className="ml-kicker">Comparar candidatos</div><h1 className="mt-1 text-2xl font-black">Postulantes a “{task.title}”</h1><p className="mt-2 text-sm text-muted">La selección es manual. Una vez que elijas a alguien, los demás quedarán como no seleccionados y se generará el acuerdo.</p><div className="mt-5 grid gap-4">{active.length ? active.map((a) => { const user = users.find((u) => u.id === a.executorId); if (!user) return null; return <Card key={a.id}><div className="flex items-start gap-3"><Avatar name={`${user.firstName} ${user.lastName}`} /><div className="flex-1"><div className="font-black">{user.firstName} {user.lastName}</div><Rating average={user.executorProfile.reputation.average} count={user.executorProfile.reputation.count} /><div className="mt-1 text-xs font-bold text-muted">{user.executorProfile.completedJobs} trabajos realizados</div></div></div><p className="mt-3 text-sm leading-6 text-[#475467]">{user.executorProfile.bio}</p>{a.message ? <div className="mt-3 rounded-2xl bg-[#f8f9fb] p-3 text-sm"><span className="font-black">Mensaje:</span> {a.message}</div> : null}<div className="mt-4"><Button full onClick={() => { select(task.id, user.id); router.push(`/solicitante/tareas/${task.id}/acuerdo`); }}>Elegir a {user.firstName}</Button></div></Card>; }) : <EmptyState title="Aún no hay postulantes">La tarea seguirá visible en el marketplace.</EmptyState>}</div></main>;
}
