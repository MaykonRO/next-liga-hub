import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { StatusPill } from "@/components/StatusPill";
import { VisaoGeralCampeonato } from "@/components/VisaoGeralCampeonato";
import { ChevronRight, FileDown, Send, Trophy } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/campeonatos/$id")({
  head: () => ({
    meta: [
      { title: "Copa Verão 2026 — NextLiga" },
      { name: "description", content: "Acompanhe chaveamento, classificação e resultados ao vivo." },
    ],
  }),
  component: ChampDetail,
});

const tabs = ["Visão geral", "Chaveamento", "Classificação", "Equipes", "Cronograma", "Estatísticas", "Feed"];

function ChampDetail() {
  const { id } = Route.useParams();
  const [tab, setTab] = useState("Visão geral");
  const [scoreA, setScoreA] = useState("");
  const [scoreB, setScoreB] = useState("");

  const action = (
    <div className="flex items-center gap-2">
      <button className="hidden md:flex h-9 px-3 rounded-lg border border-border hover:border-primary/40 text-xs items-center gap-1.5">
        <FileDown className="w-3.5 h-3.5" /> Relatório
      </button>
      <button className="hidden md:flex h-9 px-3 rounded-lg border border-border hover:border-primary/40 text-xs items-center gap-1.5">
        <Send className="w-3.5 h-3.5" /> Notificar
      </button>
      <button className="h-9 px-3 lg:px-4 rounded-lg bg-primary hover:bg-primary-hover text-xs font-medium">
        Registrar resultado
      </button>
    </div>
  );

  return (
    <AppShell>
      <Topbar title="Copa Verão 2026" subtitle="Futebol · 32 equipes · 6 mai – 12 jun" action={action} />
      <main className="p-4 lg:p-8 space-y-6">
        {/* Breadcrumb + status */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Campeonatos</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Copa Verão 2026</span>
          </div>
          <StatusPill variant="live">Ao vivo</StatusPill>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto scroll-hide border-b border-border -mx-4 lg:-mx-8 px-4 lg:px-8">
          {tabs.map((t) => (
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
        {tab === "Visão geral" && <VisaoGeralCampeonato />}

        {tab === "Chaveamento" && (
          <>
            {/* Quick score entry */}
            <div className="rounded-2xl bg-surface border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Próxima partida</p>
                  <h3 className="font-semibold">Tigres FC vs Águias SC</h3>
                </div>
                <span className="font-display text-lg text-gold">14:00</span>
              </div>
              <div className="flex items-center gap-3">
                <input value={scoreA} onChange={(e) => setScoreA(e.target.value)} type="number" placeholder="0" className="w-20 h-12 rounded-lg bg-input border border-border focus:border-primary outline-none text-center font-display text-2xl" />
                <span className="text-muted-foreground">×</span>
                <input value={scoreB} onChange={(e) => setScoreB(e.target.value)} type="number" placeholder="0" className="w-20 h-12 rounded-lg bg-input border border-border focus:border-primary outline-none text-center font-display text-2xl" />
                <button className="ml-auto h-12 px-5 rounded-lg bg-primary hover:bg-primary-hover text-sm font-medium">Confirmar placar</button>
              </div>
            </div>

            {/* Bracket */}
            <div className="rounded-2xl bg-surface border border-border p-5 lg:p-8 overflow-x-auto scroll-hide">
              <div className="flex gap-6 lg:gap-12 min-w-[800px]">
                <BracketCol title="Quartas de final" matches={quarters} />
                <BracketCol title="Semifinais" matches={semis} />
                <BracketCol title="Final" matches={finals} isFinal />
              </div>
            </div>

            {/* Bottom panels */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-2xl bg-surface border border-border overflow-hidden">
                <div className="p-5 border-b border-border flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gold" />
                  <h3 className="font-semibold">Artilharia</h3>
                </div>
                <table className="w-full text-sm">
                  <thead className="text-xs text-muted-foreground bg-background/40">
                    <tr>
                      <th className="text-left font-medium px-5 py-3">#</th>
                      <th className="text-left font-medium px-3 py-3">Atleta</th>
                      <th className="text-left font-medium px-3 py-3">Equipe</th>
                      <th className="text-right font-medium px-5 py-3">Gols</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scorers.map((s, i) => (
                      <tr key={s.name} className="border-t border-border">
                        <td className="px-5 py-3 font-display text-lg" style={{ color: i === 0 ? "var(--gold)" : undefined }}>{i + 1}</td>
                        <td className="px-3 py-3">{s.name}</td>
                        <td className="px-3 py-3 text-muted-foreground">{s.team}</td>
                        <td className="px-5 py-3 text-right font-display text-xl">{s.goals}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-2xl bg-surface border border-border p-5">
                <h3 className="font-semibold mb-4">Informações</h3>
                <dl className="space-y-3 text-sm">
                  <div><dt className="text-xs text-muted-foreground">Modalidade</dt><dd>Futebol Society</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Formato</dt><dd>Eliminatória simples</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Local</dt><dd>Arena Esportiva Central</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Equipes</dt><dd>32 inscritas</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Premiação</dt><dd className="text-gold">R$ 25.000</dd></div>
                </dl>
                <Link to="/campeonatos/$id/publico" params={{ id }} className="mt-4 block text-center h-10 rounded-lg border border-border hover:border-primary/40 text-xs font-medium leading-10">
                  Ver página pública
                </Link>
              </div>
            </div>
          </>
        )}

        {!["Visão geral", "Chaveamento"].includes(tab) && (
          <div className="rounded-2xl bg-surface border border-border p-10 text-center text-sm text-muted-foreground">
            Conteúdo de "{tab}" em breve.
          </div>
        )}
      </main>
    </AppShell>
  );
}

function BracketCol({ title, matches, isFinal }: { title: string; matches: any[]; isFinal?: boolean }) {
  return (
    <div className="flex-1 min-w-[220px]">
      <h4 className={`text-xs font-medium mb-4 uppercase tracking-wider ${isFinal ? "text-gold" : "text-muted-foreground"}`}>{title}</h4>
      <div className={`flex flex-col gap-${isFinal ? "0" : "4"} h-full justify-around`}>
        {matches.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl border p-3 bg-background/40 ${
              isFinal ? "border-gold/50" : m.live ? "border-primary/60" : "border-border"
            }`}
          >
            {isFinal && <div className="text-[10px] text-gold font-medium mb-2 uppercase">Final</div>}
            {m.live && !isFinal && <div className="text-[10px] text-success font-medium mb-2 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Ao vivo</div>}
            {m.teams.map((t: any, ti: number) => (
              <div key={ti} className={`flex items-center justify-between py-1.5 ${t.winner ? "text-success" : ""}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{t.seed}</span>
                  <span className={`text-sm truncate ${t.winner ? "font-semibold" : ""}`}>{t.name}</span>
                </div>
                <span className="font-display text-lg">{t.score}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const quarters = [
  { teams: [{ seed: 1, name: "Tigres FC", score: 3, winner: true }, { seed: 8, name: "Pumas", score: 1 }] },
  { teams: [{ seed: 4, name: "Águias SC", score: 2, winner: true }, { seed: 5, name: "Falcões", score: 0 }], live: true },
  { teams: [{ seed: 2, name: "Leões", score: 4, winner: true }, { seed: 7, name: "Lobos", score: 2 }] },
  { teams: [{ seed: 3, name: "Dragões", score: 1 }, { seed: 6, name: "Cobras", score: 2, winner: true }] },
];

const semis = [
  { teams: [{ seed: 1, name: "Tigres FC", score: 2, winner: true }, { seed: 4, name: "Águias SC", score: 1 }] },
  { teams: [{ seed: 2, name: "Leões", score: "-" }, { seed: 6, name: "Cobras", score: "-" }] },
];

const finals = [
  { teams: [{ seed: 1, name: "Tigres FC", score: "-" }, { seed: "?", name: "A definir", score: "-" }] },
];

const scorers = [
  { name: "Carlos Mendes", team: "Tigres FC", goals: 8 },
  { name: "Rafael Torres", team: "Leões", goals: 6 },
  { name: "Bruno Silva", team: "Águias SC", goals: 5 },
  { name: "Pedro Lima", team: "Cobras", goals: 4 },
];
