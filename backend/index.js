
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conexion = require('./config/db');
const favoritosRoutes = require('./routes/favoritos');
const peliculasRoutes = require('./routes/peliculas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/status', async (req, res) => {
    try {
        await conexion.query('SELECT 1');

        res.json({
            mensaje: 'Servidor funcionando correctamente',
            baseDatos: 'Conectada'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al conectar con la base de datos',
            error: error.message
        });
    }
});

// Rutas de favoritos
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/peliculas', peliculasRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
