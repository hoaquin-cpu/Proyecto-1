const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('gastos.db');

db.exec(`

    CREATE TABLE IF NOT EXISTS gastos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descripcion TEXT NOT NULL,
        monto REAL NOT NULL,
        categoria TEXT,
        fecha TEXT
    )
`)

console.log("Base de datos y tablas creadas correctamente");

module.exports = db;
