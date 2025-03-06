import { NextRequest, NextResponse } from "next/server";
import { MultiSessionsRepositoryImpl } from "@/infrastructure/repositories/MultiSessionsRepositoryImpl";

const multiSessionsRepository = new MultiSessionsRepositoryImpl();

export async function DELETE(req: NextRequest) {
  const { token, userId }: { token: string; userId: number } = await req.json();

  try {
    const isDeleted = await multiSessionsRepository.deleteByToken(
      userId,
      token
    );

    if (!isDeleted) {
      return NextResponse.json(
        { message: "No se encontró ninguna sesión" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return NextResponse.json(
      { message: "Error al cerrar sesión" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const userId = searchParams.get("userId") ?? "1";
  const token = searchParams.get("token") ?? "";

  if (!userId || !token) {
    return NextResponse.json({ message: "Falta parámetros" }, { status: 400 });
  }

  try {
    const sessions = await multiSessionsRepository.getByToken(
      parseInt(userId),
      token
    );

    if (!sessions) {
      return NextResponse.json(
        { message: "No se encontró ninguna sesión" },
        { status: 404 }
      );
    }

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Error al obtener sesiones:", error);
    return NextResponse.json(
      { message: "Error al obtener sesiones" },
      { status: 500 }
    );
  }
}
