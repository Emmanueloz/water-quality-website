import { getMateria } from "@/app/materias/actions";
import { ButtonDeleteMateria } from "@/components/ButtonDeleteMateria";
import Materias from "@/components/materias";
import { getUserToken } from "@/utils/getUserToken";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetallesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user = await getUserToken();

  const materia = await getMateria(parseInt(id), user.id);

  const permissions = user.modulesPermissions.find((m) => m.idRoute === 1);

  if (!materia) {
    return notFound();
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">Detalles de la materia</h1>
      <div className="p-2 flex justify-around">
        {(user.rol.toLowerCase() === "admin" ||
          permissions?.permissions.includes("update")) && (
          <Link
            className="p-2 border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors duration-300  "
            href={`/materias/${materia.id}/edit`}
          >
            Editar
          </Link>
        )}
        {(user.rol.toLowerCase() === "admin" ||
          permissions?.permissions.includes("delete")) && (
          <ButtonDeleteMateria materia={materia} />
        )}
      </div>
      {materia && <Materias materia={materia} tag={null} />}
    </main>
  );
}
