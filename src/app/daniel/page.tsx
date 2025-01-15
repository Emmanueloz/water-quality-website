import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
      {/* Card con redirecciones */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-sm mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Opciones</h3>
        <ul className="space-y-4">
          <li>
            <Link href="daniel/materias" className="block py-2 px-4 bg-cyan-100 text-cyan-800 rounded hover:bg-cyan-200 transition">
              Materias
            </Link>
          </li>
          <li>
            <Link href="daniel/juegos" className="block py-2 px-4 bg-cyan-100 text-cyan-800 rounded hover:bg-cyan-200 transition">
              Juegos
            </Link>
          </li>
          <li>
            <Link href="daniel/proyectos/" className="block py-2 px-4 bg-cyan-100 text-cyan-800 rounded hover:bg-cyan-200 transition">
              Proyectos
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
