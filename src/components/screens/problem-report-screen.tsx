"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import type { DisputeReason } from "@/modules/agreements/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const reasons: { value: DisputeReason; label: string }[] = [
  { value: "no_show", label: "No llegó" },
  { value: "incomplete_work", label: "Trabajo incompleto" },
  { value: "different_work", label: "Trabajo diferente a lo acordado" },
  { value: "safety_issue", label: "Problema de seguridad" },
  { value: "other", label: "Otro" },
];

export function ProblemReportScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const router = useRouter();
  const report = useAppStore((s) => s.reportProblem);
  const [reason, setReason] = useState<DisputeReason>("incomplete_work");
  const [description, setDescription] = useState("");
  return <main className="ml-page"><div className="ml-kicker">Incidencia</div><h1 className="mt-1 text-2xl font-black">Reportar un problema</h1><p className="mt-2 text-sm leading-6 text-muted">En esta beta solo registramos el caso y mostramos el estado. No existe resolución automática ni soporte real.</p><Card className="mt-5 grid gap-4"><div><label className="ml-label">¿Qué pasó?</label><select className="ml-input" value={reason} onChange={(e) => setReason(e.target.value as DisputeReason)}>{reasons.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}</select></div><div><label className="ml-label">Detalle</label><textarea className="ml-input min-h-28 resize-none" placeholder="Describe qué parte del acuerdo no se cumplió." value={description} onChange={(e) => setDescription(e.target.value)} /></div></Card><div className="mt-5"><Button variant="danger" full onClick={() => { report(taskId, reason, description); router.push(`/solicitante/tareas/${taskId}/disputa`); }}>Registrar problema</Button></div></main>;
}
