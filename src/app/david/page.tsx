import Link from "next/link";

export default function DavidPage() {
  return (
    <main className="m-5 w-full">
      <h2 className="text-2xl font-bold mb-4">David Emmanuel Ozuna Navarro</h2>
      <ul className="list-disc">
        <li>
          <Link className="text-cyan-500" href="/david/materias">
            Materias
          </Link>
        </li>
        <li>
          <Link className="text-cyan-500" href="/david/juegos">
            Juegos
          </Link>
        </li>
        <li>
          <Link className="text-cyan-500" href="/david/proyectos">
            Proyectos
          </Link>
        </li>
      </ul>
    </main>
  );
}
