import type { ReactNode } from "react";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "brand" | "success" | "warning" | "danger" }) {
  const tones = {
    neutral: "bg-[#f0f2f6] text-[#475467]",
    brand: "bg-brand-50 text-brand-700",
    success: "bg-[#eaf7ef] text-success",
    warning: "bg-[#fff5df] text-warning",
    danger: "bg-[#fff1f0] text-danger",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ${tones[tone]}`}>{children}</span>;
}
