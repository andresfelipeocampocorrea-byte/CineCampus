# Frontend - CineCampus

## 1. Descripción

El frontend de CineCampus está desarrollado con React y Vite. Es la interfaz que permite al usuario interactuar con la aplicación, buscar películas, consultar sus detalles y administrar su lista de favoritos.

La comunicación con el backend se realiza mediante solicitudes HTTP utilizando Axios.

## 2. Tecnologías utilizadas

- React: desarrollo de interfaces mediante componentes.
- JavaScript: lógica de la aplicación.
- HTML5: estructura de la interfaz.
- CSS3: estilos y diseño adaptable.
- Vite: herramienta de desarrollo y compilación.
- Axios: comunicación con el backend.

## 3. Estructura del frontend

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── services/
│   │   └── api.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

## 4. Archivos principales

### main.jsx

Es el punto de entrada de React. Se encarga de renderizar el componente principal de la aplicación e importar los estilos globales.

### App.jsx

Contiene la interfaz y la lógica principal de CineCampus.

Entre sus responsabilidades se encuentran:

- Gestionar los estados de la aplicación mediante `useState`.
- Consultar información al backend.
- Mostrar los resultados de búsqueda.
- Consultar y administrar los favoritos.
- Mostrar los detalles de las películas.
- Comprobar el estado de conexión del servidor mediante `useEffect`.

### services/api.js

Configura una instancia de Axios para centralizar las solicitudes HTTP hacia el backend.

La dirección base utilizada es:

```javascript
baseURL: 'http://localhost:3001/api'
```

### App.css e index.css

Contienen los estilos visuales de la aplicación y sus elementos de interfaz.

## 5. Comunicación con el backend

El frontend utiliza Axios para realizar solicitudes al servidor Express.

La comunicación permite:

- Buscar películas mediante la API de TMDB, a través del backend.
- Consultar los detalles de una película.
- Registrar películas favoritas.
- Consultar los favoritos almacenados.
- Editar comentarios y calificaciones.
- Eliminar películas favoritas.
- Verificar el estado del servidor y la conexión con MySQL.

## 6. Administración del estado

CineCampus utiliza los hooks de React:

- `useState`: permite administrar los datos y estados de los componentes.
- `useEffect`: permite ejecutar la comprobación inicial de conexión con el backend cuando se carga la aplicación.

Estos hooks facilitan la actualización de la interfaz cuando el usuario realiza acciones.

## 7. Instalación

Desde la carpeta `frontend`, instalar las dependencias:

```bash
npm install
```

## 8. Ejecución

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará la dirección local para acceder a la aplicación, normalmente:

```text
http://localhost:5173
```

Para utilizar todas las funcionalidades, el backend y MySQL deben estar funcionando correctamente.

## 9. Diseño y experiencia de usuario

La interfaz permite explorar películas, visualizar información detallada y gestionar favoritos mediante controles interactivos.

También presenta mensajes de confirmación o error e indicadores de conexión para facilitar la interacción con el sistema.