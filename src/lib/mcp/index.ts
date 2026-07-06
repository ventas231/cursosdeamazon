import { defineMcp } from "@lovable.dev/mcp-js";
import courseInfoTool from "./tools/course-info";
import whatsappLinkTool from "./tools/whatsapp-link";

export default defineMcp({
  name: "cursos-de-amazon-mcp",
  title: "Cursos de Amazon MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Cursos de Amazon landing page. Use `get_course_info` for course details and pricing, and `get_whatsapp_link` to generate a WhatsApp contact link with a prefilled message.",
  tools: [courseInfoTool, whatsappLinkTool],
});
