export default function Navbar() {
  return (
    <header className=" bg-cyan-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold w-full text-center md:w-auto md:text-start">
          Mi Sitio
        </h1>
        <nav className="hidden md:flex space-x-4">
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
  );
}
