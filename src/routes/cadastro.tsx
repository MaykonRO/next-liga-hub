import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — NextLiga" },
      { name: "description", content: "Crie sua conta NextLiga e comece a gerenciar campeonatos." },
      { property: "og:title", content: "Criar conta — NextLiga" },
      { property: "og:description", content: "Crie sua conta NextLiga." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [role, setRole] = useState<"organizador" | "atleta">("organizador");

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="font-display text-3xl tracking-wider text-foreground">NEXTLIGA</span>
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        </Link>

        <h1 className="text-xl font-semibold text-foreground text-center mb-1">Criar sua conta</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Comece a gerenciar campeonatos hoje</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-foreground">Nome completo</label>
            <Input id="name" type="text" placeholder="Seu nome"
              className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-foreground">E-mail</label>
            <Input id="email" type="email" placeholder="voce@email.com"
              className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-foreground">Senha</label>
            <Input id="password" type="password" placeholder="••••••••"
              className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary" />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm text-foreground">Confirmar senha</label>
            <Input id="confirm" type="password" placeholder="••••••••"
              className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary" />
          </div>

          <div className="space-y-2">
            <span className="text-sm text-foreground">Tipo de conta</span>
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-1 bg-input">
              {(["organizador", "atleta"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "h-10 rounded-md text-sm font-medium transition-colors",
                    role === r
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r === "organizador" ? "Organizador" : "Atleta"}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit"
            className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium">
            Criar conta
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <span className="text-sm text-muted-foreground">Já tem conta? </span>
          <Link to="/login" className="text-sm text-primary hover:text-primary-hover font-medium">
            Entrar
          </Link>
        </div>
      </div>
    </main>
  );
}
