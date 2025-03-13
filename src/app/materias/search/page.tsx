import AdvancedSearch from "@/components/AdvancedSearch";
import TableMateria from "@/components/TableMateria";
import { isHavePermissionInToken } from "@/utils/getUserToken";
import { notFound } from "next/navigation";

export default async function Page() {
  const isHavePermission = await isHavePermissionInToken(1, "read");

  if (!isHavePermission) {
    return notFound();
  }

  return (
    <main className="p-4">
      <AdvancedSearch />
      <TableMateria isSearch={true} />
    </main>
  );
}
