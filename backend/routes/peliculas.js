
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Buscar peliculas por nombre
router.get('/buscar', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({
                mensaje: 'Debes escribir el nombre de una pelicula'
            });
        }

        const respuesta = await axios.get(
            'https://api.themoviedb.org/3/search/movie',
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    query: q.trim(),
                    language: 'es-CO',
                    include_adult: false
                }
            }
        );

        const peliculas = respuesta.data.results.map(pelicula => ({
            id: pelicula.id,
            titulo: pelicula.title,
            descripcion: pelicula.overview,
            fecha: pelicula.release_date,
            calificacion: pelicula.vote_average,
            poster: pelicula.poster_path
                ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                : null
        }));

        res.json(peliculas);

    } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
            mensaje: 'Error al buscar peliculas en TMDB'
        });
    }
});

// Consultar detalles de una pelicula por su ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                mensaje: 'El ID de la pelicula no es valido'
            });
        }

        const respuesta = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`,
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'es-CO'
                }
            }
        );

        const pelicula = respuesta.data;

        res.json({
            id: pelicula.id,
            titulo: pelicula.title,
            tituloOriginal: pelicula.original_title,
            descripcion: pelicula.overview,
            frase: pelicula.tagline,
            fecha: pelicula.release_date,
            duracion: pelicula.runtime,
            calificacion: pelicula.vote_average,
            cantidadVotos: pelicula.vote_count,
            generos: pelicula.genres.map(genero => genero.name),
            estado: pelicula.status,
            idioma: pelicula.original_language,
            poster: pelicula.poster_path
                ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                : null,
            fondo: pelicula.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${pelicula.backdrop_path}`
                : null
        });

    } catch (error) {
        console.error(error.response?.data || error.message);

        if (error.response?.status === 404) {
            return res.status(404).json({
                mensaje: 'No se encontro la pelicula solicitada'
            });
        }

        res.status(500).json({
            mensaje: 'Error al consultar los detalles de la pelicula'
        });
    }
});

module.exports = router;
