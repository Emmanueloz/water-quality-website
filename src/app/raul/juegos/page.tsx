import Link from "next/link";

export default function JuegosPage() {

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Raul</h1>
        <ul>
          <li>
            <Link href="/raul/juegos/warzone">Warzone</Link>
          </li>
          <li>
            <Link href="/raul/juegos/ajedrez">Ajedrez</Link>
          </li>
          <li>
            <Link href="/raul/juegos/fornite">Fornite</Link>
          </li>
          <li>
            <Link href="/raul/juegos/uno">Uno</Link>
          </li>
        </ul>
      </div>
    );
  }