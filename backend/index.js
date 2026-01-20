const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite que el Frontend (puerto 8080) nos hable
app.use(express.json()); // Permite leer JSON que nos envíe el front

// 1. Configuración de la conexión
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'anime_list_db',
    port: process.env.DB_PORT || 3306
};

// 2. Lógica de conexión con reintento automático (Anti-caídas)
let connection;

function handleDisconnect() {
    connection = mysql.createConnection(dbConfig);

    connection.connect(error => {
        if (error) {
            console.error('❌ Error conectando a la BD (Reintentando en 2s...):', error.message);
            setTimeout(handleDisconnect, 2000); // Espera 2 segundos y vuelve a probar
        } else {
            console.log('✅ ¡Conectado exitosamente a la base de datos MySQL!');
        }
    });

    connection.on('error', err => {
        console.error('❌ Error en la conexión:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Si se cae la conexión, reconecta
        } else {
            throw err;
        }
    });
}

// Iniciamos la conexión
handleDisconnect();


// RUTA DE LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consulta SQL simple (Nota: En un futuro real, usaríamos bcrypt para encriptar passwords)
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            // ¡Usuario encontrado!
            const user = results[0];
            // Devolvemos los datos del usuario (quitando la contraseña por seguridad)
            res.json({
                success: true,
                user: {
                    id: user.id,
                    username: user.username,
                    coins: user.coins,
                    level: user.level,
                    avatar: user.avatar_url
                }
            });
        } else {
            // Usuario o contraseña incorrectos
            res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
        }
    });
});


// --- RUTAS ---

// Ruta base
app.get('/', (req, res) => {
    res.json({ message: '¡Bienvenido a la API real de AnimeList!' });
});

// Ruta para probar la BD: Obtener usuarios
app.get('/users', (req, res) => {
    // Usamos la conexión actual
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});