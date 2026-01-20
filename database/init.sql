USE anime_list_db;

-- 1. TABLA DE USUARIOS (Login y Estadísticas de juego)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Aquí guardaremos la contraseña (idealmente encriptada)
    coins INT DEFAULT 100,          -- Monedas para la tienda
    level INT DEFAULT 1,            -- Nivel del jugador
    xp INT DEFAULT 0,               -- Experiencia
    avatar_url TEXT,                -- URL de su foto de perfil
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE ANIMES (Tu lista principal)
CREATE TABLE IF NOT EXISTS user_animes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    api_anime_id INT NOT NULL,      -- ID del anime en la API externa (Jikan/MAL)
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    status ENUM('watching', 'completed', 'plan_to_watch', 'dropped') DEFAULT 'plan_to_watch',
    score INT DEFAULT 0,            -- Puntuación de 1 a 10
    episodes_watched INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. TABLA DE ÍTEMS DE LA TIENDA (Fondos, Marcos, etc.)
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,      -- Ej: 'background', 'border', 'avatar_frame'
    price INT NOT NULL,
    image_path TEXT NOT NULL        -- Ruta de la imagen o nombre del icono
);

-- 4. INVENTARIO (Qué ítems tiene comprados cada usuario)
CREATE TABLE IF NOT EXISTS inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    is_equipped BOOLEAN DEFAULT FALSE, -- Si lo lleva puesto actualmente
    acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- 5. TABLA DE MASCOTAS (Gamificación)
CREATE TABLE IF NOT EXISTS user_pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_type VARCHAR(50) NOT NULL,  -- Identificador interno de la mascota
    nickname VARCHAR(50),           -- Nombre que le pone el usuario
    level INT DEFAULT 1,
    evolution_stage INT DEFAULT 1,  -- Para cambiar la imagen según crezca
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------
-- DATOS DE PRUEBA (Para que no empieces vacío)
-- ---------------------------------------------------------

-- Insertar un usuario de prueba (Usuario: admin, Pass: 1234)
INSERT INTO users (username, password, coins, level)
VALUES ('admin', '1234', 500, 5);

-- Insertar algunos ítems en la tienda
INSERT INTO items (name, type, price, image_path) VALUES
('Marco Dorado', 'border', 100, 'gold_border.png'),
('Fondo Espacial', 'background', 250, 'space_bg.png'),
('Gato Ninja', 'pet_skin', 500, 'ninja_cat.png');
