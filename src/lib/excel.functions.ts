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
const SHEET_NAME = "Hoja 1";
const CHECKOUT_MARK = "✓";

const normalizePhone = (value: string) => value.replace(/\D/g, "");

function columnToLetter(column: number) {
  let letter = "";
  while (column > 0) {
    const remainder = (column - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    column = Math.floor((column - 1) / 26);
  }
  return letter;
}

function normalizeHeader(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, " ");
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

    const baseUrl = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values`;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "X-Connection-Api-Key": connKey,
      "Content-Type": "application/json",
    };

    try {
      const targetPhone = normalizePhone(data.whatsapp || "");
      let rows: string[][] = [];
      let checkoutColumnIndex = -1;
      let targetRowIndex = -1;

      for (const delay of [0, 500, 1200]) {
        if (delay) await wait(delay);
        const sheetRange = `'${SHEET_NAME}'!A:Z`;
        const rowsRes = await fetch(`${baseUrl}/${sheetRange}`, { headers });
        if (!rowsRes.ok) {
          const text = await rowsRes.text();
          console.error(`[sheets] checkout read gateway ${rowsRes.status}: ${text}`);
          return { ok: false as const, error: `gateway_${rowsRes.status}` };
        }

        const rowsPayload = (await rowsRes.json()) as { values?: string[][] };
        rows = rowsPayload.values || [];
        const headersRow = rows[0] || [];
        checkoutColumnIndex = headersRow.findIndex((header) => normalizeHeader(header) === "CHECK OUT");

        if (checkoutColumnIndex === -1) {
          console.error('[sheets] CHECK OUT column not found in Hoja 1');
          return { ok: false as const, error: "checkout_column_not_found" };
        }

        targetRowIndex = targetPhone
          ? rows.reduce((latestIndex, row, index) => (
              index > 0 && normalizePhone(row[0] || "") === targetPhone ? index : latestIndex
            ), -1)
          : -1;

        if (targetRowIndex !== -1) break;
      }

      if (targetRowIndex === -1) {
        console.error("[sheets] checkout phone not found in Hoja 1", data.whatsapp);
        return { ok: false as const, error: "phone_not_found" };
      }

      const checkoutCell = `${columnToLetter(checkoutColumnIndex + 1)}${targetRowIndex + 1}`;
      const updateRange = `'${SHEET_NAME}'!${checkoutCell}`;
      const updateRes = await fetch(`${baseUrl}/${updateRange}?valueInputOption=USER_ENTERED`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ values: [[CHECKOUT_MARK]] }),
      });

      if (!updateRes.ok) {
        const text = await updateRes.text();
        console.error(`[sheets] checkout update gateway ${updateRes.status}: ${text}`);
        return { ok: false as const, error: `gateway_${updateRes.status}` };
      }

      return { ok: true as const, row: targetRowIndex + 1, column: checkoutCell };
    } catch (err) {
      console.error("[sheets] checkout request failed", err);
      return { ok: false as const, error: "request_failed" };
    }
  });
