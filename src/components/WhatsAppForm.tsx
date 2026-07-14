import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { subscribeWhatsapp } from "@/lib/excel.functions";
import { cn } from "@/lib/utils";

interface WhatsAppFormProps {
  heading?: string;
  subheading?: string;
  supportText?: string;
  idPrefix: string;
  variant?: "default" | "side";
}

export function WhatsAppForm({
  heading,
  subheading,
  supportText,
  idPrefix,
  variant = "default",
}: WhatsAppFormProps) {
  const [value, setValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const subscribe = useServerFn(subscribeWhatsapp);

  const inputId = `${idPrefix}-whatsapp`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleaned = value.replace(/[^\d]/g, "");
    if (cleaned.length < 8) {
      setError("Ingresa un número de WhatsApp válido.");
      return;
    }
    setError(null);
    setSubmitting(true);

    // Persistir para etiquetar etapas siguientes (checkout, etc.)
    try {
      localStorage.setItem("lead_whatsapp", value.trim());
    } catch {}

    // 1) Abrir WhatsApp con mensaje predeterminado al número
    const waMessage = encodeURIComponent("Quiero ver el sistema");
    window.open(
      `https://wa.me/522223288421?text=${waMessage}`,
      "_blank",
      "noopener,noreferrer",
    );

    // 2) Guardar en Google Sheets en segundo plano
    subscribe({ data: { whatsapp: value.trim() } }).catch((err) => {
      console.error("[sheets] save failed", err);
    });

    // 3) Redirigir al acelerador
    navigate({ to: "/acelerador" });
  }

  const isSide = variant === "side";

  return (
    <div className={cn("w-full", isSide ? "max-w-md" : "max-w-xl mx-auto")}>
      {heading || supportText || subheading ? (
        <div className={cn("mb-5", isSide ? "text-left" : "text-center")}>
          {heading ? (
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {heading}
            </h3>
          ) : null}
          {supportText ? (
            <p className="mt-2 text-sm md:text-base text-[#C9CDD1]">
              {supportText}
            </p>
          ) : null}
          {subheading ? (
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              {subheading}
            </p>
          ) : null}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        {!showInput ? (
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="group w-full h-14 rounded-xl bg-brand text-brand-foreground font-black tracking-wide text-base md:text-lg uppercase animate-pulse-glow transition-all duration-200 hover:bg-brand-hover hover:-translate-y-1 hover:shadow-glow-strong"
          >
            Sí, quiero el video gratis
          </button>
        ) : (
          <>
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-foreground"
            >
              ¿A qué WhatsApp te lo mando?
            </label>
            <input
              id={inputId}
              name="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+52 55 1234 5678"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-14 px-5 rounded-xl bg-input-bg border border-hairline text-foreground text-base md:text-lg placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
            />

            {error ? (
              <p className="text-sm text-destructive font-medium" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="group w-full h-14 rounded-xl bg-brand text-brand-foreground font-black tracking-wide text-base md:text-lg uppercase animate-pulse-glow transition-all duration-200 hover:bg-brand-hover hover:-translate-y-1 hover:shadow-glow-strong disabled:opacity-70 disabled:translate-y-0"
            >
              Mándamelo ahora
            </button>
          </>
        )}

        <p className="text-center text-xs md:text-sm text-muted-foreground pt-1">
          Te llega un solo mensaje con el video. Sin llamadas, sin spam.
        </p>
      </form>
    </div>
  );
}
