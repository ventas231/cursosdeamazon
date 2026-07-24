import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import gerardoPhoto from "@/assets/gerardo.png.asset.json";
import { HistoriaExito } from "@/components/HistoriaExito";


export const Route = createFileRoute("/acelerador")({
  head: () => ({
    meta: [
      { title: "Amazon + IA de 0 a 60 días — Gerardo Villa" },
      {
        name: "description",
        content:
          "Aprende a lanzar tu primer producto en Amazon en 60 días con IA. Curso de Gerardo Villa — Más de 4.6 millones de dólares en ventas de Amazon.",
      },
      { property: "og:title", content: "Amazon + IA de 0 a 60 días — Gerardo Villa" },
      {
        property: "og:description",
        content:
          "Lanza tu primer producto en Amazon en 60 días usando IA. Precio de lanzamiento $497 USD.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: VSLPage,
});

const CHECKOUT_URL = "/checkout";
const VIDEO_URL = "https://www.youtube.com/embed/jEpzV7xGpQ0";
const WHATSAPP_URL = `https://wa.me/522223288421?text=${encodeURIComponent("QUIERO SABER MAS DEL SISTEMA")}`;

const CALL_URL = "https://calendly.com/cursos-summaproducts/30min";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackLead(source: string) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { source });
  }
}

function UrgencyBar() {
  return (
    <div className="bg-primary text-primary-foreground text-center px-4 py-3">
      <p className="font-bold text-sm sm:text-base">
        ⏰ Precio de lanzamiento: $497 USD
      </p>
      <p className="text-xs sm:text-sm opacity-90 mt-1">
        Acceso inmediato al curso completo y a la comunidad privada
      </p>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-[#0D0D0D] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-lg text-foreground">
          Gerardo <span className="text-primary">Villa</span>
        </div>
        <div className="text-xs text-muted-foreground">Amazon + IA · 60 días</div>
      </div>
    </header>
  );
}

function PrimaryCTA({ id }: { id?: string }) {
  return (
    <div id={id} className="w-full space-y-3">
      <a
        href={CHECKOUT_URL}
        onClick={() => trackLead("hero_primary_cta")}
        className="group relative block w-full overflow-hidden text-center bg-gradient-to-r from-[#FFCC00] via-[#FF9900] to-[#FF6B00] text-black font-black text-lg sm:text-xl py-5 px-6 rounded-xl shadow-[0_0_45px_-8px_rgba(255,153,0,0.7)] transition-all duration-200 hover:shadow-[0_0_65px_-6px_rgba(255,140,0,0.95)] hover:-translate-y-0.5"
        style={{ animation: "vbounce 2.2s ease-in-out infinite" }}
      >
        <span className="relative z-10">QUIERO EL SISTEMA AHORA — $497 USD →</span>
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine"
          aria-hidden="true"
        />
      </a>
      <p className="text-center text-muted-foreground text-sm mt-3">
        🔒 Pago seguro · Garantía incluida · Acceso inmediato
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-background px-4 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6">
          <p className="text-primary uppercase text-base sm:text-xl font-black tracking-widest animate-[text-glow-pulse_1.2s_ease-in-out_infinite]">
            CONOCE EL SISTEMA
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium uppercase tracking-wider mt-2">
            Reproduce el video
          </p>
        </div>
        <div className="relative aspect-video w-full bg-[#0D0D0D] rounded-xl overflow-hidden border border-border mb-8">
          <iframe
            src={VIDEO_URL}
            className="absolute inset-0 w-full h-full"
            title="Video exclusivo Gerardo Villa"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>


        <PrimaryCTA />
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "Más de $4.6M", label: "USD en ventas de Amazon" },
    { value: "500+", label: "alumnos en el programa" },
    { value: "60 días", label: "de idea a primera venta" },
  ];
  return (
    <section className="bg-[#111111] px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
        {stats.map((s, i) => (
          <div
            key={s.value}
            className={`text-center px-6 ${i > 0 ? "sm:border-l sm:border-[#222]" : ""}`}
          >
            <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">{s.value}</div>
            <div className="text-muted-foreground text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsCarousel() {
  const testimonials = [
    {
      name: "F. D.",
      city: "España & Portugal",
      text: "Agotamos nuestro primer inventario en Amazon España y Portugal. Ha sido desafiante, pero el equipo siempre estuvo al pendiente — el Webinar te lleva de la mano hasta que vendes. Ya vamos por el segundo producto.",
    },
    {
      name: "M. C.",
      city: "Monterrey, MX",
      text: "Cuando nos metimos a este sistema logramos hacer nuestro mejor agosto y aumentamos el 30% de nuestras ventas.",
    },
    {
      name: "C. R.",
      city: "Colombia",
      text: "Las plantillas y prompts valen el curso completo. Genero listings en 20 minutos que antes me tomaban días con un copywriter.",
    },
    {
      name: "A. V.",
      city: "Ciudad de México",
      text: "Gerardo, nos fue excelente en el Black Friday.",
    },
  ];

  const slides: Array<{ type: "video" } | { type: "text"; name: string; city: string; text: string }> = [
    { type: "video" },
    ...testimonials.map((t) => ({ type: "text" as const, ...t })),
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section className="bg-background px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl sm:text-5xl text-center mb-12 uppercase tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Lo que dicen nuestros alumnos
        </h2>
        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-full flex-shrink-0 px-2">
                {slide.type === "video" ? (
                  <div className="mx-auto max-w-2xl">
                    <HistoriaExito />
                  </div>
                ) : (
                  <div className="mx-auto max-w-2xl min-h-[280px] bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0f0f0f] border border-primary/30 rounded-xl p-8 shadow-[0_0_25px_-5px_rgba(255,107,0,0.35)] flex flex-col justify-center">
                    <div className="mb-4">
                      <div className="font-bold text-lg">{slide.name}</div>
                      <div className="text-muted-foreground text-sm">{slide.city}</div>
                    </div>
                    <p className="text-foreground/90 leading-relaxed mb-4 text-lg">
                      "{slide.text}"
                    </p>
                    <div className="text-primary text-xl">★★★★★</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir a reseña ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const items = [
    { text: "El sistema que Gerardo usó para pasar de cero a más de 4.6 millones de dólares en ventas de Amazon.", value: "$1,997 USD" },
    { text: "Seis módulos probados en cuentas reales: validación, sourcing, branding, PPC, optimización e IA aplicada.", value: "$997 USD" },
    { text: "La masterclass que ningún curso de Amazon ha hecho con Claude.", value: "$497 USD" },
    { text: "Tres herramientas de Claude que la mayoría de sellers ni sabe que existe.", value: "$297 USD" },
    { text: "Plantillas y prompts que usa el equipo de Gerardo hoy.", value: "$397 USD" },
    { text: "Comunidad privada + sesiones mensuales en vivo con Gerardo, gratis durante cuatro meses.", value: "$197 USD" },
    { text: "Para sellers activos: Claude entra a tus números, analiza tus Search Terms, TACOS y ACOS, y te entrega un plan de acción concreto. Sin adivinar, sin perder tiempo.", value: "$199 USD" },
  ];
  return (
    <section className="relative overflow-hidden px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF9900]/10 via-[#FF6B00]/5 to-[#FFCC00]/10" />
      <div className="absolute inset-0 bg-[#111111]/90" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF9900] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
      <div className="relative max-w-6xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-center mb-12 uppercase tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="bg-gradient-to-r from-[#FFCC00] via-[#FF9900] to-[#FF6B00] bg-clip-text text-transparent">
            Lo que obtienes al inscribirte hoy
          </span>
        </h2>
        <ul className="space-y-5 mb-10">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#FF9900]/10 via-transparent to-[#FF6B00]/10 border border-[#FF9900]/25"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#FF6B00] text-black font-black text-base flex items-center justify-center leading-none">
                ✓
              </span>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span
                  className="text-foreground text-xl sm:text-2xl leading-snug uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.01em" }}
                >
                  {item.text}
                </span>
                <span className="flex-shrink-0 self-start sm:self-center inline-flex items-center gap-2 rounded-full border border-[#FF9900]/40 bg-black/40 px-3 py-1.5 text-sm font-bold text-[#FFCC00]">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">Valor real</span>
                  {item.value}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto max-w-2xl mb-8 rounded-2xl border-2 border-[#FF9900]/40 bg-black/50 p-6 text-center">
          <div className="text-muted-foreground text-sm uppercase tracking-widest">Valor real total</div>
          <div
            className="text-4xl sm:text-5xl line-through text-muted-foreground/70 mt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            $4,581 USD
          </div>
          <div className="mt-4 text-[#FFCC00] text-sm uppercase tracking-widest font-bold">Tuyo hoy por</div>
          <div
            className="text-6xl sm:text-7xl mt-1 bg-gradient-to-r from-[#FFCC00] via-[#FF9900] to-[#FF6B00] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-display)" }}
          >
            $497 USD
          </div>
          <div className="text-foreground/80 mt-2 text-sm">
            Ahorras <span className="text-[#FFCC00] font-bold">$4,084 USD</span> si entras hoy
          </div>
        </div>

        <a
          href={CHECKOUT_URL}
          onClick={() => trackLead("price_box_497")}
          className="group relative block w-full overflow-hidden text-center bg-gradient-to-r from-[#FFCC00] via-[#FF9900] to-[#FF6B00] text-black font-black text-lg sm:text-xl py-5 px-6 rounded-xl shadow-[0_0_45px_-8px_rgba(255,153,0,0.7)] transition-all duration-200 hover:shadow-[0_0_65px_-6px_rgba(255,140,0,0.95)] hover:-translate-y-0.5"
          style={{ animation: "vbounce 2.2s ease-in-out infinite" }}
        >
          <span className="relative z-10 block" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}>
            <span className="block text-sm line-through opacity-75">Valor real total: $4,581 USD</span>
            <span className="block text-3xl sm:text-4xl mt-1">TUYO HOY: $497 USD →</span>
          </span>
          <span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}

function ForSellers() {
  const items = [
    "Audita tu PPC con IA en 10 minutos y corta el ACOS sin apagar campañas",
    "Reescribe tus listings con Claude para subir conversión sin perder posición en keywords",
    "Genera imágenes de producto profesionales con IA — sin fotógrafo, sin estudio",
    "Analiza cientos de reviews de la competencia y descubre exactamente qué mejorar",
    "Automatiza reportes de Seller Central y toma decisiones con datos, no con intuición",
  ];
  return (
    <section className="bg-background px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="inline-block border border-primary text-primary bg-background text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
          ¿Ya vendes en Amazon?
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          El sistema también es para ti
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Si ya tienes productos activos y quieres escalar con IA, esto te va a cambiar la operación:
        </p>
        <ul className="space-y-4 mb-10">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-primary font-bold text-xl flex-shrink-0 leading-tight">→</span>
              <span className="text-foreground/90 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <a
          href={CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLead("premium_service_cta")}
          className="group relative block bg-gradient-to-br from-primary/20 via-[#0D0D0D] to-[#0D0D0D] border-2 border-primary rounded-xl p-6 mt-6 mb-8 shadow-[0_0_30px_-5px_rgba(255,107,0,0.5)] hover:shadow-[0_0_45px_-5px_rgba(255,107,0,0.8)] transition-all"
        >
          <div className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            ★ Servicio Premium
          </div>
          <div className="flex items-center justify-between gap-4 mt-2">
            <div>
              <p className="font-bold text-xl text-primary">¿Quieres que mi equipo lo haga por ti?</p>
            </div>
            <span className="text-primary text-4xl font-bold flex-shrink-0 group-hover:translate-x-1 transition-transform">›</span>
          </div>
        </a>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="bg-[#111111] px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-8">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1a1a1a] border-2 border-primary flex items-center justify-center text-5xl sm:text-6xl flex-shrink-0">
          🛡️
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">Garantía de Primera Venta</h3>
          <p className="text-muted-foreground leading-relaxed">
            Completa los ejercicios del curso y trabajamos contigo sin costo adicional hasta que logres tu primera venta. Sin letra chica — solo tienes que hacer el trabajo.
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Necesito experiencia previa en Amazon?",
      a: "No. El curso empieza desde cero y usa IA para acelerar cada paso. Si ya vendes, el Amazon Revenue Scan y el curso de Claude te ayudan a escalar lo que ya tienes.",
    },
    {
      q: "¿Cuánto capital necesito para empezar?",
      a: "El curso te enseña a validar antes de invertir. El mínimo real es desde $1,500 USD en inventario — y el módulo de validación te enseña a reducir ese riesgo al máximo.",
    },
    {
      q: "¿Qué pasa si no me funciona?",
      a: "La Garantía de Primera Venta aplica: si completas los ejercicios del curso, trabajamos contigo sin costo adicional hasta que logres tu primera venta.",
    },
  ];
  return (
    <section className="bg-background px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Preguntas frecuentes
        </h2>
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="bg-[#111] border border-border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3 text-primary">{item.q}</h3>
              <p className="text-foreground/90 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecondCTA() {
  return (
    <section className="bg-[#111111] px-4 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-primary mx-auto mb-8 bg-[#0a0a0a] shadow-[0_0_35px_-5px_rgba(255,107,0,0.8)] ring-4 ring-primary/30 ring-offset-2 ring-offset-[#111111]">
          <img src={gerardoPhoto.url} alt="Gerardo Villa" className="w-full h-full object-cover" />
        </div>
        <a
          href={CHECKOUT_URL}
          onClick={() => trackLead("second_cta_inscribirme")}
          className="block w-full text-center bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-bold text-lg sm:text-xl py-5 px-6 rounded-xl"
          style={{ animation: "vbounce 1.8s ease-in-out infinite" }}
        >
          INSCRIBIRME AHORA — $497 USD →
        </a>
        <p className="text-muted-foreground text-sm mt-4">
          Acceso inmediato · Garantía de primera venta incluida
        </p>
      </div>
    </section>
  );
}

function FloatingWhatsApp() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 items-end">
      <a
        href={CALL_URL}
        onClick={() => trackLead("call_calendly")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar una llamada"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-sm font-bold pl-3 pr-4 py-2.5 rounded-full shadow-lg shadow-black/40 hover:-translate-y-1 transition-transform duration-200"
      >
        <span className="text-lg group-hover:animate-bounce">📞</span>
        <span className="hidden sm:inline">Quiero una llamada</span>
      </a>
      <a
        href={WHATSAPP_URL}
        onClick={() => trackLead("whatsapp_dudas")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tengo dudas por WhatsApp"
        className="group flex items-center gap-2 bg-[#0D0D0D]/90 backdrop-blur border border-[#25D366] hover:bg-[#25D366]/10 text-[#25D366] text-sm font-bold pl-3 pr-4 py-2.5 rounded-full shadow-lg shadow-black/40 hover:-translate-y-1 transition-transform duration-200"
      >
        <span className="text-lg group-hover:animate-bounce">💬</span>
        <span className="hidden sm:inline">Tengo dudas</span>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#060606] px-4 py-10 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center space-y-3 text-xs text-muted-foreground">
        <p>© 2026 Gerardo Villa · Summa · Todos los derechos reservados</p>
        <p className="leading-relaxed">
          Este sitio no forma parte de Facebook Inc. ni está respaldado por Amazon.com. Somos una organización independiente compatible con vendedores de Amazon.com.
        </p>
      </div>
    </footer>
  );
}

function VSLPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <UrgencyBar />
      <Header />
      <Hero />
      <SocialProof />
      <ReviewsCarousel />
      <WhatYouGet />
      <Footer />
      <FloatingWhatsApp />
      <style>{`@keyframes vbounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}} @keyframes shine {0%{transform:translateX(-100%)}100%{transform:translateX(100%)}} .animate-shine { animation: shine 2.2s ease-in-out infinite }`}</style>
    </div>
  );
}
