import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Plus, Trophy, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/gerenciar-equipe")({
  head: () => ({
    meta: [
      { title: "Gerenciar equipe — NextLiga" },
      { name: "description", content: "Gerencie sua equipe Tigres FC." },
    ],
  }),
  component: GerenciarEquipePage,
});

interface Equipe {
  id: string;
  name: string;
  sport: string;
  current: number;
  max: number;
  initials: string;
  color: string;
  championships: number;
}

const equipesDisponiveis: Equipe[] = [
  {
    id: "tigres",
    name: "Tigres FC",
    sport: "Futebol",
    current: 8,
    max: 12,
    initials: "TF",
    color: "from-[#3d6ef5] to-[#5b87ff]",
    championships: 3,
  },
  {
    id: "leoes",
    name: "Leões Unidos",
    sport: "Futsal",
    current: 6,
    max: 10,
    initials: "LU",
    color: "from-[#22c55e] to-[#4ade80]",
    championships: 2,
  },
  {
    id: "aguias",
    name: "Águias do Norte",
    sport: "Vôlei",
    current: 12,
    max: 15,
    initials: "AN",
    color: "from-[#e8a93b] to-[#f0c36b]",
    championships: 1,
  },
];

const campeonatosDisponiveis = [
  { id: "c1", name: "Copa Regional 2026" },
  { id: "c2", name: "Liga Municipal de Inverno" },
  { id: "c3", name: "Torneio Aberto NextLiga" },
  { id: "c4", name: "Campeonato Estadual Sub-23" },
];

interface Candidato {
  id: string;
  name: string;
  initials: string;
}

const initialCandidatos: Candidato[] = [
  { id: "1", name: "Matheus Oliveira", initials: "MO" },
  { id: "2", name: "Gabriel Ferreira", initials: "GF" },
  { id: "3", name: "Ricardo Pereira", initials: "RP" },
  { id: "4", name: "Felipe Andrade", initials: "FA" },
];

function GerenciarEquipePage() {
  const [equipeSelecionada, setEquipeSelecionada] = useState<Equipe | null>(null);
  const [candidatos, setCandidatos] = useState(initialCandidatos);
  const [showSelect, setShowSelect] = useState(false);
  const [campeonato, setCampeonato] = useState<string>("");

  const handleAprovar = (c: Candidato) => {
    setCandidatos((prev) => prev.filter((x) => x.id !== c.id));
    toast.success(`${c.name} foi aprovado na equipe.`);
  };

  const handleRecusar = (c: Candidato) => {
    setCandidatos((prev) => prev.filter((x) => x.id !== c.id));
    toast(`${c.name} foi recusado.`);
  };

  const handleInscrever = (value: string) => {
    setCampeonato(value);
    const camp = campeonatosDisponiveis.find((c) => c.id === value);
    if (camp) {
      toast.success(`Equipe inscrita em ${camp.name}!`);
      setTimeout(() => {
        setShowSelect(false);
        setCampeonato("");
      }, 400);
    }
  };

  const handleSelecionarEquipe = (equipe: Equipe) => {
    setEquipeSelecionada(equipe);
    toast.success(`Equipe ${equipe.name} selecionada!`);
  };

  const handleVoltarSelecao = () => {
    setEquipeSelecionada(null);
  };

  // Se nenhuma equipe foi selecionada, mostra a tela de seleção
  if (!equipeSelecionada) {
    return (
      <AppShell>
        <Topbar
          title="Gerenciar equipe"
          subtitle="Selecione uma equipe para gerenciar"
          action={<span />}
        />
        <main className="p-4 lg:p-8 space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-display text-2xl">Selecione uma equipe</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {equipesDisponiveis.length} equipes disponíveis para gerenciar
              </p>
            </div>
            <Link
              to="/equipes/nova"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Criar equipe
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipesDisponiveis.map((equipe) => (
              <button
                key={equipe.id}
                onClick={() => handleSelecionarEquipe(equipe)}
                className="p-5 rounded-2xl bg-surface border border-border card-hover cursor-pointer hover:border-primary/40 transition-colors text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${equipe.color} flex items-center justify-center font-display text-lg text-white flex-shrink-0`}
                  >
                    {equipe.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{equipe.name}</h3>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-primary/10 text-[#5b87ff] border border-primary/20">
                      {equipe.sport}
                    </span>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">
                        {equipe.current}/{equipe.max}
                      </div>
                      <div className="text-[10px] text-muted-foreground">Membros</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-gold" />
                    <div>
                      <div className="text-sm font-medium">{equipe.championships}</div>
                      <div className="text-[10px] text-muted-foreground">Títulos</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      </AppShell>
    );
  }

  // Se uma equipe foi selecionada, mostra a tela de gerenciamento
  return (
    <AppShell>
      <Topbar
        title="Gerenciar equipe"
        subtitle="Administração da equipe"
        action={
          <Button variant="outline" size="sm" onClick={handleVoltarSelecao}>
            Trocar equipe
          </Button>
        }
      />
      <main className="p-4 lg:p-8 space-y-6">
        {/* Botão voltar */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleVoltarSelecao}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar à seleção
          </Button>
        </div>

        {/* Header da equipe */}
        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${equipeSelecionada.color} flex items-center justify-center font-display text-2xl text-white flex-shrink-0`}
            >
              {equipeSelecionada.initials}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl">{equipeSelecionada.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">Painel de gerenciamento</p>
            </div>
          </div>
        </section>

        {/* Cards de info */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
              <Trophy className="w-4 h-4 text-gold" /> Modalidade
            </div>
            <div className="mt-3 font-display text-2xl">{equipeSelecionada.sport}</div>
          </div>
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
              <Users className="w-4 h-4 text-[#5b87ff]" /> Participantes
            </div>
            <div className="mt-3 font-display text-2xl">
              {equipeSelecionada.current}{" "}
              <span className="text-muted-foreground text-lg">/ {equipeSelecionada.max}</span>
            </div>
          </div>
        </section>

        {/* Inscrever em campeonato */}
        <section className="p-6 rounded-2xl bg-surface border border-border space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-display text-lg">Inscrição em campeonato</h3>
              <p className="text-xs text-muted-foreground">
                Inscreva sua equipe em um campeonato disponível.
              </p>
            </div>
            {!showSelect && (
              <button
                type="button"
                onClick={() => setShowSelect(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-medium transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Inscrever equipe em um campeonato
              </button>
            )}
          </div>
          {showSelect && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={campeonato} onValueChange={handleInscrever}>
                <SelectTrigger className="bg-background border-border sm:max-w-md">
                  <SelectValue placeholder="Selecione um campeonato" />
                </SelectTrigger>
                <SelectContent>
                  {campeonatosDisponiveis.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setShowSelect(false)}>
                Cancelar
              </Button>
            </div>
          )}
        </section>

        {/* Solicitações */}
        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg">Solicitações de candidatos</h3>
              <p className="text-xs text-muted-foreground">
                Aprove ou recuse jogadores que desejam entrar na equipe.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">{candidatos.length} pendentes</span>
          </div>

          {candidatos.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Nenhuma solicitação pendente no momento.
            </div>
          ) : (
            <ul className="space-y-2">
              {candidatos.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-xl bg-background border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3d6ef5] to-[#5b87ff] flex items-center justify-center text-xs font-semibold text-white">
                      {c.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        Solicitou entrada na equipe
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => handleAprovar(c)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Aprovar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRecusar(c)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Recusar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </AppShell>
  );
}
