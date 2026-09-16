"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentBreakdown } from "@/components/domain/payment-breakdown";

export function TaskSummaryScreen() {
  const router = useRouter();
  const draft = useAppStore((s) => s.taskDraft);
  const categories = useAppStore((s) => s.categories);
  const publish = useAppStore((s) => s.publishDraft);
  const category = categories.find((c) => c.id === draft.categoryId);
  const onPublish = () => { const id = publish(); router.push(`/solicitante/tareas/${id}`); };
  return <main className="ml-page"><div className="ml-kicker">Paso 3 de 3</div><h1 className="mt-1 text-2xl font-black">Revisa antes de publicar</h1><p className="mt-2 text-sm text-muted">Verifica que el trabajo y el monto estén claros. Podrás editar mientras no contrates a nadie.</p>
    <Card className="mt-5"><div className="flex items-start justify-between gap-3"><div><div className="text-xs font-black text-brand-700">{category?.icon} {category?.name}</div><h2 className="mt-1 text-xl font-black">{draft.title}</h2></div><Link href="/solicitante/tareas/nueva" className="text-sm font-black text-brand-700">Editar</Link></div><p className="mt-3 text-sm leading-6 text-[#475467]">{draft.description}</p><div className="my-4 h-px bg-[#eceef2]" /><dl className="grid gap-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted">Cuándo</dt><dd className="text-right font-bold">{draft.scheduledDate} · {draft.scheduledTime}</dd></div><div className="flex justify-between"><dt className="text-muted">Duración</dt><dd className="font-bold">{draft.estimatedDurationMinutes / 60} h aprox.</dd></div><div className="flex justify-between"><dt className="text-muted">Zona pública</dt><dd className="font-bold">{draft.district}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted">Dirección privada</dt><dd className="text-right font-bold">{draft.exactAddress}</dd></div></dl></Card>
    <Card className="mt-4"><h2 className="font-black">Desglose económico</h2><p className="mt-1 text-xs text-muted">No se cobra nada en esta beta. Este es el flujo simulado que verá el usuario.</p><div className="mt-3"><PaymentBreakdown amount={draft.price} perspective="requester" /></div></Card>
    <div className="mt-5 grid grid-cols-1 gap-3 min-[390px]:grid-cols-[1fr_2fr]"><Button variant="secondary" onClick={() => router.back()}>Atrás</Button><Button onClick={onPublish}>Publicar tarea</Button></div>
  </main>;
}
