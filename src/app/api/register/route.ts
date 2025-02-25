import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { LoginRequestBody, Usuario } from "../../../tipos/tipos";
import { ResultSetHeader } from "mysql2";
import { QuestionRecoverRepositoryImpl } from "@/infrastructure/repositories/QuestionRecoverRepositoryImpl";

const questionRecoverRepository = new QuestionRecoverRepositoryImpl();

export async function POST(req: NextRequest) {
  const { Usuario, Contraseña, acceptTerms, Email,question,answer }: LoginRequestBody & { Email: string } = await req.json(); // Añadimos Email

  console.log(acceptTerms, Email);  // Comprobamos que el email se reciba correctamente

  // Validar que los campos sean requeridos
  if (!Usuario || !Contraseña || !acceptTerms || !Email || !question || !answer) {
    return NextResponse.json(
      { message: "Usuario, contraseña, email y aceptar los términos son requeridos" },
      { status: 400 }
    );
  }

  let connection;

  try {
    // Conexión a la base de datos
    connection = db.getPool();

    const [existingUserRows] = await connection.execute(
      `SELECT * FROM Usuarios WHERE Usuario = ?`,
      [Usuario]
    );

    if ((existingUserRows as Usuario[]).length > 0) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(Contraseña);
    const userRoleId = 2;

    // Insertar el usuario junto con el correo electrónico
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO Usuarios (Usuario, Contraseña, Roles, id_privilegio, Email) VALUES (?, ?, ?, ?, ?)`,
      [Usuario, hashedPassword, userRoleId, 1, Email] // Incluimos el email
    );

    const newUser = {
      id: result.insertId,
      Usuario,
      Email, // Incluimos el email en la respuesta
    };

    await questionRecoverRepository.create({
      id:0,
      idUser: newUser.id,
      questionNum: question,
      answer,
    });



    return NextResponse.json({
      message: "Registro exitoso",
      usuario: newUser,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
