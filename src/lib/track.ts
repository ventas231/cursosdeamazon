// Helpers de tracking: TikTok Pixel (global) + píxel oaiq custom engine.
// Los scripts base se cargan en src/routes/__root.tsx (head) y están en todas las rutas.

declare global {
  interface Window {
    ttq?: {
      page?: () => void;
      track?: (event: string, params?: Record<string, unknown>) => void;
    };
    // Stub del píxel oaiq (ID U25XSseFahYjorZUNtSHXN): encola llamadas
    // hasta que el script base (bzrcdn.openai.com/sdk/oaiq.min.js) las consuma.
    oaiq?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  }
}

export const CUSTOM_ENGINE_PIXEL_ID = "U25XSseFahYjorZUNtSHXN";

/** Page view de TikTok en navegaciones SPA (el base script solo dispara una vez). */
export function ttqPage() {
  if (typeof window !== "undefined" && typeof window.ttq?.page === "function") {
    window.ttq.page();
  }
}

/** Evento de conversión del custom engine oaiq. Sintaxis oficial del SDK: oaiq("event", ...). */
export function trackEngineEvent(event: string, eventId: string) {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") return;
  window.oaiq("event", event, { event_id: eventId });
}
