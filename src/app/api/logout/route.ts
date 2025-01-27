import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie } from "../../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Logout exitoso" });
    clearAuthCookie(response);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error al cerrar sesión" }, { status: 500 });
  }
}
