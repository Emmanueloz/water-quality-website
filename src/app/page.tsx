import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
        <p>
          Este es el contenido principal de tu página. Aquí puedes agregar
          cualquier cosa que desees mostrar al usuario.
        </p>
        <ol className="list-decimal m-4">
          <li>
            <Link href="/david">David</Link>
          </li>
        </ol>
      </main>
    </>
  );
}
