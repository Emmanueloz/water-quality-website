"use client";

import React from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
            <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
                <div className="relative">
                    <div className="relative">
                        <h1 className="text-8xl md:text-9xl font-bold text-gray-300 motion-safe:animate-pulse">
                            5
                            <span className="inline-block motion-safe:animate-bounce">0</span>
                            0
                        </h1>
                        <div className="absolute -top-8 -right-8 w-16 h-16 motion-safe:animate-spin">
                            <div className="w-full h-full border-4 border-red-500 rounded-full border-t-transparent" />
                        </div>
                        <div className="absolute -bottom-4 -left-8 w-12 h-12 motion-safe:animate-spin">
                            <div className="w-full h-full border-4 border-red-300 rounded-full border-t-transparent" />
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xl md:text-2xl font-medium text-gray-700 bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                            ¡Error en el servidor!
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-600 text-lg">
                        Hemos encontrado un problema inesperado. Por favor, intenta recargar la página.
                    </p>
                    <p className="text-gray-500 italic">
                        Detalles del error: <span className="font-semibold">{error.message}</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <button
                        onClick={reset}
                        className="group px-6 py-3 bg-red-600 text-white rounded-lg font-medium 
              hover:bg-red-700 hover:scale-105 transition-all duration-300 
              shadow-lg hover:shadow-xl min-w-[200px] relative overflow-hidden"
                    >
                        Recargar página
                    </button>
                    <Link
                        href="/"
                        className="group px-6 py-3 bg-gray-700 text-white rounded-lg font-medium 
              hover:bg-gray-800 hover:scale-105 transition-all duration-300 
              shadow-lg hover:shadow-xl min-w-[200px] relative overflow-hidden"
                    >
                        Volver al inicio
                    </Link>
                </div>

                <div className="text-gray-400 text-sm mt-8">
                    <p>Si el problema persiste, por favor</p>
                    <Link
                        href="/contacto"
                        className="text-red-500 hover:text-red-600 underline hover:scale-105 
              inline-block transition-transform duration-200"
                    >
                        contáctanos
                    </Link>
                </div>
            </div>

            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className={`absolute w-2 h-2 bg-red-500/20 rounded-full animate-pulse
            ${i % 2 === 0 ? "animate-bounce" : "animate-pulse"}`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    );
}
