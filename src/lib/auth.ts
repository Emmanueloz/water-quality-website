import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const saltRounds = 10;

/**
 * Establece una cookie de autenticación en la respuesta.
 * @param response - Respuesta de Next.js.
 * @param token - Token de autenticación.
 * @param maxAge - Tiempo de vida de la cookie (en segundos, por defecto 2 horas).
 */
export function setAuthCookie(response: NextResponse, token: string, maxAge: number = 7200) {
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
}

/**
 * Elimina la cookie de autenticación.
 * @param response - Respuesta de Next.js.
 */
export function clearAuthCookie(response: NextResponse) {
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Encripta una contraseña usando bcrypt.
 * @param password - Contraseña en texto plano.
 * @returns Contraseña encriptada.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compara una contraseña en texto plano con su hash.
 * @param plainPassword - Contraseña en texto plano.
 * @param hashedPassword - Contraseña encriptada.
 * @returns True si coinciden, false en caso contrario.
 */
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
