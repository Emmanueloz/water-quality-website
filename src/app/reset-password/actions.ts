"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { findByEmail } from "@/utils/optsUser";
import { createPasswordReset, deletePasswordReset, findByToken } from "@/utils/optsPasswordReset";
import { resetPassword } from "@/utils/optsUser";
import sendEmail from "@/lib/mail";
import { resetPasswordTemplate } from "@/lib/templates/resetPasswordEmail";

const emailSchema = z.object({ email: z.string().email() });

export async function requestPasswordReset(email: string) {
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
        return { message: "Correo inválido" };
    }
    const userId = await findByEmail(email);
    if (!userId) {
        return { message: "Correo no registrado" };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);
    await createPasswordReset(userId, hashedToken, new Date(Date.now() + 120)); // 2 minutos
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await sendEmail(email, "Recuperación de Contraseña", resetPasswordTemplate(resetLink, email));
    return { message: "Correo enviado con instrucciones" };
}


export async function resetUserPassword(token: string | null, newPassword: string) {
    if (!token) {
        return { message: "Token inválido", success: false };
    }
    const resetEntry = await findByToken(token);
    console.log(resetEntry);
    if (!resetEntry || resetEntry.expiresAt < new Date()) {
        return { message: "Token inválido o expirado", success: false };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await resetPassword(resetEntry.userId, hashedPassword);
    await deletePasswordReset(resetEntry.id);

    return { message: "Contraseña actualizada correctamente", success: true };
}

