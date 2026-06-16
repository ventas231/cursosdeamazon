import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { subscribeWhatsapp } from "@/lib/excel.functions";

interface WhatsAppFormProps {
  heading: string;
  subheading?: string;
  idPrefix: string;
}

export function WhatsAppForm({ heading, subheading, idPrefix }: WhatsAppFormProps) {
  const [value, setValue] = useState("");
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

    // 1) Abrir el grupo INMEDIATAMENTE (sincrónico, evita bloqueador de popups)
    window.open(
      "https://chat.whatsapp.com/C5W6DF1bp4MKkdwVAQcgII",
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

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-5">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">{heading}</h3>
        {subheading ? (
          <p className="mt-2 text-sm md:text-base text-muted-foreground">{subheading}</p>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        <label htmlFor={inputId} className="sr-only">
          WhatsApp
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
          Ver el sistema ahora →
        </button>

        <p className="text-center text-xs md:text-sm text-muted-foreground pt-1">
          🔒 Tu WhatsApp está 100% seguro.
        </p>
      </form>
    </div>
  );
}
