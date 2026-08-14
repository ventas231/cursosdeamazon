import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_course_info",
  title: "Get course info",
  description:
    "Returns an overview of the Amazon + AI sales system course, including price, results, and what's included.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "Sistema Amazon + IA",
            headline: "Más de $4.6 millones de dólares en ventas de Amazon",
            price_usd: 797,
            landing_url: "https://cursosdeamazon.lovable.app",
            checkout_url: "https://cursosdeamazon.lovable.app/checkout",
            whatsapp_group: "https://chat.whatsapp.com/C5W6DF1bp4MKkdwVAQcgII",
            contact_whatsapp: "+52 222 328 8421",
            description:
              "Sistema de ventas en Amazon apoyado con IA. Incluye acceso al grupo de WhatsApp y al acelerador con casos de éxito reales.",
          },
          null,
          2,
        ),
      },
    ],
  }),
});
