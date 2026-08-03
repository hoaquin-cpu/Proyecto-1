const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.query(`
    CREATE TABLE IF NOT EXISTS gastos (
        id SERIAL PRIMARY KEY,
        descripcion TEXT NOT NULL,
        monto REAL NOT NULL,
        categoria TEXT,
        fecha TEXT
    )

`)
    .then(() => console.log("Base de datos y tabla creadas correctamente"))
    .catch(error => console.error("Error creando la tabla: ", error));


module.exports = pool;