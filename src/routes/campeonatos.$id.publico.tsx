import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusPill } from "@/components/StatusPill";
import { useState } from "react";
import { MapPin, Heart, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/campeonatos/$id/publico")({
  head: () => ({
    meta: [
      { title: "Copa Verão 2026 — Página pública" },
      { name: "description", content: "Acompanhe a Copa Verão 2026 em tempo real: jogos, classificação e momentos do campeonato." },
    ],
  }),
  component: PublicView,
});

const tabs = ["Cronograma", "Classificação", "Chaveamento", "Feed"];

function PublicView() {
  const [tab, setTab] = useState("Cronograma");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-wider">NEXTLIGA</span>
            <span className="w-2 h-2 rounded-full bg-gold" />
          </Link>
          <Link to="/dashboard" className="px-4 h-9 rounded-lg border border-border hover:border-primary/40 text-sm font-medium flex items-center">
            Entrar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <StatusPill variant="live">Ao vivo</StatusPill>
              <h1 className="font-display text-4xl lg:text-6xl mt-3">COPA VERÃO 2026</h1>
              <p className="text-muted-foreground mt-2">Futebol Society · 6 mai – 12 jun · 32 equipes</p>
            </div>
            <div className="flex gap-6 text-center">
              <div>
                <p className="font-display text-3xl text-gold">32</p>
                <p className="text-xs text-muted-foreground">Equipes</p>
              </div>
              <div>
                <p className="font-display text-3xl">14</p>
                <p className="text-xs text-muted-foreground">Jogos restantes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-border sticky top-16 bg-background/80 backdrop-blur-md z-30">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex gap-1 overflow-x-auto scroll-hide">
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
      </div>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        {tab === "Cronograma" && <Schedule />}
        {tab === "Classificação" && <Standings />}
        {tab === "Chaveamento" && <BracketSimple />}
        {tab === "Feed" && <Feed />}
      </main>
    </div>
  );
}

function Schedule() {
  const games = [
    { time: "14:00", a: "Tigres FC", b: "Águias SC", venue: "Quadra Central", live: true, score: "2 × 1" },
    { time: "16:30", a: "Leões", b: "Pumas", venue: "Quadra 2", live: false },
    { time: "19:00", a: "Dragões", b: "Falcões", venue: "Estádio Norte", live: false },
    { time: "21:00", a: "Cobras", b: "Lobos", venue: "Quadra Central", live: false },
  ];
  return (
    <div>
      <h2 className="font-display text-3xl mb-5">HOJE · QUARTA, 6 MAI</h2>
      <div className="space-y-3">
        {games.map((g, i) => (
          <div key={i} className="p-5 rounded-2xl bg-surface border border-border card-hover flex items-center gap-4 flex-wrap">
            <div className="w-20">
              <p className="font-display text-2xl text-gold">{g.time}</p>
              {g.live && <StatusPill variant="live">Live</StatusPill>}
            </div>
            <div className="flex-1 min-w-[200px] grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <p className="text-right font-medium">{g.a}</p>
              <span className="font-display text-2xl text-muted-foreground">{g.score ?? "vs"}</span>
              <p className="font-medium">{g.b}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {g.venue}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Standings() {
  const teams = [
    { team: "Tigres FC", w: 6, d: 1, l: 0, gd: "+18", pts: 19 },
    { team: "Leões", w: 5, d: 2, l: 0, gd: "+14", pts: 17 },
    { team: "Águias SC", w: 5, d: 0, l: 2, gd: "+9", pts: 15 },
    { team: "Cobras", w: 4, d: 1, l: 2, gd: "+5", pts: 13 },
    { team: "Dragões", w: 3, d: 2, l: 2, gd: "+2", pts: 11 },
    { team: "Pumas", w: 2, d: 1, l: 4, gd: "-4", pts: 7 },
  ];
  return (
    <div className="rounded-2xl bg-surface border border-border overflow-hidden">
      <div className="overflow-x-auto scroll-hide">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground bg-background/40">
            <tr>
              <th className="text-left font-medium px-5 py-3">#</th>
              <th className="text-left font-medium px-3 py-3">Equipe</th>
              <th className="text-center font-medium px-3 py-3">V</th>
              <th className="text-center font-medium px-3 py-3">E</th>
              <th className="text-center font-medium px-3 py-3">D</th>
              <th className="text-center font-medium px-3 py-3">SG</th>
              <th className="text-right font-medium px-5 py-3">PTS</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, i) => (
              <tr key={t.team} className="border-t border-border">
                <td className="px-5 py-3">
                  <span className="font-display text-lg" style={{ color: i === 0 ? "var(--gold)" : undefined }}>{i + 1}</span>
                </td>
                <td className="px-3 py-3 font-medium">{t.team}</td>
                <td className="px-3 py-3 text-center text-success">{t.w}</td>
                <td className="px-3 py-3 text-center text-muted-foreground">{t.d}</td>
                <td className="px-3 py-3 text-center text-danger">{t.l}</td>
                <td className="px-3 py-3 text-center">{t.gd}</td>
                <td className="px-5 py-3 text-right font-display text-xl">{t.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BracketSimple() {
  return (
    <div className="text-center py-16 text-muted-foreground">
      Visualize o chaveamento completo no painel do organizador.
    </div>
  );
}

function Feed() {
  const posts = [
    { author: "Tigres FC", time: "há 12 min", text: "Que vitória, time! Vamos pra semi 🐯", img: "linear-gradient(135deg,#3d6ef5,#f0a500)" },
    { author: "Organização", time: "há 1h", text: "Cronograma atualizado para esta semana.", img: "linear-gradient(135deg,#2ecf7a,#3d6ef5)" },
    { author: "Águias SC", time: "há 2h", text: "Aquecimento antes do clássico ⚽", img: "linear-gradient(135deg,#f0a500,#ff4f6a)" },
    { author: "Leões", time: "há 4h", text: "Concentração total para o próximo jogo.", img: "linear-gradient(135deg,#5b87ff,#2ecf7a)" },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((p, i) => (
        <article key={i} className="rounded-2xl bg-surface border border-border overflow-hidden card-hover">
          <div className="aspect-video" style={{ background: p.img }} />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-xs font-semibold">
                {p.author.slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{p.author}</p>
                <p className="text-xs text-muted-foreground">{p.time}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/90">{p.text}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> 24</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> 5</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
