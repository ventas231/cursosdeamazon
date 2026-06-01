import { createFileRoute } from "@tanstack/react-router";
import { Check, ShieldCheck, ChevronRight, Crown } from "lucide-react";
import { WhatsAppForm } from "@/components/WhatsAppForm";
import gerardoPhoto from "@/assets/gerardo.png";
import logoAmazon from "@/assets/logo-amazon.png";
import logoClaude from "@/assets/logo-claude.png";
import logoHelium from "@/assets/logo-helium10.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amazon + IA de 0 a 60 días · Gerardo Villa" },
      {
        name: "description",
        content:
          "Descubre el sistema gratuito donde Gerardo Villa explica el sistema exacto para lanzar tu primer producto en Amazon con IA en 60 días.",
      },
      { property: "og:title", content: "Amazon + IA de 0 a 60 días · Gerardo Villa" },
      {
        property: "og:description",
        content:
          "Descubre el sistema gratuito donde Gerardo Villa explica el sistema exacto para lanzar tu primer producto en Amazon con IA en 60 días.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const secretos = [
  "El sistema exacto de validación de productos con Helium 10 e IA que elimina el 90% del riesgo de perder dinero",
  "Cómo usar Claude AI para crear listados, fotos de producto y campañas PPC — sin contratar a nadie",
  "Por qué la mayoría de personas fracasa en Amazon (y el error específico que debes evitar)",
  "La estrategia de los 60 días: de idea validada a primera venta, paso a paso",
  "El modelo real de negocio con márgenes y números — sin prometer ingresos mágicos",
];

