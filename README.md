# CineCampus

## 1. Descripción del proyecto

CineCampus es una aplicación web desarrollada como proyecto final de la técnica Full Stack. Permite consultar películas mediante la API de The Movie Database (TMDB), visualizar información detallada y administrar una lista personal de películas favoritas.

La aplicación cuenta con un frontend desarrollado en React, un backend construido con Node.js y Express, y una base de datos MySQL para almacenar los favoritos de los usuarios.

## 2. Tecnologías utilizadas

### Frontend
- React.
- JavaScript.
- HTML5.
- CSS3.
- Vite.
- Axios.

### Backend
- Node.js.
- Express.
- MySQL2.
- Axios.
- Dotenv.
- CORS.

### Base de datos
- MySQL.
- phpMyAdmin.

### API externa
- The Movie Database (TMDB).

## 3. Estructura del proyecto

```text
CineCampus/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── database/
│   │   └── cinecampus.sql
│   │
│   ├── routes/
│   │   ├── favoritos.js
│   │   └── peliculas.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

## 4. Instalación y configuración

### Requisitos previos

- Node.js instalado.
- XAMPP instalado.
- MySQL iniciado desde XAMPP.
- Visual Studio Code.
- Una API Key de TMDB.

### Configuración de la base de datos

1. Abrir XAMPP e iniciar Apache y MySQL.
2. Ingresar a phpMyAdmin.
3. Crear la base de datos `cinecampus`, o ejecutar el archivo `backend/database/cinecampus.sql`.
4. Verificar que exista la tabla `favoritos`.

### Configuración del backend

1. Abrir una terminal dentro de la carpeta `backend`.
2. Instalar las dependencias:

```bash
npm install
```

3. Crear el archivo `.env` con la siguiente configuración:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cinecampus
TMDB_API_KEY=TU_API_KEY
```

4. Reemplazar `TU_API_KEY` por la clave personal obtenida en TMDB.

### Configuración del frontend

1. Abrir otra terminal dentro de la carpeta `frontend`.
2. Instalar las dependencias:

```bash
npm install
```

## 5. Ejecución del proyecto

Es necesario mantener abiertas dos terminales.

### Iniciar el backend

Desde la carpeta `backend`, ejecutar:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3001
```

### Iniciar el frontend

Desde la carpeta `frontend`, ejecutar:

```bash
npm run dev
```

Vite mostrará la dirección local para abrir la aplicación en el navegador, normalmente:

```text
http://localhost:5173
```

## 6. Rutas del backend

### Estado del servidor

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/status` | Verifica el funcionamiento del servidor y la conexión con MySQL. |

### Películas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/peliculas/buscar?q=nombre` | Busca películas en TMDB por nombre. |
| GET | `/api/peliculas/:id` | Consulta los detalles de una película mediante su ID. |

### Favoritos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/favoritos` | Consulta todos los favoritos almacenados. |
| POST | `/api/favoritos` | Guarda una película como favorita. |
| GET | `/api/favoritos/:id` | Consulta un favorito específico. |
| PUT | `/api/favoritos/:id` | Actualiza el comentario y la calificación de un favorito. |
| DELETE | `/api/favoritos/:id` | Elimina un favorito. |

## 7. Funcionalidades principales

- Buscar películas utilizando la API de TMDB.
- Visualizar películas mediante tarjetas.
- Consultar información detallada de cada película.
- Guardar películas en favoritos.
- Consultar la lista de favoritos almacenados en MySQL.
- Evitar el registro duplicado de películas favoritas.
- Editar comentarios y calificaciones.
- Eliminar películas de favoritos.
- Mostrar mensajes de confirmación y error.
- Interfaz adaptable a diferentes tamaños de pantalla.

## 8. Seguridad y configuración

El archivo `.env` contiene las credenciales de conexión y la API Key de TMDB. Este archivo no debe publicarse en GitHub.

El proyecto utiliza `.gitignore` para excluir archivos y carpetas que no deben incluirse en el repositorio, como `.env` y `node_modules`.

## 9. Autor

Proyecto desarrollado como trabajo final de la técnica Full Stack.

**Tecnologías:** React, Node.js, Express y MySQL.
