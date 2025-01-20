import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_super_segura'; // Clave secreta JWT

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value; // Obtener el token JWT desde las cookies
  const urlPath = req.nextUrl.pathname; // Ruta actual

  // Verificar si el token está presente
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url)); // Si no hay token, redirigir al login
  }

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(token, JWT_SECRET) as { rol: string }; // Decodificar el token

    // Validar el rol del usuario para diferentes rutas
    if (urlPath.includes('/api/usuarios')) {
      if (!['administrador', 'usuario'].includes(decoded.rol)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirigir si no tiene permiso
      }
    }

    // Si todo está bien, permitir el acceso
    return NextResponse.next();
  } catch (error) {
    console.error('Error al verificar el token JWT:', error);
    return NextResponse.redirect(new URL('/login', req.url)); // Redirigir si el token es inválido
  }
}

// Configuración para aplicar el middleware solo a rutas específicas
export const config = {
  matcher: ['/api/:path*', '/', '/raul'], // Aplica el middleware a las rutas necesarias
};
