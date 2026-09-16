"use client";

import { useAppStore } from "@/store/app-store";
import { TaskStatus } from "@/modules/tasks/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DemoScreen() {
  const now = useAppStore((s) => s.simulatedNow);
  const fail = useAppStore((s) => s.nextPaymentShouldFail);
  const ratingDelay = useAppStore((s) => s.ratingDelayPassed);
  const setNow = useAppStore((s) => s.setSimulatedNow);
  const setFail = useAppStore((s) => s.forceNextPaymentFailure);
  const setRatingDelay = useAppStore((s) => s.simulateRatingDelay);
  const forceTaskStatus = useAppStore((s) => s.forceTaskStatus);
  const autoComplete = useAppStore((s) => s.autoComplete);
  const reset = useAppStore((s) => s.resetDemo);
  return <main className="ml-page"><div className="ml-kicker">Herramientas de prototipo</div><h1 className="mt-1 text-2xl font-black">Panel Demo</h1><p className="mt-2 text-sm leading-6 text-muted">Estos controles solo existen para demostrar escenarios sin esperar tiempo real ni usar servicios externos.</p><div className="mt-5 grid gap-4">
    <Card><h2 className="font-black">Reloj simulado</h2><p className="mt-1 text-xs text-muted">Afecta marcas de tiempo nuevas y la demostración de calificaciones.</p><input className="ml-input mt-3" value={now} onChange={(e) => setNow(e.target.value)} /></Card>
    <Card><h2 className="font-black">Próximo pago</h2><label className="mt-3 flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} className="h-5 w-5 accent-[#f97316]" /> Forzar que el siguiente pago sea rechazado</label><p className="mt-2 text-xs text-muted">Úsalo con la tarea “Armar mesa de comedor”.</p></Card>
    <Card><h2 className="font-black">Calificación</h2><label className="mt-3 flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={ratingDelay} onChange={(e) => setRatingDelay(e.target.checked)} className="h-5 w-5 accent-[#f97316]" /> Simular que ya pasó 1 hora</label></Card>
    <Card><h2 className="font-black">Atajos de estados</h2><div className="mt-3 grid gap-2"><Button variant="secondary" full onClick={() => forceTaskStatus("t-demo-upcoming", TaskStatus.InProgress)}>Hacer que la tarea próxima ya pueda iniciar</Button><Button variant="secondary" full onClick={() => autoComplete("t-demo-finish")}>Simular finalización automática</Button></div></Card>
    <Button variant="danger" full onClick={reset}>Restaurar todos los datos mock</Button>
  </div></main>;
}
