// Helpers de tracking: TikTok Pixel (global) + píxel custom engine.
// El TikTok Pixel base se carga en src/routes/__root.tsx (head) y está en todas las rutas.

declare global {
  interface Window {
    ttq?: {
      page?: () => void;
      track?: (event: string, params?: Record<string, unknown>) => void;
    };
    // Cola de eventos del píxel custom engine (ID U25XSseFahYjorZUNtSHXN).
    // Los eventos quedan encolados para que el script base del engine los consuma.
    __ceq?: Array<{ pixel: string; event: string; event_id: string; ts: number }>;
  }
}

export const CUSTOM_ENGINE_PIXEL_ID = "U25XSseFahYjorZUNtSHXN";

/** Page view de TikTok en navegaciones SPA (el base script solo dispara una vez). */
export function ttqPage() {
  if (typeof window !== "undefined" && typeof window.ttq?.page === "function") {
    window.ttq.page();
  }
}

/** Evento de conversión del custom engine. Se encola en window.__ceq. */
export function trackEngineEvent(event: string, eventId: string) {
  if (typeof window === "undefined") return;
  window.__ceq = window.__ceq || [];
  window.__ceq.push({ pixel: CUSTOM_ENGINE_PIXEL_ID, event, event_id: eventId, ts: Date.now() });
}
