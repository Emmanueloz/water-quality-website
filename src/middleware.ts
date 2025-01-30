// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodificarToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  try {
    // Hacer la solicitud GET para verificar si existe un administrador
    const adminResponse = await fetch(`${request.nextUrl.origin}/api/admin`);
    const adminData = await adminResponse.json();

    // Si no hay administrador y estamos intentando acceder a la ruta /admin, redirigir a la página de creación del administrador
    if (adminData.message === "No existe un administrador registrado" && request.nextUrl.pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Si ya existe un administrador y estamos en /admin, redirigir a la página de login
    if (adminData.message !== "No existe un administrador registrado" && request.nextUrl.pathname === "/admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Si el administrador ya existe, validar el token JWT
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      console.error("Token no encontrado. Redirigiendo a /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Decodificar el token sin verificarlo
    const decoded = decodificarToken(token);

    if (!decoded) {
      console.error("Token inválido. Redirigiendo a /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("Token válido:", decoded); // Depuración
    return NextResponse.next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error al verificar el administrador o el token:", err.message);
    } else {
      console.error("Error desconocido:", err);
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|public|login|register|admin|favicon.ico|api).*)"],
};
