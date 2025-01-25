import FormMaterias from "@/components/FormMaterias";
import { getMaterias } from "@/app/materias/actions";
import Link from "next/link";
import { getUserToken } from "@/utils/getUserToken";

export default async function MateriasPage() {
  const user = await getUserToken();

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
                  <Link href={`/materias/${materia.id}`}>Detalles</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
