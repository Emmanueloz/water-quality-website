import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodificarToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    console.error("Token no encontrado. Redirigiendo a /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
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
      console.error("Error al verificar el token:", err.message);
    } else {
      console.error("Error desconocido:", err);
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|public|login|register|favicon.ico|api).*)"],
};
