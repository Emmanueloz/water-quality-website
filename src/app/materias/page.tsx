import FormMaterias from "@/components/FormMaterias";
import { getMaterias } from "@/app/materias/actions";
import Link from "next/link";
import { getUserToken } from "@/utils/getUserToken";
import TableMateria from "@/components/TableMateria";
import { MateriaProvider } from "@/context/MateriaContext";

export default async function MateriasPage() {
  const user = await getUserToken();

  const materias = await getMaterias(user.id);

  return (
    <main>
      <h1> Materias</h1>
      <MateriaProvider>
        <div>
          <p>Crear materia</p>
          <FormMaterias id_usuario={user.id} />
        </div>
        <div>
          <p>Lista materias</p>
          <TableMateria id_usuario={user.id} />
        </div>
      </MateriaProvider>
    </main>
  );
}
