const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log(`Pedido recibido: ${req.method} ${req.url}`);
    next();
})

const PUERTO = 3000;

app.get('/gastos', (req,res) => {
    const consulta = db.prepare('SELECT * FROM gastos');
    const gastos = consulta.all();
    res.json(gastos);
})

app.use(express.json());

app.post('/gastos', (req, res) => {
    const { descripcion, monto, categoria, fecha} = req.body;

    const insertar = db.prepare(
        'INSERT INTO gastos (descripcion, monto, categoria, fecha) VALUES (?, ?, ?, ?)'
    );

    const resultado = insertar.run(descripcion, monto, categoria, fecha);
    
    res.status(201).json({ id: resultado.lastInsertRowid, descripcion, monto, categoria, fecha});

});

app.put('/gastos/:id', (req, res) => {
    const {id} = req.params;
    const {descripcion, monto, categoria, fecha} = req.body;

    const actualizar = db.prepare(
        'UPDATE gastos SET descripcion = ?, monto = ?, categoria = ?, fecha = ? WHERE id = ?' 
    )
    const resultado = actualizar.run(descripcion, monto, categoria, fecha, id);

    if(resultado.changes === 0) {
        return res.status(404).json({ error: 'Gasto no encontrado' });
    }

    res.json({ id: Number(id), descripcion, monto, categoria, fecha });
})

app.delete('/gastos/:id', (req, res) => {
    const {id} = req.params;

    const borrar = db.prepare('DELETE FROM gastos WHERE id = ?');
    const resultado = borrar.run(id);

    if (resultado.changes === 0) {
        return res.status(404).json({ error: 'Gasto no encontrado' });
    }

    res.status(204).send();
});

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
})
