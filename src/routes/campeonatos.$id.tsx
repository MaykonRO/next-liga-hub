import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatusPill } from "@/components/StatusPill";
import { ChevronRight, Pencil } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/campeonatos/$id")({
  head: () => ({
    meta: [
      { title: "Copa Verão 2026 — NextLiga" },
      { name: "description", content: "Visão geral do campeonato: equipes, partidas e estatísticas." },
    ],
  }),
  component: ChampDetail,
});

const tabs = ["Visão geral", "Chaveamento", "Equipes", "Cronograma", "Estatísticas"];

const info: [string, string][] = [
  ["Modalidade", "Futebol"],
  ["Formato", "Mata-mata"],
  ["Início", "6 mai 2026"],
  ["Encerramento", "12 jun 2026"],
  ["Prazo de inscrição", "30 abr 2026"],
  ["Local", "Arena Esportiva Central"],
  ["Endereço", "Av. Paulista, 1500 — São Paulo/SP"],
  ["Atletas por equipe", "11"],
];

const teams = [
  { name: "Tigres FC", initials: "TF", athletes: 18, status: "approved" as const, label: "Aprovada" },
  { name: "Águias SC", initials: "AS", athletes: 16, status: "approved" as const, label: "Aprovada" },
  { name: "Leões Vôlei", initials: "LV", athletes: 12, status: "pending" as const, label: "Pendente" },
  { name: "Pumas", initials: "PU", athletes: 15, status: "approved" as const, label: "Aprovada" },
  { name: "Falcões", initials: "FA", athletes: 14, status: "pending" as const, label: "Pendente" },
];

const metrics = [
  { label: "Equipes inscritas", value: "24 / 32" },
  { label: "Partidas realizadas", value: "12 / 31" },
  { label: "Fase atual", value: "Quartas de final" },
  { label: "Dias restantes", value: "18" },
];

const upcoming = [
  { time: "14:00", a: "Tigres FC", b: "Águias SC", place: "Quadra 1 · Arena Central" },
  { time: "16:30", a: "Leões", b: "Cobras", place: "Quadra 2 · Arena Central" },
  { time: "19:00", a: "Pumas", b: "Falcões", place: "Quadra 1 · Arena Central" },
];

function ChampDetail() {
  const { id } = Route.useParams();
  const [tab, setTab] = useState("Visão geral");

  return (
    <AppShell>
      <main className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Campeonatos</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Copa Verão 2026</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-3">
              <h1 className="font-display text-3xl lg:text-5xl tracking-wide">Copa Verão 2026</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-[rgba(61,110,245,0.15)] text-[#5b87ff] text-xs font-medium">
                  Futebol
                </span>
                <span className="px-2.5 py-1 rounded-md bg-background border border-border text-muted-foreground text-xs font-medium">
                  Mata-mata
                </span>
                <StatusPill variant="live">Ao vivo</StatusPill>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-10 px-4 rounded-lg border border-border hover:border-primary/40 transition text-sm font-medium flex items-center gap-2">
                <Pencil className="w-3.5 h-3.5" /> Editar
              </button>
              <button className="h-10 px-4 rounded-lg bg-primary hover:bg-primary-hover transition text-sm font-semibold text-primary-foreground">
                Registrar resultado
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scroll-hide border-b border-border -mx-4 lg:-mx-8 px-4 lg:px-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition ${
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "Visão geral" ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-surface border border-border p-6">
                <h3 className="font-semibold mb-5">Informações gerais</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  {info.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs text-muted-foreground mb-1">{k}</dt>
                      <dd className="text-sm text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl bg-surface border border-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold">Equipes inscritas</h3>
                  <span className="text-xs text-muted-foreground">{teams.length} equipes</span>
                </div>
                <ul className="divide-y divide-border">
                  {teams.map((t) => (
                    <li key={t.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-xs font-semibold">
                        {t.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.athletes} atletas</p>
                      </div>
                      <StatusPill variant={t.status}>{t.label}</StatusPill>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-surface border border-border p-6">
                <h3 className="font-semibold mb-5">Resumo</h3>
                <div className="space-y-5">
                  {metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                      <p className="font-display text-2xl tracking-wide">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-surface border border-border p-6">
                <h3 className="font-semibold mb-5">Próximas partidas</h3>
                <ul className="space-y-4">
                  {upcoming.map((u, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="font-display text-lg text-gold w-14 shrink-0">{u.time}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {u.a} <span className="text-muted-foreground">×</span> {u.b}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{u.place}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/campeonatos/$id/publico"
                  params={{ id }}
                  className="mt-5 block text-center h-10 rounded-lg border border-border hover:border-primary/40 text-xs font-medium leading-10"
                >
                  Ver página pública
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-surface border border-border p-12 text-center text-sm text-muted-foreground">
            Conteúdo de "{tab}" em breve.
          </div>
        )}
      </main>
    </AppShell>
  );
}
