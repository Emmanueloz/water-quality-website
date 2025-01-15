import Link from "next/link";

export default function RaulPage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Raul</h1>
      <ul>
        <li>
          <Link href="/raul/juegos">Juegos</Link>
        </li>
        <li>
          <Link href="/raul/materias">Materias</Link>
        </li>
        <li>
          <Link href="/raul/proyectos">Proyectos</Link>
        </li>
      </ul>
    </div>
  );
}