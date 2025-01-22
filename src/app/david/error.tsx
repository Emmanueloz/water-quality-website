"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log("ErrorPage", error.message);

  return (
    <main className="flex flex-col h-full justify-center items-center">
      <h1 className="text-5xl font-bold mb-4 text-cyan-500">
        Error en el servidor
      </h1>
      <p className="text-lg">
        Lo sentimos, ocurrió un error en el servidor. Por favor, inténtalo mas
        tarde.
      </p>
      <Link
        className="mt-8 py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
        href="/"
      >
        Regresar
      </Link>
    </main>
  );
}
