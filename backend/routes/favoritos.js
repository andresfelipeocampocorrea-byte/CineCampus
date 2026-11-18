
const express = require('express');
const router = express.Router();
const conexion = require('../config/db');

// Consultar todos los favoritos
router.get('/', async (req, res) => {
    try {
        const [favoritos] = await conexion.query(
            'SELECT * FROM favoritos ORDER BY fecha_registro DESC'
        );

        res.json(favoritos);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar los favoritos'
        });
    }
});

// Guardar un favorito
router.post('/', async (req, res) => {
    try {
        const {
            titulo_pelicula,
            poster_url,
            comentario,
            calificacion
        } = req.body;

        if (!titulo_pelicula || !titulo_pelicula.trim()) {
            return res.status(400).json({
                mensaje: 'El titulo de la pelicula es obligatorio'
            });
        }

        // Comprobar si la pelicula ya existe en favoritos
        const [existentes] = await conexion.query(
            'SELECT id FROM favoritos WHERE titulo_pelicula = ?',
            [titulo_pelicula.trim()]
        );

        if (existentes.length > 0) {
            return res.status(409).json({
                mensaje: 'Esta pelicula ya se encuentra en tus favoritos'
            });
        }

        if (
            calificacion !== undefined &&
            calificacion !== null &&
            (!Number.isInteger(calificacion) ||
            calificacion < 1 ||
            calificacion > 5)
        ) {
            return res.status(400).json({
                mensaje: 'La calificacion debe ser un numero entre 1 y 5'
            });
        }

        const [resultado] = await conexion.query(
            `INSERT INTO favoritos
            (titulo_pelicula, poster_url, comentario, calificacion)
            VALUES (?, ?, ?, ?)`,
            [
                titulo_pelicula.trim(),
                poster_url || null,
                comentario || null,
                calificacion ?? null
            ]
        );

        res.status(201).json({
            mensaje: 'Pelicula guardada correctamente',
            id: resultado.insertId
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al guardar el favorito'
        });
    }
});

// Actualizar comentario y calificacion
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario, calificacion } = req.body;

        if (
            calificacion !== undefined &&
            calificacion !== null &&
            (!Number.isInteger(calificacion) ||
            calificacion < 1 ||
            calificacion > 5)
        ) {
            return res.status(400).json({
                mensaje: 'La calificacion debe ser un numero entre 1 y 5'
            });
        }

        const [favoritos] = await conexion.query(
            'SELECT id FROM favoritos WHERE id = ?',
            [id]
        );

        if (favoritos.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontro el favorito'
            });
        }

        await conexion.query(
            `UPDATE favoritos
            SET comentario = ?, calificacion = ?
            WHERE id = ?`,
            [
                comentario || null,
                calificacion ?? null,
                id
            ]
        );

        res.json({
            mensaje: 'Favorito actualizado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el favorito'
        });
    }
});

// Consultar un favorito por su ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [favoritos] = await conexion.query(
            'SELECT * FROM favoritos WHERE id = ?',
            [id]
        );

        if (favoritos.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontro el favorito'
            });
        }

        res.json(favoritos[0]);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar el favorito'
        });
    }
});

// Eliminar un favorito por su ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await conexion.query(
            'DELETE FROM favoritos WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'No se encontro el favorito'
            });
        }

        res.json({
            mensaje: 'Favorito eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el favorito'
        });
    }
});

module.exports = router;
