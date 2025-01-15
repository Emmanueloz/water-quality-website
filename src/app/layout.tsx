import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Breadcrumb from "@/components/Breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calidad del agua",
  description: "Aplicación para gestionar los datos de la calidad del agua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
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
          <Breadcrumb />
          <div className="flex flex-1 container mx-auto py-6">
            {/* Sidebar */}
            <aside className="w-1/4 bg-gray-50 p-4 border-r">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 bg-cyan-100 rounded hover:bg-cyan-200"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-200 rounded"
                  >
                    Configuración
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-200 rounded"
                  >
                    Ayuda
                  </a>
                </li>
              </ul>
            </aside>

            {/* Main Content */}

            {children}
          </div>

          {/* Footer */}
          <footer className="bg-cyan-500 text-white py-4">
            <div className="container mx-auto text-center">
              &copy; {new Date().getFullYear()} Mi Sitio. Todos los derechos
              reservados.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
