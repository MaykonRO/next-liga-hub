import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  Check,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NextLiga — Gerencie campeonatos esportivos" },
      {
        name: "description",
        content:
          "Plataforma completa para organizar, acompanhar e viver campeonatos esportivos com precisão.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-wider">NEXTLIGA</span>
            <span className="w-2 h-2 rounded-full bg-gold" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">
              Recursos
            </a>
            <a href="#roles" className="hover:text-foreground transition">
              Para quem
            </a>
            <a href="#how" className="hover:text-foreground transition">
              Como funciona
            </a>
          </nav>
          <Link
            to="/cadastro"
            className="px-4 h-9 rounded-lg bg-primary hover:bg-primary-hover transition flex items-center gap-2 text-sm font-medium"
          >
            Conheça o NextLiga <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30 text-success text-xs font-medium mb-6">
              <span className="relative w-1.5 h-1.5 rounded-full bg-success pulse-dot text-success" />
              247 campeonatos ao vivo agora
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6">
              GERENCIE SEUS
              <br />
              CAMPEONATOS
              <br />
              <span className="text-gold">COM PRECISÃO</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              A plataforma definitiva para organizadores e atletas. Inscrições, chaveamento,
              resultados e classificação — tudo em tempo real.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/campeonatos/novo"
                className="px-6 h-12 rounded-lg bg-primary hover:bg-primary-hover transition flex items-center gap-2 font-medium"
              >
                Começar grátis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/campeonatos/$id/publico"
                params={{ id: "demo" }}
                className="px-6 h-12 rounded-lg border border-border hover:border-primary/40 transition flex items-center gap-2 font-medium"
              >
                Ver campeonato demo
              </Link>
            </div>
          </div>

          <div className="relative h-[420px] hidden lg:block">
            <FloatingStat
              top="10%"
              right="0"
              icon={Users}
              label="Atletas"
              value="48.291"
              color="primary"
            />
            <FloatingStat
              top="42%"
              right="20%"
              icon={Trophy}
              label="Campeonatos ativos"
              value="1.284"
              color="gold"
            />
            <FloatingStat
              top="72%"
              right="5%"
              icon={Activity}
              label="Uptime"
              value="99.97%"
              color="success"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-3">TUDO QUE VOCÊ PRECISA</h2>
            <p className="text-muted-foreground">
              Recursos pensados para times profissionais e amadores.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-surface border border-border card-hover"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#5b87ff]" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-6">
          <RoleCard
            color="primary"
            title="Para Organizadores"
            features={[
              "Criar campeonatos ilimitados",
              "Chaveamento automático",
              "Aprovar inscrições",
              "Notificar equipes em massa",
              "Estatísticas detalhadas",
            ]}
          />
          <RoleCard
            color="gold"
            title="Para Atletas"
            features={[
              "Inscrição em poucos cliques",
              "Acompanhar partidas ao vivo",
              "Classificação atualizada",
              "Feed de fotos e vídeos",
              "Notificações personalizadas",
            ]}
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-3">EM 4 PASSOS</h2>
            <p className="text-muted-foreground">Do zero ao primeiro chute em minutos.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-surface border-2 border-primary/40 flex items-center justify-center font-display text-2xl text-[#5b87ff]">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] right-[-40%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-surface to-background border border-border text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                PRONTO PRA <span className="text-gold">COMEÇAR?</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Receba acesso antecipado e dicas de organização.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 h-12 px-4 rounded-lg bg-input border border-border focus:border-primary outline-none text-sm"
                />
                <button
                  type="button"
                  className="h-12 px-6 rounded-lg bg-gold hover:bg-gold/90 transition font-semibold text-background"
                >
                  Quero acesso
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl tracking-wider text-foreground">NEXTLIGA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
          <p>© 2026 NextLiga. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function FloatingStat({ top, right, icon: Icon, label, value, color }: any) {
  const colorMap: any = {
    primary: "border-primary/30 bg-primary/10 text-[#5b87ff]",
    gold: "border-gold/30 bg-gold/10 text-gold",
    success: "border-success/30 bg-success/10 text-success",
  };
  return (
    <div
      className="absolute p-5 rounded-2xl bg-surface/90 backdrop-blur border border-border card-hover w-56"
      style={{ top, right }}
    >
      <div
        className={`w-10 h-10 rounded-lg border ${colorMap[color]} flex items-center justify-center mb-3`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-display text-3xl">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function RoleCard({
  color,
  title,
  features,
}: {
  color: "primary" | "gold";
  title: string;
  features: string[];
}) {
  const border = color === "primary" ? "border-primary/40" : "border-gold/40";
  const dot = color === "primary" ? "text-[#5b87ff]" : "text-gold";
  return (
    <div className={`p-8 rounded-2xl bg-surface border-2 ${border} card-hover`}>
      <h3 className="font-display text-3xl mb-6">{title}</h3>
      <ul className="space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <Check className={`w-4 h-4 ${dot}`} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

const features = [
  {
    icon: Trophy,
    title: "Chaveamento automático",
    desc: "Eliminatórias, grupos ou pontos corridos com um clique.",
  },
  {
    icon: Calendar,
    title: "Cronograma inteligente",
    desc: "Agende partidas considerando disponibilidade de quadras.",
  },
  {
    icon: BarChart3,
    title: "Estatísticas em tempo real",
    desc: "Artilharia, classificação e desempenho atualizados.",
  },
  {
    icon: Bell,
    title: "Notificações",
    desc: "Alertas push para equipes, atletas e organizadores.",
  },
  {
    icon: Shield,
    title: "Aprovação de inscrições",
    desc: "Valide equipes, atletas e documentos sem fricção.",
  },
  {
    icon: Users,
    title: "Feed da comunidade",
    desc: "Fotos, vídeos e momentos do campeonato em um só lugar.",
  },
];

const steps = [
  { title: "Crie o campeonato", desc: "Modalidade, formato e regras em minutos." },
  { title: "Receba inscrições", desc: "Compartilhe o link público com as equipes." },
  { title: "Gere o chaveamento", desc: "A plataforma monta tudo automaticamente." },
  { title: "Acompanhe ao vivo", desc: "Registre placares e veja a classificação atualizar." },
];
