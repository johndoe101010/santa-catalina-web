import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [tsconfigPaths(), tailwindcss(), tanstackStart(), nitro(), react()],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
