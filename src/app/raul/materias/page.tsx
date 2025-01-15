import Link from "next/link";

export default function MateriasPage() {

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Raul</h1>
        <ul>
          <li>
            <Link href="/raul/materias/matematicas">Matemáticas para ingeniería II</Link>
          </li>
          <li>
            <Link href="/raul/materias/administracion">Administración de bases de datos</Link>
          </li>
          <li>
            <Link href="/raul/materias/desarrollo">Desarrollo web profesional</Link>
          </li>
          <li>
            <Link href="/raul/materias/planeamiento">Planeamiento y organización del trabajo</Link>
          </li>
          <li>
            <Link href="/raul/materias/seguridad">Seguridad en el desarrollo de aplicaciones</Link>
          </li>
          <li>
            <Link href="/raul/materias/diseño">Diseño web profesional</Link>
          </li>
        </ul>
      </div>
    );
  }