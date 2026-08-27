import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  whatsapp: z.string().trim().email().max(255),
});

const checkoutSchema = z.object({
  whatsapp: z.string().min(0).max(255).optional().default(""),
  label: z.string().max(50).optional().default("Llegó a checkout"),
});

const SPREADSHEET_ID = "1BwhJE_7gP8-SGdnKdCFcbkWktZLJeZuiY6gb3ToiiZw";
const PURCHASES_SPREADSHEET_ID = "15ANLgzt_hOLhb3g8scOTg5DssgdO_NI_hwwoxnx7ezQ";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets";
const CHECKOUT_MARK = "✓";

// The tab has been renamed before ("Hoja 1" -> "PAGINA "), which breaks fixed ranges.
// Resolve the real tab title at runtime and cache it.
const sheetNameCache: Record<string, string> = {};

async function resolveSheetName(headers: Record<string, string>, spreadsheetId = SPREADSHEET_ID) {
  if (sheetNameCache[spreadsheetId]) return sheetNameCache[spreadsheetId];
  const res = await fetch(`${GATEWAY}/${spreadsheetId}?fields=sheets.properties.title`, { headers });
  if (!res.ok) {
    console.error(`[sheets] metadata ${res.status}: ${await res.text()}`);
    return null;
  }
  const payload = (await res.json()) as { sheets?: { properties?: { title?: string } }[] };
  const titles = (payload.sheets || [])
    .map((s) => s.properties?.title)
    .filter((t): t is string => Boolean(t));
  const resolved =
    titles.find((t) => t.trim().toUpperCase() === "PAGINA") ??
    titles.find((t) => t.trim().toUpperCase() === "HOJA 1") ??
    titles[0] ??
    null;
  if (resolved) sheetNameCache[spreadsheetId] = resolved;
  return resolved;
}


const buildRange = (sheet: string, a1: string) => encodeURIComponent(`'${sheet}'!${a1}`);

const normalizePhone = (value: string) =>
  value.includes("@") ? value.trim().toLowerCase() : value.replace(/\D/g, "");

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

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "X-Connection-Api-Key": connKey,
      "Content-Type": "application/json",
    };

    try {
      const sheetName = await resolveSheetName(headers);
      if (!sheetName) return { ok: false as const, error: "sheet_not_found" };

      const url = `${GATEWAY}/${SPREADSHEET_ID}/values/${buildRange(sheetName, "A:B")}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

      const res = await fetch(url, {
        method: "POST",
        headers,
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

    const baseUrl = `${GATEWAY}/${SPREADSHEET_ID}/values`;
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "X-Connection-Api-Key": connKey,
      "Content-Type": "application/json",
    };

    try {
      const sheetName = await resolveSheetName(headers);
      if (!sheetName) return { ok: false as const, error: "sheet_not_found" };

      const targetPhone = normalizePhone(data.whatsapp || "");
      let rows: string[][] = [];
      let checkoutColumnIndex = -1;
      let targetRowIndex = -1;

      for (const delay of [0, 500, 1200]) {
        if (delay) await wait(delay);
        const rowsRes = await fetch(`${baseUrl}/${buildRange(sheetName, "A:Z")}`, { headers });
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
          console.error("[sheets] CHECK OUT column not found in", sheetName);
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
        console.error("[sheets] checkout contact not found", data.whatsapp);
        return { ok: false as const, error: "phone_not_found" };
      }

      const checkoutCell = `${columnToLetter(checkoutColumnIndex + 1)}${targetRowIndex + 1}`;
      const updateRes = await fetch(
        `${baseUrl}/${buildRange(sheetName, checkoutCell)}?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({ values: [[CHECKOUT_MARK]] }),
        },
      );

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
