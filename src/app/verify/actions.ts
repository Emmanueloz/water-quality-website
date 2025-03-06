"use server";
import { NextResponse } from "next/server";
import { generarToken } from "@/lib/jwt";
import { findByToken, deleteAuth2Factor } from "@/utils/optsAuth2Factor";
import { findById } from "@/utils/optsUser";

const modulesForAdmin = ["users", "materias", "privilegios", "proyectos", "games"];

export const verifyTokenAuth2Factor = async (givenToken: string) => {
    const auth2Factor = await findByToken(givenToken);
    if (!auth2Factor) {
        return NextResponse.json(
            { message: "Token inválido", success: false }
        );
    }
    await deleteAuth2Factor(auth2Factor.id);
    const user = await findById(auth2Factor.userId);
    const modulesArray = typeof user.modules === 'string' ? user.modules.split(',') : [];
    const token = generarToken(
        {
            id: user.id,
            Usuario: user.Usuario,
            rol: user.rol,
            modules: user.rol.toLowerCase() === "admin" ? modulesForAdmin : modulesArray,
        },
        "2h"
    );

    const response = NextResponse.json({
        message: "Inicio de sesión exitoso",
        success: true,
        token,
        usuario: {
            id: user.id,
            Usuario: user.Usuario,
            rol: user.rol,
            modules: modulesArray,
        },
    });

    response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });

    return response;
};