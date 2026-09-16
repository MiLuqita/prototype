"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { canAccessChat } from "@/modules/tasks/services/task-service";
import { getTaskMessages } from "@/modules/notifications/services/chat-service";
import { Button } from "@/components/ui/button";
import { formatPeruTime } from "@/shared/utils/date";

export function ChatScreen() {
  const { taskId } = useParams<{ taskId: string }>();
  const userId = useAppStore((s) => s.currentUserId);
  const task = useAppStore((s) => s.tasks.find((t) => t.id === taskId));
  const payments = useAppStore((s) => s.payments);
  const messages = useAppStore((s) => s.messages);
  const users = useAppStore((s) => s.users);
  const send = useAppStore((s) => s.sendMessage);
  const [text, setText] = useState("");
  if (!task) return null;
  const allowed = canAccessChat(task, userId, payments);
  const thread = getTaskMessages(messages, taskId);
  const otherId = userId === task.requesterId ? task.selectedExecutorId : task.requesterId;
  const other = users.find((u) => u.id === otherId);
  if (!allowed) return <main className="ml-page"><div className="rounded-card border bg-white p-6 text-center"><div className="text-3xl">🔒</div><h1 className="mt-3 text-xl font-black">Chat todavía bloqueado</h1><p className="mt-2 text-sm leading-6 text-muted">El chat solo se habilita después de seleccionar ejecutor y asegurar el pago.</p></div></main>;
  return <main className="ml-page"><div className="ml-kicker">Chat de la tarea</div><h1 className="mt-1 text-xl font-black">{other ? `${other.firstName} ${other.lastName}` : "Contraparte"}</h1><p className="mt-1 text-xs text-muted">{task.title}</p><div className="mt-5 min-h-[45dvh] space-y-3 rounded-card bg-white p-4 shadow-card">{thread.map((m) => { const mine = m.senderId === userId; return <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-5 ${mine ? "bg-ink text-white" : "bg-[#f0f2f6] text-ink"}`}><div>{m.content}</div><div className={`mt-1 text-[10px] ${mine ? "text-white/60" : "text-muted"}`}>{formatPeruTime(m.sentAt)}</div></div></div>; })}</div><form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; send(taskId, text); setText(""); }}><input className="ml-input min-w-0 flex-1" placeholder="Escribe un mensaje" value={text} onChange={(e) => setText(e.target.value)} /><Button type="submit">Enviar</Button></form></main>;
}
