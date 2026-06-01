import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/acelerador")({
  head: () => ({
    meta: [
      { title: "Acelerador · Gerardo Villa" },
      { name: "description", content: "Acceso al sistema de Amazon + IA." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Acelerador,
});

function Acelerador() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/40 bg-brand-soft text-brand text-xs font-bold uppercase tracking-wider mb-6">
          🔥 Acceso confirmado
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
          Cargando sistema<span className="text-brand">…</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground">
          En unos segundos cargará el video con el sistema exacto que uso para
          lanzar productos en Amazon con IA en 60 días.
        </p>

        <div className="mt-10 aspect-video w-full rounded-2xl border border-hairline bg-surface flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-brand border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">Preparando tu acceso…</p>
          </div>
        </div>
      </div>
    </main>
  );
}
