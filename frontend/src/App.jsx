
import { useState, useEffect } from 'react';
import api from './services/api';

function App() {
    const [busqueda, setBusqueda] = useState('');
    const [peliculas, setPeliculas] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [vista, setVista] = useState('inicio');
    const [cargando, setCargando] = useState(false);
    const [guardandoId, setGuardandoId] = useState(null);
    const [eliminandoId, setEliminandoId] = useState(null);
    const [editandoId, setEditandoId] = useState(null);
    const [comentarioEditado, setComentarioEditado] = useState('');
    const [calificacionEditada, setCalificacionEditada] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [detalle, setDetalle] = useState(null);
    const [detalleAbierto, setDetalleAbierto] = useState(false);
    const [cargandoDetalle, setCargandoDetalle] = useState(false);
    const [errorDetalle, setErrorDetalle] = useState('');

    // Estado de la conexion con el servidor
    const [estadoServidor, setEstadoServidor] = useState('comprobando');

    // Verificar la conexion al iniciar la aplicacion
    useEffect(() => {
        const verificarConexion = async () => {
            try {
                const respuesta = await api.get('/status');

                if (respuesta.data.baseDatos === 'Conectada') {
                    setEstadoServidor('conectado');
                } else {
                    setEstadoServidor('desconectado');
                }

            } catch (error) {
                setEstadoServidor('desconectado');
            }
        };

        verificarConexion();
    }, []);

    const mostrarError = (texto) => {
        setMensaje('');
        setError(texto);
    };

    const mostrarMensaje = (texto) => {
        setError('');
        setMensaje(texto);
    };

    const buscarPeliculas = async (e) => {
        e.preventDefault();

        if (!busqueda.trim()) {
            mostrarError('Escribe el nombre de una pelicula');
            return;
        }

        try {
            setCargando(true);
            setError('');
            setMensaje('');

            const respuesta = await api.get('/peliculas/buscar', {
                params: { q: busqueda }
            });

            setPeliculas(respuesta.data);

            if (respuesta.data.length === 0) {
                mostrarError('No se encontraron peliculas');
            }

        } catch (error) {
            mostrarError(
                error.response?.data?.mensaje ||
                'No fue posible consultar las peliculas'
            );

            setPeliculas([]);

        } finally {
            setCargando(false);
        }
    };

    const verDetalles = async (id) => {
        setDetalle(null);
        setErrorDetalle('');
        setDetalleAbierto(true);
        setCargandoDetalle(true);

        try {
            const respuesta = await api.get(`/peliculas/${id}`);
            setDetalle(respuesta.data);

        } catch (error) {
            setErrorDetalle(
                error.response?.data?.mensaje ||
                'No fue posible cargar los detalles de la pelicula'
            );

        } finally {
            setCargandoDetalle(false);
        }
    };

    const cerrarDetalles = () => {
        setDetalleAbierto(false);
        setDetalle(null);
        setErrorDetalle('');
    };

    const guardarFavorito = async (pelicula) => {
        try {
            setGuardandoId(pelicula.id);
            setError('');
            setMensaje('');

            await api.post('/favoritos', {
                titulo_pelicula: pelicula.titulo,
                poster_url: pelicula.poster,
                comentario: 'Agregada desde el catalogo de CineCampus',
                calificacion: null
            });

            mostrarMensaje(
                `${pelicula.titulo} se guardo correctamente en favoritos`
            );

        } catch (error) {
            mostrarError(
                error.response?.data?.mensaje ||
                'No fue posible guardar la pelicula'
            );

        } finally {
            setGuardandoId(null);
        }
    };

    const cargarFavoritos = async () => {
        try {
            setError('');
            setMensaje('');
            setCargando(true);

            const respuesta = await api.get('/favoritos');

            setFavoritos(respuesta.data);
            setVista('favoritos');

        } catch (error) {
            mostrarError('No fue posible cargar los favoritos');

        } finally {
            setCargando(false);
        }
    };

    const iniciarEdicion = (favorito) => {
        setEditandoId(favorito.id);
        setComentarioEditado(favorito.comentario || '');
        setCalificacionEditada(favorito.calificacion ?? '');
        setError('');
        setMensaje('');
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setComentarioEditado('');
        setCalificacionEditada('');
    };

    const guardarEdicion = async (id) => {
        try {
            setError('');
            setMensaje('');

            const datosActualizados = {
                comentario: comentarioEditado,
                calificacion: calificacionEditada === ''
                    ? null
                    : Number(calificacionEditada)
            };

            await api.put(`/favoritos/${id}`, datosActualizados);

            setFavoritos((anteriores) =>
                anteriores.map((favorito) =>
                    favorito.id === id
                        ? {
                            ...favorito,
                            comentario: datosActualizados.comentario,
                            calificacion: datosActualizados.calificacion
                        }
                        : favorito
                )
            );

            mostrarMensaje('Los cambios se guardaron correctamente');
            cancelarEdicion();

        } catch (error) {
            mostrarError(
                error.response?.data?.mensaje ||
                'No fue posible actualizar el favorito'
            );
        }
    };

    const eliminarFavorito = async (favorito) => {
        const confirmar = window.confirm(
            `¿Estas seguro de eliminar "${favorito.titulo_pelicula}" de favoritos?`
        );

        if (!confirmar) {
            return;
        }

        try {
            setEliminandoId(favorito.id);
            setError('');
            setMensaje('');

            await api.delete(`/favoritos/${favorito.id}`);

            setFavoritos((anteriores) =>
                anteriores.filter(
                    (pelicula) => pelicula.id !== favorito.id
                )
            );

            if (editandoId === favorito.id) {
                cancelarEdicion();
            }

            mostrarMensaje(
                `${favorito.titulo_pelicula} fue eliminada de favoritos`
            );

        } catch (error) {
            mostrarError(
                error.response?.data?.mensaje ||
                'No fue posible eliminar el favorito'
            );

        } finally {
            setEliminandoId(null);
        }
    };

    const irInicio = () => {
        setVista('inicio');
        setError('');
        setMensaje('');
        cancelarEdicion();
    };

    return (
        <div className="app">
            <header className="encabezado">
                <h1>CineCampus</h1>

                <nav>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            irInicio();
                        }}
                    >
                        Inicio
                    </a>

                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            cargarFavoritos();
                        }}
                    >
                        Favoritos
                    </a>
                </nav>

                <p
                    style={{
                        display: 'inline-block',
                        margin: '8px 0',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: estadoServidor === 'conectado'
                            ? '#166534'
                            : estadoServidor === 'desconectado'
                                ? '#991b1b'
                                : '#854d0e',
                        backgroundColor: estadoServidor === 'conectado'
                            ? '#dcfce7'
                            : estadoServidor === 'desconectado'
                                ? '#fee2e2'
                                : '#fef3c7'
                    }}
                >
                    {estadoServidor === 'conectado'
                        ? '● Servidor conectado'
                        : estadoServidor === 'desconectado'
                            ? '● Servidor desconectado'
                            : '● Comprobando conexion...'}
                </p>
            </header>

            <div className="zona-fija">
                {vista === 'inicio' && (
                    <section className="buscador-fijo">
                        <h2>Descubre tu proxima pelicula favorita</h2>

                        <form
                            className="buscador"
                            onSubmit={buscarPeliculas}
                        >
                            <input
                                type="text"
                                placeholder="Escribe el nombre de una pelicula..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />

                            <button type="submit" disabled={cargando}>
                                {cargando ? 'Buscando...' : 'Buscar'}
                            </button>
                        </form>
                    </section>
                )}

                {error && (
                    <div className="alerta-error" role="alert">
                        ⚠ {error}
                    </div>
                )}

                {mensaje && (
                    <div className="alerta-exito" role="status">
                        ✓ {mensaje}
                    </div>
                )}
            </div>

            <main>
                {vista === 'inicio' && (
                    <section className="catalogo">
                        <h2>Resultados de la busqueda</h2>

                        <div className="peliculas">
                            {peliculas.map((pelicula) => (
                                <article
                                    className="tarjeta"
                                    key={pelicula.id}
                                >
                                    {pelicula.poster ? (
                                        <img
                                            src={pelicula.poster}
                                            alt={`Poster de ${pelicula.titulo}`}
                                        />
                                    ) : (
                                        <div className="sin-poster">
                                            Sin imagen disponible
                                        </div>
                                    )}

                                    <div className="informacion">
                                        <h3>{pelicula.titulo}</h3>

                                        <p>
                                            Año: {pelicula.fecha
                                                ? pelicula.fecha.substring(0, 4)
                                                : 'No disponible'}
                                        </p>

                                        <p className="descripcion">
                                            {pelicula.descripcion ||
                                                'No hay descripcion disponible.'}
                                        </p>

                                        <p className="calificacion">
                                            ★ {Number(
                                                pelicula.calificacion || 0
                                            ).toFixed(1)} / 10
                                        </p>

                                        <button
                                            className="boton-detalles"
                                            onClick={() =>
                                                verDetalles(pelicula.id)
                                            }
                                        >
                                            Ver detalles
                                        </button>

                                        <button
                                            className="boton-favorito"
                                            onClick={() =>
                                                guardarFavorito(pelicula)
                                            }
                                            disabled={guardandoId !== null}
                                        >
                                            {guardandoId === pelicula.id
                                                ? 'Guardando...'
                                                : '♥ Guardar favorito'}
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {vista === 'favoritos' && (
                    <section className="catalogo">
                        <h2>Mis peliculas favoritas</h2>

                        {cargando && <p>Cargando favoritos...</p>}

                        {!cargando && favoritos.length === 0 && !error && (
                            <p className="mensaje">
                                Todavia no tienes peliculas favoritas.
                            </p>
                        )}

                        <div className="peliculas">
                            {favoritos.map((favorito) => (
                                <article
                                    className="tarjeta"
                                    key={favorito.id}
                                >
                                    {favorito.poster_url ? (
                                        <img
                                            src={favorito.poster_url}
                                            alt={`Poster de ${favorito.titulo_pelicula}`}
                                        />
                                    ) : (
                                        <div className="sin-poster">
                                            Sin imagen disponible
                                        </div>
                                    )}

                                    <div className="informacion">
                                        <h3>{favorito.titulo_pelicula}</h3>

                                        {editandoId === favorito.id ? (
                                            <div className="formulario-edicion">
                                                <label>
                                                    Comentario personal
                                                </label>

                                                <textarea
                                                    value={comentarioEditado}
                                                    onChange={(e) =>
                                                        setComentarioEditado(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Escribe tu opinion sobre esta pelicula..."
                                                    rows="4"
                                                />

                                                <label>
                                                    Calificacion personal
                                                </label>

                                                <select
                                                    value={calificacionEditada}
                                                    onChange={(e) =>
                                                        setCalificacionEditada(
                                                            e.target.value === ''
                                                                ? ''
                                                                : Number(e.target.value)
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Sin calificacion
                                                    </option>
                                                    <option value="1">1 estrella</option>
                                                    <option value="2">2 estrellas</option>
                                                    <option value="3">3 estrellas</option>
                                                    <option value="4">4 estrellas</option>
                                                    <option value="5">5 estrellas</option>
                                                </select>

                                                <button
                                                    className="boton-guardar-edicion"
                                                    onClick={() =>
                                                        guardarEdicion(favorito.id)
                                                    }
                                                >
                                                    Guardar cambios
                                                </button>

                                                <button
                                                    className="boton-cancelar"
                                                    onClick={cancelarEdicion}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="descripcion">
                                                    {favorito.comentario ||
                                                        'Sin comentario personal'}
                                                </p>

                                                <p>
                                                    Calificacion personal: {' '}
                                                    {favorito.calificacion
                                                        ? `${favorito.calificacion} / 5 estrellas`
                                                        : 'Sin calificacion'}
                                                </p>

                                                <button
                                                    className="boton-editar"
                                                    onClick={() =>
                                                        iniciarEdicion(favorito)
                                                    }
                                                >
                                                    Editar favorito
                                                </button>

                                                <button
                                                    className="boton-eliminar"
                                                    onClick={() =>
                                                        eliminarFavorito(favorito)
                                                    }
                                                    disabled={eliminandoId !== null}
                                                >
                                                    {eliminandoId === favorito.id
                                                        ? 'Eliminando...'
                                                        : 'Eliminar favorito'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {detalleAbierto && (
                <div
                    className="fondo-modal"
                    onClick={cerrarDetalles}
                >
                    <section
                        className="modal-detalles"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="cerrar-modal"
                            onClick={cerrarDetalles}
                        >
                            ×
                        </button>

                        {cargandoDetalle && (
                            <p className="estado-detalle">
                                Cargando informacion de la pelicula...
                            </p>
                        )}

                        {errorDetalle && (
                            <p className="error-detalle">
                                {errorDetalle}
                            </p>
                        )}

                        {detalle && (
                            <>
                                {detalle.fondo && (
                                    <img
                                        className="fondo-detalle"
                                        src={detalle.fondo}
                                        alt={`Imagen de ${detalle.titulo}`}
                                    />
                                )}

                                <div className="contenido-detalle">
                                    <div className="encabezado-detalle">
                                        {detalle.poster && (
                                            <img
                                                className="poster-detalle"
                                                src={detalle.poster}
                                                alt={`Poster de ${detalle.titulo}`}
                                            />
                                        )}

                                        <div>
                                            <h2>{detalle.titulo}</h2>

                                            {detalle.tituloOriginal &&
                                                detalle.tituloOriginal !== detalle.titulo && (
                                                    <p className="titulo-original">
                                                        Titulo original: {detalle.tituloOriginal}
                                                    </p>
                                                )}

                                            {detalle.frase && (
                                                <p className="frase-detalle">
                                                    "{detalle.frase}"
                                                </p>
                                            )}

                                            <p className="calificacion-detalle">
                                                ★ {Number(
                                                    detalle.calificacion || 0
                                                ).toFixed(1)} / 10
                                                {' '}({detalle.cantidadVotos} votos)
                                            </p>
                                        </div>
                                    </div>

                                    <h3>Sinopsis</h3>

                                    <p className="descripcion-detalle">
                                        {detalle.descripcion ||
                                            'No hay descripcion disponible.'}
                                    </p>

                                    <h3>Informacion de la pelicula</h3>

                                    <div className="datos-detalle">
                                        <p>
                                            <strong>Fecha de estreno:</strong>{' '}
                                            {detalle.fecha || 'No disponible'}
                                        </p>

                                        <p>
                                            <strong>Duracion:</strong>{' '}
                                            {detalle.duracion
                                                ? `${detalle.duracion} minutos`
                                                : 'No disponible'}
                                        </p>

                                        <p>
                                            <strong>Generos:</strong>{' '}
                                            {detalle.generos.length > 0
                                                ? detalle.generos.join(', ')
                                                : 'No disponibles'}
                                        </p>

                                        <p>
                                            <strong>Estado:</strong>{' '}
                                            {detalle.estado || 'No disponible'}
                                        </p>

                                        <p>
                                            <strong>Idioma original:</strong>{' '}
                                            {detalle.idioma || 'No disponible'}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                </div>
            )}

            <footer>
                <p>CineCampus - Proyecto Integrador Full Stack</p>
                <p>Informacion de peliculas proporcionada por TMDB</p>
            </footer>
        </div>
    );
}

export default App;
