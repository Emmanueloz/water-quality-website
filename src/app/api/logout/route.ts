export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie } from "../../../lib/auth";
import { MultiSessionsRepositoryImpl } from "@/infrastructure/repositories/MultiSessionsRepositoryImpl";
import { decodificarToken } from "@/lib/jwt";

const multiSessionsRepository = new MultiSessionsRepositoryImpl();

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No se encontró ninguna sesión" });
  }

  const decoded = decodificarToken(token);

  if (!decoded) {
    return NextResponse.json({ message: "No se encontró ninguna sesión" });
  }

  const isDeleted = await multiSessionsRepository.deleteByToken(
    decoded.id,
    token
  );

  if (!isDeleted) {
    return NextResponse.json(
      { message: "No se encontró ninguna sesión" },
      { status: 404 }
    );
  }

  try {
    const response = NextResponse.json({ message: "Logout exitoso" });
    clearAuthCookie(response);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al cerrar sesión" },
      { status: 500 }
    );
  }
}
