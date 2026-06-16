import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  whatsapp: z.string().min(8).max(20),
});

const checkoutSchema = z.object({
  whatsapp: z.string().min(0).max(20).optional().default(""),
  label: z.string().max(50).optional().default("Llegó a checkout"),
});

const SPREADSHEET_ID = "1BwhJE_7gP8-SGdnKdCFcbkWktZLJeZuiY6gb3ToiiZw";
const RANGE = "'Hoja 1'!A:B";
const CHECKOUT_RANGE = "'Carrito Abandonado'!A:C";

export const subscribeWhatsapp = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;

    if (!apiKey || !connKey) {
      console.error("[sheets] missing LOVABLE_API_KEY or GOOGLE_SHEETS_API_KEY");
      return { ok: false as const, error: "sheets_not_configured" };
    }

    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-Connection-Api-Key": connKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[data.whatsapp, new Date().toISOString()]],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`[sheets] gateway ${res.status}: ${text}`);
        return { ok: false as const, error: `gateway_${res.status}` };
      }

      return { ok: true as const };
    } catch (err) {
      console.error("[sheets] request failed", err);
      return { ok: false as const, error: "request_failed" };
    }
  });

export const logCheckoutVisit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => checkoutSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;

    if (!apiKey || !connKey) {
      console.error("[sheets] missing LOVABLE_API_KEY or GOOGLE_SHEETS_API_KEY");
      return { ok: false as const, error: "sheets_not_configured" };
    }

    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/${CHECKOUT_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-Connection-Api-Key": connKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[data.whatsapp || "(sin número)", new Date().toISOString(), data.label || "Llegó a checkout"]],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`[sheets] checkout gateway ${res.status}: ${text}`);
        return { ok: false as const, error: `gateway_${res.status}` };
      }

      return { ok: true as const };
    } catch (err) {
      console.error("[sheets] checkout request failed", err);
      return { ok: false as const, error: "request_failed" };
    }
  });
