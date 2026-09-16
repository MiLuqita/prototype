"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "@/store/app-store";
import { ProfileSwitcher } from "./profile-switcher";

export function TopBar() {
  const { currentUserId, users, notifications, activeProfile } = useAppStore(
    useShallow((state) => ({
      currentUserId: state.currentUserId,
      users: state.users,
      notifications: state.notifications,
      activeProfile: state.activeProfile,
    }))
  );

  const user = useMemo(
    () => users.find((candidate) => candidate.id === currentUserId) ?? null,
    [users, currentUserId]
  );

  const unread = useMemo(
    () => notifications.filter((notification) => notification.userId === currentUserId && !notification.readAt).length,
    [notifications, currentUserId]
  );

  return (
    <header className="sticky top-0 z-30 border-b border-[#e8e9ee] bg-white/95 backdrop-blur">
      <div className="mx-auto grid w-full max-w-[720px] grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 px-3 py-2.5 min-[480px]:flex min-[480px]:gap-3 min-[480px]:px-4 min-[480px]:py-3">
        <Link href={activeProfile === "requester" ? "/solicitante" : "/ejecutor"} className="min-w-0 shrink-0 text-lg font-black tracking-[-.04em]">Mi <span className="text-brand-600">Luquita</span></Link>
        <div className="col-span-2 row-start-2 min-w-0 min-[480px]:order-none min-[480px]:ml-auto min-[480px]:w-[190px]"><ProfileSwitcher /></div>
        <Link href="/notificaciones" className="relative col-start-2 row-start-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f2f4f7] text-lg min-[480px]:order-none" aria-label="Notificaciones">🔔{unread > 0 ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-black text-white">{unread}</span> : null}</Link>
      </div>
      {user ? <div className="mx-auto max-w-[720px] truncate px-3 pb-2 text-[11px] font-bold text-muted min-[480px]:px-4">Demo · {user.firstName} {user.lastName}</div> : null}
    </header>
  );
}
