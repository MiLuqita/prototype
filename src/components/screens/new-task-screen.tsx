"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NewTaskScreen() {
  const router = useRouter();
  const draft = useAppStore((s) => s.taskDraft);
  const categories = useAppStore((s) => s.categories);
  const setDraft = useAppStore((s) => s.setTaskDraft);
  const valid = draft.title.trim().length >= 4 && draft.description.trim().length >= 10 && draft.price > 0 && draft.scheduledDate && draft.scheduledTime && draft.estimatedDurationMinutes > 0;
  return <main className="ml-page"><div className="ml-kicker">Paso 1 de 3</div><h1 className="mt-1 text-2xl font-black">Cuéntanos qué necesitas</h1><p className="mt-2 text-sm text-muted">Sé claro con el alcance para que los ejecutores sepan exactamente a qué se postulan.</p>
    <Card className="mt-5 grid gap-4">
      <div><label className="ml-label">Título</label><input className="ml-input" placeholder="Ej. Armar un ropero de 3 puertas" value={draft.title} onChange={(e) => setDraft({ title: e.target.value })} /></div>
      <div><label className="ml-label">Descripción</label><textarea className="ml-input min-h-28 resize-none" placeholder="Describe el trabajo, tamaño, materiales disponibles y cualquier detalle importante." value={draft.description} onChange={(e) => setDraft({ description: e.target.value })} /></div>
      <div><label className="ml-label">Categoría</label><select className="ml-input" value={draft.categoryId} onChange={(e) => setDraft({ categoryId: e.target.value })}>{categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select></div>
      <div><label className="ml-label">Precio que ofreces (S/)</label><input className="ml-input" type="number" min="10" step="5" value={draft.price} onChange={(e) => setDraft({ price: Number(e.target.value) })} /><p className="mt-1 text-xs text-muted">Los ejecutores no pueden hacer contraofertas en esta beta.</p></div>
      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2"><div><label className="ml-label">Fecha</label><input className="ml-input" type="date" value={draft.scheduledDate} onChange={(e) => setDraft({ scheduledDate: e.target.value })} /></div><div><label className="ml-label">Hora aprox.</label><input className="ml-input" type="time" value={draft.scheduledTime} onChange={(e) => setDraft({ scheduledTime: e.target.value })} /></div></div>
      <div><label className="ml-label">Duración estimada</label><select className="ml-input" value={draft.estimatedDurationMinutes} onChange={(e) => setDraft({ estimatedDurationMinutes: Number(e.target.value) })}><option value={60}>1 hora</option><option value={90}>1.5 horas</option><option value={120}>2 horas</option><option value={180}>3 horas</option><option value={240}>4 horas</option><option value={360}>6 horas</option></select></div>
      <div><label className="ml-label">Condiciones / alcance adicional (opcional)</label><textarea className="ml-input min-h-20 resize-none" placeholder="Ej. Debe traer taladro. Los materiales ya están comprados." value={draft.conditions} onChange={(e) => setDraft({ conditions: e.target.value })} /></div>
      <div className="rounded-2xl bg-[#f8f9fb] p-4 text-sm text-muted">📷 Fotos opcionales: en esta beta se simula el campo visualmente; no se suben archivos reales.</div>
    </Card>
    <div className="mt-5"><Button full disabled={!valid} onClick={() => router.push("/solicitante/tareas/nueva/ubicacion")}>Continuar con ubicación</Button></div>
  </main>;
}
