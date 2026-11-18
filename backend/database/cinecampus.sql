
CREATE DATABASE IF NOT EXISTS cinecampus;

USE cinecampus;

CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo_pelicula VARCHAR(150) NOT NULL,
    poster_url TEXT,
    comentario TEXT,
    calificacion INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consultar todos los favoritos
SELECT * FROM favoritos;

-- Consultar la estructura de la tabla
DESCRIBE favoritos;
