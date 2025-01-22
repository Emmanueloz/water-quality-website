"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log("ErrorPage", error.message);

  const handleGoBack = () => {
    window.history.back();  // Regresa a la página anterior
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <div className="flex flex-col items-center max-w-lg p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <div className="p-4 bg-red-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 4.418-3.582 8-8 8S2 14.418 2 10 5.582 2 10 2s8 3.582 8 8zm-8-3a1 1 0 00-1 1v2a1 1 0 102 0V8a1 1 0 00-1-1zm-1 6a1 1 0 102 0 1 1 0 00-2 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold mt-6 mb-4">Error en el servidor</h1>
        <p className="text-gray-300 text-center text-lg">
          Ocurrió un error inesperado. Estamos trabajando para solucionarlo. Por
          favor, intenta nuevamente más tarde.
        </p>
        <button
          className="mt-6 px-6 py-2 text-lg font-medium bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-lg"
          onClick={handleGoBack}
        >
          Volver a la Página Anterior
        </button>
      </div>
    </main>
  );
}
