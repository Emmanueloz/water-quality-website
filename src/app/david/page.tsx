import Link from "next/link";

export default function DavidPage() {
  // crear un error para probar el error page
  //throw new Error("Error en la página de David");
  return (
    <main className="m-5 w-full">
      <h2 className="text-2xl font-bold mb-4">David Emmanuel Ozuna Navarro</h2>
      <ul>
        <li>
          <Link
            className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            href="/david/materias"
          >
            Materias
          </Link>
        </li>
        <li>
          <Link
            className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            href="/david/juegos"
          >
            Juegos
          </Link>
        </li>
        <li>
          <Link
            className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            href="/david/proyectos"
          >
            Proyectos
          </Link>
        </li>
      </ul>
    </main>
  );
}
