import videoAsset from "@/assets/historia-exito.mp4.asset.json";

interface HistoriaExitoProps {
  light?: boolean;
}

export function HistoriaExito({ light }: HistoriaExitoProps) {
  return (
    <section className={light ? "py-6" : "bg-background px-4 py-14 md:py-20"}>
      <div className={`mx-auto text-center ${light ? "max-w-2xl" : "max-w-3xl px-4"}`}>
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${light ? "border-[#FF6B00] text-[#FF6B00] bg-[#FFF8F3]" : "border-brand bg-background text-brand"}`}
        >
          Historia de éxito
        </span>
        <h2 className={`mt-4 font-black tracking-tight ${light ? "text-[#222222] text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
          Él ya lo hizo.{" "}
          <span className="text-[#FF6B00]">¿Y tú cuándo vas a empezar?</span>
        </h2>
        <p className={`mt-3 text-base md:text-lg ${light ? "text-[#777777]" : "text-muted-foreground"}`}>
          Mira cómo esta persona ya está viviendo de Amazon con este sistema — y
          descubre lo que te espera a ti.
        </p>

        <div className={`mx-auto w-full ${light ? "mt-6 max-w-lg" : "mt-8 max-w-2xl"}`}>
          <div
            className={`relative overflow-hidden rounded-2xl border ${light ? "bg-white border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.08)]" : "bg-surface border-hairline shadow-[0_0_40px_-10px_var(--brand)]"}`}
          >
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

