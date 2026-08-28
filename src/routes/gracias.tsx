import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { logPurchaseEmail } from "@/lib/excel.functions";
import {
  CheckCircle2,
  Mail,
  Rocket,
  MessageCircle,
  ArrowRight,
  FileText,
} from "lucide-react";

const KAJABI_URL = "https://expertoventasonline.mykajabi.com/offers/fyyAoouJ";
const SUPPORT_EMAIL = "cursos@summaproducts.com";
const WA_NUMBER = "5212223288421";

export const Route = createFileRoute("/gracias")({
  head: () => ({
    meta: [
      {
        title: "¡Gracias por tu compra! — Amazon + IA de 0 a 60 días",
      },
      {
        name: "description",
        content:
          "Tu pago fue recibido con éxito. Accede ahora al curso Amazon + IA de 0 a 60 días con Gerardo Villa.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Gracias,
});

function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof w.fbq === "function") {
    w.fbq("track", event, params);
  }
}

function Gracias() {
  const logPurchase = useServerFn(logPurchaseEmail);
  useEffect(() => {
    fbqTrack("Purchase", { value: 797, currency: "USD" });
    ttqPage();
    trackEngineEvent("Subscription Created", "6a91ab0d7bac819ea83cfa1ae113fa58");
    let email = "";
    try {
      email = localStorage.getItem("buyer_email") || "";
    } catch {}
    if (!email.includes("@")) return;
    logPurchase({ data: { email, amount: "797 USD" } })
      .then(() => {
        try {
          localStorage.removeItem("buyer_email");
        } catch {}
      })
      .catch((err: unknown) => console.error("[sheets] purchase log failed", err));
  }, [logPurchase]);


  const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    SUPPORT_EMAIL,
  )}&su=${encodeURIComponent("No pude acceder al curso")}`;

  const facturaWa = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "requiero factura de mi curso",
  )}`;

  const dudasWa = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Acabo de comprar el curso de Amazon + IA y tengo una duda",
  )}`;

  return (
    <div
      style={{ background: "#F7F7F7", color: "#222" }}
      className="min-h-screen flex flex-col"
    >
      <style>{`@keyframes vbounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>

      {/* Header */}
      <header
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E5E5" }}
        className="w-full"
      >
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <span className="font-bold text-base md:text-lg" style={{ color: "#1a1a1a" }}>
            Gerardo Villa
          </span>
          <span className="text-xs md:text-sm" style={{ color: "#777" }}>
            ¿Necesitas ayuda?{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="underline"
              style={{ color: "#FF6B00" }}
            >
              {SUPPORT_EMAIL}
            </a>
          </span>
        </div>
      </header>

      <main className="flex-1 w-full px-5 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Check */}
          <div
            className="mx-auto h-20 w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center"
            style={{ background: "#FF6B00" }}
          >
            <CheckCircle2 className="h-12 w-12 md:h-14 md:w-14 text-white" strokeWidth={2.5} />
          </div>

          <h1
            className="mt-7 text-3xl md:text-5xl font-black leading-tight"
            style={{ color: "#1a1a1a" }}
          >
            ¡Gracias por comprar el curso
            <br />
            <span style={{ color: "#FF6B00" }}>Amazon + IA de 0 a 60 días!</span>
          </h1>

          <p
            className="mt-5 text-base md:text-lg"
            style={{ color: "#777" }}
          >
            Tu pago fue recibido con éxito. Bienvenido a la familia.
          </p>
        </div>

        {/* ACCESO */}
        <section
          className="max-w-3xl mx-auto mt-10 rounded-2xl p-7 md:p-10 text-center"
          style={{
            background: "#FFFFFF",
            border: "2px solid #FF6B00",
            boxShadow: "0 20px 50px -20px rgba(255,107,0,0.45)",
          }}
        >
          <p
            className="text-xs md:text-sm font-bold tracking-[0.18em]"
            style={{ color: "#FF6B00" }}
          >
            — TU ACCESO AL CURSO —
          </p>
          <h2
            className="mt-3 text-2xl md:text-3xl font-black"
            style={{ color: "#1a1a1a" }}
          >
            Entra al curso ahora mismo
          </h2>
          <p
            className="mt-3 text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "#222" }}
          >
            Haz clic en el botón y crea tu cuenta con el mismo correo con el
            que hiciste el pago para tener acceso inmediato.
          </p>

          <a
            href={KAJABI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 mt-7 w-full md:w-auto px-8 md:px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-wide text-base md:text-lg text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: "#FF6B00",
              boxShadow: "0 12px 30px -8px rgba(255,107,0,0.55)",
            }}
          >
            ACCEDER AL CURSO AHORA
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>

          <p className="mt-4 text-xs md:text-sm" style={{ color: "#777" }}>
            También te llegará un correo de la plataforma con tus accesos.
          </p>
        </section>

        {/* MOTIVACIONAL DARK */}
        <section
          className="max-w-3xl mx-auto mt-8 rounded-2xl p-7 md:p-10 text-center"
          style={{
            background: "#1a1a1a",
            border: "2px solid #FF6B00",
          }}
        >
          <div className="flex justify-center">
            <Rocket className="h-10 w-10" style={{ color: "#FF6B00" }} strokeWidth={2.2} />
          </div>
          <h3 className="mt-4 text-xl md:text-2xl font-black text-white">
            Te vemos en la cima del éxito de Amazon
          </h3>
          <p className="mt-3 text-sm md:text-base text-white/80">
            Hoy diste el paso más importante: decidir cambiar tu futuro
            financiero.
          </p>
        </section>

        {/* QUÉ SIGUE AHORA */}
        <section
          className="max-w-3xl mx-auto mt-8 rounded-2xl p-7 md:p-10"
          style={{ background: "#FFFFFF", border: "1px solid #E5E5E5" }}
        >
          <p
            className="text-xs md:text-sm font-bold tracking-[0.18em] text-center"
            style={{ color: "#FF6B00" }}
          >
            — QUÉ SIGUE AHORA —
          </p>

          <ol className="mt-6 space-y-5">
            {[
              {
                t: "Entra al curso con el botón de arriba",
                d: "Crea tu cuenta usando el mismo correo de tu pago.",
              },
              {
                t: "Empieza por el Módulo 1 hoy mismo",
                d: "Los primeros 60 días son clave. Bloquea mínimo 1 hora al día.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 h-9 w-9 rounded-full text-white flex items-center justify-center font-black"
                  style={{ background: "#FF6B00" }}
                >
                  {i + 1}
                </span>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: "#222" }}>
                  <span className="font-bold">{item.t}</span>{" "}
                  <span style={{ color: "#777" }}>— {item.d}</span>
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* SOPORTE */}
        <section
          className="max-w-3xl mx-auto mt-8 rounded-2xl p-6 md:p-7 flex items-start gap-4"
          style={{ background: "#FAFAFA", border: "1px solid #E5E5E5" }}
        >
          <Mail className="h-7 w-7 flex-shrink-0" style={{ color: "#FF6B00" }} />
          <div>
            <p className="font-bold text-base md:text-lg" style={{ color: "#1a1a1a" }}>
              ¿Problemas para acceder al curso?
            </p>
            <p className="mt-1 text-sm md:text-base" style={{ color: "#222" }}>
              Escríbenos a{" "}
              <a
                href={gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
                style={{ color: "#FF6B00" }}
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              y te ayudamos.
            </p>
          </div>
        </section>

        {/* FACTURA */}
        <section
          className="max-w-3xl mx-auto mt-4 rounded-2xl p-6 md:p-7 flex items-start gap-4"
          style={{ background: "#FAFAFA", border: "1px solid #E5E5E5" }}
        >
          <FileText className="h-7 w-7 flex-shrink-0" style={{ color: "#FF6B00" }} />
          <div>
            <p className="font-bold text-base md:text-lg" style={{ color: "#1a1a1a" }}>
              ¿Requieres factura?
            </p>
            <p className="mt-1 text-sm md:text-base" style={{ color: "#222" }}>
              Escríbenos por{" "}
              <a
                href={facturaWa}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold"
                style={{ color: "#FF6B00" }}
              >
                WhatsApp
              </a>{" "}
              y te la generamos.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{ background: "#FFFFFF", borderTop: "1px solid #E5E5E5" }}
        className="w-full"
      >
        <div
          className="max-w-5xl mx-auto px-5 py-6 text-center text-xs md:text-sm"
          style={{ color: "#777" }}
        >
          © 2026 Gerardo Villa · Summa · Todos los derechos reservados.
          <br />
          Este sitio no es parte de Facebook ni está respaldado por Facebook
          Inc. Tampoco es parte de Google ni está respaldado por Google LLC.
        </div>
      </footer>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a
        href={dudasWa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full text-white font-bold shadow-xl"
        style={{
          background: "#22c55e",
          animation: "vbounce 2s ease-in-out infinite",
        }}
        aria-label="Tengo dudas"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm">Tengo dudas</span>
      </a>
    </div>
  );
}
