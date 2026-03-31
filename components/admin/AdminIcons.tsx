import type { ReactNode } from "react";

import type { AdminIconKey } from "@/lib/admin";

export function AdminIcon({ icon }: { icon: AdminIconKey }): ReactNode {
  switch (icon) {
    case "grid":
      return <svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></svg>;
    case "chart":
      return <svg viewBox="0 0 24 24"><path d="M4 20h16" /><path d="M7 16v-4" /><path d="M12 16V8" /><path d="M17 16v-7" /></svg>;
    case "receipt":
      return <svg viewBox="0 0 24 24"><path d="M7 4h10v16l-2-1-2 1-2-1-2 1-2-1V4Z" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
    case "box":
      return <svg viewBox="0 0 24 24"><path d="m4 8 8-4 8 4-8 4-8-4Z" /><path d="M4 8v8l8 4 8-4V8" /><path d="M12 12v8" /></svg>;
    case "layers":
      return <svg viewBox="0 0 24 24"><path d="m12 4 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4" /><path d="m4 16 8 4 8-4" /></svg>;
    case "archive":
      return <svg viewBox="0 0 24 24"><path d="M4 7h16v4H4z" /><path d="M6 11h12v9H6z" /><path d="M10 15h4" /></svg>;
    case "users":
      return <svg viewBox="0 0 24 24"><path d="M16 19a4 4 0 0 0-8 0" /><circle cx="12" cy="10" r="3" /><path d="M20 18a3 3 0 0 0-4-2.8" /><path d="M4 18a3 3 0 0 1 4-2.8" /></svg>;
    case "home":
      return <svg viewBox="0 0 24 24"><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /></svg>;
    case "menu":
      return <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10" /></svg>;
    case "columns":
      return <svg viewBox="0 0 24 24"><path d="M4 5h16v14H4z" /><path d="M10 5v14M16 5v14" /></svg>;
    case "image":
      return <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m8 13 2.5-2.5L15 15l2-2 3 3" /><circle cx="8.5" cy="9" r="1" /></svg>;
    case "settings":
      return <svg viewBox="0 0 24 24"><path d="m12 3 1.6 2.7 3.1.7-.7 3.1 2.3 2.2-2.3 2.2.7 3.1-3.1.7L12 21l-1.6-2.7-3.1-.7.7-3.1-2.3-2.2 2.3-2.2-.7-3.1 3.1-.7L12 3Z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "shield":
      return <svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 5 3.5 8 7 10 3.5-2 7-5 7-10V6l-7-3Z" /><path d="M9.5 12.5 11 14l3.5-3.5" /></svg>;
    case "bell":
      return <svg viewBox="0 0 24 24"><path d="M6 16h12l-1.5-2.5V10a4.5 4.5 0 1 0-9 0v3.5L6 16Z" /><path d="M10 18a2 2 0 0 0 4 0" /></svg>;
    case "plug":
      return <svg viewBox="0 0 24 24"><path d="M9 7V4M15 7V4M8 10h8v2a4 4 0 0 1-8 0v-2ZM12 14v6" /></svg>;
  }
}
