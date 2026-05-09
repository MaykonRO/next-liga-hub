import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/campeonatos/novo")({
  head: () => ({
    meta: [
      { title: "Criar campeonato — NextLiga" },
      { name: "description", content: "Crie um novo campeonato no NextLiga." },
    ],
  }),
  component: NewChampionship,
});

const inputCls =
  "w-full h-11 px-3 rounded-lg bg-input border border-border focus:border-primary outline-none text-sm placeholder:text-muted-foreground";
const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5";

function SectionHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-6 h-6 rounded-md bg-[rgba(61,110,245,0.15)] text-[#5b87ff] text-xs font-semibold flex items-center justify-center">
        {index}
      </span>
      <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function NewChampionship() {
  return (
    <AppShell>
      <Topbar
        title="Criar campeonato"
        subtitle="Preencha as informações do novo torneio"
        action={<span />}
      />
      <main className="p-4 lg:p-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-6xl mx-auto rounded-2xl bg-surface border border-border p-6 lg:p-8 space-y-10"
        >
          {/* Section 1 */}
          <section>
            <SectionHeader index={1} title="Informações gerais" />
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Nome do campeonato</label>
                <input className={inputCls} placeholder="Ex: Copa Verão 2026" />
              </div>
              <div>
                <label className={labelCls}>Descrição</label>
                <textarea
                  rows={3}
                  className={`${inputCls} h-auto py-2.5 resize-none`}
                  placeholder="Conte um pouco sobre o torneio..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Modalidade esportiva</label>
                  <select className={inputCls}>
                    <option>Futebol</option>
                    <option>Futsal</option>
                    <option>Vôlei</option>
                    <option>Basquete</option>
                    <option>Handebol</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Formato</label>
                  <select className={inputCls}>
                    <option>Mata-mata</option>
                    <option>Grupos</option>
                    <option>Grupos + Mata-mata</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <SectionHeader index={2} title="Datas e vagas" />
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Data de início</label>
                  <input type="date" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Data de encerramento</label>
                  <input type="date" className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Prazo de inscrição</label>
                  <input type="date" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Limite de equipes</label>
                  <input type="number" min={2} className={inputCls} placeholder="16" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Atletas por equipe</label>
                  <input type="number" min={1} className={inputCls} placeholder="11" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <SectionHeader index={3} title="Local" />
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Nome do local</label>
                <input className={inputCls} placeholder="Ex: Arena Central" />
              </div>
              <div>
                <label className={labelCls}>Endereço</label>
                <input className={inputCls} placeholder="Rua, número, bairro" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Cidade</label>
                  <input className={inputCls} placeholder="São Paulo" />
                </div>
                <div>
                  <label className={labelCls}>Estado</label>
                  <input className={inputCls} placeholder="SP" />
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <Link
              to="/dashboard"
              className="h-11 px-5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition flex items-center"
            >
              Cancelar
            </Link>
            <Link to="/dashboard" type="submit">
              <button
                type="submit"
                className="h-11 px-6 rounded-lg bg-primary hover:bg-primary-hover transition text-sm font-semibold text-primary-foreground"
              >
                Criar campeonato
              </button>
            </Link>
          </div>
        </form>
      </main>
    </AppShell>
  );
}
