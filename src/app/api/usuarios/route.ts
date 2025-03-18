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
      `SELECT 
    u.id, 
    u.Usuario, 
    r.Rol AS rol, 
    COALESCE(GROUP_CONCAT(m.name SEPARATOR ','), '') AS modules,
    JSON_ARRAYAGG(
        JSON_OBJECT('idRoute', up.module_id, 'permissions', up.permissions)
    ) AS modulesPermissions
FROM Usuarios u
INNER JOIN Rol r ON u.Roles = r.id
LEFT JOIN user_permissions up ON u.id = up.user_id
LEFT JOIN modulos m ON up.module_id = m.id
WHERE r.Rol = 'usuario'
GROUP BY 
    u.id, 
    u.Usuario, 
    r.Rol;`
    );

    const usuarios = (rows as any[]).map((row) => {
      let parsedPermissions = [];
      if (row.modulesPermissions) {
        try {
          parsedPermissions = JSON.parse(row.modulesPermissions);
        } catch (error) {
          parsedPermissions = [];
        }
      }
      const modulesPermissions = parsedPermissions.map((permission: any) => {
        return {
          idRoute: permission.idRoute,
          permissions: permission.permissions
            ? permission.permissions.split(",")
            : [],
        };
      });

      const modulesArray = row.modules
        ? row.modules.split(",")
        : [];

      return {
        id: row.id,
        Usuario: row.Usuario,
        rol: row.rol,
        modules: modulesArray,
        modulesPermissions: modulesPermissions,
      };
    });


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
