import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Breadcrumb from "@/components/Breadcrumb";
import HamburgerMenu from "@/components/HamburgerMenu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthProvider";
import { MateriaProvider } from "@/context/MateriaContext";
import { RootProvider } from "@/context/RootProvider";
import AuthChecker from "@/components/AuthChecker"; // Nuevo componente

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
          <RootProvider>
            <AuthProvider>
              {" "}
              {/* Asegúrate de que AuthProvider esté aquí */}
              <AuthChecker /> {/* Componente de verificación */}
              <div className="flex flex-1">
                <HamburgerMenu />
                <div className="flex flex-col w-full">
                  <Navbar />
                  <Breadcrumb />
                  <MateriaProvider>{children}</MateriaProvider>
                </div>
              </div>
              <Footer />
            </AuthProvider>
          </RootProvider>
        </div>
      </body>
    </html>
  );
}
