import AdvancedSearch from "@/components/AdvancedSearch";
import TableMateria from "@/components/TableMateria";

export default function Page() {
  return (
    <main className="p-4">
      <AdvancedSearch />
      <TableMateria isSearch={true} />
    </main>
  );
}
