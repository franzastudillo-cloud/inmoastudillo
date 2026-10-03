/* REQUISITOS DE FOTOS
 - Formatos: JPG, PNG o WebP (no HEIC; en iPhone elegir "Más compatible").
 - Peso: máximo 8 MB por foto al elegirla; se reduce a WebP de máximo 1600 px del lado largo y menos de 400 KB.
 - Horizontales, proporción 4:3 o 16:9. Portada: la mejor foto de la fachada.
 - De 3 a 10 fotos por publicación.
 - Sin marcas de agua, textos ni capturas de pantalla.
 - Solo fotos propias de la propiedad. */
const TIPOS_OK = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_ENTRADA = 8 * 1024 * 1024;
const MAX_LADO = 1600;
const MAX_SALIDA = 400 * 1024;

export async function comprimirFoto(file: File): Promise<File> {
  if (!TIPOS_OK.includes(file.type)) throw new Error(`"${file.name}": usa JPG, PNG o WebP (no HEIC).`);
  if (file.size > MAX_ENTRADA) throw new Error(`"${file.name}": pesa más de 8 MB.`);
  const bmp = await createImageBitmap(file);
  if (bmp.width < bmp.height) throw new Error(`"${file.name}": la foto debe ser horizontal.`);
  const escala = Math.min(1, MAX_LADO / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * escala);
  const h = Math.round(bmp.height * escala);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo procesar la foto.');
  ctx.drawImage(bmp, 0, 0, w, h);
  bmp.close();
  let calidad = 0.85;
  let blob: Blob | null = null;
  while (calidad >= 0.4) {
    blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/webp', calidad));
    if (blob && blob.size <= MAX_SALIDA) break;
    calidad -= 0.1;
  }
  if (!blob || blob.size > MAX_SALIDA) throw new Error(`"${file.name}": la foto sigue muy pesada. Prueba con otra.`);
  return new File([blob], file.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' });
}
