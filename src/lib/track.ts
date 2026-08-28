// Helpers de tracking: TikTok Pixel + OpenAI Ads Pixel.
// Los scripts base se cargan en src/routes/__root.tsx y están disponibles en todas las rutas.

declare global {
  interface Window {
    ttq?: {
      page?: () => void;
      track?: (event: string, params?: Record<string, unknown>) => void;
    };
    oaiq?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
  }
}

export const CUSTOM_ENGINE_PIXEL_ID = "U25XSseFahYjorZUNtSHXN";

export function ttqPage() {
  if (typeof window !== "undefined" && typeof window.ttq?.page === "function") {
    window.ttq.page();
  }
}

/**
 * Envía un evento al OpenAI Ads Pixel.
 * El segundo argumento es el ID del evento configurado en Ads Manager.
 */
export function trackEngineEvent(event: string, eventId: string) {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") {
    console.warn("[OpenAI Pixel] oaiq no está disponible; evento no enviado", { event, eventId });
    return false;
  }

  try {
    // Sintaxis oficial del SDK: oaiq("event", nombre_evento, { event_id }).
    window.oaiq("event", event, { event_id: eventId });
    console.info("[OpenAI Pixel] evento enviado", { event, eventId });
    return true;
  } catch (error) {
    console.error("[OpenAI Pixel] error enviando evento", { event, eventId, error });
    return false;
  }
}
