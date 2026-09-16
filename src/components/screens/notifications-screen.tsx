"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAppStore } from "@/store/app-store";
import { formatPeruDayMonthTime } from "@/shared/utils/date";

const icons: Record<string, string> = { new_application: "✋", executor_selected: "✓", payment_confirmed: "🔒", task_upcoming: "⏰", new_message: "💬", extension_requested: "+", task_finished: "🏁", problem_reported: "⚠", rating_available: "★" };

export function NotificationsScreen() {
  const userId = useAppStore((s) => s.currentUserId);
  const activeProfile = useAppStore((s) => s.activeProfile);
  const allNotifications = useAppStore((s) => s.notifications);
  const markRead = useAppStore((s) => s.markNotificationRead);
  const notifications = useMemo(
    () => allNotifications.filter((n) => n.userId === userId).slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [allNotifications, userId],
  );

  return (
    <main className="ml-page">
      <div className="ml-kicker">Actividad</div>
      <h1 className="mt-1 text-2xl font-black">Notificaciones</h1>
      <div className="mt-5 grid gap-2">
        {notifications.map((n) => {
          const href = n.taskId ? activeProfile === "requester" ? `/solicitante/tareas/${n.taskId}` : `/ejecutor/tareas/${n.taskId}` : "#";
          return (
            <Link href={href} onClick={() => markRead(n.id)} key={n.id} className={`flex min-w-0 gap-3 rounded-card border p-4 ${n.readAt ? "border-[#eceef2] bg-white" : "border-brand-200 bg-brand-50"}`}>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-lg">{icons[n.type]}</div>
              <div className="min-w-0">
                <div className="break-words font-black">{n.title}</div>
                <p className="mt-1 break-words text-sm leading-5 text-muted">{n.body}</p>
                <div className="mt-2 text-xs font-bold text-muted">{formatPeruDayMonthTime(n.createdAt)}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
