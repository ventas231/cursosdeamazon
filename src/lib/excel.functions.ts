import { z } from "zod";

import { SHEETS_WEBAPP_URL } from "./sheets-config";

// Registra formularios en Google Sheets a través de Google Apps Script
// (apps-script/Codigo.gs). Se llama desde el navegador: el sitio es estático.

const schema = z.object({
  whatsapp: z.string().trim().email().max(255),
});

const checkoutSchema = z.object({
  whatsapp: z.string().min(0).max(255).optional().default(""),
  label: z.string().max(50).optional().default("Llegó a checkout"),
});

const purchaseSchema = z.object({
  email: z.string().trim().email().max(255),
  amount: z.string().max(50).optional().default("797 USD"),
});

type Result = { ok: true; row?: number } | { ok: false; error: string };

async function post(payload: Record<string, unknown>): Promise<Result> {
  if (!SHEETS_WEBAPP_URL) {
    console.error("[sheets] SHEETS_WEBAPP_URL no configurada");
    return { ok: false, error: "sheets_not_configured" };
  }
  try {
    // text/plain evita la petición previa de CORS que Apps Script no responde.
    const res = await fetch(SHEETS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return (await res.json()) as Result;
  } catch (err) {
    console.error("[sheets] request failed", err);
    return { ok: false, error: "request_failed" };
  }
}

export const subscribeWhatsapp = ({ data }: { data: unknown }) =>
  post({ action: "subscribe", ...schema.parse(data) });

export const logCheckoutVisit = ({ data }: { data: unknown }) =>
  post({ action: "checkout", ...checkoutSchema.parse(data) });

export const logPurchaseEmail = ({ data }: { data: unknown }) =>
  post({ action: "purchase", ...purchaseSchema.parse(data) });
