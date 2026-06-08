import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import gerardoPhoto from "@/assets/gerardo.png";
import videoAsset from "@/assets/acelerador-video.mp4.asset.json";

export const Route = createFileRoute("/acelerador")({
  head: () => ({
    meta: [
      { title: "Amazon + IA de 0 a 60 días — Gerardo Villa" },
      {
        name: "description",
        content:
          "Aprende a lanzar tu primer producto en Amazon en 60 días con IA. Curso de Gerardo Villa — $4M+ USD vendidos en Amazon MX & USA.",
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
const VIDEO_URL = videoAsset.url;
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
        ⏰ Precio de lanzamiento: $497 USD — sube a $697 el 25 de junio
      </p>
      <p className="text-xs sm:text-sm opacity-90 mt-1">
        El 25 de junio se lanza "Gana más en Amazon trabajando menos con Claude" — y el precio del paquete sube
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
    <div id={id} className="w-full">
      <a
        href={CHECKOUT_URL}
        onClick={() => trackLead("hero_primary_cta")}
        className="block w-full text-center bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-bold text-lg sm:text-xl py-5 px-6 rounded-xl"
        style={{ animation: "vbounce 1.8s ease-in-out infinite" }}
      >
        QUIERO EL SISTEMA AHORA — $497 USD →
      </a>
      <p className="text-center text-muted-foreground text-sm mt-3">
        🔒 Pago seguro · Garantía incluida · Acceso inmediato
      </p>
      <p className="text-center text-primary text-xs mt-1">
        Precio sube a $697 el 25 de junio
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-background px-4 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-primary uppercase text-xs sm:text-sm font-semibold tracking-wider mb-6">
          CONOCE EL SISTEMA
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-10">
          Cómo lancé mi primer producto en Amazon desde cero y llegué a{" "}
          <span className="text-primary">$4M+ USD</span> — y cómo tú puedes hacerlo en{" "}
          <span className="text-primary">60 días con IA</span>
        </h1>

        <div className="relative mb-6 flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
          <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-primary bg-[#111] shadow-[0_0_40px_-5px_rgba(255,107,0,0.8)] ring-4 ring-primary/30 ring-offset-2 ring-offset-background">
            <img src={gerardoPhoto} alt="Gerardo Villa" className="w-full h-full object-cover" />
          </div>
          <div className="relative mt-4 inline-block bg-[#111] border border-border rounded-full px-4 py-2 text-sm">
            <span className="font-semibold">Gerardo Villa</span>
            <span className="text-muted-foreground"> · </span>
            <span className="text-primary font-semibold">$4M+ USD en Amazon MX & USA</span>
          </div>
          <div className="relative mt-3 inline-flex items-center gap-2 bg-primary/10 border border-primary/40 rounded-full px-4 py-1.5 text-xs sm:text-sm text-foreground/90 max-w-2xl">
            <span className="text-primary">★</span>
            <span>
              Reconocido por <span className="font-semibold text-primary">Amazon México</span> como uno de los vendedores exitosos de Amazon Estados Unidos
            </span>
          </div>
        </div>

        <div className="relative aspect-video w-full bg-[#0D0D0D] rounded-xl overflow-hidden border border-border mb-4">
          <iframe
            src={VIDEO_URL}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="no-referrer"
            title="Video exclusivo Gerardo Villa"
          />
        </div>
        <div className="text-center mb-8">
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
          >
            ¿No ves el video? Ábrelo aquí →
          </a>
        </div>

        <PrimaryCTA />
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "$4M+", label: "USD vendidos Amazon MX & USA" },
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

function Testimonials() {
  const items = [
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
  return (
    <section className="bg-background px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Lo que dicen nuestros alumnos:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((t) => (
            <div
              key={t.name}
              className="relative bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0f0f0f] border border-primary/30 rounded-xl p-6 shadow-[0_0_25px_-5px_rgba(255,107,0,0.35)] hover:shadow-[0_0_40px_-5px_rgba(255,107,0,0.6)] hover:border-primary/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4">
                <div className="font-bold">{t.name}</div>
                <div className="text-muted-foreground text-sm">{t.city}</div>
              </div>
              <p className="text-foreground/90 leading-relaxed mb-4">{t.text}</p>
              <div className="text-primary">★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const items = [
    "El sistema que Gerardo usó para pasar de cero a $4M+ USD en Amazon — 6 módulos probados en cuentas reales: Validación, Sourcing, Branding, PPC, Optimización e IA aplicada.",
    "La Masterclass que ningún curso de Amazon ha hecho — cómo usar Claude para validar nichos, escribir listings y ganarle a tu competencia en PPC. Incluida gratis hoy, después sube de precio.",
    "Tres herramientas de Claude que la mayoría de sellers ni sabe que existen — Validador de Nichos, Generador de Listings y Arquitecto PPC, todo con IA. Las enciendes y trabajas.",
    "Las mismas plantillas y prompts que usa el equipo de Gerardo hoy — listas desde el día 1, sin construir nada desde cero.",
    "Los mejores negocios no se construyen solos — El Círculo Amazon IA: comunidad privada + sesiones mensuales en vivo con Gerardo, gratis durante 4 meses.",
    "Para sellers activos: Claude entra a tus números, analiza tus Search Terms, TACOS y ACOS, y te entrega un plan de acción concreto. Sin adivinar, sin perder tiempo.",
  ];
  return (
    <section className="bg-[#111111] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Lo que obtienes al inscribirte hoy:
        </h2>
        <ul className="space-y-5 mb-10">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-primary font-bold text-xl flex-shrink-0 leading-tight">✓</span>
              <span className="text-foreground/90 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <a
          href={CHECKOUT_URL}
          onClick={() => trackLead("price_box_497")}
          className="block bg-primary text-primary-foreground rounded-lg p-6 text-center hover:bg-primary/90 transition-colors"
          style={{ animation: "vbounce 1.8s ease-in-out infinite" }}
        >
          <p className="text-sm line-through opacity-80">Valor total: $4,581 USD</p>
          <p className="text-3xl sm:text-4xl font-bold my-2">TUYO HOY: $497 USD →</p>
          <p className="text-sm opacity-90">El 25 de junio sube a $697</p>
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
          <img src={gerardoPhoto} alt="Gerardo Villa" className="w-full h-full object-cover" />
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
          Acceso inmediato · El precio sube a $697 el 25 de junio
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
      <Testimonials />
      <WhatYouGet />
      <ForSellers />
      <Guarantee />
      <FAQ />
      <SecondCTA />
      <Footer />
      <FloatingWhatsApp />
      <style>{`@keyframes vbounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}
