"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { isEditableBeforeContract } from "@/modules/tasks/services/task-service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EditTaskScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const edit = useAppStore((s) => s.editTask);
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [price, setPrice] = useState(task?.price ?? 0);
  if (!task) return null;
  if (!isEditableBeforeContract(task)) return <main className="ml-page"><h1 className="text-xl font-black">Esta tarea ya no se puede editar</h1><p className="mt-2 text-sm text-muted">Una vez contratado un ejecutor, el alcance original queda registrado en el acuerdo.</p></main>;
  return <main className="ml-page"><div className="ml-kicker">Editar</div><h1 className="mt-1 text-2xl font-black">Actualizar tarea</h1><Card className="mt-5 grid gap-4"><div><label className="ml-label">Título</label><input className="ml-input" value={title} onChange={(e) => setTitle(e.target.value)} /></div><div><label className="ml-label">Descripción</label><textarea className="ml-input min-h-28" value={description} onChange={(e) => setDescription(e.target.value)} /></div><div><label className="ml-label">Precio</label><input className="ml-input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div></Card><div className="mt-5"><Button full onClick={() => { edit(task.id, { title, description, price }); router.push(`/solicitante/tareas/${task.id}`); }}>Guardar cambios</Button></div></main>;
}
