import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { createFileRoute } from "@tanstack/react-router";
import { Heart, Image as ImageIcon, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed — NextLiga" },
      { name: "description", content: "Acompanhe os melhores momentos dos campeonatos." },
      { property: "og:title", content: "Feed — NextLiga" },
      { property: "og:description", content: "Compartilhe e veja os destaques dos campeonatos." },
    ],
  }),
  component: FeedPage,
});

type Post = {
  id: string;
  name: string;
  initials: string;
  role: "Organizador" | "Atleta" | "Árbitro";
  time: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
};

const POSTS: Post[] = [
  {
    id: "1",
    name: "Carlos Mendes",
    initials: "CM",
    role: "Organizador",
    time: "há 12 min",
    text: "Final da Copa Verão 2026 confirmada para o próximo sábado, 16h, na Arena Central. Vai ter transmissão ao vivo no canal oficial da NextLiga. Nos vemos lá!",
    likes: 142,
    comments: 23,
  },
  {
    id: "2",
    name: "Juliana Rocha",
    initials: "JR",
    role: "Atleta",
    time: "há 2 h",
    text: "Que jogo intenso ontem contra o Tigres FC! 3x2 nos acréscimos e classificação garantida pra semifinal. Obrigada à torcida que lotou o ginásio!",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    likes: 318,
    comments: 47,
  },
  {
    id: "3",
    name: "Rafael Lima",
    initials: "RL",
    role: "Árbitro",
    time: "há 5 h",
    text: "Reunião técnica de árbitros marcada para terça às 19h. Vamos revisar os novos critérios de aplicação do VAR para o segundo turno. Presença obrigatória.",
    likes: 56,
    comments: 12,
  },
  {
    id: "4",
    name: "Equipe NextLiga",
    initials: "NL",
    role: "Organizador",
    time: "há 1 d",
    text: "Estatística da rodada: 38 gols marcados em 12 partidas. Média de 3,17 gols por jogo — a maior dos últimos 4 campeonatos. Parabéns aos atletas pela atuação!",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
    likes: 521,
    comments: 89,
  },
];

function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-10 h-10 text-sm" : "w-11 h-11 text-sm";
  return (
    <div
      className={`${cls} rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center font-semibold text-primary-foreground shrink-0`}
    >
      {initials}
    </div>
  );
}

function FeedPage() {
  const [text, setText] = useState("");

  return (
    <AppShell>
      <Topbar title="Feed" subtitle="Momentos da comunidade" action={<div />} />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 space-y-5">
        {/* Composer */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex gap-3">
            <Avatar initials="EU" />
            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Compartilhe um momento do campeonato..."
                rows={2}
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Imagem</span>
                </button>
                <button
                  type="button"
                  className="px-4 h-9 rounded-lg bg-primary hover:bg-primary-hover transition text-sm font-medium text-primary-foreground"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        {POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-surface border border-border rounded-xl overflow-hidden card-hover"
          >
            <div className="p-4">
              <div className="flex items-center gap-3">
                <Avatar initials={post.initials} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground text-sm">{post.name}</span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                      {post.role}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                {post.text}
              </p>
            </div>

            {post.image && (
              <div className="border-t border-border bg-background">
                <img
                  src={post.image}
                  alt=""
                  className="w-full max-h-[420px] object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="px-4 py-3 border-t border-border flex items-center gap-5 text-sm text-muted-foreground">
              <button className="flex items-center gap-2 hover:text-danger transition">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
