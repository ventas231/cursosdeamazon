import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, ChevronRight, ShieldCheck, MessageCircle } from "lucide-react";
import { WhatsAppForm } from "@/components/WhatsAppForm";
import { fbqTrack } from "@/lib/fbq";
import gerardoPhoto from "@/assets/gerardo.png";
import logoAmazon from "@/assets/logo-amazon-new.png";
import logoHelium10 from "@/assets/logo-helium10-clean.png";
import logoClaude from "@/assets/logo-claude.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Amazon + IA de 0 a 60 días · Gerardo Villa" },
      {
        name: "description",
        content:
          "Descubre el sistema gratuito donde Gerardo Villa explica el sistema exacto para lanzar tu primer producto en Amazon con IA en 60 días.",
      },
      { property: "og:title", content: "Amazon + IA de 0 a 60 días" },
      {
        property: "og:description",
        content:
          "El sistema exacto que usa Gerardo Villa en su negocio de $4M+ USD en Amazon. Sistema gratuito.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const discoverBullets = [
  "El sistema exacto de validación de productos con Helium 10 e IA que elimina el 90% del riesgo de perder dinero",
  "Cómo usar Claude AI para crear listados, fotos de producto y campañas PPC — sin contratar a nadie",
  "Por qué la mayoría de personas fracasa en Amazon (y el error específico que debes evitar)",
  "La estrategia de los 60 días: de idea validada a primera venta, paso a paso",
  "El modelo real de negocio con márgenes y números — sin prometer ingresos mágicos",
];

const sellerBullets = [
  "Audita tu PPC con IA en 10 minutos y corta el ACOS sin apagar campañas",
  "Reescribe tus listings con Claude para subir conversión sin perder posición en keywords",
  "Genera imágenes de producto profesionales con IA — sin fotógrafo, sin estudio",
  "Analiza cientos de reviews de la competencia y descubre exactamente qué mejorar",
  "Automatiza reportes de Seller Central y toma decisiones con datos, no con intuición",
];

