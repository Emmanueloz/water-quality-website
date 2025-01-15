import Link from "next/link";

export default function JuegosPage() {

    return (
      <div>
      <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Juegos</h2>
          <p>
          <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            >
              Warzone
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            >
              GTA V
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            >
              Minecraft
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            >
              Fornite
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            >
              Red dead redemtion 2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
            >
              Cuphead
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200">
              Gear of War(saga)
            </a>
          </li>
          
          </ul>
          </p>
      </main>
      </div>

      
    );
  }

