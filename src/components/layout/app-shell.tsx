import type { ReactNode } from "react";
import { TopBar } from "./top-bar";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="ml-shell"><TopBar />{children}<BottomNav /></div>;
}
