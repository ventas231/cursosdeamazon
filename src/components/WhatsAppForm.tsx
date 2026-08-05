import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { subscribeWhatsapp } from "@/lib/excel.functions";

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
  const navigate = useNavigate();
  const isSide = variant === "side";
  const [revealed, setRevealed] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReveal = () => {
    setRevealed(true);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) || value.length > 255) {
      setError("Escribe un correo válido.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      localStorage.setItem("lead_whatsapp", value);
      await subscribeWhatsapp({ data: { whatsapp: value } });
    } catch {
      // seguimos aunque falle el registro
    }
    setLoading(false);
    navigate({ to: "/acelerador" });
  };

  return (
    <div className={cn("w-full", isSide ? "" : "max-w-xl mx-auto")}>
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

      <div className="space-y-3">
        {!revealed ? (
          <>
            <button
              type="button"
              id={`${idPrefix}-reveal`}
              onClick={handleReveal}
              className="group w-full h-14 rounded-xl bg-[#FF9900] text-black font-black tracking-wide text-base md:text-lg uppercase animate-pulse-glow transition-all duration-200 hover:bg-[#E68A00] hover:-translate-y-1 hover:shadow-glow-strong"
            >
              Sí, quiero el video gratis
            </button>
            <p
              className={cn(
                "text-xs md:text-sm text-muted-foreground pt-1",
                isSide ? "text-left" : "text-center",
              )}
            >
              Acceso inmediato al video. Sin llamadas, sin spam.
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label
              htmlFor={`${idPrefix}-email`}
              className={cn(
                "block text-sm md:text-base font-semibold text-foreground",
                isSide ? "text-left" : "text-center",
              )}
            >
              Escribe tu correo y te paso el video directo
            </label>
            <input
              ref={inputRef}
              id={`${idPrefix}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@gmail.com"
              className="w-full h-14 rounded-xl border border-hairline bg-surface px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            />
            {error ? (
              <p className="text-xs md:text-sm text-destructive">{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="group w-full h-14 rounded-xl bg-[#FF9900] text-black font-black tracking-wide text-base md:text-lg uppercase animate-pulse-glow transition-all duration-200 hover:bg-[#E68A00] hover:-translate-y-1 hover:shadow-glow-strong disabled:opacity-70"
            >
              {loading ? "Abriendo el video…" : "Ver el video ahora"}
            </button>
            <p
              className={cn(
                "text-xs md:text-sm text-muted-foreground pt-1",
                isSide ? "text-left" : "text-center",
              )}
            >
              El video se abre al instante. Sin llamadas, sin spam.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
