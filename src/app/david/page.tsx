import Link from "next/link";

export default function DavidPage() {
  return (
    <>
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">
          David Emmanuel Ozuna Navarro
        </h2>
        <ul>
          <Link href="/david/materias">Materias</Link>
          <Link href="/david/juegos">Juegos</Link>
          <Link href="/david/proyectos">Proyectos</Link>
        </ul>
      </main>
    </>
  );
}
