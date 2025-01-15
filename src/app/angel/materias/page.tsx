import Link from 'next/link';

interface Materia {
    tag: string;
    nombre: string;
}

const materias: Materia[] = [
    { tag: "matematicas", nombre: "Matemáticas para ingeniería II" },
    { tag: "BD", nombre: "Administración de bases de datos" },
    { tag: "DW", nombre: "Desarrollo web profesional" },
    { tag: "POT", nombre: "Planeación y organización del trabajo" },
    { tag: "SDA", nombre: "Seguridad en el desarrollo de aplicaciones" },
    { tag: "ingles", nombre: "Inglés VII" }
];

const Page = () => {
    return (
        <div>
            <main className="flex-1 p-4">
                <h2 className="text-2xl font-bold mb-4">Materias</h2>
                <ul className="space-y-2">
                    {materias.map((materia, index) => (
                        <li key={materia.tag}>
                            <Link
                                href={`materias/${materia.tag}`}
                                className={`block py-2 px-4 rounded transition-colors
                                    ${index === 0 ? 'bg-cyan-100 hover:bg-cyan-200' : 'hover:bg-gray-200'}`}
                            >
                                {materia.nombre}
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default Page;