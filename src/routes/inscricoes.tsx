import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Topbar } from "@/components/Topbar";
import { StatusPill } from "@/components/StatusPill";
import { useState, useEffect } from "react";
import { X, Check, Search } from "lucide-react";

type InscricoesSearch = { campeonato?: string; equipe?: string };

export const Route = createFileRoute("/inscricoes")({
  validateSearch: (search: Record<string, unknown>): InscricoesSearch => ({
    campeonato: typeof search.campeonato === "string" ? search.campeonato : undefined,
    equipe: typeof search.equipe === "string" ? search.equipe : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Inscrições — NextLiga" },
      { name: "description", content: "Aprove ou rejeite inscrições de equipes nos seus campeonatos." },
    ],
  }),
  component: Registrations,
});

const data = [
  { id: 1, team: "Tigres FC", sport: "Futebol", captain: "Carlos Mendes", date: "2 mai 2026", athletes: 18, status: "approved", statusLabel: "Aprovada" },
  { id: 2, team: "Águias SC", sport: "Futebol", captain: "Bruno Silva", date: "3 mai 2026", athletes: 16, status: "approved", statusLabel: "Aprovada" },
  { id: 3, team: "Leões Vôlei", sport: "Vôlei", captain: "Marina Costa", date: "4 mai 2026", athletes: 12, status: "pending", statusLabel: "Pendente" },
  { id: 4, team: "Pumas Basquete", sport: "Basquete", captain: "Pedro Almeida", date: "4 mai 2026", athletes: 10, status: "pending", statusLabel: "Pendente" },
  { id: 5, team: "Falcões", sport: "Futebol", captain: "Lucas Rocha", date: "5 mai 2026", athletes: 15, status: "rejected", statusLabel: "Rejeitada" },
  { id: 6, team: "Dragões FS", sport: "Futsal", captain: "Rafael Torres", date: "5 mai 2026", athletes: 14, status: "pending", statusLabel: "Pendente" },
];

function Registrations() {
  const [selected, setSelected] = useState<typeof data[0] | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleApprove = () => {
    setMessage({ type: 'success', text: 'Inscrição aprovada com sucesso!' });
    setSelected(null);
  };

  const handleReject = () => {
    setMessage({ type: 'error', text: 'Inscrição rejeitada com sucesso!' });
    setSelected(null);
  };

  return (
    <AppShell>
      <Topbar title="Inscrições" subtitle="Aprove ou rejeite as solicitações de equipes" />
      
      {/* Message Toast */}
      {message && (
        <div className={`mx-4 lg:mx-8 mt-4 p-4 rounded-lg border flex items-center gap-2 transition-all duration-300 ${
          message.type === 'success' 
            ? 'bg-success/10 border-success/40 text-success' 
            : 'bg-danger/10 border-danger/40 text-danger'
        }`}>
          {message.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}
      
      <main className="p-4 lg:p-8 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select className="h-10 px-3 rounded-lg bg-input border border-border focus:border-primary outline-none text-sm">
            <option>Todos os campeonatos</option>
            <option>Copa Verão 2026</option>
            <option>Liga Universitária</option>
          </select>
          <select className="h-10 px-3 rounded-lg bg-input border border-border focus:border-primary outline-none text-sm">
            <option>Todos os status</option>
            <option>Pendente</option>
            <option>Aprovada</option>
            <option>Rejeitada</option>
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Buscar equipe..." className="w-full h-10 pl-10 pr-3 rounded-lg bg-input border border-border focus:border-primary outline-none text-sm" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-surface border border-border overflow-hidden">
          <div className="overflow-x-auto scroll-hide">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground bg-background/40">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Equipe</th>
                  <th className="text-left font-medium px-3 py-3">Modalidade</th>
                  <th className="text-left font-medium px-3 py-3">Capitão</th>
                  <th className="text-left font-medium px-3 py-3">Data</th>
                  <th className="text-left font-medium px-3 py-3">Atletas</th>
                  <th className="text-left font-medium px-3 py-3">Status</th>
                  <th className="text-right font-medium px-5 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((r) => (
                  <tr key={r.id} onClick={() => setSelected(r)} className="border-t border-border hover:bg-background/40 cursor-pointer transition">
                    <td className="px-5 py-4 font-medium">{r.team}</td>
                    <td className="px-3 py-4 text-muted-foreground">{r.sport}</td>
                    <td className="px-3 py-4 text-muted-foreground">{r.captain}</td>
                    <td className="px-3 py-4 text-muted-foreground">{r.date}</td>
                    <td className="px-3 py-4 font-display text-lg">{r.athletes}</td>
                    <td className="px-3 py-4"><StatusPill variant={r.status as any}>{r.statusLabel}</StatusPill></td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-xs text-[#5b87ff]">Detalhes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-over */}
      {selected && (
        <>
          <div onClick={() => setSelected(null)} className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" />
          <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-surface border-l border-border z-50 overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl">{selected.team}</h2>
                <p className="text-xs text-muted-foreground">{selected.sport} · {selected.captain}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary/40">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-background/50 border border-border">
                  <p className="text-xs text-muted-foreground">Atletas</p>
                  <p className="font-display text-2xl">{selected.athletes}</p>
                </div>
                <div className="p-4 rounded-xl bg-background/50 border border-border">
                  <p className="text-xs text-muted-foreground">Inscrição</p>
                  <p className="text-sm mt-1">{selected.date}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Atletas inscritos</h3>
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/40">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-xs font-semibold">
                        {String.fromCharCode(65 + i)}{String.fromCharCode(75 + i)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">Atleta {i + 1}</p>
                        <p className="text-xs text-muted-foreground">Posição {i + 1}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">#{10 + i}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 sticky bottom-0 bg-surface pt-4 border-t border-border -mx-6 px-6 pb-6">
                <button 
                  onClick={handleReject}
                  className="flex-1 h-11 rounded-lg border border-danger/40 text-danger hover:bg-danger/10 transition flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <X className="w-4 h-4" /> Rejeitar
                </button>
                <button 
                  onClick={handleApprove}
                  className="flex-1 h-11 rounded-lg bg-success hover:bg-success/90 transition text-background flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <Check className="w-4 h-4" /> Aprovar
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </AppShell>
  );
}
