// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodificarToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  try {

    const adminResponse = await fetch(`${request.nextUrl.origin}/api/admin`);
    const adminData = await adminResponse.json();

 
    if (adminData.message === "No existe un administrador registrado" && request.nextUrl.pathname !== "/admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }


    if (adminData.message !== "No existe un administrador registrado" && request.nextUrl.pathname === "/admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      console.error("Token no encontrado. Redirigiendo a /login");
      return NextResponse.redirect(new URL("/login", request.url));
    }


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
