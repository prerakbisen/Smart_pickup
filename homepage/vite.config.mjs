import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    // Read port from environment (e.g. .env or PORT env var), fallback to 8081
    port: Number(process.env.PORT) || 8081,
    host: "0.0.0.0",
    strictPort: false,
    // allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
});