import Link from "next/link";

export default function ProyectosPage() {

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Raul</h1>
        <ul>
          <li>
            <Link href="/raul/proyectos/udm">UDM</Link>
          </li>
          <li>
            <Link href="/raul/proyectos/estadia">Estadia</Link>
          </li>
          <li>
            <Link href="/raul/proyectos/agencia">Agencia Aleman</Link>
          </li>
        </ul>
      </div>
    );
  }
  