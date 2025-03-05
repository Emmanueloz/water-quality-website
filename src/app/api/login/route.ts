import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";
import { generarToken } from "../../../lib/jwt";
import { LoginRequestBody, Usuario } from "../../../tipos/tipos";
import { saveAuth2Factor } from "@/utils/optsAuth2Factor";
import sendEmail from "@/lib/mail";
import { auth2FactorTemplate } from "@/lib/templates/auth2Factor";

const modulesForAdmin = ["users", "materias", "privilegios", "proyectos", "games"];

export async function POST(req: NextRequest) {
  const { Usuario, Contraseña }: LoginRequestBody = await req.json();

  if (!Usuario || !Contraseña) {
    return NextResponse.json(
      { message: "Usuario y contraseña son requeridos" },
      { status: 400 }
    );
  }

  let connection;

  try {
    connection = db.getPool();

    // Buscar usuario en la base de datos
    const [rows] = await connection.execute(
      `SELECT 
        u.id, 
        u.Usuario, 
        u.Contraseña,
        u.is_two_factor_enabled AS isTwoFactorEnabled,
        u.Email AS email,
        r.Rol AS rol, 
        COALESCE(GROUP_CONCAT(m.name SEPARATOR ','), '') AS modules
      FROM Usuarios u
      INNER JOIN Rol r ON u.Roles = r.id
      LEFT JOIN privilegios p ON u.id_privilegio = p.id
      LEFT JOIN priv_mod pm ON p.id = pm.id_privilegio
      LEFT JOIN modulos m ON pm.id_module = m.id
      WHERE u.Usuario = ?
      GROUP BY u.id, u.Usuario, u.Contraseña, r.Rol;
      `,
      [Usuario]
    );

    const usuarios = rows as Usuario[];

    if (usuarios.length === 0) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const user = usuarios[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(Contraseña, user.Contraseña);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    if (user.isTwoFactorEnabled) {
      // Porseguir con la autenticación de dos factores
      const token = await saveAuth2Factor(user.id);
      const accept_URL = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
      const reject_URL = `${process.env.NEXT_PUBLIC_APP_URL}/login`;
      const html = auth2FactorTemplate(accept_URL, reject_URL);
      await sendEmail(
        user.email,
        "Autenticación de dos factores",
        html
      );

      return NextResponse.json(
        { message: "Autenticación de dos factores requerida", isTwoFactorEnabled: true },
      );

    }

    // Convertir 'modules' en un array
    const modulesArray = typeof user.modules === 'string' ? user.modules.split(',') : [];

    // Generar un token JWT
    const token = generarToken(
      {
        id: user.id,
        Usuario: user.Usuario,
        rol: user.rol,
        modules: user.rol.toLowerCase() === "admin" ? modulesForAdmin : modulesArray,
      },
      '2m'
    );

    console.log(user);

    // Establecer la cookie del token
    const response = NextResponse.json({
      message: "Inicio de sesión exitoso",
      isTwoFactorEnabled: false,
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
  } catch (error: unknown) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
