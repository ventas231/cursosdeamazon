# ANUNCIOS 

Crea una landing page en español para "Gerardo Villa · Amazon + IA" con esta estructura EXACTA (8 secciones, mismo orden, mismos textos), pero el formulario captura NÚMERO DE WHATSAPP en lugar de email, y los leads se guardan en Microsoft Excel (no Google Sheets).

═══════════════════════════════════════════
STACK Y CONFIG
═══════════════════════════════════════════
- TanStack Start + React 19 + Tailwind v4 + shadcn/ui
- Activa Lovable Cloud
- Conector: Microsoft Excel (vía connector gateway). Pide al usuario conectar su cuenta y configurar el archivo .xlsx destino con columnas: A=whatsapp, B=timestamp
- Color brand: naranja Amazon (#FF6B00 / oklch equivalente). Fondo oscuro (#0a0a0a). Tokens semánticos en src/styles.css (brand, brand-hover, brand-soft, surface, hairline, input-bg, muted-foreground, etc.)
- Tipografía: sans-serif bold, jerarquía fuerte (text-4xl → text-6xl en hero h1)

═══════════════════════════════════════════
COMPONENTE: WhatsAppForm (reemplaza LeadForm)
═══════════════════════════════════════════
- Input tipo "tel", inputMode="tel", autoComplete="tel"
- Placeholder: "+52 55 1234 5678"
- Validación: mínimo 8 dígitos numéricos (permite +, espacios, guiones; los limpia antes de validar)
- Mensaje error: "Ingresa un número de WhatsApp válido."
- Botón: "VER EL SISTEMA AHORA →" (naranja brand, full width, h-14, animate pulse-glow, hover -translate-y-1)
- Texto bajo botón: "🔒 Tu WhatsApp está 100% seguro."
- Al submit: llama serverFn `subscribeWhatsapp` que hace POST al gateway de Microsoft Excel (append row con [whatsapp, new Date().toISOString()]). Luego redirige a /acelerador
- Props: heading, subheading?, idPrefix
- Label sr-only "WhatsApp"

═══════════════════════════════════════════
SERVER FN: src/lib/excel.functions.ts
═══════════════════════════════════════════
- createServerFn POST con zod: { whatsapp: string.min(8).max(20) }
- Lee process.env.LOVABLE_API_KEY y process.env.MICROSOFT_EXCEL_API_KEY
- GATEWAY_URL = "https://connector-gateway.lovable.dev/microsoft_excel"
- PATCH/POST a `/me/drive/items/{ITEM_ID}/workbook/worksheets/{SHEET}/tables/{TABLE}/rows/add` con body { values: [[whatsapp, timestamp]] }
- Headers: Authorization Bearer LOVABLE_API_KEY, X-Connection-Api-Key MICROSOFT_EXCEL_API_KEY
- Devuelve { ok: true } o { ok: false, error }. No bloquea la redirección si falla.

═══════════════════════════════════════════
ESTRUCTURA DE SECCIONES (src/routes/index.tsx)
═══════════════════════════════════════════

SECCIÓN 1 — Barra urgencia (bg brand): "🔥 ACCESO LIMITADO"

SECCIÓN 2 — HERO:
- Eyebrow naranja uppercase: "Gerardo Villa · $4M+ USD en ventas verificadas en Amazon"
- H1 black 4xl→6xl: "Descubre cómo lanzar tu primer producto en [Amazon] con [IA] en [60 días]" (palabras entre [] en color brand)
  - Subtítulo en <span block>: "sin adivinar ni quemar tus ahorros"
- Párrafo: "Descubre el sistema exacto que uso en mi negocio de $4M+ USD y cómo tú puedes replicarlo desde cero."
- Foto circular Gerardo (144x144, ring brand) con glow blur detrás
- Chip pill: "Gerardo Villa · Amazon MX & USA"
- Caja destacada border-brand bg-brand/10: "⭐ Mencionado por Amazon México como uno de los vendedores exitosos de Amazon Estados Unidos"
- WhatsAppForm con heading "Ingresa tu WhatsApp y descubre el secreto de Amazon", idPrefix="hero"

SECCIÓN 3 — Prueba social (bg surface, 3 columnas con divisores):
- $4M+ / USD vendidos en Amazon MX & USA
- 500+ / alumnos en el programa
- 60 días / para tu primer lanzamiento
(Números 5xl black brand)

SECCIÓN 4 — "Descubre el secreto que genera ventas amazon" (h2 3xl-4xl black centrado):
Lista con checks naranjas en círculos:
1. El sistema exacto de validación de productos con Helium 10 e IA que elimina el 90% del riesgo de perder dinero
2. Cómo usar Claude AI para crear listados, fotos de producto y campañas PPC — sin contratar a nadie
3. Por qué la mayoría de personas fracasa en Amazon (y el error específico que debes evitar)
4. La estrategia de los 60 días: de idea validada a primera venta, paso a paso
5. El modelo real de negocio con márgenes y números — sin prometer ingresos mágicos

SECCIÓN 5 — Para sellers actuales (bg surface):
- Pill border-brand: "¿YA VENDES EN AMAZON?"
- H2: "El sistema también es para ti"
- Párrafo intro: "Si ya tienes productos activos y quieres escalar con IA, esto te va a cambiar la operación:"
- Lista con flechas → brand:
1. Audita tu PPC con IA en 10 minutos y corta el ACOS sin apagar campañas
2. Reescribe tus listings con Claude para subir conversión sin perder posición en keywords
3. Genera imágenes de producto profesionales con IA — sin fotógrafo, sin estudio
4. Analiza cientos de reviews de la competencia y descubre exactamente qué mejorar
5. Automatiza reportes de Seller Central y toma decisiones con datos, no con intuición
- Card CTA premium (link a https://calendly.com/cursos-summaproducts/30min) border-brand glow naranja:
  - Pill "👑 SERVICIO PREMIUM"
  - Texto: "¿Quieres que mi equipo lo haga por ti?"
  - Chevron derecha

SECCIÓN 6 — Segundo CTA (bg surface):
WhatsAppForm con heading "¿Listo para ver el sistema?", subheading "Miles de personas hispanohablantes ya están usando este sistema. Tú puedes ser el siguiente.", idPrefix="cta2"

SECCIÓN 7 — Garantía (centrado, max-w-xl):
- Icono ShieldCheck en círculo brand/15
- H2: "Este sistema es 100% gratuito"
- Párrafo: "No te vamos a pedir tarjeta de crédito. Solo tu WhatsApp para mandarte el acceso directo al sistema."
- Logos Amazon, Claude, Helium 10 (h-16/h-20)
- Caption: "Las herramientas que usamos en el curso"

SECCIÓN 8 — Footer (bg #060606):
"© 2026 Gerardo Villa · Summa · Todos los derechos reservados"

═══════════════════════════════════════════
SEO HEAD
═══════════════════════════════════════════
- title: "Amazon + IA de 0 a 60 días · Gerardo Villa"
- description: "Descubre el sistema gratuito donde Gerardo Villa explica el sistema exacto para lanzar tu primer producto en Amazon con IA en 60 días."
- og:title, og:description equivalentes

═══════════════════════════════════════════
RUTA /acelerador
═══════════════════════════════════════════
Crea una ruta placeholder simple con un <video> o mensaje "Cargando sistema…" (la VSL se añadirá después).

IMPORTANTE: misma jerarquía visual, mismo tono, mismos espaciados (py-16/py-20 por sección, max-w-5xl). Mobile-first responsive. Cambia ÚNICAMENTE email → WhatsApp y Google Sheets → Microsoft Excel. Todo lo demás idéntico.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cursosdeamazon.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dc354da1-0939-4e08-91a9-7ed90ab6c95f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
