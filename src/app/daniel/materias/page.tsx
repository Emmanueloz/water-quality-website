export default function Home() {
  return (
<main className="flex-1 p-4">
  <h2 className="text-2xl font-bold mb-4">Josué Daniel Sánchez Hernández</h2>

  {/* Card con opciones */}
  <div className="bg-white shadow-md rounded-lg p-6 mt-6 max-w-sm mx-auto">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Josue Daniel</h3>
    <ul className="space-y-4">
      <li>
        <a 
          href="#" 
          className="block py-2 px-4 bg-cyan-100 text-cyan-800 rounded hover:bg-cyan-200 transition"
        >
          Inglés
        </a>
      </li>
      <li>
        <a 
          href="#" 
          className="block py-2 px-4 bg-cyan-100 text-cyan-800 rounded hover:bg-cyan-200 transition"
        >
          Programación web
        </a>
      </li>
      <li>
        <a 
          href="#" 
          className="block py-2 px-4 bg-cyan-100 text-cyan-800 rounded hover:bg-cyan-200 transition"
        >
          Matemáticas
        </a>
      </li>
    </ul>
  </div>
</main>


  );
}
