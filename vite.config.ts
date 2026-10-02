import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'upload-image-handler',
        configureServer(server) {
          server.middlewares.use('/api/upload-image', (req, res) => {
            if (req.method === 'POST') {
              const chunks: any[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', () => {
                try {
                  const body = JSON.parse(Buffer.concat(chunks).toString());
                  if (body.dataUrl && body.filename) {
                    const base64Data = body.dataUrl.replace(/^data:image\/\w+;base64,/, '');
                    const targetPath = path.resolve(__dirname, 'public', body.filename);
                    fs.writeFileSync(targetPath, base64Data, 'base64');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, url: `/${body.filename}` }));
                    return;
                  }
                } catch (e) {
                  console.error('Error saving image:', e);
                }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid payload' }));
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
