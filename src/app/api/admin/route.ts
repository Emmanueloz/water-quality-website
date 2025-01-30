// pages/api/admin.ts
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// POST: Crear un nuevo administrador
export async function POST(req: Request): Promise<Response> {
  try {
    const { Usuario, Contraseña } = await req.json();

    if (!Usuario || !Contraseña) {
      return new Response(JSON.stringify({ message: "Usuario y Contraseña son obligatorios" }), { status: 400 });
    }

    const pool = db.getPool();

    // Verificar si ya existe un administrador
    const [adminRows]: any[] = await pool.execute(
      `SELECT u.Usuario 
       FROM Usuarios u
       JOIN Rol r ON u.Roles = r.id
       WHERE r.Rol = 'Admin' LIMIT 1`
    );

    if (adminRows.length > 0) {
      return new Response(JSON.stringify({ message: "El administrador ya existe" }), { status: 400 });
    }

    // Obtener el ID del rol "Admin"
    const [roleRows]: any[] = await pool.execute(
      "SELECT id FROM Rol WHERE Rol = ? LIMIT 1",
      ["Admin"]
    );

    if (roleRows.length === 0) {
      return new Response(JSON.stringify({ message: "Rol 'Admin' no encontrado" }), { status: 500 });
    }

    const roleId = roleRows[0].id;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    // Insertar el nuevo administrador
    await pool.execute(
      "INSERT INTO Usuarios (Usuario, Contraseña, Roles) VALUES (?, ?, ?)",
      [Usuario, hashedPassword, roleId]
    );

    return new Response(JSON.stringify({ message: "Administrador creado exitosamente" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error interno del servidor", error: error }), { status: 500 });
  }
}

// GET: Obtener información sobre el administrador
export async function GET(): Promise<Response> {
  try {
    const pool = db.getPool();

    // Verificar si ya existe un administrador
    const [adminRows]: any[] = await pool.execute(
      `SELECT u.Usuario 
       FROM Usuarios u
       JOIN Rol r ON u.Roles = r.id
       WHERE r.Rol = 'Admin' LIMIT 1`
    );

    if (adminRows.length === 0) {
      return new Response(
        JSON.stringify({ message: "No existe un administrador registrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Administrador encontrado", admin: adminRows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error interno del servidor", error: error }), { status: 500 });
  }
}
