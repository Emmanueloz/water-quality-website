import { getMateria } from "@/app/materias/actions";
import Materias from "@/components/materias";
import { getUserToken } from "@/utils/getUserToken";
import { notFound } from "next/navigation";

export default async function DetallesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user = await getUserToken();

  const materia = await getMateria(parseInt(id), user.id);

  if (!materia) {
    return notFound();
  }

  return (
    <div>
      <h1>Materias {id}</h1>
      {materia && <Materias materia={materia} tag={null} />}
    </div>
  );
}
