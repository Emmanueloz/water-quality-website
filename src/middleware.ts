// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodificarToken } from "./lib/jwt";

// lista con todos los módulos permitidos aun cuando el usuario no tenga el módulo correspondiente
const allowedModules = ["", "david", "angel", "daniel", "raul", "profile"];
const publicUrl = ["/reset-password", "/verify"];
export async function middleware(request: NextRequest) {
  let res = NextResponse.next();

  // Si la ruta es pública, permitir el acceso
  if (publicUrl.includes(request.nextUrl.pathname.trim())) {
    console.log(request.nextUrl.pathname);
    return res;
  }

  try {
    // Obtener el token de las cookies
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      console.error(
        "Token no encontrado. Cerrando sesión y redirigiendo a /login"
      );
      return logoutAndRedirect(request);
    }

    // Decodificar el token desde la caché
    const decoded = decodificarToken(token);
    console.log(decoded);

    // 🔹 Validar si el token ha expirado
    if (!decoded || (decoded.exp && Date.now() >= decoded.exp * 1000)) {
      console.error("Token expirado. Cerrando sesión y redirigiendo a /login");
      return logoutAndRedirect(request);
    }

    // Hacer la solicitud GET para verificar si existe un administrador
    const adminResponse = await fetch(`${request.nextUrl.origin}/api/admin`, {
      cache: "no-store", // Evita que la respuesta se almacene en caché
    });
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

    // Si el usuario tiene el rol "usuario", validar módulos de acceso
    if (decoded.rol.toLowerCase() === "usuario") {
      const modules = decoded.modules as string[];

      // Obtener la ruta inicial actual de la aplicación
      const route = request.nextUrl.pathname;
      const modulo = route.split("/")[1];

      // Si el módulo es la raíz, se permite el acceso
      if (allowedModules.includes(modulo)) {
        return NextResponse.next();
      }

      // Si el módulo no existe en la lista de módulos y la ruta existe, mandar un error 404
      if (
        !modules.includes(modulo) &&
        route !== "/login" &&
        route !== "/register" &&
        route !== "/admin" &&
        route !== "/reset"
      ) {
        console.error("Módulo no autorizado:", modulo);
        res.headers.set("Cache-Control", "no-store, must-revalidate");
        return NextResponse.rewrite(new URL("/not-found", request.url));
      }
    }

    // ✅ **Forzar que las respuestas del middleware no se almacenen en caché**
    res.headers.set("Cache-Control", "no-store, must-revalidate");
    return res;
  } catch (err: unknown) {
    console.error("Error en middleware:", err);
    return logoutAndRedirect(request);
  }
}

// 🔹 **Función para cerrar sesión y redirigir a /login**
function logoutAndRedirect(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  // 🛑 **Eliminar el token de autenticación**
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0), // Expirar la cookie inmediatamente
  });

  // Asegurar que el navegador no almacene datos en caché
  response.headers.set("Cache-Control", "no-store, must-revalidate");

  return response;
}

export const config = {
  matcher: ["/((?!_next|public|login|register|admin|favicon.ico|api|img).*)"],
};
