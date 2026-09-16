export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-9 w-9 text-xs", md: "h-11 w-11 text-sm", lg: "h-16 w-16 text-lg" };
  const initials = name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <div className={`grid shrink-0 place-items-center rounded-full bg-brand-100 font-black text-brand-700 ${sizes[size]}`}>{initials}</div>;
}
