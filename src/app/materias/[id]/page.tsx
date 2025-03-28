import { getMateria } from "@/app/materias/actions";
import { ButtonDeleteMateria } from "@/components/ButtonDeleteMateria";
import Materias from "@/components/materias";
import { getUserToken, isHavePermissionInToken } from "@/utils/getUserToken";
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

  const isHavePermission = await isHavePermissionInToken(1, "read");

  if (!materia || !isHavePermission) {
    return notFound();
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">Detalles de la materia</h1>

      {materia && <Materias materia={materia} tag={null} />}
    </main>
  );
}
