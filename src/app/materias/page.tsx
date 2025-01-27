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
        <section className="flex flex-col lg:flex-row lg:justify-between  pt-2 px-4 gap-1">
          <article className=" lg:w-1/2 xl:w-2/5">
            <h2 className="text-xl font-semibold">Crear materia</h2>
            <FormMaterias id_usuario={user.id} />
          </article>
          <article className="lg:w-1/2">
            <h2 className="text-xl font-semibold">Lista materias</h2>
            <TableMateria id_usuario={user.id} />
          </article>
        </section>
      </MateriaProvider>
    </main>
  );
}
