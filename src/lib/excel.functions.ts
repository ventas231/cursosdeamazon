import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  whatsapp: z.string().min(8).max(20),
});

export const subscribeWhatsapp = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.MICROSOFT_EXCEL_API_KEY;
    const itemId = process.env.EXCEL_ITEM_ID;
    const worksheet = process.env.EXCEL_WORKSHEET ?? "Sheet1";
    const table = process.env.EXCEL_TABLE ?? "Table1";

    if (!apiKey || !connKey) {
      console.error("[excel] missing LOVABLE_API_KEY or MICROSOFT_EXCEL_API_KEY");
      return { ok: false as const, error: "excel_not_configured" };
    }
    if (!itemId) {
      console.error("[excel] missing EXCEL_ITEM_ID env var");
      return { ok: false as const, error: "missing_item_id" };
    }

    const url = `https://connector-gateway.lovable.dev/microsoft_excel/me/drive/items/${itemId}/workbook/worksheets/${encodeURIComponent(
      worksheet,
    )}/tables/${encodeURIComponent(table)}/rows/add`;

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
        console.error(`[excel] gateway ${res.status}: ${text}`);
        return { ok: false as const, error: `gateway_${res.status}` };
      }

      return { ok: true as const };
    } catch (err) {
      console.error("[excel] request failed", err);
      return { ok: false as const, error: "request_failed" };
    }
  });
