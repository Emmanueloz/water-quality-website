import Link from 'next/link'
import { NextResponse } from 'next/server';
const Page = () => {
  return NextResponse.json({},{status:500})

    return (
        <div>
            <main className="flex-1 p-4">
            <h2 className="text-2xl font-bold mb-4">Raúl de Jesús Nájera Jiménez</h2>
            <ul className="space-y-2">
            <li>
                <Link href='/raul/materias' className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200">
                Materias
                </Link>
            </li>
            <li>
            <Link href="/raul/juegos" className="block py-2 px-4 hover:bg-gray-200 rounded">
                Juegos
            </Link>
            </li>
            <li>
            <Link href="/raul/proyectos" className="block py-2 px-4 hover:bg-gray-200 rounded">
                Proyectos
            </Link>
            </li>
          </ul>
        </main>
        </div>
    );
}


export default Page;