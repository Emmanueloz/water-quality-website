import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import FormMaterias from "@/components/FormMaterias";
import { getMaterias } from "@/app/materias/actions";

export default async function MateriasPage() {
  const result = await cookies();

  const auth_token = result.get("auth_token")?.value ?? "";

  const user_decode = jwt.decode(auth_token);

  const user = user_decode as { id: number; nombre: string; email: string };

  const materias = await getMaterias(user.id);

  return (
    <main>
      <h1> Materias</h1>
      <div>
        <p>Crear materia</p>
        <FormMaterias id_usuario={user.id} />
      </div>
      <div>
        <p>Lista materias</p>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Maestro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.nombre}</td>
                <td>{materia.maestro}</td>
                <td>
                  <button>Editar</button>
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
