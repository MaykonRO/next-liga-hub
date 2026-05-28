import { Bell, Search, Plus } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface TopbarProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function Topbar({ title, subtitle, action }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 px-4 lg:px-8 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-display text-2xl lg:text-3xl text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground -mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <button className="relative w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center hover:border-primary/40 transition">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-[10px] flex items-center justify-center font-semibold">3</span>
        </button>
        <button className="hidden sm:flex w-9 h-9 rounded-lg bg-surface border border-border items-center justify-center hover:border-primary/40 transition">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
        {action ?? (
          <Link
            to="/campeonatos/novo"
            className="flex items-center gap-2 px-3 lg:px-4 h-9 rounded-lg bg-primary hover:bg-primary-hover transition text-sm font-medium text-primary-foreground"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo campeonato</span>
          </Link>
        )}
      </div>
    </header>
  );
}
