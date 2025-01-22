import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Eliminar la cookie de autenticación
    const response = NextResponse.json({ message: "Logout exitoso" });

    // Configurar la cookie 'auth_token' para eliminarla
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Solo segura en producción
      sameSite: 'strict', // Evitar ataques CSRF
      maxAge: 0, // Expirarla inmediatamente
      path: '/', // Hacer la cookie accesible en toda la app
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al cerrar sesión" }, { status: 500 });
  }
}
