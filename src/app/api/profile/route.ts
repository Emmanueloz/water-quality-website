import { NextRequest, NextResponse } from "next/server";
import { ProfileRepositoryImpl } from "@/infrastructure/repositories/ProfileRepositoryImpl";
import { hashPassword } from "@/lib/auth";
import { decodificarToken } from "@/lib/jwt"; // Helper para decodificar el token

const profileRepository = new ProfileRepositoryImpl();

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Obtener el token del encabezado o de las cookies
        const token = req.cookies.get("auth_token")?.value;
        if (!token) return NextResponse.json({ error: "Token no encontrado" }, { status: 400 });

        const decoded = decodificarToken(token); // Decodificamos el token usando la función decodificarToken
        if (!decoded || !decoded.id) {
            return NextResponse.json({ error: "Token inválido" }, { status: 400 });
        }

        const id = decoded.id; // Obtén el ID del usuario del token

        if (!id || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        // 🔹 Encriptar la contraseña antes de actualizarla
        const hashedPassword = await hashPassword(password);

        await profileRepository.updateProfile(id, email, hashedPassword);
        return NextResponse.json({ message: "Perfil actualizado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error en PUT /profile:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
