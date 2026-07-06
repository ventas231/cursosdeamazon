import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_whatsapp_link",
  title: "Get WhatsApp link",
  description:
    "Returns a WhatsApp deep link to contact the sales team with a prefilled message. Use for leads interested in the Amazon + AI system.",
  inputSchema: {
    message: z
      .string()
      .min(1)
      .max(500)
      .default("Quiero ver el sistema")
      .describe("Prefilled WhatsApp message text."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ message }) => {
    const url = `https://wa.me/522223288421?text=${encodeURIComponent(message)}`;
    return {
      content: [{ type: "text", text: url }],
      structuredContent: { url, phone: "+52 222 328 8421", message },
    };
  },
});
