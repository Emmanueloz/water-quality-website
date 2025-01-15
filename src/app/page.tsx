export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-cyan-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mi Sitio</h1>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">
              Inicio
            </a>
            <a href="#" className="hover:underline">
              Acerca de
            </a>
            <a href="#" className="hover:underline">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="bg-gray-100 py-3">
        <div className="container mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="#" className="text-cyan-700 hover:underline">
                Inicio
              </a>
            </li>
            <li>/</li>
            <li>Página Actual</li>
          </ol>
        </div>
      </nav>

      {/* Layout */}
      <div className="flex flex-1 container mx-auto py-6">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-50 p-4 border-r">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
              >
                Josue
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded">
                Angel
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded">
                David
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded">
                Raul
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Bienvenido</h2>
          <p>
            Este es el contenido principal de tu página. Aquí puedes agregar
            cualquier cosa que desees mostrar al usuario.
          </p>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-cyan-500 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} Mi Sitio. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
}
