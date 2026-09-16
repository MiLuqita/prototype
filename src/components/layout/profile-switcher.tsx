"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";

export function ProfileSwitcher() {
  const router = useRouter();
  const activeProfile = useAppStore((s) => s.activeProfile);
  const setActiveProfile = useAppStore((s) => s.setActiveProfile);

  const switchTo = (profile: "requester" | "executor") => {
    setActiveProfile(profile);
    router.push(profile === "requester" ? "/solicitante" : "/ejecutor");
  };

  return (
    <div className="grid grid-cols-2 rounded-xl bg-[#eef0f4] p-1 text-xs font-black">
      <button onClick={() => switchTo("requester")} className={`rounded-lg px-3 py-2 transition ${activeProfile === "requester" ? "bg-white text-brand-700 shadow-sm" : "text-muted"}`}>Solicitante</button>
      <button onClick={() => switchTo("executor")} className={`rounded-lg px-3 py-2 transition ${activeProfile === "executor" ? "bg-white text-brand-700 shadow-sm" : "text-muted"}`}>Ejecutor</button>
    </div>
  );
}
