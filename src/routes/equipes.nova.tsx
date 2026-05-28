import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/equipes/nova")({
  head: () => ({
    meta: [
      { title: "Criar equipe — NextLiga" },
      { name: "description", content: "Cadastre uma nova equipe no NextLiga." },
    ],
  }),
  component: NovaEquipePage,
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

function NovaEquipePage() {
  return (
    <AppShell>
      <Topbar
        title="Criar equipe"
        subtitle="Preencha as informações da nova equipe"
        action={<span />}
      />
      <main className="p-4 lg:p-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-6xl mx-auto rounded-2xl bg-surface border border-border p-6 lg:p-8 space-y-10"
        >
          {/* Section 1 */}
          <section>
            <SectionHeader index={1} title="Informações da equipe" />
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Nome da equipe</label>
                <input className={inputCls} placeholder="Ex: Tigres FC" />
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
                  <label className={labelCls}>Limite de participantes</label>
                  <input type="number" min={2} className={inputCls} placeholder="12" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <SectionHeader index={2} title="Capitão da equipe" />
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Nome do capitão</label>
                  <input className={inputCls} placeholder="Nome completo" />
                </div>
                <div>
                  <label className={labelCls}>E-mail do capitão</label>
                  <input type="email" className={inputCls} placeholder="capitao@email.com" />
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <Link
              to="/equipes"
              className="h-11 px-5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition flex items-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="h-11 px-6 rounded-lg bg-primary hover:bg-primary-hover transition text-sm font-semibold text-primary-foreground"
            >
              Criar equipe
            </button>
          </div>
        </form>
      </main>
    </AppShell>
  );
}
