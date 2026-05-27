import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Trophy, Users, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const equipe = {
  name: "Tigres FC",
  sport: "Futebol",
  current: 8,
  max: 12,
  initials: "TF",
};

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

  return (
    <AppShell>
      <Topbar title="Gerenciar equipe" subtitle="Administração da equipe" action={<span />} />
      <main className="p-4 lg:p-8 space-y-6">
        {/* Header da equipe */}
        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3d6ef5] to-[#5b87ff] flex items-center justify-center font-display text-2xl text-white flex-shrink-0">
              {equipe.initials}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl">{equipe.name}</h2>
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
            <div className="mt-3 font-display text-2xl">{equipe.sport}</div>
          </div>
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
              <Users className="w-4 h-4 text-[#5b87ff]" /> Participantes
            </div>
            <div className="mt-3 font-display text-2xl">
              {equipe.current} <span className="text-muted-foreground text-lg">/ {equipe.max}</span>
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
                      <div className="text-[11px] text-muted-foreground">Solicitou entrada na equipe</div>
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
