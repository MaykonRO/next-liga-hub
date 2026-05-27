import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, UserPlus, Users, Trophy } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/equipes/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes da equipe — NextLiga" },
      { name: "description", content: "Detalhes e membros da equipe." },
    ],
  }),
  component: EquipeDetalhesPage,
});

const equipesData: Record<
  string,
  {
    name: string;
    sport: string;
    maxPlayers: number;
    championships: number;
    initials: string;
    color: string;
    members: { name: string; role: string; initials: string }[];
  }
> = {
  "1": {
    name: "Tigres FC", sport: "Futebol", maxPlayers: 22, championships: 3, initials: "TF",
    color: "from-[#3d6ef5] to-[#5b87ff]",
    members: [
      { name: "Lucas Almeida", role: "Capitão", initials: "LA" },
      { name: "Rafael Souza", role: "Goleiro", initials: "RS" },
      { name: "Pedro Henrique", role: "Zagueiro", initials: "PH" },
      { name: "João Vitor", role: "Meia", initials: "JV" },
      { name: "Diego Santos", role: "Atacante", initials: "DS" },
      { name: "Bruno Lima", role: "Lateral", initials: "BL" },
    ],
  },
  "2": {
    name: "Águias SC", sport: "Futebol", maxPlayers: 22, championships: 5, initials: "AS",
    color: "from-[#e8a93b] to-[#f0c36b]",
    members: [
      { name: "Carlos Eduardo", role: "Capitão", initials: "CE" },
      { name: "Marcos Vinícius", role: "Goleiro", initials: "MV" },
      { name: "Felipe Costa", role: "Zagueiro", initials: "FC" },
    ],
  },
  "3": {
    name: "Leões da Vila", sport: "Futsal", maxPlayers: 14, championships: 2, initials: "LV",
    color: "from-[#3d6ef5] to-[#7aa0ff]",
    members: [
      { name: "André Silva", role: "Capitão", initials: "AS" },
      { name: "Thiago Rocha", role: "Pivô", initials: "TR" },
    ],
  },
  "4": {
    name: "Pumas Vôlei", sport: "Vôlei", maxPlayers: 12, championships: 4, initials: "PV",
    color: "from-[#22c55e] to-[#4ade80]",
    members: [
      { name: "Mariana Lopes", role: "Líbero", initials: "ML" },
      { name: "Camila Reis", role: "Levantadora", initials: "CR" },
      { name: "Beatriz Nunes", role: "Ponteira", initials: "BN" },
    ],
  },
  "5": {
    name: "Dragões Basquete", sport: "Basquete", maxPlayers: 12, championships: 1, initials: "DB",
    color: "from-[#e85d3a] to-[#f08164]",
    members: [
      { name: "Gustavo Mendes", role: "Armador", initials: "GM" },
      { name: "Rodrigo Tavares", role: "Pivô", initials: "RT" },
    ],
  },
  "6": {
    name: "Falcões FC", sport: "Futebol", maxPlayers: 22, championships: 2, initials: "FF",
    color: "from-[#5b87ff] to-[#a78bfa]",
    members: [{ name: "Vinícius Barros", role: "Capitão", initials: "VB" }],
  },
  "7": {
    name: "Lobos do Sul", sport: "Futebol", maxPlayers: 22, championships: 6, initials: "LS",
    color: "from-[#e8a93b] to-[#e85d3a]",
    members: [{ name: "Henrique Dias", role: "Capitão", initials: "HD" }],
  },
  "8": {
    name: "Tubarões Brancos", sport: "Vôlei", maxPlayers: 12, championships: 0, initials: "TB",
    color: "from-[#22c55e] to-[#3d6ef5]",
    members: [{ name: "Letícia Moraes", role: "Capitã", initials: "LM" }],
  },
};

function EquipeDetalhesPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const equipe = equipesData[id];

  if (!equipe) {
    return (
      <AppShell>
        <Topbar title="Equipe não encontrada" />
        <main className="p-8">
          <Link to="/equipes" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Voltar para equipes
          </Link>
        </main>
      </AppShell>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setOpen(false);
    toast.success(`Inscrição confirmada em ${equipe.name}!`);
    navigate({ to: "/equipes" });
  };

  return (
    <AppShell>
      <Topbar title={equipe.name} subtitle="Detalhes da equipe" action={<span />} />
      <main className="p-4 lg:p-8 space-y-6">
        <Link
          to="/equipes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para equipes
        </Link>

        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
            <div className="flex items-center gap-5">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${equipe.color} flex items-center justify-center font-display text-2xl text-white flex-shrink-0`}
              >
                {equipe.initials}
              </div>
              <div>
                <h2 className="font-display text-2xl">{equipe.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-primary/10 text-[#5b87ff] border border-primary/20">
                    {equipe.sport}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground inline-flex items-center gap-1">
                    <Users className="w-3 h-3" /> {equipe.members.length} / {equipe.maxPlayers} participantes
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-surface border border-border text-muted-foreground inline-flex items-center gap-1">
                    <Trophy className="w-3 h-3 text-gold" /> {equipe.championships} títulos
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-medium transition-colors w-full sm:w-auto justify-center"
            >
              <UserPlus className="w-4 h-4" />
              Inscrever-se na equipe
            </button>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Membros</h3>
            <span className="text-xs text-muted-foreground">
              {equipe.members.length} / {equipe.maxPlayers} participantes
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {equipe.members.map((m) => (
              <li
                key={m.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${equipe.color} flex items-center justify-center text-xs font-semibold text-white`}
                >
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{m.name}</div>
                  <div className="text-[11px] text-muted-foreground">{m.role}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-surface border-border">
          <DialogHeader>
            <DialogTitle>Confirmar inscrição</DialogTitle>
            <DialogDescription>
              Deseja confirmar sua inscrição na equipe <span className="text-foreground font-medium">{equipe.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} disabled={loading}>
              {loading ? "Confirmando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
