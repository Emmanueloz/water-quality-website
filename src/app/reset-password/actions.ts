"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { findByEmail, findByPhoneNumber } from "@/utils/optsUser";
import { createPasswordReset, deletePasswordReset, findByCodeSMS, findByToken, updatePasswordReset } from "@/utils/optsPasswordReset";
import { resetPassword } from "@/utils/optsUser";
import sendEmail from "@/lib/mail";
import { sendSMS } from "@/lib/sms";
import { resetPasswordTemplate } from "@/lib/templates/resetPasswordEmail";

const emailSchema = z.object({ email: z.string().email() });
const phoneSchema = z.object({ phone: z.string().min(10).regex(/^\d{10}$/) });

export async function requestPasswordResetByEmail(email: string) {
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
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutos
    await createPasswordReset(userId, hashedToken, expiresAt, "email");
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await sendEmail(email, "Recuperación de Contraseña", resetPasswordTemplate(resetLink, email));
    return { message: "Correo enviado con instrucciones" };
}

export async function requestPasswordResetBySMS(phone: string) {
    const validation = phoneSchema.safeParse({ phone });
    if (!validation.success) {
        return { message: "Telefono inválido", success: false };
    }
    const userId = await findByPhoneNumber(phone);
    if (!userId) {
        return { message: "Telefono no registrado", success: false };
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 2 minutos
    await createPasswordReset(userId, verificationCode.toString(), expiresAt, "sms"); // 2 minutos
    const message = `${verificationCode}`;
    const smsResult = await sendSMS(phone, message);
    if (smsResult.success) {
        return { message: "Código enviado con instrucciones", success: true };
    } else {
        return { message: "Error al enviar el código", success: false };
    }
}

export async function validateCodeSMS(codeSMS: string) {
    const resetEntry = await findByCodeSMS(codeSMS);
    if (!resetEntry) {
        return { message: "Código es inválido", success: false };
    }
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);
    await updatePasswordReset(resetEntry.id, hashedToken);
    return { message: "Código válido", success: true, token };
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

