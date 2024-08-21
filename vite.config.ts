import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import * as path from "path";
import dotenv from "dotenv";

export default defineConfig({
  plugins: [react(), TanStackRouterVite({ routesDirectory: "src/app/routes" })],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  preview: {
    cors: {
      origin: "*",
    },
  },
  define: {
    "process.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
  },
  server: {
    proxy: {
      "/api/v1": {
        target: "http://158.160.111.140",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
