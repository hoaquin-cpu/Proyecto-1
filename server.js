require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db.js');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log(`Pedido recibido: ${req.method} ${req.url}`);
    next();
})

const PUERTO = 3000;

app.use(express.json());

app.get('/gastos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM gastos');
        res.json(resultado.rows);
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    }
})

app.post('/gastos', async (req, res) => {
    try {
        const { descripcion, monto, categoria, fecha } = req.body;

        const resultado = await pool.query(
            'INSERT INTO gastos (descripcion, monto, categoria, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
            [descripcion, monto, categoria, fecha]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/gastos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, monto, categoria, fecha } = req.body;

        const resultado = await pool.query(
            'UPDATE gastos SET descripcion = $1, monto = $2, categoria = $3, fecha = $4 WHERE id = $5 RETURNING *',
            [descripcion, monto, categoria, fecha, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Gasto no encontrado' });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.delete('/gastos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query( 'DELETE FROM gastos WHERE id = $1 RETURNING *', [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Gasto no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PUERTO, () => {
    console.log(` Servidor corriendo en http://localhost:${PUERTO}`);
})