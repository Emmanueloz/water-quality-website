export default function Footer() {
  return (
    <footer className="bg-cyan-500 text-white py-4">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Mi Sitio. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
