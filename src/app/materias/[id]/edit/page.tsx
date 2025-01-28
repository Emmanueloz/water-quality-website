import FormMaterias from "@/components/FormMaterias";
import { getUserToken } from "@/utils/getUserToken";

export default async function MateriaEditPage() {
  const user = await getUserToken();

  return (
    <main className="p-4">
      <div className="m-auto lg:w-1/2 xl:w-2/5">
        <FormMaterias id_usuario={user.id} />
      </div>
    </main>
  );
}
