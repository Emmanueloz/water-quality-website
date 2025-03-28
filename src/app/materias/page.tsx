import FormMaterias from "@/components/FormMaterias";
import Link from "next/link";
import { getUserToken } from "@/utils/getUserToken";
import GridMaterias from "@/components/GridMaterias";
import ModalFormMaterias from "@/components/ModalFormMateria"; // Importa el componente ModalFormMaterias

export default async function MateriasPage() {
  const user = await getUserToken();

  const permissions = user.modulesPermissions.find((m) => m.idRoute === 1);

  return (
    <main>
      <section className="container mx-auto flex flex-col items-center justify-center p-4">
        {(user.rol.toLowerCase() === "admin" ||
          permissions?.permissions.includes("create")) && (
          <ModalFormMaterias id_usuario={user.id} />
        )}

        {(user.rol.toLowerCase() === "admin" ||
          permissions?.permissions.includes("read")) && (
          <article className="w-full">
            <div className="flex justify-between mb-2">
              <h2 className="text-xl font-semibold">Lista materias</h2>
              <Link href="/materias/search">
                <button className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-300">
                  Búsqueda avanzada
                </button>
              </Link>
            </div>
            <GridMaterias />
          </article>
        )}
      </section>
    </main>
  );
}
