import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Box,
  ChartColumn,
  Columns2,
  Grid2x2,
  Home,
  ImageIcon,
  Layers3,
  Menu,
  PackageOpen,
  PlugZap,
  ReceiptText,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import type { AdminIconKey } from "@/lib/admin";

const iconMap: Record<AdminIconKey, LucideIcon> = {
  archive: PackageOpen,
  bell: Bell,
  box: Box,
  chart: ChartColumn,
  columns: Columns2,
  grid: Grid2x2,
  home: Home,
  image: ImageIcon,
  layers: Layers3,
  menu: Menu,
  plug: PlugZap,
  receipt: ReceiptText,
  settings: Settings,
  shield: ShieldCheck,
  users: Users,
};

export function AdminIcon({ icon }: { icon: AdminIconKey }) {
  const Icon = iconMap[icon];

  return <Icon size={18} strokeWidth={1.85} />;
}
