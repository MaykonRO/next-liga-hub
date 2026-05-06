interface StatusPillProps {
  variant: "live" | "open" | "closed" | "approved" | "pending" | "rejected";
  children: React.ReactNode;
}

export function StatusPill({ variant, children }: StatusPillProps) {
  const styles: Record<string, string> = {
    live: "bg-success/15 text-success border-success/30",
    open: "bg-primary/15 text-[#5b87ff] border-primary/30",
    closed: "bg-muted text-muted-foreground border-border",
    approved: "bg-success/15 text-success border-success/30",
    pending: "bg-gold/15 text-gold border-gold/30",
    rejected: "bg-danger/15 text-danger border-danger/30",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${styles[variant]}`}>
      {variant === "live" && (
        <span className="relative w-1.5 h-1.5 rounded-full bg-success pulse-dot text-success" />
      )}
      {children}
    </span>
  );
}
