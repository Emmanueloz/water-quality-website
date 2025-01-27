import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura";

/**
 * Genera un token JWT.
 * @param payload - Los datos que deseas incluir en el token.
 * @param expiresIn - Tiempo de expiración del token (por defecto "2h").
 * @returns Un string con el token generado.
 */
export function generarToken(payload: object, expiresIn: string = "2h"): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verifica y decodifica un token JWT.
 * @param token - El token a verificar.
 * @returns El payload decodificado o lanza un error si el token no es válido.
 */
export function verificarToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

/**
 * Decodifica un token JWT sin verificar su validez.
 * @param token - El token a decodificar.
 * @returns El payload decodificado como objeto o `null` si el token no es válido.
 */
export function decodificarToken(token: string): JwtPayload | null {
  const decoded = jwt.decode(token);

  // Validar que el resultado es un objeto
  if (decoded && typeof decoded === "object") {
    return decoded as JwtPayload;
  }

  return null;
}
