import Link from "next/link";

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
  { tag: "ingles", nombre: "Inglés VII" },
];

export default function MateriasPage() {
  return (
    <main className="m-5 w-full">
      <h2 className="text-2xl font-bold mb-4">Materias</h2>
      <ol className="list-decimal m-4">
        {materias.map((materia, index) => (
          <li key={materia.tag}>
            <Link href={`materias/${materia.tag}`}>{materia.nombre}</Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
