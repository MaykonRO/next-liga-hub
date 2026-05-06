import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { StatusPill } from "@/components/StatusPill";
import { Trophy, Users, CheckCircle2, Calendar, ChevronRight, Plus, Bell, BarChart3, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — NextLiga" },
      { name: "description", content: "Acompanhe seus campeonatos, partidas e atletas em tempo real." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <Topbar title="Dashboard" subtitle="Quarta, 6 de maio de 2026" />
      <main className="p-4 lg:p-8 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric icon={Trophy} label="Campeonatos ativos" value="12" delta="+2 esta semana" color="primary" />
          <Metric icon={Users} label="Total de atletas" value="1.847" delta="+126 este mês" color="gold" />
          <Metric icon={CheckCircle2} label="Partidas concluídas" value="284" progress={68} color="success" />
          <Metric icon={Calendar} label="Jogos hoje" value="9" delta="3 ao vivo agora" color="primary" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Championships table */}
            <div className="rounded-2xl bg-surface border border-border overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div>
                  <h2 className="font-semibold">Campeonatos</h2>
                  <p className="text-xs text-muted-foreground">Visão geral dos torneios em andamento</p>
                </div>
                <Link to="/dashboard" className="text-xs text-[#5b87ff] flex items-center gap-1">
                  Ver todos <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="overflow-x-auto scroll-hide">
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground bg-background/40">
                    <tr>
                      <th className="text-left font-medium px-5 py-3">Campeonato</th>
                      <th className="text-left font-medium px-3 py-3">Status</th>
                      <th className="text-left font-medium px-3 py-3">Inscrições</th>
                      <th className="text-left font-medium px-3 py-3">Progresso</th>
                      <th className="text-left font-medium px-5 py-3">Encerra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {champs.map((c) => (
                      <tr key={c.name} className="border-t border-border hover:bg-background/30 transition cursor-pointer">
                        <td className="px-5 py-4">
                          <Link to="/campeonatos/$id" params={{ id: c.id }} className="block">
                            <div className="font-medium">{c.name}</div>
                            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-primary/10 text-[#5b87ff] border border-primary/20">{c.sport}</span>
                          </Link>
                        </td>
                        <td className="px-3 py-4"><StatusPill variant={c.status as any}>{c.statusLabel}</StatusPill></td>
                        <td className="px-3 py-4 text-muted-foreground">{c.regs}</td>
                        <td className="px-3 py-4 w-32">
                          <div className="h-1.5 rounded-full bg-primary/15 overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: c.progress + "%" }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-1 block">{c.progress}%</span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">{c.end}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((q) => (
                <button key={q.label} className="p-5 rounded-2xl bg-surface border border-border card-hover text-left flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${q.bg}`}>
                    <q.icon className={`w-5 h-5 ${q.color}`} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{q.label}</div>
                    <div className="text-xs text-muted-foreground">{q.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-surface border border-border p-5">
              <h3 className="font-semibold mb-4">Jogos de hoje</h3>
              <div className="space-y-3">
                {todayGames.map((g) => (
                  <div key={g.time} className="p-3 rounded-lg bg-background/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-lg text-gold">{g.time}</span>
                      {g.live && <StatusPill variant="live">Ao vivo</StatusPill>}
                    </div>
                    <div className="text-sm">{g.teams}</div>
                    <div className="text-xs text-muted-foreground mt-1">{g.venue}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-surface border border-border p-5">
              <h3 className="font-semibold mb-4">Atividade recente</h3>
              <div className="space-y-4">
                {activity.map((a, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="leading-snug">{a.text}</p>
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function Metric({ icon: Icon, label, value, delta, progress, color }: any) {
  const colorMap: any = {
    primary: "bg-primary/10 text-[#5b87ff] border-primary/20",
    gold: "bg-gold/10 text-gold border-gold/20",
    success: "bg-success/10 text-success border-success/20",
  };
  return (
    <div className="p-5 rounded-2xl bg-surface border border-border card-hover">
      <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-3 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-display text-3xl mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
      {delta && <div className="text-[11px] text-success mt-2">{delta}</div>}
      {progress !== undefined && (
        <div className="mt-3 h-1.5 rounded-full bg-primary/15 overflow-hidden">
          <div className="h-full bg-success" style={{ width: progress + "%" }} />
        </div>
      )}
    </div>
  );
}

const champs = [
  { id: "1", name: "Copa Verão 2026", sport: "Futebol", status: "live", statusLabel: "Ao vivo", regs: "32 / 32", progress: 65, end: "12 jun" },
  { id: "2", name: "Liga Universitária", sport: "Vôlei", status: "open", statusLabel: "Aberto", regs: "18 / 24", progress: 30, end: "28 jul" },
  { id: "3", name: "Torneio Aberto", sport: "Basquete", status: "open", statusLabel: "Aberto", regs: "12 / 16", progress: 12, end: "5 ago" },
  { id: "4", name: "Campeonato Master", sport: "Futsal", status: "closed", statusLabel: "Encerrado", regs: "16 / 16", progress: 100, end: "30 abr" },
];

const quickActions = [
  { icon: Plus, label: "Novo campeonato", desc: "Criar do zero", bg: "bg-primary/10", color: "text-[#5b87ff]" },
  { icon: ClipboardList, label: "Aprovar inscrições", desc: "8 pendentes", bg: "bg-gold/10", color: "text-gold" },
  { icon: Bell, label: "Notificar equipes", desc: "Mensagem em massa", bg: "bg-success/10", color: "text-success" },
  { icon: BarChart3, label: "Ver estatísticas", desc: "Relatórios completos", bg: "bg-primary/10", color: "text-[#5b87ff]" },
];

const todayGames = [
  { time: "14:00", teams: "Tigres FC × Águias SC", venue: "Quadra Central", live: true },
  { time: "16:30", teams: "Leões × Pumas", venue: "Quadra 2", live: false },
  { time: "19:00", teams: "Dragões × Falcões", venue: "Estádio Norte", live: false },
];

const activity = [
  { text: "Equipe Tigres FC confirmou inscrição na Copa Verão", time: "há 5 min" },
  { text: "Resultado registrado: Águias 3 × 1 Pumas", time: "há 22 min" },
  { text: "Novo campeonato 'Liga Universitária' publicado", time: "há 1h" },
  { text: "12 atletas se cadastraram na plataforma", time: "há 2h" },
];
