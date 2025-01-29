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

CREATE TABLE `materias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `maestro` varchar(100) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materias_Usuarios_FK` (`id_usuario`),
  CONSTRAINT `materias_Usuarios_FK` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `unidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `horas_totales` decimal(5,2) NOT NULL,
  `id_materia` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `unidades_ibfk_1` (`id_materia`),
  CONSTRAINT `unidades_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;