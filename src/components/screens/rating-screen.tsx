"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import type { StarRating } from "@/modules/reputation/types";
import { RatingVisibility } from "@/modules/reputation/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RatingScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const userId = useAppStore((s) => s.currentUserId);
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const users = useAppStore((s) => s.users);
  const ratings = useAppStore((s) => s.ratings);
  const now = useAppStore((s) => s.simulatedNow);
  const delayPassed = useAppStore((s) => s.ratingDelayPassed);
  const submitRating = useAppStore((s) => s.submitRating);
  const [stars, setStars] = useState<StarRating>(5);
  const [comment, setComment] = useState("");
  if (!task?.selectedExecutorId) return <main className="ml-page"><h1 className="text-xl font-black">Calificación no disponible</h1></main>;
  const authorIsRequester = userId === task.requesterId;
  const targetId = authorIsRequester ? task.selectedExecutorId : task.requesterId;
  const target = users.find((u) => u.id === targetId);
  const ownRating = ratings.find((r) => r.taskId === task.id && r.authorUserId === userId);
  const completionTime = new Date(task.updatedAt).getTime();
  const eligible = delayPassed || new Date(now).getTime() >= completionTime + 60 * 60 * 1000;
  return <main className="ml-page"><div className="ml-kicker">Reputación bilateral</div><h1 className="mt-1 text-2xl font-black">Califica a {target?.firstName ?? "la otra persona"}</h1><p className="mt-2 text-sm leading-6 text-muted">La calificación se habilita una hora después de completar la tarea. Además, permanece oculta hasta que ambas partes califiquen o expire el periodo.</p>
    {!eligible && !ownRating ? <Card className="mt-5 text-center"><div className="text-3xl">⏳</div><h2 className="mt-3 font-black">Aún no está disponible</h2><p className="mt-2 text-sm text-muted">Usa el panel Demo para simular que ya pasó una hora.</p></Card> : ownRating ? <Card className="mt-5"><div className="text-3xl">{ownRating.visibility === RatingVisibility.Revealed ? "★" : "🙈"}</div><h2 className="mt-3 font-black">Tu calificación: {ownRating.stars}/5</h2>{ownRating.comment ? <p className="mt-2 text-sm text-[#475467]">“{ownRating.comment}”</p> : null}<p className="mt-3 text-sm font-bold text-muted">{ownRating.visibility === RatingVisibility.Revealed ? "Ambas calificaciones ya son visibles." : "Tu opinión está guardada pero oculta hasta que la otra persona también califique."}</p></Card> : <Card className="mt-5"><div className="flex justify-center gap-2">{([1,2,3,4,5] as StarRating[]).map((s) => <button key={s} onClick={() => setStars(s)} className={`text-4xl ${s <= stars ? "text-[#f59e0b]" : "text-[#d0d5dd]"}`}>★</button>)}</div><textarea className="ml-input mt-5 min-h-28 resize-none" placeholder="Cuenta brevemente cómo fue la experiencia." value={comment} onChange={(e) => setComment(e.target.value)} /><div className="mt-4"><Button full onClick={() => submitRating(task.id, stars, comment)}>Enviar calificación</Button></div><p className="mt-3 text-center text-xs text-muted">No se mostrará a la otra persona inmediatamente si todavía no calificó.</p></Card>}
  </main>;
}