const sellersBeneficios = [
  "Audita tu PPC con IA en 10 minutos y corta el ACOS sin apagar campañas",
  "Reescribe tus listings con Claude para subir conversión sin perder posición en keywords",
  "Genera imágenes de producto profesionales con IA — sin fotógrafo, sin estudio",
  "Analiza cientos de reviews de la competencia y descubre exactamente qué mejorar",
  "Automatiza reportes de Seller Central y toma decisiones con datos, no con intuición",
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* SECCIÓN 1 — Barra urgencia */}
      <div className="w-full bg-brand text-brand-foreground py-2.5 text-center text-xs md:text-sm font-black uppercase tracking-wider">
        🔥 Acceso limitado
      </div>

      {/* SECCIÓN 2 — HERO */}
      <section className="relative px-6 py-16 md:py-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-brand text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
            Gerardo Villa · $4M+ USD en ventas verificadas en Amazon
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
            Descubre cómo lanzar tu primer producto en{" "}
            <span className="text-brand">Amazon</span> con{" "}
            <span className="text-brand">IA</span> en{" "}
            <span className="text-brand">60 días</span>
            <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground">
              sin adivinar ni quemar tus ahorros
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre el sistema exacto que uso en mi negocio de $4M+ USD y cómo
            tú puedes replicarlo desde cero.
          </p>

          {/* Foto + chip */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-70"
                style={{ background: "var(--brand)" }}
              />
              <img
                src={gerardoPhoto}
                alt="Gerardo Villa"
                width={144}
                height={144}
                className="h-36 w-36 rounded-full object-cover ring-4 ring-brand shadow-glow"
              />
            </div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-hairline bg-surface text-sm font-semibold">
              Gerardo Villa · Amazon MX &amp; USA
            </span>
          </div>

          {/* Caja destacada */}
          <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-brand bg-brand-soft px-5 py-4 text-sm md:text-base font-semibold text-foreground">
            ⭐ Mencionado por Amazon México como uno de los vendedores exitosos
            de Amazon Estados Unidos
          </div>

          {/* Form */}
          <div className="mt-12">
            <WhatsAppForm
              heading="Ingresa tu WhatsApp y descubre el secreto de Amazon"
              idPrefix="hero"
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — Prueba social */}
      <section className="bg-surface border-y border-hairline px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {[
            { n: "$4M+", l: "USD vendidos en Amazon MX & USA" },
            { n: "500+", l: "alumnos en el programa" },
            { n: "60 días", l: "para tu primer lanzamiento" },
          ].map((s) => (
            <div key={s.l} className="text-center px-6 py-6 md:py-0">
              <div className="text-4xl md:text-5xl font-black text-brand leading-none">
                {s.n}
              </div>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 4 — Secreto */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center leading-tight">
            Descubre el secreto que genera ventas{" "}
            <span className="text-brand">amazon</span>
          </h2>
          <ul className="mt-10 space-y-5">
            {secretos.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 h-8 w-8 rounded-full bg-brand text-brand-foreground flex items-center justify-center">
                  <Check className="h-5 w-5" strokeWidth={3} />
                </span>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed pt-0.5">
                  {s}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECCIÓN 5 — Para sellers actuales */}
      <section className="bg-surface border-y border-hairline px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand text-brand text-xs font-bold uppercase tracking-wider">
              ¿Ya vendes en Amazon?
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-black leading-tight">
              El sistema también es para ti
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Si ya tienes productos activos y quieres escalar con IA, esto te
              va a cambiar la operación:
            </p>
          </div>

          <ul className="mt-10 space-y-5">
            {sellersBeneficios.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-brand text-2xl font-black leading-none pt-0.5">
                  →
                </span>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                  {s}
                </p>
              </li>
            ))}
          </ul>

          {/* CTA premium */}
          <a
            href="https://calendly.com/cursos-summaproducts/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 group block rounded-2xl border border-brand bg-gradient-to-br from-brand-soft to-transparent p-6 md:p-8 shadow-glow transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-strong"
          >
            <div className="flex items-center gap-5">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand text-brand-foreground text-[10px] md:text-xs font-black uppercase tracking-wider">
                  <Crown className="h-3.5 w-3.5" /> Servicio premium
                </span>
                <p className="mt-3 text-xl md:text-2xl font-black text-foreground">
                  ¿Quieres que mi equipo lo haga por ti?
                </p>
              </div>
              <ChevronRight className="h-8 w-8 text-brand flex-shrink-0 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        </div>
      </section>

      {/* SECCIÓN 6 — Segundo CTA */}
      <section className="bg-surface px-6 py-16 md:py-20 border-b border-hairline">
        <div className="max-w-5xl mx-auto">
          <WhatsAppForm
            heading="¿Listo para ver el sistema?"
            subheading="Miles de personas hispanohablantes ya están usando este sistema. Tú puedes ser el siguiente."
            idPrefix="cta2"
          />
        </div>
      </section>

      {/* SECCIÓN 7 — Garantía */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-xl mx-auto text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-brand-soft flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-brand" strokeWidth={2.5} />
          </div>
          <h2 className="mt-6 text-2xl md:text-3xl font-black">
            Este sistema es 100% gratuito
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            No te vamos a pedir tarjeta de crédito. Solo tu WhatsApp para
            mandarte el acceso directo al sistema.
          </p>

          <div className="mt-10 flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            <img
              src={logoAmazon}
              alt="Amazon"
              className="h-16 md:h-20 w-auto opacity-90 bg-white rounded-lg p-2"
              loading="lazy"
            />
            <img
              src={logoClaude}
              alt="Claude"
              className="h-16 md:h-20 w-auto opacity-90 bg-white rounded-lg p-2"
              loading="lazy"
            />
            <img
              src={logoHelium}
              alt="Helium 10"
              className="h-16 md:h-20 w-auto opacity-90 bg-white rounded-lg p-2"
              loading="lazy"
            />
          </div>
          <p className="mt-5 text-xs md:text-sm text-muted-foreground">
            Las herramientas que usamos en el curso
          </p>
        </div>
      </section>

      {/* SECCIÓN 8 — Footer */}
      <footer
        className="px-6 py-8 text-center text-xs md:text-sm text-muted-foreground"
        style={{ background: "#060606" }}
      >
        © 2026 Gerardo Villa · Summa · Todos los derechos reservados
      </footer>
    </main>
  );
}
