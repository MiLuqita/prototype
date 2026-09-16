"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/app-store";

export function BottomNav() {
  const pathname = usePathname();
  const activeProfile = useAppStore((s) => s.activeProfile);
  const items = activeProfile === "requester"
    ? [
      ["Inicio", "⌂", "/solicitante"],
      ["Mis tareas", "▦", "/solicitante/tareas"],
      ["Publicar", "+", "/solicitante/tareas/nueva"],
      ["Alertas", "●", "/notificaciones"],
      ["Perfil", "☺", "/perfil"],
    ]
    : [
      ["Cachuelos", "⌕", "/ejecutor"],
      ["Postulaciones", "✋", "/ejecutor/postulaciones"],
      ["Trabajos", "▦", "/ejecutor/tareas"],
      ["Alertas", "●", "/notificaciones"],
      ["Perfil", "☺", "/perfil"],
    ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e5e7ec] bg-white/98 backdrop-blur">
      <div className="mx-auto grid max-w-[720px] grid-cols-5 px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
        {items.map(([label, icon, href]) => {
          const active = pathname === href || (href !== "/solicitante" && href !== "/ejecutor" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 text-[9px] font-extrabold min-[380px]:text-[10px] ${active ? "text-brand-700" : "text-muted"}`}>
              <span className="text-lg leading-none">{icon}</span>
              <span className="max-w-full truncate text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
