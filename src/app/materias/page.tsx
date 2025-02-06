import FormMaterias from "@/components/FormMaterias";
import { getMaterias } from "@/app/materias/actions";
import Link from "next/link";
import { getUserToken } from "@/utils/getUserToken";
import TableMateria from "@/components/TableMateria";

export default async function MateriasPage() {
  const user = await getUserToken();

  return (
    <main>
      <section className="flex flex-col lg:flex-row lg:justify-between pt-2 px-4 gap-1">
        <article className=" lg:w-1/2 xl:w-2/5">
          <h2 className="text-xl font-semibold">Crear materia</h2>
          <FormMaterias id_usuario={user.id} />
        </article>
        <article className="lg:w-1/2">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-semibold">Lista materias</h2>
            <Link href="/materias/search">
              <button className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-300">
                Búsqueda avanzada
              </button>
            </Link>
          </div>
          <TableMateria id_usuario={user.id} />
        </article>
      </section>
    </main>
  );
}
