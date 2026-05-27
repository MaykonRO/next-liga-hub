import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/equipes")({
  head: () => ({
    meta: [
      { title: "Equipes — NextLiga" },
      { name: "description", content: "Lista de equipes cadastradas na plataforma." },
    ],
  }),
  component: EquipesPage,
});

const equipes = [
  { id: "1", name: "Tigres FC", sport: "Futebol", players: 18, championships: 3, initials: "TF", color: "from-[#3d6ef5] to-[#5b87ff]" },
  { id: "2", name: "Águias SC", sport: "Futebol", players: 22, championships: 5, initials: "AS", color: "from-[#e8a93b] to-[#f0c36b]" },
  { id: "3", name: "Leões da Vila", sport: "Futsal", players: 14, championships: 2, initials: "LV", color: "from-[#3d6ef5] to-[#7aa0ff]" },
  { id: "4", name: "Pumas Vôlei", sport: "Vôlei", players: 12, championships: 4, initials: "PV", color: "from-[#22c55e] to-[#4ade80]" },
  { id: "5", name: "Dragões Basquete", sport: "Basquete", players: 10, championships: 1, initials: "DB", color: "from-[#e85d3a] to-[#f08164]" },
  { id: "6", name: "Falcões FC", sport: "Futebol", players: 20, championships: 2, initials: "FF", color: "from-[#5b87ff] to-[#a78bfa]" },
  { id: "7", name: "Lobos do Sul", sport: "Futebol", players: 19, championships: 6, initials: "LS", color: "from-[#e8a93b] to-[#e85d3a]" },
  { id: "8", name: "Tubarões Brancos", sport: "Vôlei", players: 13, championships: 0, initials: "TB", color: "from-[#22c55e] to-[#3d6ef5]" },
];

function EquipesPage() {
  return (
    <AppShell>
      <Topbar title="Equipes" subtitle="Gerencie todas as equipes cadastradas" />
      <main className="p-4 lg:p-8 space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-2xl">Todas as equipes</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {equipes.length} equipes cadastradas na plataforma
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Criar equipe
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipes.map((eq) => (
            <Link
              key={eq.id}
              to="/equipes/$id"
              params={{ id: eq.id }}
              className="p-5 rounded-2xl bg-surface border border-border card-hover cursor-pointer block hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${eq.color} flex items-center justify-center font-display text-lg text-white flex-shrink-0`}
                >
                  {eq.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold truncate">{eq.name}</h3>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-primary/10 text-[#5b87ff] border border-primary/20">
                    {eq.sport}
                  </span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{eq.players}</div>
                    <div className="text-[10px] text-muted-foreground">Atletas</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-gold" />
                  <div>
                    <div className="text-sm font-medium">{eq.championships}</div>
                    <div className="text-[10px] text-muted-foreground">Títulos</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
