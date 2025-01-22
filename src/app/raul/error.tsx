"use client"
export default function ErrorPage({ error, reset}: { error: Error; reset: () => void;}) {

  console.log("ErrorPage", error.message);
  
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 text-gray-800 font-sans">
        <h1 className="text-4xl font-bold text-teal-500 mb-4">
          Error 500
        </h1>
        <p className="text-lg mb-6">
          ¡Ups! Algo salió mal en el servidor.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-colors"
        >
          Volver a la página principal
        </a>
      </main>
    );
  }
  