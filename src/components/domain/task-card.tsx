"use client";

import Link from "next/link";
import type { Task } from "@/modules/tasks/types";
import { useAppStore } from "@/store/app-store";
import { getPublicLocation } from "@/modules/tasks/services/task-service";
import { formatMoney } from "@/modules/payments/services/payment-service";
import { formatPeruTaskDate } from "@/shared/utils/date";
import { StatusBadge } from "./status-badge";

export function TaskCard({ task, href, showStatus = false }: { task: Task; href: string; showStatus?: boolean }) {
  const categories = useAppStore((s) => s.categories);
  const category = categories.find((item) => item.id === task.categoryId);
  const location = getPublicLocation(task);

  return (
    <Link href={href} className="block rounded-card border border-[#e6e8ed] bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl">{category?.icon ?? "🧰"}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 min-[380px]:flex-row min-[380px]:items-start min-[380px]:gap-2">
            <h3 className="min-w-0 flex-1 font-black leading-snug">{task.title}</h3>
            <strong className="whitespace-nowrap text-brand-700">{formatMoney(task.price)}</strong>
          </div>
          <p className="mt-1 break-words text-xs font-bold text-muted">{category?.name} · {location.district} · aprox. {location.approximateDistanceKm} km</p>
          <p className="mt-2 text-sm text-[#475467]">{formatPeruTaskDate(task.scheduledStartAt)} · {Math.round(task.estimatedDurationMinutes / 30) / 2} h aprox.</p>
          {showStatus ? <div className="mt-3"><StatusBadge status={task.status} /></div> : null}
        </div>
      </div>
    </Link>
  );
}
