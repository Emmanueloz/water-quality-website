import Link from 'next/link'
const Page = () => {
    return (
        <div>
            <main className="flex-1 p-4">
            <h2 className="text-2xl font-bold mb-4">Ángel</h2>
            <p>
            <ul className="space-y-2">
            <li>
                <Link href='/angel/materias' className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200">
                Materias
                </Link>
            </li>
            <li>
            <Link href="/angel/juegos" className="block py-2 px-4 hover:bg-gray-200 rounded">
                Juegos
            </Link>
            </li>
            <li>
            <Link href="/angel/proyectos" className="block py-2 px-4 hover:bg-gray-200 rounded">
                Proyectos
            </Link>
            </li>
          </ul>
            </p>
        </main>
        </div>
    );
}


export default Page;