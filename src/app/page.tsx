"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";

export default function LoginPage() {
  const router = useRouter();
  const { currentUserId, users, setActiveProfile } = useAppStore(
    useShallow((state) => ({
      currentUserId: state.currentUserId,
      users: state.users,
      setActiveProfile: state.setActiveProfile,
    }))
  );

  const user = useMemo(
    () => users.find((candidate) => candidate.id === currentUserId) ?? null,
    [users, currentUserId]
  );

  return (
    <main className="grid min-h-dvh place-items-center bg-[radial-gradient(circle_at_top,#fff1e7,transparent_42%),#f7f8fb] px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center"><div className="text-sm font-black uppercase tracking-[.18em] text-brand-600">Beta interactiva</div><h1 className="mt-2 text-4xl font-black tracking-[-.05em]">Mi <span className="text-brand-600">Luquita</span></h1><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">Publica una tarea o encuentra un cachuelo cerca de ti. Esta beta usa datos simulados y no realiza pagos reales.</p></div>
        <Card className="p-5">
          <div className="text-xs font-black uppercase tracking-wide text-muted">Usuario demo</div>
          <div className="mt-3 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 font-black text-brand-700">VQ</div><div><div className="font-black">{user?.firstName} {user?.lastName}</div><div className="text-sm text-muted">{user?.district}</div></div></div>
          <div className="mt-5 grid gap-3"><Button full onClick={() => { setActiveProfile("requester"); router.push("/solicitante"); }}>Entrar como Solicitante</Button><Button full variant="secondary" onClick={() => { setActiveProfile("executor"); router.push("/ejecutor"); }}>Entrar como Ejecutor</Button></div>
          <p className="mt-4 text-center text-xs leading-5 text-muted">No hay autenticación real. Los cambios se reinician al refrescar o desde el panel Demo.</p>
        </Card>
      </div>
    </main>
  );
}
