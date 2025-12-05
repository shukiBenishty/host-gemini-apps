import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: "index.html",
          sw: "service-worker.ts",
        },
        output: {
          entryFileNames: (chunk) =>
            chunk.name === "sw" ? "sw.js" : "assets/[name]-[hash].js",
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
