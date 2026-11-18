# Backend - CineCampus

## 1. Descripción

El backend de CineCampus está desarrollado con Node.js y Express. Su función principal es gestionar las solicitudes del frontend, consultar la información de películas en la API de TMDB y administrar los favoritos almacenados en MySQL.

El servidor utiliza una arquitectura organizada mediante rutas y archivos de configuración independientes.

## 2. Tecnologías utilizadas

- Node.js: entorno de ejecución de JavaScript.
- Express: framework para crear el servidor y las rutas.
- MySQL2: conexión y consultas a la base de datos.
- Axios: solicitudes HTTP a la API de TMDB.
- Dotenv: administración de variables de entorno.
- CORS: permite las solicitudes entre el frontend y el backend.

## 3. Organización de carpetas

```text
backend/
│
├── config/
│   └── db.js
│
├── database/
│   └── cinecampus.sql
│
├── routes/
│   ├── favoritos.js
│   └── peliculas.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## 4. Archivos principales

### index.js

Es el punto de entrada del servidor. Configura Express, habilita CORS y la recepción de datos JSON, comprueba la conexión con MySQL y registra las rutas de películas y favoritos.

### config/db.js

Contiene la configuración del pool de conexiones de MySQL mediante MySQL2. Permite reutilizar las conexiones para ejecutar consultas a la base de datos.

### routes/peliculas.js

Gestiona las solicitudes relacionadas con películas:

- Búsqueda por nombre mediante TMDB.
- Consulta de detalles de una película por su identificador.
- Organización de los datos recibidos de la API para enviarlos al frontend.

### routes/favoritos.js

Administra las operaciones CRUD de las películas favoritas:

- Crear favoritos.
- Consultar todos los favoritos.
- Consultar un favorito por su ID.
- Actualizar comentarios y calificaciones.
- Eliminar favoritos.
- Validar los datos recibidos y evitar registros duplicados.

### database/cinecampus.sql

Contiene las instrucciones SQL para crear la base de datos `cinecampus` y la tabla `favoritos`.

## 5. Rutas disponibles

| Método | Endpoint | Función |
|---|---|---|
| GET | `/api/status` | Comprueba el servidor y MySQL. |
| GET | `/api/peliculas/buscar?q=nombre` | Busca películas en TMDB. |
| GET | `/api/peliculas/:id` | Consulta los detalles de una película. |
| GET | `/api/favoritos` | Lista los favoritos. |
| POST | `/api/favoritos` | Registra un favorito. |
| GET | `/api/favoritos/:id` | Consulta un favorito. |
| PUT | `/api/favoritos/:id` | Actualiza comentario y calificación. |
| DELETE | `/api/favoritos/:id` | Elimina un favorito. |

## 6. Configuración

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` con las variables de entorno necesarias:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cinecampus
TMDB_API_KEY=TU_API_KEY
```

La API Key debe obtenerse desde la cuenta personal de TMDB. No se debe compartir ni publicar este archivo.

## 7. Ejecución

Desde la carpeta `backend`, iniciar el servidor con:

```bash
npm start
```

El servidor se ejecutará en:

```text
http://localhost:3001
```

Para comprobar su funcionamiento y la conexión a MySQL, se puede consultar:

```text
http://localhost:3001/api/status
```

## 8. Base de datos

El backend utiliza la base de datos MySQL `cinecampus`.

La tabla `favoritos` almacena:

- Identificador.
- Título de la película.
- URL del póster.
- Comentario.
- Calificación.
- Fecha de registro.

## 9. Seguridad

Las credenciales de MySQL y la API Key de TMDB se almacenan en variables de entorno. El archivo `.env` está excluido del repositorio mediante `.gitignore`.