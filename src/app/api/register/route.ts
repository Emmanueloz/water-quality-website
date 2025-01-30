import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import bcrypt from "bcryptjs"; // Para encriptar la contraseña
import { LoginRequestBody, Usuario } from "../../../tipos/tipos"; // Usando los tipos (si usas TypeScript)
import { ResultSetHeader } from "mysql2"; // Importar el tipo adecuado

const saltRounds = 10; // Número de rondas de 'salting' para hacer la encriptación más segura

export async function POST(req: NextRequest) {
  const { Usuario, Contraseña }: LoginRequestBody = await req.json();

  // Validar si el usuario y la contraseña están presentes
  if (!Usuario || !Contraseña) {
    return NextResponse.json({ message: "Usuario y contraseña son requeridos" }, { status: 400 });
  }

  let connection;

  try {
    // Conexión a la base de datos
    connection = db.getPool();

    // Verificar si el usuario ya existe en la base de datos
    const [existingUserRows] = await connection.execute(
      `SELECT * FROM Usuarios WHERE Usuario = ?`,
      [Usuario]
    );

    // Si el usuario ya existe, retornar error
    if ((existingUserRows as Usuario[]).length > 0) {
      return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(Contraseña, saltRounds);

    // Asumir que el rol "usuario" tiene ID 1 (deberías ajustarlo según tu esquema de roles)
    const userRoleId = 2; // El ID del rol para "usuario" en la base de datos

    // Insertar el nuevo usuario en la base de datos con el rol de "usuario"
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO Usuarios (Usuario, Contraseña, Roles, id_privilegio) VALUES (?, ?, ?, ?)`,
      [Usuario, hashedPassword, userRoleId, 1] // Cambiar el 1 por el ID de privilegio correcto
    );

    // Obtener el insertId del resultado de la inserción
    const newUser = {
      id: result.insertId,  // Ahora usamos ResultSetHeader que tiene la propiedad insertId
      Usuario,
    };

    // Devolver la respuesta con el mensaje de éxito
    return NextResponse.json({
      message: "Registro exitoso",
      usuario: newUser, // Devolvemos los datos del nuevo usuario
    });
  } catch (error: unknown) {
    console.error(error);

    // En caso de error, devolver mensaje genérico
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
