-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS dwp3_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Usar la base de datos
USE dwp3_db;

-- Crear la tabla de Roles
CREATE TABLE IF NOT EXISTS Rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Rol VARCHAR(50) NOT NULL UNIQUE
);

-- Crear la tabla de Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Usuario VARCHAR(100) NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    Rol INT NOT NULL,
    FOREIGN KEY (Rol) REFERENCES Rol(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    technologies VARCHAR(200) NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Usuarios(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;