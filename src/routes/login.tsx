import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — NextLiga" },
      { name: "description", content: "Acesse sua conta NextLiga para gerenciar seus campeonatos." },
      { property: "og:title", content: "Entrar — NextLiga" },
      { property: "og:description", content: "Acesse sua conta NextLiga." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="font-display text-3xl tracking-wider text-foreground">NEXTLIGA</span>
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        </Link>

        <h1 className="text-xl font-semibold text-foreground text-center mb-1">Bem-vindo de volta</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Entre na sua conta para continuar</p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-foreground">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-foreground">Senha</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
          >
            Entrar
          </Button>

          <div className="text-center">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Esqueci minha senha
            </a>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <span className="text-sm text-muted-foreground">Não tem conta? </span>
          <a href="#" className="text-sm text-primary hover:text-primary-hover font-medium">
            Cadastre-se
          </a>
        </div>
      </div>
    </main>
  );
}
