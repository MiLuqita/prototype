import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`ml-card p-4 ${className}`}>{children}</section>;
}
