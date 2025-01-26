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
      <MateriaProvider>
        <section className="md:flex md:justify-between pt-10 px-4 gap-1">
          <article className="md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold">Crear materia</h2>
            <FormMaterias id_usuario={user.id} />
          </article>
          <article className="md:w-1/2 lg:w-2/3">
            <h2 className="text-xl font-semibold">Lista materias</h2>
            <TableMateria id_usuario={user.id} />
          </article>
        </section>
      </MateriaProvider>
    </main>
  );
}
