import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Breadcrumb from "@/components/Breadcrumb";
import HamburgerMenu from "@/components/HamburgerMenu";

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
          <div className="flex flex-1">
            <HamburgerMenu />
            <div className="flex flex-col w-full">
              <header className="bg-cyan-500 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                  <h1 className="text-2xl font-bold">Mi Sitio</h1>
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
              <Breadcrumb />
              <main className="flex-1">{children}</main>
            </div>
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
