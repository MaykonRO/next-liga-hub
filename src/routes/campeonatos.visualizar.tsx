import { AppShell } from "@/components/AppShell";
import { StatusPill } from "@/components/StatusPill";
import { Topbar } from "@/components/Topbar";
import { VisaoGeralCampeonato } from "@/components/VisaoGeralCampeonato";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const CHAMPIONSHIP_NAME = "Copa Verão 2026";
const AVAILABLE_TEAMS = [
  "Tigres FC",
  "Águias SC",
  "Leões United",
  "Cobras EC",
  "Falcões FC",
  "Pumas Atlético",
];

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

function VisualizarCampeonato() {
  const [tab, setTab] = useState("Visão geral");
  const [open, setOpen] = useState(false);
  const [team, setTeam] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function openModal() {
    setTeam("");
    setError("");
    setOpen(true);
  }

  async function handleConfirm() {
    if (!team) {
      setError("Selecione uma equipe para continuar.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    setOpen(false);
    navigate({
      to: "/inscricoes",
      search: { campeonato: CHAMPIONSHIP_NAME, equipe: team },
    });
  }

  const action = (
    <div className="flex items-center gap-2">
      <button className="h-9 px-3 lg:px-4 rounded-lg border border-border hover:border-primary/40 text-xs font-medium">
        Editar
      </button>
      <button
        onClick={openModal}
        className="h-9 px-3 lg:px-4 rounded-lg bg-primary hover:bg-primary-hover text-xs font-medium"
      >
        Inscrever-se
      </button>
      <button className="h-9 px-3 lg:px-4 rounded-lg border border-border hover:border-primary/40 text-xs font-medium">
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
            <Link to="/dashboard" className="hover:text-foreground">
              Campeonatos
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Copa Verão 2026</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl tracking-wide">COPA VERÃO 2026</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] font-medium">
              Futebol
            </span>
            <span className="px-2.5 py-1 rounded-full bg-muted border border-border text-[11px] font-medium">
              Mata-mata
            </span>
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
        {tab === "Visão geral" && <VisaoGeralCampeonato />}

        {tab !== "Visão geral" && (
          <div className="rounded-2xl bg-surface border border-border p-10 text-center text-sm text-muted-foreground">
            Conteúdo de "{tab}" em breve.
          </div>
        )}
      </main>
    </AppShell>
  );
}
