# CineCampus

## 1. Descripción del proyecto

CineCampus es una aplicación web desarrollada como proyecto final del programa Técnico Laboral en Programación y Desarrollo de Aplicaciones Móviles.

Su objetivo es permitir a los usuarios buscar películas mediante la API de The Movie Database (TMDB), consultar información detallada y administrar una colección personal de películas favoritas.

El proyecto utiliza una arquitectura Full Stack compuesta por un frontend desarrollado con React, un backend construido con Node.js y Express, y una base de datos MySQL para almacenar los favoritos.

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

### Control de versiones
- Git.
- GitHub.

## 3. Estructura del proyecto

```text
CineCampus/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── database/
│   │   └── cinecampus.sql
│   ├── routes/
│   │   ├── favoritos.js
│   │   └── peliculas.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

**Nota:** El archivo `.env` se crea localmente durante la configuración y no se publica en GitHub porque contiene información privada.

## 4. Requisitos previos

Para instalar y ejecutar el proyecto se necesita:

- Node.js y npm.
- XAMPP.
- MySQL.
- Visual Studio Code o un editor de código.
- Una cuenta y una API Key de TMDB.

## 5. Instalación y configuración

### 5.1. Obtener el proyecto

Clonar el repositorio desde GitHub:

```bash
git clone https://github.com/andresfelipeocampocorrea-byte/CineCampus.git
```

Ingresar a la carpeta:

```bash
cd CineCampus
```

### 5.2. Configurar la base de datos

1. Abrir XAMPP e iniciar los servicios de Apache y MySQL.
2. Ingresar a phpMyAdmin.
3. Importar el archivo `backend/database/cinecampus.sql`.
4. Verificar que se haya creado la base de datos `cinecampus` y la tabla `favoritos`.

### 5.3. Configurar el backend

Abrir una terminal dentro de la carpeta `backend`:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo llamado `.env` dentro de `backend` con esta configuración:

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cinecampus
TMDB_API_KEY=TU_API_KEY
```

Reemplazar `TU_API_KEY` por la clave personal obtenida en TMDB. Si la instalación local de MySQL tiene contraseña, configurar `DB_PASSWORD` con ella.

### 5.4. Configurar el frontend

Abrir otra terminal dentro de la carpeta `frontend`:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

## 6. Ejecución del proyecto

Para utilizar CineCampus se deben mantener abiertas dos terminales.

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

## 7. Rutas del backend

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

## 8. Funcionalidades principales

- Búsqueda de películas mediante la API de TMDB.
- Visualización de películas mediante tarjetas.
- Consulta de información detallada de cada película.
- Registro de películas favoritas.
- Consulta de favoritos almacenados en MySQL.
- Validación para evitar películas favoritas duplicadas.
- Edición de comentarios y calificaciones.
- Eliminación de películas favoritas.
- Mensajes de confirmación y error.
- Indicador del estado de conexión del servidor y la base de datos.
- Interfaz adaptable a diferentes tamaños de pantalla.

## 9. Base de datos

La base de datos se llama `cinecampus` y contiene la tabla `favoritos`.

| Campo | Tipo | Descripción |
|---|---|---|
| id | INT | Identificador único del favorito. |
| titulo_pelicula | VARCHAR(150) | Nombre de la película. |
| poster_url | TEXT | Dirección de la imagen del póster. |
| comentario | TEXT | Comentario del usuario. |
| calificacion | INT | Calificación asignada. |
| fecha_registro | TIMESTAMP | Fecha de registro del favorito. |

## 10. Seguridad

El archivo `.env` almacena las credenciales de conexión a MySQL y la API Key de TMDB. Por seguridad, no debe publicarse en GitHub.

Los archivos `.gitignore` excluyen elementos privados o innecesarios, como las variables de entorno y las carpetas `node_modules`.

## 11. Autor

**Andrés Felipe Ocampo Correa**

Institución: Instituto Técnico Iberoamericano S.A.S.

Programa: Técnico Laboral en Programación y Desarrollo de Aplicaciones Móviles.

Proyecto académico: CineCampus.

Ciudad: Medellín, Colombia.

Fecha: 17 de noviembre de 2026.

## 12. Créditos y referencias

- React: https://react.dev/
- Node.js: https://nodejs.org/
- Express: https://expressjs.com/
- MySQL: https://www.mysql.com/
- Axios: https://axios-http.com/
- Vite: https://vite.dev/
- The Movie Database (TMDB): https://www.themoviedb.org/