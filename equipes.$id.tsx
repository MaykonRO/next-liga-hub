import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Users, Calendar, Shield } from "lucide-react";

export const Route = createFileRoute("/equipes/$id")({
  head: () => ({
    meta: [
      { title: "Visualizar equipe — NextLiga" },
      { name: "description", content: "Detalhes da equipe." },
    ],
  }),
  component: VisualizarEquipePage,
});

const equipes = [
  {
    id: "1",
    name: "Tigres FC",
    sport: "Futebol",
    players: 18,
    championships: 3,
    initials: "TF",
    color: "from-[#3d6ef5] to-[#5b87ff]",
    founded: "2018",
    captain: "Rafael Souza",
    campeonatos: ["Copa Verão 2026", "Liga Municipal 2025", "Torneio Aberto 2024"],
    atletas: [
      { id: "1", name: "Rafael Souza", initials: "RS", role: "Capitão" },
      { id: "2", name: "Matheus Oliveira", initials: "MO", role: "Atleta" },
      { id: "3", name: "Gabriel Ferreira", initials: "GF", role: "Atleta" },
      { id: "4", name: "Ricardo Pereira", initials: "RP", role: "Atleta" },
      { id: "5", name: "Felipe Andrade", initials: "FA", role: "Atleta" },
      { id: "6", name: "Lucas Martins", initials: "LM", role: "Atleta" },
    ],
  },
  {
    id: "2",
    name: "Águias SC",
    sport: "Futebol",
    players: 22,
    championships: 5,
    initials: "AS",
    color: "from-[#e8a93b] to-[#f0c36b]",
    founded: "2015",
    captain: "Paulo Henrique",
    campeonatos: ["Copa Regional 2025", "Liga Estadual 2024"],
    atletas: [
      { id: "1", name: "Paulo Henrique", initials: "PH", role: "Capitão" },
      { id: "2", name: "Carlos Eduardo", initials: "CE", role: "Atleta" },
      { id: "3", name: "André Lima", initials: "AL", role: "Atleta" },
    ],
  },
  {
    id: "3",
    name: "Leões da Vila",
    sport: "Futsal",
    players: 14,
    championships: 2,
    initials: "LV",
    color: "from-[#3d6ef5] to-[#7aa0ff]",
    founded: "2020",
    captain: "Bruno Costa",
    campeonatos: ["Copa Futsal 2025"],
    atletas: [
      { id: "1", name: "Bruno Costa", initials: "BC", role: "Capitão" },
      { id: "2", name: "Diego Alves", initials: "DA", role: "Atleta" },
    ],
  },
  {
    id: "4",
    name: "Pumas Vôlei",
    sport: "Vôlei",
    players: 12,
    championships: 4,
    initials: "PV",
    color: "from-[#22c55e] to-[#4ade80]",
    founded: "2017",
    captain: "Fernanda Ramos",
    campeonatos: ["Liga Vôlei 2026", "Copa Regional Vôlei 2025"],
    atletas: [
      { id: "1", name: "Fernanda Ramos", initials: "FR", role: "Capitão" },
      { id: "2", name: "Juliana Silva", initials: "JS", role: "Atleta" },
    ],
  },
  {
    id: "5",
    name: "Dragões Basquete",
    sport: "Basquete",
    players: 10,
    championships: 1,
    initials: "DB",
    color: "from-[#e85d3a] to-[#f08164]",
    founded: "2021",
    captain: "Thiago Nascimento",
    campeonatos: ["Torneio Basquete 2024"],
    atletas: [
      { id: "1", name: "Thiago Nascimento", initials: "TN", role: "Capitão" },
      { id: "2", name: "Marcos Vinicius", initials: "MV", role: "Atleta" },
    ],
  },
  {
    id: "6",
    name: "Falcões FC",
    sport: "Futebol",
    players: 20,
    championships: 2,
    initials: "FF",
    color: "from-[#5b87ff] to-[#a78bfa]",
    founded: "2019",
    captain: "Eduardo Campos",
    campeonatos: ["Liga Municipal 2024"],
    atletas: [
      { id: "1", name: "Eduardo Campos", initials: "EC", role: "Capitão" },
      { id: "2", name: "Rodrigo Lima", initials: "RL", role: "Atleta" },
    ],
  },
  {
    id: "7",
    name: "Lobos do Sul",
    sport: "Futebol",
    players: 19,
    championships: 6,
    initials: "LS",
    color: "from-[#e8a93b] to-[#e85d3a]",
    founded: "2013",
    captain: "Sandro Melo",
    campeonatos: ["Copa Verão 2026", "Liga Estadual 2025", "Copa Regional 2024"],
    atletas: [
      { id: "1", name: "Sandro Melo", initials: "SM", role: "Capitão" },
      { id: "2", name: "Igor Santos", initials: "IS", role: "Atleta" },
    ],
  },
  {
    id: "8",
    name: "Tubarões Brancos",
    sport: "Vôlei",
    players: 13,
    championships: 0,
    initials: "TB",
    color: "from-[#22c55e] to-[#3d6ef5]",
    founded: "2023",
    captain: "Amanda Freitas",
    campeonatos: [],
    atletas: [
      { id: "1", name: "Amanda Freitas", initials: "AF", role: "Capitão" },
      { id: "2", name: "Patricia Gomes", initials: "PG", role: "Atleta" },
    ],
  },
];

