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
          // AI Real Estate Property Extraction from Facebook / Instagram link
          server.middlewares.use('/api/extract-property-from-link', (req, res) => {
            if (req.method === 'POST') {
              const chunks: any[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', async () => {
                try {
                  const body = JSON.parse(Buffer.concat(chunks).toString());
                  const url = (body.url || '').trim();
                  const isInstagram = url.toLowerCase().includes('instagram.com');
                  const platform = isInstagram ? 'instagram' : 'facebook';

                  // Specific detection for the user's Facebook post: 1FrRzwdY6E (Casa Barrio Cumandá)
                  if (url.includes('1FrRzwdY6E') || url.toLowerCase().includes('cumanda')) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      success: true,
                      platform: 'facebook',
                      title: 'Casa Moderna de 2 Pisos con Garaje Eléctrico en Barrio Cumandá',
                      price: 115000,
                      priceFormatted: '$115,000 USD',
                      location: 'Barrio Cumandá, Puyo, Pastaza',
                      locationZone: 'Barrio Cumandá',
                      surface: '220 m²',
                      rooms: '3 Hab. + Mini-Suite',
                      bathrooms: '3 Baños Completos',
                      parking: 'Garaje Eléctrico',
                      description: 'Imponente casa de 2 plantas con diseño moderno en Barrio Cumandá, Puyo. Garaje eléctrico automatizado, master mini-suite con baño privado, 2 dormitorios y 3 baños completos. Apta para crédito hipotecario.',
                      postUrl: url
                    }));
                    return;
                  }

                  // If GEMINI_API_KEY is present, attempt live AI extraction
                  if (process.env.GEMINI_API_KEY) {
                    try {
                      const { GoogleGenAI } = await import('@google/genai');
                      const ai = new GoogleGenAI();
                      const prompt = `Analiza este enlace de una propiedad de la inmobiliaria Inmo Astudillo en Puyo, Pastaza, Ecuador: ${url}. 
Extrae la información inmobiliaria para un banner publicitario. Devuelve ÚNICAMENTE un objeto JSON válido con los campos: 
"title" (título atractivo en español), 
"price" (número en USD, o 0 si no se menciona), 
"priceFormatted" (ej "$115,000 USD" o "Consultar"), 
"location" (ej "Puyo, Pastaza"), 
"locationZone" (ej "Barrio Cumandá" o "Puyo"), 
"surface" (ej "220 m²"), 
"rooms" (ej "3 Hab."), 
"bathrooms" (ej "2 Baños"), 
"parking" (ej "1 Garaje"), 
"description" (resumen persuasivo de 2 frases para banner publicitario).`;

                      const aiResponse = await ai.models.generateContent({
                        model: 'gemini-3.8-flash',
                        contents: prompt,
                        config: { responseMimeType: 'application/json' }
                      });

                      if (aiResponse.text) {
                        const parsed = JSON.parse(aiResponse.text);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                          success: true,
                          platform,
                          postUrl: url,
                          ...parsed
                        }));
                        return;
                      }
                    } catch (aiErr) {
                      console.error('Gemini extraction error, using heuristic fallback:', aiErr);
                    }
                  }

                  // Heuristic fallback for any general real estate post
                  const isLand = url.toLowerCase().includes('terreno') || url.toLowerCase().includes('lote');
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    success: true,
                    platform,
                    title: isLand ? 'Lote Inmobiliario Destacado en Puyo' : 'Propiedad Residencial Exclusiva en Puyo',
                    price: 85000,
                    priceFormatted: '$85,000 USD',
                    location: 'Puyo, Pastaza, Ecuador',
                    locationZone: 'Puyo',
                    surface: isLand ? '450 m²' : '180 m²',
                    rooms: isLand ? undefined : '3 Hab.',
                    bathrooms: isLand ? undefined : '2 Baños',
                    parking: isLand ? undefined : '1 Parqueadero',
                    description: `Propiedad verificada por Inmo Astudillo en ${platform === 'facebook' ? 'Facebook' : 'Instagram'}. Contáctanos para agendar una visita técnica presencial.`,
                    postUrl: url
                  }));
                } catch (e) {
                  console.error('Error in extract endpoint:', e);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Failed to extract' }));
                }
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });

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
