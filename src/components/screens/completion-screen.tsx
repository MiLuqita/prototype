"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { TaskStatus } from "@/modules/tasks/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CompletionScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const activeProfile = useAppStore((s) => s.activeProfile);
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const confirmCompletion = useAppStore((s) => s.confirmCompletion);
  if (!task) return null;
  return <main className="ml-page"><div className="ml-kicker">Cierre del trabajo</div><h1 className="mt-1 text-2xl font-black">{task.title}</h1>
    <Card className="mt-5"><div className="text-3xl">🏁</div><h2 className="mt-3 text-xl font-black">{task.status === TaskStatus.Completed ? "Tarea completada" : "Finalización pendiente"}</h2>{activeProfile === "executor" ? <p className="mt-2 text-sm leading-6 text-muted">Marcaste el trabajo como terminado. El solicitante debe revisarlo y confirmar. Mientras tanto, el pago permanece asegurado.</p> : <p className="mt-2 text-sm leading-6 text-muted">El ejecutor indicó que terminó. Revisa el trabajo antes de confirmar. Si hay un problema, repórtalo antes del cierre definitivo.</p>}</Card>
    {activeProfile === "requester" && task.status === TaskStatus.CompletionPending ? <div className="mt-5 grid gap-3"><Button full onClick={() => { confirmCompletion(task.id); router.push(`/solicitante/tareas/${task.id}`); }}>Todo conforme · confirmar</Button><Button variant="danger" full onClick={() => router.push(`/solicitante/tareas/${task.id}/problema`)}>Reportar un problema</Button><p className="text-center text-xs leading-5 text-muted">El panel Demo puede simular la finalización automática si no respondes dentro del periodo definido.</p></div> : null}
  </main>;
}
