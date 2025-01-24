import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import FormMaterias from "@/components/FormMaterias";

export default async function MateriasPage() {
  const result = await cookies();

  const auth_token = result.get("auth_token")?.value ?? "";

  const user_decode = jwt.decode(auth_token);

  const user = user_decode as { id: number; nombre: string; email: string };

  return (
    <main>
      <h1> Materias</h1>
      <div>
        <p>Crear materia</p>
        <FormMaterias id_usuario={user.id} />
      </div>
      <div>
        <p>Lista materias</p>
      </div>
    </main>
  );
}
