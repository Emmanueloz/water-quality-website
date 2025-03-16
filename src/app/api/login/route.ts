import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import bcrypt from "bcryptjs";
import { generarToken } from "../../../lib/jwt";
import { LoginRequestBody, Usuario } from "../../../tipos/tipos";
import { MultiSessionsRepositoryImpl } from "@/infrastructure/repositories/MultiSessionsRepositoryImpl";
import { saveAuth2Factor } from "@/utils/optsAuth2Factor";
import sendEmail from "@/lib/mail";
import { auth2FactorTemplate } from "@/lib/templates/auth2Factor";

const modulesForAdmin = [
  "users",
  "materias",
  "privilegios",
  "proyectos",
  "games",
];

const multiSessionsRepository = new MultiSessionsRepositoryImpl();

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
        COALESCE(GROUP_CONCAT(m.name SEPARATOR ','), '') AS modules,
        JSON_ARRAYAGG(
                JSON_OBJECT('idRoute', up.module_id, 'permissions',  up.permissions)
                ) AS modulesPermissions
      FROM Usuarios u
      INNER JOIN Rol r ON u.Roles = r.id
      LEFT JOIN user_permissions up ON u.id = up.user_id
      LEFT JOIN modulos m ON up.module_id = m.id
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
      await sendEmail(user.email, "Autenticación de dos factores", html);

      return NextResponse.json({
        message: "Autenticación de dos factores requerida",
        isTwoFactorEnabled: true,
      });
    }

    // Convertir 'modules' en un array
    const modulesArray =
      typeof user.modules === "string" ? user.modules.split(",") : [];

    const permissions =
      typeof user.modulesPermissions === "string"
        ? JSON.parse(user.modulesPermissions)
        : user.modulesPermissions;

    const modulesPermissions = permissions.map((permission: any) => {
      return {
        idRoute: permission.idRoute,
        permissions: permission.permissions
          ? permission.permissions.split(",")
          : [],
      };
    });

    console.log(modulesPermissions);

    // Generar un token JWT
    const token = generarToken(
      {
        id: user.id,
        Usuario: user.Usuario,
        rol: user.rol,
        modules:
          user.rol.toLowerCase() === "admin" ? modulesForAdmin : modulesArray,
        modulesPermissions: modulesPermissions,
      },
      "20m"
    );

    await multiSessionsRepository.create({
      id: 0,
      userAgent: req.headers.get("user-agent") || "",
      xForwardedFor: req.headers.get("x-forwarded-for") || "",
      userId: user.id,
      token,
      createdAt: new Date(),
    });

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
        modulesPermissions: modulesPermissions,
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
