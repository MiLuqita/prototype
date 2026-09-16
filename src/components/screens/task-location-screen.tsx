"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapView } from "@/components/domain/map-view";

export function TaskLocationScreen() {
  const router = useRouter();
  const draft = useAppStore((s) => s.taskDraft);
  const setDraft = useAppStore((s) => s.setTaskDraft);
  const valid = draft.district.trim() && draft.exactAddress.trim();
  return <main className="ml-page"><div className="ml-kicker">Paso 2 de 3</div><h1 className="mt-1 text-2xl font-black">¿Dónde se hará la tarea?</h1><p className="mt-2 text-sm leading-6 text-muted">Antes de contratar solo mostraremos el distrito y una distancia aproximada. La dirección exacta se revela al ejecutor elegido cuando el pago quede asegurado.</p>
    <Card className="mt-5"><h2 className="font-black">Ubicación detectada (simulada)</h2><p className="mt-1 text-sm text-muted">Santiago de Surco · zona Caminos del Inca</p><div className="mt-4"><MapView district="Santiago de Surco" /></div><div className="mt-4 text-sm font-black">¿La tarea se realizará aquí?</div><div className="mt-3 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2"><button onClick={() => setDraft({ useCurrentLocation: true, district: "Santiago de Surco", exactAddress: "Av. Caminos del Inca 1234", reference: "Portería principal" })} className={`rounded-control border px-3 py-3 text-sm font-black ${draft.useCurrentLocation ? "border-brand-500 bg-brand-50 text-brand-700" : "border-[#d9dde6]"}`}>Sí, aquí</button><button onClick={() => setDraft({ useCurrentLocation: false, exactAddress: "", reference: "" })} className={`rounded-control border px-3 py-3 text-sm font-black ${!draft.useCurrentLocation ? "border-brand-500 bg-brand-50 text-brand-700" : "border-[#d9dde6]"}`}>No, otra ubicación</button></div></Card>
    {!draft.useCurrentLocation ? <Card className="mt-4 grid gap-4"><div><label className="ml-label">Distrito</label><select className="ml-input" value={draft.district} onChange={(e) => setDraft({ district: e.target.value })}><option>Santiago de Surco</option><option>Miraflores</option><option>San Borja</option><option>La Molina</option><option>San Isidro</option><option>Magdalena</option><option>Jesús María</option><option>Barranco</option><option>Surquillo</option><option>San Miguel</option></select></div><div><label className="ml-label">Dirección exacta</label><input className="ml-input" placeholder="Av./calle, número, departamento" value={draft.exactAddress} onChange={(e) => setDraft({ exactAddress: e.target.value })} /></div><div><label className="ml-label">Referencia</label><input className="ml-input" placeholder="Ej. Torre B, portería principal" value={draft.reference} onChange={(e) => setDraft({ reference: e.target.value })} /></div><MapView district={draft.district} exactAddress={draft.exactAddress || undefined} approximate={false} /></Card> : null}
    <div className="mt-5 grid grid-cols-1 gap-3 min-[390px]:grid-cols-[1fr_2fr]"><Button variant="secondary" onClick={() => router.back()}>Atrás</Button><Button disabled={!valid} onClick={() => router.push("/solicitante/tareas/nueva/resumen")}>Revisar publicación</Button></div>
  </main>;
}
