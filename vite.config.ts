import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // persist vite cache for faster subsequent starts
  cacheDir: path.resolve(__dirname, 'node_modules/.vite'),
  server: {
    host: "::",
    port: 8080,
    // reduce file watching overhead on Windows
    watch: {
      usePolling: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  // prebundle heavy deps to speed up dev server cold starts
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'recharts',
      'embla-carousel-react',
      'react-day-picker',
      '@supabase/supabase-js',
      'clsx',
      'tailwind-merge',
      'sonner'
    ],
    // some libraries ship mixed ESM/CJS
    esbuildOptions: {
      keepNames: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build-time optimizations for smaller, faster bundles
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('lucide-react')) return 'lucide';
          if (id.includes('recharts')) return 'recharts';
          if (id.includes('embla-carousel-react')) return 'embla';
          if (id.includes('react-day-picker')) return 'daypicker';
          if (id.includes('@supabase')) return 'supabase';
          return 'vendor';
        },
      },
    },
  },
}));
