# Base de datos e integración de películas - CineCampus

## 1. Base de datos

CineCampus utiliza MySQL para almacenar la información de las películas que el usuario guarda como favoritas.

La base de datos se denomina `cinecampus` y contiene la tabla `favoritos`.

## 2. Estructura de la tabla favoritos

| Campo | Tipo de dato | Descripción |
|---|---|---|
| id | INT | Identificador único y autoincremental. |
| titulo_pelicula | VARCHAR(150) | Título de la película. |
| poster_url | TEXT | URL del póster. |
| comentario | TEXT | Comentario del usuario. |
| calificacion | INT | Calificación asignada. |
| fecha_registro | TIMESTAMP | Fecha y hora de registro. |

## 3. Operaciones con MySQL

El backend utiliza MySQL2 para ejecutar las consultas necesarias para administrar los favoritos.

Las operaciones disponibles son:

- INSERT: registrar una película favorita.
- SELECT: consultar los favoritos.
- UPDATE: modificar comentarios y calificaciones.
- DELETE: eliminar una película favorita.

Antes de registrar una película, el sistema comprueba que no exista previamente en la lista de favoritos.

## 4. Integración con TMDB

CineCampus utiliza The Movie Database (TMDB) como fuente externa de información cinematográfica.

La integración se realiza desde el backend mediante Axios, utilizando una API Key almacenada en las variables de entorno.

La aplicación realiza dos operaciones principales:

### Búsqueda de películas

El backend consulta el servicio de búsqueda de películas de TMDB utilizando el nombre ingresado por el usuario.

La respuesta se organiza para enviar al frontend información como:

- Identificador de la película.
- Título.
- Descripción.
- Fecha de lanzamiento.
- Calificación.
- Póster.

### Consulta de detalles

Cuando se solicita una película específica, el backend consulta su identificador en TMDB y obtiene información ampliada, como:

- Título original.
- Descripción.
- Duración.
- Géneros.
- Calificación.
- Cantidad de votos.
- Póster e imagen de fondo.

## 5. Flujo de información

El funcionamiento general sigue este proceso:

1. El usuario busca una película desde el frontend.
2. React envía una solicitud al backend.
3. Express recibe la solicitud y ejecuta la ruta correspondiente.
4. Axios consulta la API de TMDB.
5. El backend organiza la información recibida.
6. Los resultados se envían al frontend para mostrarlos en pantalla.

Para los favoritos, el proceso utiliza el backend y la base de datos MySQL.

## 6. Archivo SQL

El archivo `cinecampus.sql` contiene las instrucciones necesarias para crear la base de datos y la tabla de favoritos.

Se puede ejecutar desde phpMyAdmin para preparar la base de datos antes de iniciar la aplicación.

## 7. Seguridad

La API Key de TMDB y las credenciales de MySQL se almacenan en el archivo `.env`.

Este archivo no debe compartirse ni publicarse en GitHub. El repositorio contiene únicamente la estructura y el ejemplo de configuración, sin credenciales personales.

## 8. Referencias

- The Movie Database: https://www.themoviedb.org/
- Documentación de la API: https://developer.themoviedb.org/docs
- MySQL: https://dev.mysql.com/doc/