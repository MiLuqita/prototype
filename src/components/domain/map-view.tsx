export interface MapViewProps {
  district: string;
  exactAddress?: string;
  approximate?: boolean;
}

export function MapView({ district, exactAddress, approximate = true }: MapViewProps) {
  return (
    <div className="relative h-44 overflow-hidden rounded-card border border-[#e2e5eb] bg-[#edf0f2]">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(28deg, transparent 46%, #d6dde2 47%, #d6dde2 52%, transparent 53%), linear-gradient(115deg, transparent 46%, #d6dde2 47%, #d6dde2 52%, transparent 53%)", backgroundSize: "70px 70px" }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">📍</div>
      <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-xs font-bold shadow-sm">
        {approximate ? `Zona aproximada · ${district}` : exactAddress ?? district}
      </div>
    </div>
  );
}
