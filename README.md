# Tracker de Gastos

Aplicación web simple para registrar, ver, editar y borrar gastos personales. Proyecto full-stack hecho como práctica para portfolio, con backend en Node.js/Express, base de datos SQLite, y frontend en HTML/CSS/JavaScript puro.

## Funcionalidades

- Ver todos los gastos cargados
- Agregar un gasto nuevo (descripción, monto, categoría y fecha)
- Editar un gasto existente
- Eliminar un gasto

##  Tecnologías usadas

- **Backend:** Node.js + Express
- **Base de datos:** SQLite (módulo nativo `node:sqlite`)
- **Frontend:** HTML, CSS y JavaScript (sin frameworks)
- **Herramientas de desarrollo:** Thunder Client (pruebas de API) & POSTMAN, Live Server

##  Estructura del proyecto

```
Portafolio/
├── server.js          # Servidor Express y rutas de la API
├── db.js              # Conexión y creación de la base de datos
├── package.json
├── .gitignore
├── README.md
└── public/
    ├── index.html      # Interfaz de usuario
    ├── frontend.js     # Lógica del frontend (fetch, DOM, eventos)
    └── estilos.css     # Estilos
```

##  Cómo correrlo en tu computadora

1. Cloná el repositorio:
```bash
git clone https://github.com/hoaquin-cpu/TU-REPO.git
cd TU-REPO
```

2. Instalá las dependencias:
```bash
npm install
```

3. Corré el servidor:
```bash
node server.js
```
Deberías ver el mensaje `Servidor corriendo en http://localhost:3000`.

4. Abrí `public/index.html` con Live Server (o la extensión que prefieras) para ver el frontend.

> **Requisito:** Node.js v22 o superior (usa el módulo nativo `node:sqlite`).

##  Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/gastos` | Devuelve todos los gastos |
| POST | `/gastos` | Crea un gasto nuevo |
| PUT | `/gastos/:id` | Edita un gasto existente |
| DELETE | `/gastos/:id` | Elimina un gasto |

**Ejemplo de body para POST/PUT:**
```json
{
  "descripcion": "Supermercado",
  "monto": 15000,
  "categoria": "Comida",
  "fecha": "2026-07-24"
}
```

##  Capturas de pantalla

![Programa con 2 gastos cargados](screenshot\Gastos.png)

![Aca se ha eliminado un gasto](screenshot\GastoElimnado.png)

##  Notas

Este proyecto usa SQLite por simplicidad y velocidad de desarrollo. En un entorno de producción real, se podría migrar a PostgreSQL o MySQL sin cambios grandes en la lógica de las consultas. Planeo en un futuro migrar a algún framework como React.

## 👤 Autor

Joaquín Gonzalez G. — [GitHub](https://github.com/hoaquin-cpu)
