import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    commonjsOptions: {
      esmExternals: true,
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "firebase/app", "firebase/database"],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/database"],
  },
});
