import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Asegúrate de que esto esté apuntando a tu configuración de base de datos

export async function POST(req: NextRequest) {
  let connection;
  
  try {
    connection = await db.getPool(); // Obtener la conexión a la base de datos

    // Primero, verifica si ya existe un administrador
    const [rows] = await connection.execute(
      `SELECT id FROM Usuarios WHERE Roles = 'Admin' LIMIT 1`
    );

    // Verifica si hay alguna fila (administrador)
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json(
        { message: "Ya existe un administrador" },
        { status: 400 }
      );
    }

    // Verifica si el rol 'Admin' existe en la tabla Rol
    const [roles] = await connection.execute(
      `SELECT id FROM Rol WHERE Rol  = 'Admin' LIMIT 1`
    );

    if (Array.isArray(roles) && roles.length === 0) {
      return NextResponse.json(
        { message: "Rol 'Admin' no encontrado en la base de datos" },
        { status: 400 }
      );
    }

    // Obtenemos el id del rol 'Admin'
    const adminRoleId = (roles[0] as { id: number }).id;

    // Si no existe un administrador, creamos uno nuevo
    const { Usuario, Contraseña } = await req.json();

    // Asegúrate de que se reciban los datos necesarios
    if (!Usuario || !Contraseña) {
      return NextResponse.json(
        { message: "Faltan datos necesarios" },
        { status: 400 }
      );
    }

    // Insertar el nuevo administrador en la base de datos
    const [insertResult] = await connection.execute(
      `INSERT INTO Usuarios (Usuario, Contraseña, Roles) VALUES (?, ?, ?)`,
      [Usuario, Contraseña, adminRoleId]  // Insertamos el id del rol 'Admin'
    );

    // Aquí obtenemos el id del nuevo administrador insertado
    const adminId = (insertResult as { insertId: number }).insertId;

    return NextResponse.json({
      message: "Administrador creado correctamente",
      adminId: adminId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end(); // Asegúrate de cerrar la conexión
    }
  }
}