function LandingPage() {
  useEffect(() => {
    fbqTrack("PageView");
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* SECCIÓN 1 — Urgency Bar */}
      <div className="w-full bg-brand text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-2.5 text-center md:py-2">
          <p className="text-sm font-bold leading-tight">🔥 ACCESO LIMITADO</p>
        </div>
      </div>

      {/* SECCIÓN 2 — HERO */}
      <section className="bg-background px-4 py-[60px] md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-brand">
            Gerardo Villa · $4M+ USD en ventas verificadas en Amazon
          </p>

          <h1 className="mt-5 text-center text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Descubre cómo lanzar tu primer producto en{" "}
            <span className="text-brand">Amazon</span> con{" "}
            <span className="text-brand">IA</span> en{" "}
            <span className="text-brand">60 días</span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground">
              sin adivinar ni quemar tus ahorros
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-center text-base sm:text-lg text-muted-foreground">
            Descubre el sistema exacto que uso en mi negocio de $4M+ USD y cómo
            tú puedes replicarlo desde cero.
          </p>

          {/* Foto Gerardo */}
          <div className="mt-8 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-br from-brand/40 to-brand-soft/20 blur-2xl" />
              <img
                src={gerardoPhoto}
                alt="Gerardo Villa, founder de Summa"
                width={144}
                height={144}
                className="relative h-36 w-36 rounded-full object-cover ring-2 ring-brand/50 ring-offset-4 ring-offset-background"
              />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Gerardo Villa · Amazon MX &amp; USA
            </div>

            <div className="mt-5 w-full max-w-3xl mx-auto rounded-xl border-2 border-brand bg-brand/10 px-6 md:px-8 py-5 text-center shadow-[0_0_30px_-8px_rgba(255,107,0,0.45)]">
              <p className="text-sm md:text-lg font-bold text-brand leading-snug">
                ⭐ Mencionado por Amazon México como uno de los vendedores
                exitosos de Amazon Estados Unidos
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8">
            <WhatsAppForm
              heading="Ingresa tu WhatsApp y descubre el secreto de Amazon"
              idPrefix="hero"
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — Prueba Social */}
      <section className="bg-surface px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-hairline md:grid-cols-3 md:divide-y-0 md:divide-x">
          {[
            { num: "$4M+", label: "USD vendidos en Amazon MX & USA" },
            { num: "500+", label: "alumnos en el programa" },
            { num: "60 días", label: "para tu primer lanzamiento" },
          ].map((s) => (
            <div key={s.num} className="px-6 py-6 text-center md:py-2">
              <p className="text-4xl md:text-5xl font-black text-brand">
                {s.num}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 4 — Qué vas a descubrir */}
      <section className="bg-background px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl md:text-4xl font-black tracking-tight">
            Descubre el secreto que genera ventas amazon
          </h2>
          <ul className="mt-10 space-y-5">
            {discoverBullets.map((b, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {b}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECCIÓN 5 — Para sellers actuales */}
      <section className="bg-surface px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center rounded-full border border-brand bg-background px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
            ¿Ya vendes en Amazon?
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight">
            El sistema también es para ti
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            Si ya tienes productos activos y quieres escalar con IA, esto te va
            a cambiar la operación:
          </p>

          <ul className="mt-8 space-y-4">
            {sellerBullets.map((b, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-1 text-brand font-bold text-lg leading-none">
                  →
                </span>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  {b}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a
              href="https://calendly.com/cursos-summaproducts/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-xl border-2 border-brand bg-gradient-to-br from-brand/25 via-brand/10 to-transparent p-5 shadow-[0_0_40px_-10px_var(--brand)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_-10px_var(--brand)]"
            >
              <div className="flex-1">
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                  <span>👑</span> Servicio premium
                </span>
                <p className="text-base md:text-lg font-bold text-foreground">
                  ¿Quieres que mi equipo lo haga por ti?
                </p>
              </div>
              <ChevronRight className="h-7 w-7 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 — Segundo CTA */}
      <section className="bg-surface px-4 pb-16 md:pb-20">
        <div id="cta2" className="mx-auto max-w-5xl">
          <WhatsAppForm
            heading="¿Listo para ver el sistema?"
            subheading="Miles de personas hispanohablantes ya están usando este sistema. Tú puedes ser el siguiente."
            idPrefix="cta2"
          />
        </div>
      </section>

      {/* SECCIÓN 7 — Garantía */}
      <section className="bg-background px-4 py-16 md:py-20">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 text-brand">
            <ShieldCheck className="h-9 w-9" strokeWidth={2.2} />
          </div>
          <h2 className="mt-5 text-2xl md:text-3xl font-black">
            Este sistema es 100% gratuito
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            No te vamos a pedir tarjeta de crédito. Solo tu WhatsApp para
            mandarte el acceso directo al sistema.
          </p>

          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
              <img
                src={logoAmazon}
                alt="Amazon"
                className="h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={logoClaude}
                alt="Claude"
                className="h-16 md:h-20 w-auto object-contain"
              />
              <img
                src={logoHelium10}
                alt="Helium 10"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Las herramientas que usamos en el curso
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8 — Footer */}
      <footer className="bg-[#060606] px-4 py-8 border-t border-hairline">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Gerardo Villa · Summa · Todos los derechos reservados
          </p>
        </div>
      </footer>
      {/* WhatsApp flotante */}
      <a
        href="https://wa.me/522213705112?text=Hola%20Gerardo%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20del%20sistema%20de%20Amazon"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold text-sm shadow-lg hover:opacity-90"
        style={{ background: "#22c55e", animation: "vbounce 1.6s ease-in-out infinite" }}
      >
        <MessageCircle className="h-5 w-5" />
        Contáctame
      </a>

      <style>{`@keyframes vbounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </main>
  );
}
