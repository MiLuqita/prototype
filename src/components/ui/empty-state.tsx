import type { ReactNode } from "react";

export function EmptyState({ icon = "🧭", title, children }: { icon?: string; title: string; children?: ReactNode }) {
  return <div className="rounded-card border border-dashed border-[#d9dde6] bg-white p-8 text-center"><div className="text-3xl">{icon}</div><h2 className="mt-3 font-extrabold">{title}</h2>{children ? <div className="mt-2 text-sm text-muted">{children}</div> : null}</div>;
}
