type Env = {
  DB: any;
  FOTOS: any;
  ASSETS: { fetch: (r: Request) => Promise<Response> };
  ADMIN_PASSWORD?: string;
};

const MAX_PUBLICACIONES = 20;
const MIN_FOTOS = 3;
const MAX_FOTOS = 10;
const MAX_FOTO_BYTES = 1_500_000;
const TIPOS = ['casa', 'terreno', 'departamento', 'quinta'];
const SESION_HORAS = 12;
const enc = new TextEncoder();

function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  });
}

async function hmac(secreto: string, mensaje: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secreto), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const firma = await crypto.subtle.sign('HMAC', key, enc.encode(mensaje));
  return [...new Uint8Array(firma)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function iguales(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function cookie(valor: string, maxAge: number) {
  return `sesion=${valor}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

async function esAdmin(request: Request, env: Env) {
  if (!env.ADMIN_PASSWORD) return false;
  const m = (request.headers.get('Cookie') || '').match(/(?:^|;\s*)sesion=(\d+)\.([a-f0-9]{64})/);
  if (!m || Number(m[1]) < Date.now()) return false;
  return iguales(await hmac(env.ADMIN_PASSWORD, 'sesion:' + m[1]), m[2]);
}

async function login(request: Request, env: Env) {
  if (!env.ADMIN_PASSWORD) return json({ error: 'El administrador no está configurado' }, 503);
  let body: any = {};
  try { body = await request.json(); } catch {}
  const intento = typeof body.password === 'string' ? body.password : '';
  const ok = iguales(await hmac('cmp', intento), await hmac('cmp', env.ADMIN_PASSWORD));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800));
    return json({ error: 'Contraseña incorrecta' }, 401);
  }
  const exp = Date.now() + SESION_HORAS * 3600 * 1000;
  const firma = await hmac(env.ADMIN_PASSWORD, 'sesion:' + exp);
  return json({ ok: true }, 200, { 'Set-Cookie': cookie(`${exp}.${firma}`, SESION_HORAS * 3600) });
}

function mapear(r: any) {
  const claves: string[] = JSON.parse(r.fotos || '[]');
  return {
    id: r.id,
    titulo: r.titulo,
    tipo: r.tipo,
    precio: r.precio,
    ubicacion: r.ubicacion,
    descripcion: r.descripcion,
    superficie: r.superficie,
    habitaciones: r.habitaciones,
    banos: r.banos,
    parqueaderos: r.parqueaderos,
    enlacePublicacion: r.enlace_publicacion,
    fotos: claves.map((k) => `/api/fotos/${k}`),
    creadoEn: r.creado_en,
  };
}

async function listar(env: Env) {
  const { results } = await env.DB.prepare('SELECT * FROM propiedades ORDER BY creado_en DESC').all();
  return json(results.map(mapear));
}

function enlaceValido(s: string) {
  try {
    const u = new URL(s);
    return u.protocol === 'https:' && /(^|\.)(facebook\.com|instagram\.com|fb\.watch)$/.test(u.hostname);
  } catch {
    return false;
  }
}

async function crear(request: Request, env: Env) {
  const form = await request.formData();
  const texto = (k: string) => String(form.get(k) ?? '').trim();
  const numero = (k: string) => {
    const v = texto(k);
    if (v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  };

  const titulo = texto('titulo');
  const tipo = texto('tipo');
  const precio = numero('precio');
  const ubicacion = texto('ubicacion');
  const descripcion = texto('descripcion');
  const superficie = numero('superficie');
  const habitaciones = numero('habitaciones');
  const banos = numero('banos');
  const parqueaderos = numero('parqueaderos');
  const enlace = texto('enlacePublicacion');

  if (!titulo || titulo.length > 120) return json({ error: 'El título es obligatorio (máximo 120 caracteres)' }, 400);
  if (!TIPOS.includes(tipo)) return json({ error: 'Tipo de propiedad no válido' }, 400);
  if (precio === null || Number.isNaN(precio) || precio <= 0) return json({ error: 'El precio no es válido' }, 400);
  if (!ubicacion || ubicacion.length > 150) return json({ error: 'La ubicación es obligatoria (máximo 150 caracteres)' }, 400);
  if (descripcion.length > 3000) return json({ error: 'La descripción es muy larga (máximo 3000 caracteres)' }, 400);
  for (const n of [superficie, habitaciones, banos, parqueaderos]) {
    if (Number.isNaN(n)) return json({ error: 'Hay un número no válido en los datos' }, 400);
  }
  if (enlace && !enlaceValido(enlace)) return json({ error: 'El enlace debe ser de Facebook o Instagram (https)' }, 400);

  const archivos = form.getAll('fotos').filter((f: any) => typeof f !== 'string') as any[];
  if (archivos.length < MIN_FOTOS || archivos.length > MAX_FOTOS) {
    return json({ error: `Sube entre ${MIN_FOTOS} y ${MAX_FOTOS} fotos` }, 400);
  }
  for (const f of archivos) {
    if (!['image/webp', 'image/jpeg', 'image/png'].includes(f.type)) return json({ error: 'Formato de foto no permitido' }, 400);
    if (f.size > MAX_FOTO_BYTES) return json({ error: 'Una foto es demasiado pesada' }, 400);
  }

  const conteo: any = await env.DB.prepare('SELECT COUNT(*) AS n FROM propiedades').first();
  if (conteo.n >= MAX_PUBLICACIONES) {
    return json({ error: `Ya hay ${MAX_PUBLICACIONES} publicaciones. Elimina una para crear otra` }, 409);
  }

  const id = crypto.randomUUID();
  const claves: string[] = [];
  try {
    for (const f of archivos) {
      const ext = f.type === 'image/png' ? 'png' : f.type === 'image/jpeg' ? 'jpg' : 'webp';
      const clave = `${crypto.randomUUID()}.${ext}`;
      await env.FOTOS.put(clave, await f.arrayBuffer(), { httpMetadata: { contentType: f.type } });
      claves.push(clave);
    }
    await env.DB.prepare(
      `INSERT INTO propiedades (id, titulo, tipo, precio, ubicacion, descripcion, superficie, habitaciones, banos, parqueaderos, enlace_publicacion, fotos)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(id, titulo, tipo, Math.round(precio), ubicacion, descripcion, superficie, habitaciones, banos, parqueaderos, enlace || null, JSON.stringify(claves))
      .run();
  } catch (e) {
    await Promise.all(claves.map((k) => env.FOTOS.delete(k)));
    throw e;
  }
  return json({ ok: true, id }, 201);
}

function leerCampos(form: FormData) {
  const texto = (k: string) => String(form.get(k) ?? '').trim();
  const numero = (k: string) => {
    const v = texto(k);
    if (v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  };
  const d = {
    titulo: texto('titulo'), tipo: texto('tipo'), precio: numero('precio'), ubicacion: texto('ubicacion'),
    descripcion: texto('descripcion'), superficie: numero('superficie'), habitaciones: numero('habitaciones'),
    banos: numero('banos'), parqueaderos: numero('parqueaderos'), enlace: texto('enlacePublicacion'),
  };
  if (!d.titulo || d.titulo.length > 120) return { error: 'El título es obligatorio (máximo 120 caracteres)' };
  if (!TIPOS.includes(d.tipo)) return { error: 'Tipo de propiedad no válido' };
  if (d.precio === null || Number.isNaN(d.precio) || d.precio <= 0) return { error: 'El precio no es válido' };
  if (!d.ubicacion || d.ubicacion.length > 150) return { error: 'La ubicación es obligatoria (máximo 150 caracteres)' };
  if (d.descripcion.length > 3000) return { error: 'La descripción es muy larga (máximo 3000 caracteres)' };
  for (const n of [d.superficie, d.habitaciones, d.banos, d.parqueaderos]) {
    if (Number.isNaN(n)) return { error: 'Hay un número no válido en los datos' };
  }
  if (d.enlace && !enlaceValido(d.enlace)) return { error: 'El enlace debe ser de Facebook o Instagram (https)' };
  return { d };
}

async function editar(id: string, request: Request, env: Env) {
  const fila: any = await env.DB.prepare('SELECT fotos FROM propiedades WHERE id = ?').bind(id).first();
  if (!fila) return json({ error: 'No existe esa publicación' }, 404);
  const actuales: string[] = JSON.parse(fila.fotos || '[]');
  const form = await request.formData();
  const r: any = leerCampos(form);
  if (r.error) return json({ error: r.error }, 400);
  const d = r.d;

  const nuevos = form.getAll('fotos').filter((f: any) => typeof f !== 'string') as any[];
  let orden: any;
  try { orden = JSON.parse(String(form.get('orden') ?? '[]')); } catch { return json({ error: 'Orden de fotos no válido' }, 400); }
  if (!Array.isArray(orden) || orden.length < MIN_FOTOS || orden.length > MAX_FOTOS) {
    return json({ error: `La publicación debe tener entre ${MIN_FOTOS} y ${MAX_FOTOS} fotos` }, 400);
  }
  if (new Set(orden).size !== orden.length) return json({ error: 'Orden de fotos no válido' }, 400);
  let usadosNuevos = 0;
  for (const t of orden) {
    if (typeof t !== 'string') return json({ error: 'Orden de fotos no válido' }, 400);
    const m = t.match(/^nuevo:(\d+)$/);
    if (m) {
      if (Number(m[1]) >= nuevos.length) return json({ error: 'Orden de fotos no válido' }, 400);
      usadosNuevos++;
    } else if (!actuales.includes(t)) {
      return json({ error: 'Orden de fotos no válido' }, 400);
    }
  }
  if (usadosNuevos !== nuevos.length) return json({ error: 'Orden de fotos no válido' }, 400);
  for (const f of nuevos) {
    if (!['image/webp', 'image/jpeg', 'image/png'].includes(f.type)) return json({ error: 'Formato de foto no permitido' }, 400);
    if (f.size > MAX_FOTO_BYTES) return json({ error: 'Una foto es demasiado pesada' }, 400);
  }

  const subidas: string[] = [];
  try {
    for (const f of nuevos) {
      const ext = f.type === 'image/png' ? 'png' : f.type === 'image/jpeg' ? 'jpg' : 'webp';
      const clave = `${crypto.randomUUID()}.${ext}`;
      await env.FOTOS.put(clave, await f.arrayBuffer(), { httpMetadata: { contentType: f.type } });
      subidas.push(clave);
    }
    const finales = orden.map((t: string) => {
      const m = t.match(/^nuevo:(\d+)$/);
      return m ? subidas[Number(m[1])] : t;
    });
    await env.DB.prepare(
      `UPDATE propiedades SET titulo=?, tipo=?, precio=?, ubicacion=?, descripcion=?, superficie=?, habitaciones=?, banos=?, parqueaderos=?, enlace_publicacion=?, fotos=? WHERE id=?`
    ).bind(d.titulo, d.tipo, Math.round(d.precio), d.ubicacion, d.descripcion, d.superficie, d.habitaciones, d.banos, d.parqueaderos, d.enlace || null, JSON.stringify(finales), id).run();
    const quitadas = actuales.filter((k) => !finales.includes(k));
    await Promise.all(quitadas.map((k) => env.FOTOS.delete(k)));
  } catch (e) {
    await Promise.all(subidas.map((k) => env.FOTOS.delete(k)));
    throw e;
  }
  return json({ ok: true });
}

async function eliminar(id: string, env: Env) {
  const fila: any = await env.DB.prepare('SELECT fotos FROM propiedades WHERE id = ?').bind(id).first();
  if (!fila) return json({ error: 'No existe esa publicación' }, 404);
  await env.DB.prepare('DELETE FROM propiedades WHERE id = ?').bind(id).run();
  const claves: string[] = JSON.parse(fila.fotos || '[]');
  await Promise.all(claves.map((k) => env.FOTOS.delete(k)));
  return json({ ok: true });
}

async function foto(clave: string, env: Env) {
  const obj = await env.FOTOS.get(clave);
  if (!obj) return new Response('No encontrada', { status: 404 });
  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType || 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
      ETag: obj.httpEtag,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const metodo = request.method;
    try {
      if (!pathname.startsWith('/api/')) return env.ASSETS.fetch(request);

      if (metodo !== 'GET' && metodo !== 'HEAD') {
        const origen = request.headers.get('Origin');
        if (origen && new URL(origen).host !== url.host) return json({ error: 'Origen no permitido' }, 403);
      }

      if (pathname === '/api/login' && metodo === 'POST') return await login(request, env);
      if (pathname === '/api/logout' && metodo === 'POST') return json({ ok: true }, 200, { 'Set-Cookie': cookie('', 0) });
      if (pathname === '/api/sesion' && metodo === 'GET') return json({ admin: await esAdmin(request, env) });
      if (pathname === '/api/propiedades' && metodo === 'GET') return await listar(env);

      if (pathname === '/api/propiedades' && metodo === 'POST') {
        if (!(await esAdmin(request, env))) return json({ error: 'No autorizado' }, 401);
        return await crear(request, env);
      }

      const del = pathname.match(/^\/api\/propiedades\/([a-f0-9-]{36})$/);
      if (del && metodo === 'PUT') {
        if (!(await esAdmin(request, env))) return json({ error: 'No autorizado' }, 401);
        return await editar(del[1], request, env);
      }
      if (del && metodo === 'DELETE') {
        if (!(await esAdmin(request, env))) return json({ error: 'No autorizado' }, 401);
        return await eliminar(del[1], env);
      }

      const f = pathname.match(/^\/api\/fotos\/([a-f0-9-]{36}\.(?:webp|jpg|png))$/);
      if (f && metodo === 'GET') return await foto(f[1], env);

      return json({ error: 'No encontrado' }, 404);
    } catch (e) {
      console.error(e);
      return json({ error: 'Error interno del servidor' }, 500);
    }
  },
};
