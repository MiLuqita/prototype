"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/app-store";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProfileScreen() {
  const userId = useAppStore((s) => s.currentUserId);
  const activeProfile = useAppStore((s) => s.activeProfile);
  const user = useAppStore((s) => s.users.find((u) => u.id === userId));
  const categories = useAppStore((s) => s.categories);
  const updateExecutorProfile = useAppStore((s) => s.updateExecutorProfile);
  const [bio, setBio] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) { setBio(user.executorProfile.bio); setSelected(user.executorProfile.categoryIds); }
  }, [user]);
  if (!user) return null;

  const profile = activeProfile === "requester" ? user.requesterProfile : user.executorProfile;
  return (
    <main className="ml-page">
      <div className="flex items-center gap-4"><Avatar name={`${user.firstName} ${user.lastName}`} size="lg" /><div><div className="ml-kicker">Perfil {activeProfile === "requester" ? "Solicitante" : "Ejecutor"}</div><h1 className="text-2xl font-black">{user.firstName} {user.lastName}</h1><p className="text-sm text-muted">{user.district}</p></div></div>
      <Card className="mt-5"><div className="flex items-center justify-between"><div><div className="text-xs font-black uppercase tracking-wide text-muted">Reputación de este perfil</div><div className="mt-2"><Rating average={profile.reputation.average} count={profile.reputation.count} /></div></div><div className="text-3xl">★</div></div><p className="mt-3 text-xs leading-5 text-muted">Tu reputación como Solicitante y como Ejecutor se calcula por separado.</p></Card>
      {activeProfile === "requester" ? (
        <div className="mt-5 grid grid-cols-2 gap-3"><Card><div className="text-2xl font-black">{user.requesterProfile.tasksPublished}</div><div className="text-xs font-bold text-muted">Tareas publicadas</div></Card><Card><div className="text-2xl font-black">{user.requesterProfile.tasksCompleted}</div><div className="text-xs font-bold text-muted">Completadas</div></Card></div>
      ) : (
        <Card className="mt-5"><h2 className="ml-section-title">Presentación como ejecutor</h2><label className="ml-label mt-4" htmlFor="bio">Sobre ti</label><textarea id="bio" className="ml-input min-h-28 resize-none" value={bio} onChange={(e) => setBio(e.target.value)} /><div className="mt-4 ml-label">Categorías que te interesan</div><div className="flex flex-wrap gap-2">{categories.map((c) => { const active = selected.includes(c.id); return <button key={c.id} onClick={() => setSelected(active ? selected.filter((id) => id !== c.id) : [...selected, c.id])} className={`rounded-full border px-3 py-2 text-xs font-black ${active ? "border-brand-500 bg-brand-50 text-brand-700" : "border-[#d9dde6] bg-white text-muted"}`}>{c.icon} {c.name}</button>; })}</div><div className="mt-5 flex flex-wrap items-center gap-3"><Button onClick={() => { updateExecutorProfile(bio, selected); setSaved(true); window.setTimeout(() => setSaved(false), 1300); }}>Guardar cambios</Button>{saved ? <span className="text-sm font-bold text-success">Guardado en esta sesión</span> : null}</div><div className="mt-5 rounded-2xl bg-[#f8f9fb] p-4 text-sm"><strong>{user.executorProfile.completedJobs} trabajos realizados</strong><div className="mt-1"><Rating average={user.executorProfile.reputation.average} count={user.executorProfile.reputation.count} /></div></div></Card>
      )}
    </main>
  );
}
