import { useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  const isSide = variant === "side";

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
        <button
          type="button"
          id={`${idPrefix}-reveal`}
          onClick={() => navigate({ to: "/acelerador" })}
          className="group w-full h-14 rounded-xl bg-[#FF9900] text-black font-black tracking-wide text-base md:text-lg uppercase animate-pulse-glow transition-all duration-200 hover:bg-[#E68A00] hover:-translate-y-1 hover:shadow-glow-strong"
        >
          Sí, quiero el video gratis
        </button>

        <p className={cn("text-xs md:text-sm text-muted-foreground pt-1", isSide ? "text-left" : "text-center")}>
          Acceso inmediato al video. Sin registro, sin llamadas, sin spam.
        </p>
      </div>
    </div>
  );
}
