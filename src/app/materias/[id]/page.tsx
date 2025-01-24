import { getMateria } from "@/app/materias/actions";
import Materias from "@/components/materias";

export default async function DetallesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const materia = await getMateria(parseInt(id), 1);

  return (
    <div>
      <h1>Materias {id}</h1>
      {materia && <Materias materia={materia} tag={null} />}
    </div>
  );
}