function VisualizarEquipePage() {
  const { id } = Route.useParams();
  const equipe = equipes.find((e) => e.id === id);

  if (!equipe) {
    return (
      <AppShell>
        <Topbar title="Equipe não encontrada" subtitle="" />
        <main className="p-4 lg:p-8">
          <p className="text-muted-foreground text-sm">
            Esta equipe não existe ou foi removida.{" "}
            <Link to="/equipes" className="text-[#5b87ff] underline">
              Voltar para equipes
            </Link>
          </p>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Topbar
        title="Visualizar equipe"
        subtitle="Informações da equipe"
        action={
          <Link
            to="/equipes"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar
          </Link>
        }
      />

      <main className="p-4 lg:p-8 space-y-6">

        {/* Header da equipe */}
        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${equipe.color} flex items-center justify-center font-display text-2xl text-white flex-shrink-0`}
            >
              {equipe.initials}
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-medium transition-colors"
              >
                Cadastrar-se
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-3xl">{equipe.name}</h2>
              <span className="inline-block mt-2 text-[11px] px-2.5 py-1 rounded bg-primary/10 text-[#5b87ff] border border-primary/20">
                {equipe.sport}
              </span>
            </div>
          </div>

        </section>

        {/* Cards de info */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
              <Users className="w-4 h-4 text-[#5b87ff]" /> Atletas
            </div>
            <div className="mt-3 font-display text-2xl">{equipe.players}</div>
          </div>
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
              <Trophy className="w-4 h-4 text-gold" /> Títulos
            </div>
            <div className="mt-3 font-display text-2xl">{equipe.championships}</div>
          </div>
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
              <Calendar className="w-4 h-4 text-muted-foreground" /> Fundação
            </div>
            <div className="mt-3 font-display text-2xl">{equipe.founded}</div>
          </div>
        </section>

        {/* Capitão */}
        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-gold" />
            <h3 className="font-display text-lg">Capitão</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e8a93b] to-[#f0c36b] flex items-center justify-center text-xs font-semibold text-white">
              {equipe.captain.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="text-sm font-medium">{equipe.captain}</div>
              <div className="text-[11px] text-muted-foreground">Capitão da equipe</div>
            </div>
          </div>
        </section>

        {/* Campeonatos */}
        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg">Campeonatos disputados</h3>
              <p className="text-xs text-muted-foreground">
                Histórico de participações
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {equipe.campeonatos.length} no total
            </span>
          </div>

          {equipe.campeonatos.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Esta equipe ainda não disputou nenhum campeonato.
            </div>
          ) : (
            <ul className="space-y-2">
              {equipe.campeonatos.map((camp, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
                >
                  <Trophy className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-sm">{camp}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Lista de atletas */}
        <section className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg">Atletas</h3>
              <p className="text-xs text-muted-foreground">
                Membros ativos da equipe
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {equipe.atletas.length} exibidos
            </span>
          </div>

          <ul className="space-y-2">
            {equipe.atletas.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3d6ef5] to-[#5b87ff] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                  {a.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="text-[11px] text-muted-foreground">{a.role}</div>
                </div>
                {a.role === "Capitão" && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">
                    Capitão
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

      </main>
    </AppShell>
  );
}
