import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";

interface LoginRequestBody {
  Usuario: string;
  Contraseña: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { Usuario, Contraseña }: LoginRequestBody = req.body;

  // Validar que 'Usuario' y 'Contraseña' no sean vacíos
  if (!Usuario || !Contraseña) {
    return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
  }

  let connection;

  try {
    // Obtener la conexión a la base de datos
    connection = await db();

    // Ejecutar la consulta y obtener las filas (rows)
    const [rows] = await connection.execute(
      'SELECT * FROM Usuarios WHERE Usuario = ?',
      [Usuario]
    );

    // Verificar si el usuario existe
    const usuarios = rows as Array<{ id: number; Usuario: string; Contraseña: string }>;

    if (usuarios.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = usuarios[0];

    // Verificar la contraseña
    if (user.Contraseña !== Contraseña) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        id: user.id,
        Usuario: user.Usuario,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
