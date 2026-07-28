import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Shield, Lock, Rocket, Bot, Zap, FileText, Users, BarChart3, ShieldCheck, Target, Search, Star, MessageCircle, Calendar, HelpCircle } from "lucide-react";
import gerardoPhoto from "@/assets/gerardo.png.asset.json";
import { logCheckoutVisit } from "@/lib/excel.functions";
import { HistoriaExito } from "@/components/HistoriaExito";

const PAYPAL_CLIENT_ID = "BAABdtkl8eNEhFa8UJqHSBT6-sceiny3Pm7tK0MUNU_Q6XYhTqLULJuYc01qoCq2wJArbT4fQ6aV1KhL4M";
const PAYPAL_BUTTON_ID = "HZH4E3ERVXFXS";

declare global {
  interface Window {
    paypal?: any;
  }
}

function PayPalHostedButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    const SCRIPT_ID = "paypal-hosted-sdk";
    const render = () => {
      if (renderedRef.current || !window.paypal || !containerRef.current) return;
      renderedRef.current = true;
      window.paypal
        .HostedButtons({ hostedButtonId: PAYPAL_BUTTON_ID })
        .render(`#paypal-container-${PAYPAL_BUTTON_ID}`);
    };

    if (window.paypal) {
      render();
      return;
    }
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=hosted-buttons&enable-funding=venmo&currency=USD`;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", render);
    return () => script?.removeEventListener("load", render);
  }, []);

  return <div ref={containerRef} id={`paypal-container-${PAYPAL_BUTTON_ID}`} />;
}

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Amazon + IA de 0 a 60 días | Gerardo Villa" },
      { name: "description", content: "Inscríbete al curso Amazon + IA de 0 a 60 días con Gerardo Villa. Precio de lanzamiento $497 USD." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const PAGE_BG = "#F7F7F7";
const CARD_BG = "#FFFFFF";
const BORDER = "#E5E5E5";
const ACCENT = "#FF6B00";
const TEXT = "#222222";
const MUTED = "#777777";
const DARK = "#1a1a1a";
const GREEN = "#22a06b";

const valueItems = [
  { icon: <Rocket className="h-6 w-6" style={{ color: ACCENT }} />, title: "Amazon + IA de 0 a 60 días", desc: "El sistema que generó Más de 4.6 millones de dólares en ventas de Amazon — ahora en 6 módulos que te llevan de 'no sé nada' a tener tu producto lanzado y vendiendo. Validación, Sourcing, Branding, PPC, Optimización e IA. Paso a paso. Sin adivinar.", value: "Valor real $1,497 USD" },
  { icon: <Bot className="h-6 w-6" style={{ color: ACCENT }} />, title: "Gana más en Amazon trabajando menos con Claude", desc: "La ventaja que el 99% de sellers en español todavía no tiene — Claude IA aplicado a Amazon, paso a paso, para que la inteligencia artificial haga el trabajo pesado y tú te enfoques en crecer. Incluida de lanzamiento.", value: "Valor real $797 USD" },
  { icon: <Zap className="h-6 w-6" style={{ color: ACCENT }} />, title: "Amazon AI Toolkit", desc: "Para de perder horas buscando productos, escribiendo listings y armando campañas desde cero. Estos 3 Skills de Claude ya saben qué buscar, qué escribir y cómo convertir. Tú solo ejecutas.", value: "Valor real $497 USD" },
  { icon: <FileText className="h-6 w-6" style={{ color: ACCENT }} />, title: "Plantillas y Prompts de IA", desc: "Cada hora que pasas creando desde cero es una hora que no estás vendiendo. Estas plantillas y prompts de IA ya están listos — solo los abres y los usas. Resultados profesionales desde el minuto uno.", value: "Valor real $197 USD" },
  { icon: <Users className="h-6 w-6" style={{ color: ACCENT }} />, title: "El Círculo Amazon IA", desc: "Una duda mal resuelta puede costarte miles. El Círculo Amazon IA te da acceso directo a Gerardo cada mes en vivo + comunidad activa para que cada decisión que tomes esté respaldada. Gratis por 4 meses.", value: "Valor real $396 USD" },
  { icon: <BarChart3 className="h-6 w-6" style={{ color: ACCENT }} />, title: "Amazon Revenue Scan", desc: "Tu cuenta de Amazon tiene dinero escondido que no estás viendo. Claude analiza tus Search Terms, TACOS y ACOS y te muestra dónde está — con un plan listo para ejecutar. Para quienes ya venden en Amazon.", value: "Valor real $500 USD" },
  { icon: <ShieldCheck className="h-6 w-6" style={{ color: ACCENT }} />, title: "Garantía de Primera Venta", desc: "Esta no es la garantía típica de '30 días o te devolvemos el dinero'. Es mejor — trabajamos contigo personalmente hasta que logres tu primera venta. Punto. Sin excusas de nuestra parte.", value: "Incluida" },
];

const testimonials = [
  { name: "Carlos Ramírez", country: "Estados Unidos", text: "El curso me ayudó mucho para poder lanzar mi marca en Amazon y he tenido ventas exitosas" },
  { name: "María González", country: "México", text: "Recomiendo mucho el curso de Amazon Más IA, me ahorré miles de pesos en los posibles errores que pude haber tenido y me ha estado ayudando a mantenerme actualizada en ventas de Amazon" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center text-xs font-semibold tracking-[0.2em] mb-6" style={{ color: MUTED }}>
      {children}
    </div>
  );
}

function Checkout() {
  const logVisit = useServerFn(logCheckoutVisit);
  useEffect(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (typeof w.fbq === "function") {
      w.fbq("track", "InitiateCheckout", { value: 497, currency: "USD" });
    }
    // Etiquetar visita a checkout en Google Sheets (pestaña "Carrito Abandonado")
    let whatsapp = "";
    try {
      whatsapp = localStorage.getItem("lead_whatsapp") || "";
    } catch {}
    logVisit({ data: { whatsapp, label: "Llegó a checkout" } }).catch((err) => {
      console.error("[sheets] checkout log failed", err);
    });
  }, [logVisit]);
  return (
    <div style={{ background: PAGE_BG, color: TEXT, fontFamily: "Inter, system-ui, -apple-system, sans-serif", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold" style={{ color: TEXT }}>
            Gerardo Villa
          </div>
          <div className="text-right text-sm">
            <div className="font-semibold" style={{ color: ACCENT }}>¿Tienes preguntas?</div>
            <div style={{ color: MUTED }}>cursos@summaproducts.com</div>
          </div>
        </div>
      </header>

      {/* URGENCY BAR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div
          className="px-5 py-4"
          style={{ background: DARK, borderLeft: `3px solid ${ACCENT}`, borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
        >
          <div className="font-bold text-sm sm:text-base" style={{ color: ACCENT }}>
            Precio de lanzamiento $497 USD
          </div>
          <div className="text-xs sm:text-sm mt-1" style={{ color: "#bbb" }}>
            Acceso inmediato al curso completo y a la comunidad privada
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — FORM + SUCCESS STORY */}
        <div className="space-y-6">
          <div id="pago" className="rounded-lg p-6" style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}>
            <SectionTitle>— PAGO CON PAYPAL —</SectionTitle>

            <div className="pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex justify-between text-sm py-1" style={{ color: TEXT }}>
                <span>Amazon + IA de 0 a 60 días</span>
                <span>$497 USD</span>
              </div>
              <div className="flex justify-between text-base font-bold py-2 mt-1" style={{ color: TEXT, borderTop: `1px solid ${BORDER}` }}>
                <span>Total</span>
                <span>$497 USD</span>
              </div>
              <div className="text-[11px] text-right mt-1" style={{ color: MUTED }}>
                * Todos los precios están en DÓLARES AMERICANOS (USD)
              </div>
            </div>

            <label className="flex items-start gap-2 mt-5 text-sm" style={{ color: TEXT }}>
              <input type="checkbox" required className="mt-0.5" defaultChecked />
              <span>
                He leído y acepto la{" "}
                <a href="/garantia.html" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }} className="underline">Garantía</a>{" "}
                de este sitio.
              </span>
            </label>

            <p className="text-xs mt-4 mb-3 text-center" style={{ color: MUTED }}>
              Asegúrate de llenar tus datos arriba antes de pagar. Al aprobar el pago en PayPal serás redirigido automáticamente a tu acceso al curso.
            </p>

            <div className="mt-2 p-1 rounded-lg">
              <PayPalHostedButton />
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs" style={{ color: MUTED }}>
              <Lock className="h-3.5 w-3.5" />
              <span>Pago seguro · SSL · Powered by PayPal</span>
            </div>

            {/* Alternative payment CTA */}
            <a
              href={`https://wa.me/5212223288421?text=${encodeURIComponent("Quiero el curso, pero quiero pagar con otro método")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-5 flex items-center justify-center gap-2 w-full rounded-lg px-4 py-4 text-center font-bold text-sm hover:opacity-95 transition cursor-pointer overflow-hidden"
              style={{ background: DARK, color: "#fff", border: `2px solid ${ACCENT}`, boxShadow: `0 0 25px ${ACCENT}50`, animation: "vbounce 2.2s ease-in-out infinite" }}
            >
              <HelpCircle className="h-5 w-5 relative z-10" style={{ color: ACCENT }} />
              <span className="relative z-10">¿Quieres pagar con transferencia o usar otro método de pago? <span style={{ color: ACCENT, textDecoration: "underline" }}>Pica aquí</span></span>
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-shine"
                aria-hidden="true"
              />
            </a>
          </div>

          <HistoriaExito light />
        </div>

        {/* LEFT — FORM + SUCCESS STORY */}
        <div className="space-y-6">
          <div id="pago" className="rounded-lg p-6" style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}>
            <SectionTitle>— PAGO CON PAYPAL —</SectionTitle>

            <div className="pb-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <div className="flex justify-between text-sm py-1" style={{ color: TEXT }}>
                <span>Amazon + IA de 0 a 60 días</span>
                <span>$497 USD</span>
              </div>
              <div className="flex justify-between text-base font-bold py-2 mt-1" style={{ color: TEXT, borderTop: `1px solid ${BORDER}` }}>
                <span>Total</span>
                <span>$497 USD</span>
              </div>
              <div className="text-[11px] text-right mt-1" style={{ color: MUTED }}>
                * Todos los precios están en DÓLARES AMERICANOS (USD)
              </div>
            </div>

            <label className="flex items-start gap-2 mt-5 text-sm" style={{ color: TEXT }}>
              <input type="checkbox" required className="mt-0.5" defaultChecked />
              <span>
                He leído y acepto la{" "}
                <a href="/garantia.html" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }} className="underline">Garantía</a>{" "}
                de este sitio.
              </span>
            </label>

            <p className="text-xs mt-4 mb-3 text-center" style={{ color: MUTED }}>
              Asegúrate de llenar tus datos arriba antes de pagar. Al aprobar el pago en PayPal serás redirigido automáticamente a tu acceso al curso.
            </p>

            <div className="mt-2 p-1 rounded-lg">
              <PayPalHostedButton />
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs" style={{ color: MUTED }}>
              <Lock className="h-3.5 w-3.5" />
              <span>Pago seguro · SSL · Powered by PayPal</span>
            </div>

            {/* Alternative payment CTA */}
            <a
              href={`https://wa.me/5212223288421?text=${encodeURIComponent("Quiero el curso, pero quiero pagar con otro método")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-5 flex items-center justify-center gap-2 w-full rounded-lg px-4 py-4 text-center font-bold text-sm hover:opacity-95 transition cursor-pointer overflow-hidden"
              style={{ background: DARK, color: "#fff", border: `2px solid ${ACCENT}`, boxShadow: `0 0 25px ${ACCENT}50`, animation: "vbounce 2.2s ease-in-out infinite" }}
            >
              <HelpCircle className="h-5 w-5 relative z-10" style={{ color: ACCENT }} />
              <span className="relative z-10">¿Quieres pagar con transferencia o usar otro método de pago? <span style={{ color: ACCENT, textDecoration: "underline" }}>Pica aquí</span></span>
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent animate-shine"
                aria-hidden="true"
              />
            </a>
          </div>

          <HistoriaExito light />
        </div>

        {/* RIGHT — VALUE STACK */}
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <div
              className="w-28 h-28 rounded-full overflow-hidden"
              style={{ background: "#fff", border: `4px solid ${ACCENT}`, boxShadow: `0 0 24px ${ACCENT}80` }}
            >
              <img src={gerardoPhoto.url} alt="Gerardo Villa" className="w-full h-full object-cover" />
            </div>
            <div className="mt-3 font-bold" style={{ color: TEXT }}>Gerardo Villa</div>
            <div className="text-sm" style={{ color: MUTED }}>Más de 4.6 millones de dólares en ventas de Amazon</div>
          </div>

          <div className="rounded-lg p-6" style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}>
            <SectionTitle>— LO QUE INCLUYE TU CURSO —</SectionTitle>
            <ul className="divide-y" style={{ borderColor: BORDER }}>
              {valueItems.map((item, i) => (
                <li key={i} className="py-4 flex gap-3 first:pt-0 last:pb-0" style={{ borderColor: BORDER }}>
                  <div className="shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: TEXT }}>{item.title}</div>
                    <div className="text-sm mt-1" style={{ color: MUTED }}>{item.desc}</div>
                  </div>
                  <div className="shrink-0 text-sm font-semibold whitespace-nowrap" style={{ color: GREEN }}>
                    {item.value}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
              <SectionTitle>— LO QUE DICEN NUESTROS ALUMNOS —</SectionTitle>
              <div className="space-y-3">
                {testimonials.map((t, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: "#F9F9F9", border: `1px solid ${BORDER}` }}>
                    <div className="flex items-baseline gap-2">
                      <div className="font-bold text-sm" style={{ color: TEXT }}>{t.name}</div>
                      <div className="text-xs" style={{ color: MUTED }}>· {t.country}</div>
                    </div>
                    <div className="text-sm mt-2" style={{ color: TEXT }}>{t.text}</div>
                    <div className="flex gap-0.5 mt-2" style={{ color: "#f5a623" }}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg p-6 text-white" style={{ background: DARK, border: `2px solid ${ACCENT}` }}>
            <div className="inline-block px-3 py-1 text-[11px] font-bold rounded mb-4" style={{ background: ACCENT, color: "#fff" }}>
              BONUS — PRIMERAS 10 PERSONAS O ANTES DEL 15 DE JUNIO
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Target className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                <div className="flex-1 text-sm">
                  <div className="font-bold">Sesión de Lanzamiento</div>
                  <div style={{ color: "#bbb" }}>Consultoría 1:1 con Gerardo para definir exactamente qué producto lanzar</div>
                </div>
                <div className="text-sm font-semibold whitespace-nowrap" style={{ color: GREEN }}>Valor real $350 USD</div>
              </div>
              <div className="flex gap-3">
                <Search className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                <div className="flex-1 text-sm">
                  <div className="font-bold">Listing X-Ray</div>
                  <div style={{ color: "#bbb" }}>Gerardo revisa 2 de tus listings y te dice exactamente qué cambiar para vender más</div>
                </div>
                <div className="text-sm font-semibold whitespace-nowrap" style={{ color: GREEN }}>Valor real $347 USD</div>
              </div>
            </div>
            <div className="mt-4 pt-4 flex justify-between text-sm font-bold" style={{ borderTop: "1px solid #333" }}>
              <span>Total bonus</span>
              <span style={{ color: GREEN }}>Valor real $697 USD</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("pago")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="group relative w-full overflow-hidden rounded-lg p-6 text-center bg-gradient-to-r from-[#FFCC00] via-[#FF9900] to-[#FF6B00] text-black font-black transition-all duration-200 hover:-translate-y-0.5"
            style={{ animation: "vbounce 2.2s ease-in-out infinite, glow-pulse 1.8s ease-in-out infinite", boxShadow: "0 0 55px -4px rgba(255,153,0,0.9), 0 0 90px -20px rgba(255,107,0,0.6)" }}
          >
            <span className="relative z-10 block">
              <span className="block text-sm line-through opacity-75">Valor real total: $4,581 USD</span>
              <span className="block text-3xl mt-1">TUYO HOY: $497 USD</span>
              <span className="mt-3 inline-block px-4 py-2 rounded-full bg-white text-sm font-bold" style={{ color: ACCENT }}>
                PAGAR AHORA →
              </span>
            </span>
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"
              aria-hidden="true"
            />
          </button>

          <a href="/garantia.html" target="_blank" rel="noopener noreferrer" className="rounded-lg p-5 flex items-center gap-4 hover:opacity-90 transition" style={{ background: "#FAFAFA", border: `1px solid ${BORDER}` }}>
            <Shield className="h-16 w-16 shrink-0" style={{ color: ACCENT }} strokeWidth={1.5} />
            <div>
              <div className="font-bold" style={{ color: TEXT }}>Garantía de Primera Venta</div>
              <div className="text-sm mt-1" style={{ color: MUTED }}>
                Completa los ejercicios del curso y trabajamos contigo sin costo hasta que logres tu primera venta. Sin letra chica.
              </div>
            </div>
          </a>
        </div>
      </main>

      <footer style={{ background: "#fff", borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-xs space-y-1" style={{ color: MUTED }}>
          <p>© 2026 Gerardo Villa · Summa · Todos los derechos reservados</p>
          <p>Este sitio no forma parte de Facebook Inc. ni está respaldado por Amazon.com. Somos una organización independiente compatible con vendedores de Amazon.com.</p>
        </div>
      </footer>

      <a
        href={`https://wa.me/5212223288421?text=${encodeURIComponent("QUIERO MÁS INFORMACIÓN DEL SISTEMA DE AMAZON")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold text-sm shadow-lg hover:opacity-90"
        style={{ background: "#22c55e", animation: "vbounce 1.6s ease-in-out infinite" }}
      >
        <MessageCircle className="h-5 w-5" />
        Tengo dudas
      </a>

      <a
        href="https://calendly.com/cursos-summaproducts/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold text-sm shadow-lg hover:opacity-90"
        style={{ background: "#22c55e", animation: "vbounce 1.6s ease-in-out infinite" }}
      >
        <Calendar className="h-5 w-5" />
        Agenda una llamada
      </a>
      <style>{`@keyframes vbounce {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}} @keyframes shine {0%{transform:translateX(-100%)}100%{transform:translateX(100%)}} @keyframes glow-pulse {0%,100%{box-shadow:0 0 45px -4px rgba(255,153,0,0.85),0 0 75px -20px rgba(255,107,0,0.5)}50%{box-shadow:0 0 70px -2px rgba(255,153,0,1),0 0 110px -16px rgba(255,107,0,0.75)}} .animate-shine { animation: shine 2.2s ease-in-out infinite }`}</style>
    </div>
  );
}
