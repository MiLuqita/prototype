export function Rating({ average, count, compact = false }: { average: number | null; count: number; compact?: boolean }) {
  if (average === null || count === 0) return <span className="text-sm font-bold text-muted">Nuevo · sin calificaciones</span>;
  return <span className="text-sm font-bold text-[#475467]">★ {average.toFixed(1)}{compact ? "" : ` · ${count} calificaciones`}</span>;
}
