import node from "@astrojs/node";
import htmx from "astro-htmx";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [htmx()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
