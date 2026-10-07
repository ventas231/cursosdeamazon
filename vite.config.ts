import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: false },
    pages: [{ path: "/" }, { path: "/acelerador" }, { path: "/checkout" }, { path: "/gracias" }],
  },
  vite: {
    preview: { host: "127.0.0.1" },
  },
});
