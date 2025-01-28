import FormMaterias from "@/components/FormMaterias";
import { getUserToken } from "@/utils/getUserToken";
import { getMateria } from "../../actions";

export default async function MateriaEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const idParam = (await params).id;
  const id = parseInt(idParam);

  const user = await getUserToken();

  const materia = await getMateria(id, user.id);

  console.log(id);

  return (
    <main className="p-4">
      <div className="m-auto lg:w-1/2 xl:w-2/5">
        <FormMaterias id_usuario={user.id} materia={materia} />
      </div>
    </main>
  );
}
