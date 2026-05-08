import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { StatusPill } from "@/components/StatusPill";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/campeonatos/visualizar")({
  head: () => ({
    meta: [
      { title: "Copa Verão 2026 — NextLiga" },
      { name: "description", content: "Visão geral do campeonato Copa Verão 2026." },
    ],
  }),
  component: VisualizarCampeonato,
});

const TABS = ["Visão geral", "Chaveamento", "Equipes", "Cronograma", "Estatísticas"];

const INFO: { label: string; value: string }[] = [
  { label: "Modalidade", value: "Futebol" },
  { label: "Formato", value: "Mata-mata" },
  { label: "Início", value: "06 mai 2026" },
  { label: "Encerramento", value: "12 jun 2026" },
  { label: "Prazo de inscrição", value: "28 abr 2026" },
  { label: "Local", value: "Arena Esportiva Central" },
  { label: "Endereço", value: "Av. das Palmeiras, 1200 — São Paulo" },
  { label: "Atletas por equipe", value: "11 + 5 reservas" },
];

const TEAMS: { name: string; initials: string; athletes: number; status: "approved" | "pending" }[] = [
  { name: "Tigres FC", initials: "TF", athletes: 16, status: "approved" },
  { name: "Águias SC", initials: "AS", athletes: 15, status: "approved" },
  { name: "Leões United", initials: "LU", athletes: 16, status: "approved" },
  { name: "Cobras EC", initials: "CE", athletes: 14, status: "pending" },
  { name: "Falcões FC", initials: "FF", athletes: 16, status: "approved" },
  { name: "Pumas Atlético", initials: "PA", athletes: 13, status: "pending" },
];

const METRICS = [
  { label: "Equipes inscritas", value: "28 / 32" },
  { label: "Partidas realizadas", value: "12 / 31" },
  { label: "Fase atual", value: "Quartas de final" },
  { label: "Dias restantes", value: "18" },
];

const NEXT_MATCHES = [
  { time: "14:00", a: "Tigres FC", b: "Águias SC", place: "Quadra 1 — Arena Central" },
  { time: "16:00", a: "Leões United", b: "Cobras EC", place: "Quadra 2 — Arena Central" },
  { time: "18:30", a: "Falcões FC", b: "Pumas Atlético", place: "Quadra 1 — Arena Central" },
];

function VisualizarCampeonato() {
  const [tab, setTab] = useState("Visão geral");

  const action = (
    <div className="flex items-center gap-2">
      <button className="h-9 px-3 lg:px-4 rounded-lg border border-border hover:border-primary/40 text-xs font-medium">
        Editar
      </button>
      <button className="h-9 px-3 lg:px-4 rounded-lg bg-primary hover:bg-primary-hover text-xs font-medium">
        Registrar resultado
      </button>
    </div>
  );

  return (
    <AppShell>
      <Topbar title="Copa Verão 2026" subtitle="Visualização do campeonato" action={action} />
      <main className="p-4 lg:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Campeonatos</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Copa Verão 2026</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl tracking-wide">COPA VERÃO 2026</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] font-medium">Futebol</span>
            <span className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] font-medium">Mata-mata</span>
            <StatusPill variant="live">Ao vivo</StatusPill>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scroll-hide border-b border-border -mx-4 lg:-mx-8 px-4 lg:px-8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition ${
                tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "Visão geral" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              <section className="rounded-2xl bg-surface border border-border p-5 lg:p-6">
                <h3 className="font-semibold mb-5">Informações</h3>
                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {INFO.map((i) => (
                    <div key={i.label}>
                      <dt className="text-xs text-muted-foreground mb-1">{i.label}</dt>
                      <dd className="text-sm text-foreground">{i.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="rounded-2xl bg-surface border border-border p-5 lg:p-6">
                <h3 className="font-semibold mb-4">Equipes inscritas</h3>
                <ul className="divide-y divide-border">
                  {TEAMS.map((t) => (
                    <li key={t.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-border flex items-center justify-center text-xs font-semibold">
                        {t.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.athletes} atletas</p>
                      </div>
                      <StatusPill variant={t.status === "approved" ? "approved" : "pending"}>
                        {t.status === "approved" ? "Aprovada" : "Pendente"}
                      </StatusPill>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <section className="rounded-2xl bg-surface border border-border p-5 lg:p-6">
                <h3 className="font-semibold mb-5">Métricas</h3>
                <div className="space-y-5">
                  {METRICS.map((m) => (
                    <div key={m.label}>
                      <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                      <p className="font-display text-2xl">{m.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-surface border border-border p-5 lg:p-6">
                <h3 className="font-semibold mb-4">Próximas partidas</h3>
                <ul className="space-y-4">
                  {NEXT_MATCHES.map((m, i) => (
                    <li key={i} className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg text-gold w-14">{m.time}</span>
                        <span className="text-sm flex-1">
                          {m.a} <span className="text-muted-foreground mx-1">×</span> {m.b}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-[3.75rem]">{m.place}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        )}

        {tab !== "Visão geral" && (
          <div className="rounded-2xl bg-surface border border-border p-10 text-center text-sm text-muted-foreground">
            Conteúdo de "{tab}" em breve.
          </div>
        )}
      </main>
    </AppShell>
  );
}
