// app/api/usuarios/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";  // Asumimos que db es tu función para la conexión
import { Usuario } from "../../../tipos/tipos";  // Tipos para los datos

export async function GET(req: NextRequest) {
  let connection;

  try {
    connection = await db.getPool(); // Conexión a la base de datos

    // Hacer una consulta SQL para obtener los usuarios
    const [rows] = await connection.execute(
      `SELECT u.id, u.Usuario, u.Contraseña, r.Rol AS rol 
      FROM Usuarios u 
      JOIN Rol r ON u.Roles = r.id`
    );

    const usuarios = rows as Usuario[];

    // Retornar los usuarios como respuesta
    return NextResponse.json({
      message: "Usuarios obtenidos correctamente",
      usuarios,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end(); // Cerrar la conexión
    }
  }
}
