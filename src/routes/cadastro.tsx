import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

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

const MODALIDADES = ["Vôlei", "Futebol", "Basquete", "Tênis de mesa"] as const;
const LADOS = ["Esquerda", "Direita", "Ambidestro"] as const;

type FormState = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  modalidade: string;
  altura: string;
  peso: string;
  lado: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const inputCls =
  "h-11 bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    modalidade: "",
    altura: "",
    peso: "",
    lado: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};

    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      navigate({ to: "/login" });
    }
  };

  const errMsg = (k: keyof FormState) =>
    errors[k] ? (
      <p className="text-xs text-destructive mt-1" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="font-display text-3xl tracking-wider text-foreground">NEXTLIGA</span>
        </Link>

        <h1 className="text-xl font-semibold text-foreground text-center mb-1">Criar sua conta</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Comece a gerenciar campeonatos hoje
        </p>

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-foreground">
              Nome completo
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={!!errors.name}
              className={inputCls}
            />
            {errMsg("name")}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-foreground">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
              className={inputCls}
            />
            {errMsg("email")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-foreground">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                aria-invalid={!!errors.password}
                className={inputCls}
              />
              {errMsg("password")}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm" className="text-sm text-foreground">
                Confirmar senha
              </label>
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={(e) => set("confirm", e.target.value)}
                aria-invalid={!!errors.confirm}
                className={inputCls}
              />
              {errMsg("confirm")}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Perfil esportivo
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="modalidade" className="text-sm text-foreground">
                  Modalidade favorita
                </label>
                <Select value={form.modalidade} onValueChange={(v) => set("modalidade", v)}>
                  <SelectTrigger
                    id="modalidade"
                    aria-invalid={!!errors.modalidade}
                    className={inputCls}
                  >
                    <SelectValue placeholder="Selecione uma modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODALIDADES.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errMsg("modalidade")}
              </div>

              <div className="space-y-2">
                <label htmlFor="lado" className="text-sm text-foreground">
                  Lado dominante
                </label>
                <Select value={form.lado} onValueChange={(v) => set("lado", v)}>
                  <SelectTrigger id="lado" aria-invalid={!!errors.lado} className={inputCls}>
                    <SelectValue placeholder="Selecione o lado dominante" />
                  </SelectTrigger>
                  <SelectContent>
                    {LADOS.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errMsg("lado")}
              </div>

              <div className="space-y-2">
                <label htmlFor="altura" className="text-sm text-foreground">
                  Altura (cm)
                </label>
                <Input
                  id="altura"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="50"
                  max="280"
                  placeholder="Ex.: 178.5"
                  value={form.altura}
                  onChange={(e) => set("altura", e.target.value)}
                  aria-invalid={!!errors.altura}
                  className={inputCls}
                />
                {errMsg("altura")}
              </div>

              <div className="space-y-2">
                <label htmlFor="peso" className="text-sm text-foreground">
                  Peso (kg)
                </label>
                <Input
                  id="peso"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="20"
                  max="400"
                  placeholder="Ex.: 72.4"
                  value={form.peso}
                  onChange={(e) => set("peso", e.target.value)}
                  aria-invalid={!!errors.peso}
                  className={inputCls}
                />
                {errMsg("peso")}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
          >
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
