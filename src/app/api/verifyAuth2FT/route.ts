"use server";
import { NextResponse, NextRequest } from "next/server";
import { generarToken } from "@/lib/jwt";
import { findByToken, deleteAuth2Factor } from "@/utils/optsAuth2Factor";
import { findById } from "@/utils/optsUser";
import { MultiSessionsRepositoryImpl } from "@/infrastructure/repositories/MultiSessionsRepositoryImpl";

const modulesForAdmin = [
  "users",
  "materias",
  "privilegios",
  "proyectos",
  "games",
];

const multiSessionsRepository = new MultiSessionsRepositoryImpl();

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const auth2Factor = await findByToken(token);
  if (!auth2Factor) {
    return NextResponse.json({ message: "Token inválido", success: false });
  }
  await deleteAuth2Factor(auth2Factor.id);
  const user = await findById(auth2Factor.userId);
  const modulesArray =
    typeof user.modules === "string" ? user.modules.split(",") : [];
  const tokenForCookie = generarToken(
    {
      id: user.id,
      Usuario: user.Usuario,
      rol: user.rol,
      modules:
        user.rol.toLowerCase() === "admin" ? modulesForAdmin : modulesArray,
    },
    "2h"
  );

  const response = NextResponse.json({
    message: "Inicio de sesión exitoso",
    success: true,
    tokenForCookie,
    usuario: {
      id: user.id,
      Usuario: user.Usuario,
      rol: user.rol,
      modules: modulesArray,
    },
  });

  await multiSessionsRepository.create({
    id: 0,
    userAgent: req.headers.get("user-agent") || "",
    xForwardedFor: req.headers.get("x-forwarded-for") || "",
    userId: user.id,
    token: tokenForCookie,
    createdAt: new Date(),
  });

  response.cookies.set("auth_token", tokenForCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}
