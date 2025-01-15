import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
        <p>Integrantes del equipo:</p>
        <ol className="list-decimal m-4">
          <li className="text-decoration-line-through">
            <Link className="hover:underline" href="/david">
              David
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/angel">
              Angel
            </Link>
          </li>
        </ol>
      </main>
    </>
  );
}
