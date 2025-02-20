// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodificarToken } from "./lib/jwt";

// lista con todos los módulos permitidos aun cuando el usuario no tenga el modulo correspondiente
const allowedModules = ["", "david", "angel", "daniel", "raul", "profile"];
const publicUrl = ["/reset-password"];
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  // Si la ruta es publica, permitir el acceso
  if (publicUrl.includes(request.nextUrl.pathname.trim())) {
    console.log(request.nextUrl.pathname);
    return res;
  }
  try {
    // Hacer la solicitud GET para verificar si existe un administrador
    const adminResponse = await fetch(`${request.nextUrl.origin}/api/admin`);
    const adminData = await adminResponse.json();

    if (
      adminData.message === "No existe un administrador registrado" &&
      request.nextUrl.pathname !== "/admin"
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (
      adminData.message !== "No existe un administrador registrado" &&
      request.nextUrl.pathname === "/admin"
    ) {
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

    // Del token, si el usuarios tiene el rol "usuario", valida que modulos tiene acceso
    if (decoded.rol.toLowerCase() === "usuario") {
      const modules = decoded.modules as string[];

      // obtener la ruta inicial actual de la aplicación
      const route = request.nextUrl.pathname;
      const modulo = route.split("/")[1];

      // si el modulo es la raiz, se permite el acceso
      if (allowedModules.includes(modulo)) {
        return NextResponse.next();
      }

      // si el modulo no existe en la lista de modulos y la ruta existe, mandar un error 404
      if (
        !modules.includes(modulo) &&
        route !== "/login" &&
        route !== "/register" &&
        route !== "/admin" &&
        route !== "/reset"
      ) {
        console.error("Modulo no autorizado:", modulo);

        return NextResponse.rewrite(new URL("/not-found", request.url));
      }
    }

    //console.log("Token válido:", decoded); // Depuración
    return NextResponse.next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(
        "Error al verificar el administrador o el token:",
        err.message
      );
    } else {
      console.error("Error desconocido:", err);
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|public|login|register|admin|favicon.ico|api|img).*)"],
};
