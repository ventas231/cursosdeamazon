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

type OpenAIEventType = "contents" | "plan_enrollment";

/**
 * Envía un evento estándar al OpenAI Ads Pixel usando la sintaxis
 * proporcionada por Ads Manager.
 */
export function trackEngineEvent(event: string, type: OpenAIEventType) {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") {
    console.warn("[OpenAI Pixel] oaiq no está disponible; evento no enviado", { event, type });
    return false;
  }

  try {
    window.oaiq("measure", event, { type });
    console.info("[OpenAI Pixel] evento enviado", { event, type });
    return true;
  } catch (error) {
    console.error("[OpenAI Pixel] error enviando evento", { event, type, error });
    return false;
  }
}
