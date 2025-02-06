import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Envía un correo electrónico con Nodemailer.
 * @param to - Dirección de correo del destinatario.
 * @param subject - Asunto del correo.
 * @param text - Contenido en texto plano.
 */
export default async function sendEmail(to: string, subject: string, html: string) {
    try {
        await transporter.sendMail({
            from: `"Soporte" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`📧 Correo enviado a: ${to}`);
        return { success: true };
    } catch (error) {
        console.error("❌ Error enviando el correo:", error);
        return { success: false, error };
    }
}
