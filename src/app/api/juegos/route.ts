import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { ResultSetHeader } from "mysql2";


// CREATE: Registrar un nuevo juego
export async function POST(req: NextRequest) {
  let requestBody;
  try {
    requestBody = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Error en el formato del JSON" }, { status: 400 });
  }

  const { nombre, descripcion } = requestBody;

  if (!nombre || !descripcion) {
    return NextResponse.json({ message: "Nombre y descripción son requeridos" }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ message: "Token inválido o expirado" }, { status: 401 });
  }

  let connection;
  try {
    connection = await db();
    if (!connection) {
      throw new Error("No se pudo conectar a la base de datos");
    }

    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO Juegos (nombre, descripcion, user_id) VALUES (?, ?, ?)`,
      [nombre, descripcion, user.id]
    );

    return NextResponse.json({
      message: "Juego registrado exitosamente",
      juego: { id: result.insertId, nombre, descripcion, user_id: user.id },
    });
  } catch (error: unknown) {
    console.error("Error al registrar el juego:", error);
    return NextResponse.json({ message: error instanceof Error ? error.message : "Error interno del servidor" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// READ: Obtener todos los juegos de un usuario
export async function GET(req: NextRequest) {
  let connection;

  try {
    const user = await getUserFromToken(req);
    console.log(user);

    connection = await db();

    const [juegos] = await connection.execute(
      `SELECT id, nombre, descripcion FROM Juegos WHERE user_id = ?`,
      [user.id]
    );

    return NextResponse.json({
      message: "Juegos obtenidos exitosamente",
      juegos,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Error al obtener los juegos" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// UPDATE: Actualizar un juego
export async function PUT(req: NextRequest) {
  const { id, nombre, descripcion } = await req.json();

  if (!id || !nombre || !descripcion) {
    return NextResponse.json({ message: "ID, nombre y descripción son requeridos" }, { status: 400 });
  }

  let connection;

  try {
    const user = await getUserFromToken(req);

    connection = await db();

    const [result] = await connection.execute<ResultSetHeader>(
      `UPDATE Juegos SET nombre = ?, descripcion = ? WHERE id = ? AND user_id = ?`,
      [nombre, descripcion, id, user.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Juego no encontrado o no autorizado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Juego actualizado exitosamente" });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Error al actualizar el juego" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// DELETE: Eliminar un juego
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "ID es requerido" }, { status: 400 });
  }

  let connection;

  try {
    const user = await getUserFromToken(req);

    connection = await db();

    const [result] = await connection.execute<ResultSetHeader>(
      `DELETE FROM Juegos WHERE id = ? AND user_id = ?`,
      [id, user.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Juego no encontrado o no autorizado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Juego eliminado exitosamente" });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Error al eliminar el juego" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
