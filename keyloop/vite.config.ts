import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" so the bundle works when served from Capacitor's local
// webview origin as well as any sub-path on a normal web server.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
