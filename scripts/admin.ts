// scripts/createAdmin.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  // Configuración de la conexión a la base de datos
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Datos del administrador
  const usuario = 'admin';
  const contraseña = 'admin123';  // Contraseña que quieres asignar

  // Encriptando la contraseña
  const hashedPassword = await bcrypt.hash(contraseña, 10);

  // Verificar si el rol de 'admin' ya existe
  const [rowsRoles] = await connection.execute(
    'SELECT id FROM Rol WHERE Rol = ?', ['Admin']
  );

  let rolId;
  if (rowsRoles.length > 0) {
    // Si existe, usamos su id
    rolId = rowsRoles[0].id;
  } else {
    // Si no existe, insertamos el rol y usamos su id
    const [insertRol] = await connection.execute(
      'INSERT INTO Rol (Rol) VALUES (?)', ['Admin']
    );
    rolId = insertRol.insertId;  // Obtenemos el id del rol insertado
  }

  // Consulta para crear al administrador con el rol correspondiente
  const [insertAdmin] = await connection.execute(
    'INSERT INTO Usuarios (Usuario, Contraseña, Roles) VALUES (?, ?, ?)',
    [usuario, hashedPassword, rolId]
  );

  console.log('Administrador creado con éxito');
  await connection.end();
}

createAdmin().catch(err => {
  console.error('Error al crear el administrador:', err);
});
