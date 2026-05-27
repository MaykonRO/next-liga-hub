import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  ClipboardList,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Rss,
  Settings,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard", label: "Campeonatos", icon: Trophy, match: "/campeonatos" },
  { to: "/dashboard", label: "Modalidades", icon: Dumbbell },
  { to: "/dashboard", label: "Partidas", icon: Swords },
  { to: "/inscricoes", label: "Inscrições", icon: ClipboardList },
  { to: "/equipes", label: "Equipes", icon: Users },
  { to: "/feed", label: "Feed", icon: Rss },
  { to: "/dashboard", label: "Estatísticas", icon: BarChart3 },
  { to: "/dashboard", label: "Notificações", icon: Bell },
  { to: "/dashboard", label: "Configurações", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[230px] flex-col bg-sidebar border-r border-border z-40">
        <Link to="/" className="flex items-center gap-2 px-6 h-16 border-b border-border">
          <span className="font-display text-2xl text-foreground tracking-wider">NEXTLIGA</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((it) => {
            const active = path === it.to || (it.match && path.startsWith(it.match));
            const Icon = it.icon;
            return (
              <Link
                key={it.label}
                to={it.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[rgba(61,110,245,0.18)] text-[#5b87ff] font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-[rgba(61,110,245,0.08)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-[rgba(61,110,245,0.08)]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center font-semibold text-sm">
              MC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Marina C.</p>
              <p className="text-xs text-muted-foreground truncate">Organizador</p>
            </div>
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-border z-40 px-2 py-2 flex justify-around">
        {items.slice(0, 5).map((it) => {
          const active = path === it.to || (it.match && path.startsWith(it.match));
          const Icon = it.icon;
          return (
            <Link
              key={it.label}
              to={it.to}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[10px] ${
                active ? "text-[#5b87ff]" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
