CREATE TABLE IF NOT EXISTS propiedades (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('casa','terreno','departamento','quinta')),
  precio INTEGER NOT NULL,
  ubicacion TEXT NOT NULL,
  descripcion TEXT NOT NULL DEFAULT '',
  superficie REAL,
  habitaciones INTEGER,
  banos INTEGER,
  parqueaderos INTEGER,
  enlace_publicacion TEXT,
  fotos TEXT NOT NULL,
  creado_en TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_propiedades_creado ON propiedades(creado_en DESC);
