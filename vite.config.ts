import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@auth": path.resolve(__dirname, "./src/features/auth"),
      "@categories": path.resolve(__dirname, "./src/features/categories"),
      "@products": path.resolve(__dirname, "./src/features/products"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@sizes": path.resolve(__dirname, "./src/features/sizes"),
      "@user": path.resolve(__dirname, "./src/features/users"),
    },
  },
});
