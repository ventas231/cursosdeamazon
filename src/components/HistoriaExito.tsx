import videoAsset from "@/assets/historia-exito.mp4.asset.json";

export function HistoriaExito() {
  return (
    <section className="bg-background px-4 py-14 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-brand bg-background px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
          Historia de éxito
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight">
          Resultados reales de nuestros alumnos
        </h2>
        <p className="mt-3 text-base md:text-lg text-muted-foreground">
          Mira cómo otras personas ya están viviendo de Amazon con este sistema.
        </p>

        <div className="mt-8 mx-auto w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_0_40px_-10px_var(--brand)]">
            <video
              src={videoAsset.url}
              controls
              preload="metadata"
              playsInline
              className="w-full h-auto block bg-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
