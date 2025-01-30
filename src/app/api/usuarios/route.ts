// app/api/usuarios/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Asumimos que db es tu función para la conexión
import { Usuario } from "@/tipos/tipos"; // Tipos para los datos
import { PrivilegioRepositoryImpl } from "@/infrastructure/repositories/PrivilegioRepositoryImpl";

export async function GET(req: NextRequest) {
  let connection;

  try {
    connection = db.getPool();

    // Hacer una consulta SQL para obtener los usuarios
    const [rows] = await connection.execute(
      `SELECT u.id, u.Usuario, r.Rol AS rol, p.name AS privilegio
      FROM Usuarios u 
      JOIN Rol r ON u.Roles = r.id
      JOIN privilegios p ON u.id_privilegio = p.id`
    );

    const usuarios = rows as Usuario[];

    // Retornar los usuarios como respuesta
    return NextResponse.json({
      message: "Usuarios obtenidos correctamente",
      usuarios,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { id, privilegio } = await req.json();

  if (!id || !privilegio) {
    return NextResponse.json(
      { message: "ID y privilegio son requeridos" },
      { status: 400 }
    );
  }

  let connection;

  try {
    connection = db.getPool();

    const existingPrivilegio =
      await PrivilegioRepositoryImpl.getPrivilegioByName(privilegio);
    if (!existingPrivilegio) {
      return NextResponse.json(
        { message: "Privilegio no encontrado" },
        { status: 404 }
      );
    }

    const [result] = await connection.execute(
      `UPDATE Usuarios SET id_privilegio = ? WHERE id = ?`,
      [existingPrivilegio.id, id]
    );

    const [rows] = await connection.execute(
      `SELECT u.id, u.Usuario, r.Rol AS rol, p.name AS privilegio
      FROM Usuarios u 
      JOIN Rol r ON u.Roles = r.id
      JOIN privilegios p ON u.id_privilegio = p.id
      WHERE u.id = ?`,
      [id]
    );
    const usuarioActualizado = (rows as Usuario[])[0];

    return NextResponse.json({
      message: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
