import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { LoginRequestBody, Usuario } from "../../../tipos/tipos";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  const { Usuario, Contraseña }: LoginRequestBody = await req.json();

  if (!Usuario || !Contraseña) {
    return NextResponse.json(
      { message: "Usuario y contraseña son requeridos" },
      { status: 400 }
    );
  }

  let connection;

  try {
    // Conexión a la base de datos
    connection = db.getPool();

    const [existingUserRows] = await connection.execute(
      `SELECT * FROM Usuarios WHERE Usuario = ?`,
      [Usuario]
    );

    if ((existingUserRows as Usuario[]).length > 0) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(Contraseña);
    const userRoleId = 2;

    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO Usuarios (Usuario, Contraseña, Roles) VALUES (?, ?, ?)`,
      [Usuario, hashedPassword, userRoleId]
    );

    const newUser = {
      id: result.insertId,
      Usuario,
    };

    return NextResponse.json({
      message: "Registro exitoso",
      usuario: newUser,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
