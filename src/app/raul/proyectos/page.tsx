interface proyectos {
  name: string;
}

const proyectos: proyectos[] = [
  { name: "Módulo integral de seguridad y acceso" },
  { name: "Evalacion docente de la UDM" },
  { name: "Agencia Aleman" }
];

const Page = () => {
    return (
        <div>
            <main className="flex-1 p-4">
            <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
            <p>
            <ul className="space-y-2">
            {proyectos.map((proyecto, index) => (
              <li key={proyecto.name}>
                <a
                  href="#"
                  className={`block py-2 px-4 rounded transition-colors
                    ${index === 0 ? 'bg-cyan-100 hover:bg-cyan-200' : 'hover:bg-gray-200'}`}
                >
                  {proyecto.name}
                </a>
              </li>
            ))}
          </ul>
            </p>
        </main>
        </div>
    );
}


export default Page;