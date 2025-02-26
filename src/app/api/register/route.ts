import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import { LoginRequestBody, Usuario } from "../../../tipos/tipos";
import { ResultSetHeader } from "mysql2";
import { QuestionRecoverRepositoryImpl } from "@/infrastructure/repositories/QuestionRecoverRepositoryImpl";
import { a, p } from "framer-motion/client";

const questionRecoverRepository = new QuestionRecoverRepositoryImpl();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const {
    Usuario,
    Contraseña,
    acceptTerms,
    Email,
    phone,
    answers,
  }: LoginRequestBody & { Email: string } = data; // Añadimos Email

  console.log(data);
  console.log(phone,answers);
  console.log(
    Usuario,
    Contraseña,
    acceptTerms,
    Email,
    phone,
    answers,
    
  );
  
  // Validar que los campos sean requeridos
  if (
    !Usuario ||
    !Contraseña ||
    !acceptTerms ||
    !Email ||
    !phone ||
    !answers
  ) {
    return NextResponse.json(
      {
        message:
          "Usuario, contraseña, email y aceptar los términos son requeridos",
      },
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
 
    await questionRecoverRepository.create(newUser.id, answers);

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
