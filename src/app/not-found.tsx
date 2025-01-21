export default function NotFoundPage() {
  return (
    <main className="flex flex-col h-full justify-center items-center">
      <p className="text-5xl font-bold mb-4 text-cyan-500">Error 404</p>
      <h1 className="text-3xl font-bold mb-4">La página no encontrada</h1>
      <p className="text-lg">
        Lo sentimos, la página que estabas buscando no existe.
      </p>
    </main>
  );
}
