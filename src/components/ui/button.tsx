import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  full?: boolean;
}

export function Button({ children, variant = "primary", full = false, className = "", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 border-brand-600",
    secondary: "bg-white text-ink hover:bg-brand-50 border-[#d9dde6]",
    ghost: "bg-transparent text-ink hover:bg-[#f0f2f6] border-transparent",
    danger: "bg-[#fff1f0] text-danger hover:bg-[#ffe4e1] border-[#ffd1cc]",
  };
  return (
    <button
      className={`min-h-11 rounded-control border px-4 py-2.5 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
