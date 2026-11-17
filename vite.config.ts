/// <reference types="vitest/config" />
/// <reference types="node" />
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages project site: https://<owner>.github.io/ikigai-guide/
// Override with BASE_PATH="/" for a user site or custom domain.
const basePath = process.env.BASE_PATH ?? "/ikigai-guide/";

export default defineConfig({
  base: basePath,
  plugins: [solid(), tailwindcss()],
  test: {
    environment: "node",
  },
});
