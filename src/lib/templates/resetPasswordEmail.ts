export function resetPasswordTemplate(resetLink: string, userEmail: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; font-size: 24px; font-weight: bold; color: #333; }
            .content { font-size: 16px; color: #555; line-height: 1.6; }
            .button-container { text-align: center; margin: 20px 0; }
            .button { background-color: #007bff; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold; }
            .footer { font-size: 12px; text-align: center; color: #888; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Recuperación de Contraseña</div>
            <p class="content">Hola, <strong>${userEmail}</strong></p>
            <p class="content">Hemos recibido una solicitud para restablecer tu contraseña. Si no fuiste tú, ignora este mensaje.</p>
            <div class="button-container">
                <a href="${resetLink}" class="button">Restablecer Contraseña</a>
            </div>
            <p class="content">Este enlace expirará en 1 hora.</p>
            <div class="footer">Si tienes problemas, copia y pega este enlace en tu navegador: <br> <a href="${resetLink}">${resetLink}</a></div>
        </div>
    </body>
    </html>
    `;
  }