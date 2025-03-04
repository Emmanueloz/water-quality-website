export function auth2FactorTemplate(accept_URL: string, reject_URL: string) {
return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verificación de inicio de sesión</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        color: #333333;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        border-bottom: 1px solid #dddddd;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #333333;
      }
      .content {
        font-size: 16px;
        line-height: 1.6;
        text-align: center;
      }
      .btn-container {
        margin: 20px 0;
        display: flex;
        justify-content: center;
        gap: 10px;
      }
      .btn {
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: bold;
        color: #ffffff;
        display: inline-block;
      }
      .btn-accept {
        background-color: #28a745;
      }
      .btn-reject {
        background-color: #dc3545;
      }
      .footer {
        font-size: 12px;
        text-align: center;
        color: #777777;
        border-top: 1px solid #dddddd;
        padding-top: 10px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verificación de inicio de sesión</h1>
      </div>
      <div class="content">
        <p>Hola,</p>
        <p>
          Hemos recibido una solicitud para iniciar sesión en tu cuenta.
          <br />
          Si fuiste tú, por favor confirma el inicio de sesión; de lo contrario,
          rechaza la solicitud.
        </p>
        <div class="btn-container">
          <a href="${accept_URL}" class="btn btn-accept"
            >Confirmar inicio de sesión</a
          >
          <a href="${reject_URL}" class="btn btn-reject"
            >Rechazar inicio de sesión</a
          >
        </div>
        <p>Nota: Este enlace expirará en 2 minutos.</p>
      </div>
      <div class="footer">
        <p>Si no solicitaste este inicio de sesión, por favor ignora este correo.</p>
        <p>&copy; 2025 Mi Sitio. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
</html>`;

}