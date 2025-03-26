const Page = () => {
  // throw new Error("Not implemented");
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
                Halo infinite
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-200 rounded">
                Banana Kong
              </a>
            </li>

          </ul>
        </p>
      </main>
    </div>
  );
}


export default Page;