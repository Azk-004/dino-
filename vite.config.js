import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// La formation est un build Vite séparé, copié dans public/formation.
// Sur le serveur de dev et en preview, /formation et /formation/ sont
// interceptés pour servir index.html de la formation (sinon le fallback SPA
// de la landing prend le dessus). En production, le serveur statique sert
// lui-même l'index du dossier public/formation.
function formationMiddleware() {
  const candidates = [
    path.join(rootDir, 'public', 'formation', 'index.html'),
    path.join(rootDir, 'dist', 'formation', 'index.html'),
  ];
  return function (req, res, next) {
    const url = (req.url || '').split('?')[0];
    if (url === '/formation') {
      res.statusCode = 301;
      res.setHeader('Location', '/formation/');
      res.end();
      return;
    }
    if (url === '/formation/') {
      const file = candidates.find((f) => existsSync(f));
      if (file) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        createReadStream(file).pipe(res);
        return;
      }
    }
    next();
  };
}

export default defineConfig({
  envPrefix: 'SUPABASE_',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'formation-route',
      configureServer(server) {
        server.middlewares.use(formationMiddleware());
      },
      configurePreviewServer(server) {
        server.middlewares.use(formationMiddleware());
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
});
