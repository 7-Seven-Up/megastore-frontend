import path from "path";
import react from "@vitejs/plugin-react-swc";

import { defineConfig, UserConfig } from "vite";

interface VitestConfig extends UserConfig {
  test: {
    globals: boolean;
    environment: string;
    setupFiles: string[];
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@auth": path.resolve(__dirname, "./src/modules/auth"),
      "@products": path.resolve(__dirname, "./src/modules/products"),
      "@user": path.resolve(__dirname, "./src/modules/users"),
      "@sizes": path.resolve(__dirname, "./src/modules/sizes"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@categories": path.resolve(__dirname, "./src/modules/categories"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/vitest.setup.ts"],
  },
} as VitestConfig);
