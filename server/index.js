// Cargar variables de entorno desde .env con preferencia por `de.js` (simple loader)
// Si `de.js` no existe intentamos cargar `db.js` (archivo existente en el repo).
const fs = require('fs');
const path = require('path');

// Intentar cargar un loader simple `de.js` si existe (suele contener dotenv).
// Si no existe, sólo cargar `db.js` si el archivo está presente y es compatible;
// evitamos lanzar errores si `db.js` fue borrado o contiene sintaxis ESM.
const tryRequireIfExists = (relPath) => {
  const full = path.join(__dirname, relPath);
  if (fs.existsSync(full)) {
    try {
      require(full);
      return true;
    } catch (e) {
      console.warn(`No se pudo requerir ${relPath}:`, e.message);
      return false;
    }
  }
  return false;
};

if (!tryRequireIfExists('./de.js') && !tryRequireIfExists('./de') ) {
  // fallback a db sólo si existe
  if (!tryRequireIfExists('./db.js') && !tryRequireIfExists('./db')) {
    console.warn('No se cargó `de` ni `db` (se usarán valores por defecto).');
  }
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend Express funcionando' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
