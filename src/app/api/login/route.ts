import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginRequestBody, Usuario } from "../../tipos/tipos";

// Clave secreta para el JWT
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura";

export async function POST(req: NextRequest) {
  const { Usuario, Contraseña }: LoginRequestBody = await req.json();

  if (!Usuario || !Contraseña) {
    return NextResponse.json({ message: "Usuario y contraseña son requeridos" }, { status: 400 });
  }

  let connection;

  try {
    connection = await db();

    // Buscar usuario en la base de datos
    const [rows] = await connection.execute(
      `SELECT u.id, u.Usuario, u.Contraseña, r.Rol AS rol 
       FROM Usuarios u 
       JOIN Rol r ON u.Roles = r.id 
       WHERE u.Usuario = ?`,
      [Usuario]
    );

    const usuarios = rows as Usuario[];

    if (usuarios.length === 0) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }

    const user = usuarios[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(Contraseña, user.Contraseña);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user.id, Usuario: user.Usuario, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Establecer la cookie del token
    const response = NextResponse.json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: user.id,
        Usuario: user.Usuario,
        rol: user.rol,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo segura en producción
      sameSite: 'strict', // Evitar ataques CSRF
      path: '/', // Hacer la cookie accesible en toda la app
    });

    return response;
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end(); // Cerrar conexión
    }
  }
}
