const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors()); // Permite el acceso desde cualquier origen
app.use(express.json());

// Conexión a la base de datos
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tu_base_de_datos"
});

// Endpoint GET para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
    const sql = "SELECT * FROM usuario";

    conexion.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: "Error en la consulta" });
        }

        res.json(resultados); // Express automáticamente devuelve JSON
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3306");
});
