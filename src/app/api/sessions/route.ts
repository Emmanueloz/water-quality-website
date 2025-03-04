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
