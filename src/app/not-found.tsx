import React from 'react';
import Link from 'next/link';

const Page404 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4 overflow-hidden">
            <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
                <div className="relative">
                    <div className="relative">
                        <h1 className="text-9xl font-bold text-slate-200 motion-safe:animate-pulse">
                            4
                            <span className="inline-block motion-safe:animate-bounce">0</span>
                            4
                        </h1>
                        <div className="absolute -top-8 -right-8 w-16 h-16 motion-safe:animate-spin">
                            <div className="w-full h-full border-4 border-blue-500 rounded-full border-t-transparent" />
                        </div>
                        <div className="absolute -bottom-4 -left-8 w-12 h-12 motion-safe:animate-spin">
                            <div className="w-full h-full border-4 border-blue-300 rounded-full border-t-transparent" />
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xl md:text-2xl font-medium text-slate-600 bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                            ¡Oops! Página no encontrada
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-slate-600 text-lg">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>
                    <p className="text-slate-500">
                        Por favor, verifica la URL o utiliza una de las siguientes opciones:
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <Link
                        href="/"
                        className="group px-6 py-3 bg-blue-600 text-white rounded-lg font-medium 
                     hover:bg-blue-700 hover:scale-105 transition-all duration-300 
                     shadow-lg hover:shadow-xl min-w-[200px] relative overflow-hidden"
                    >
                        Volver al inicio
                    </Link>
                </div>

                <div className="text-slate-400 text-sm mt-8">
                    <p>Si crees que esto es un error, por favor</p>
                    <Link
                        href="/contacto"
                        className="text-blue-500 hover:text-blue-600 underline hover:scale-105 
                     inline-block transition-transform duration-200"
                    >
                        contáctanos
                    </Link>
                </div>
            </div>

            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className={`absolute w-2 h-2 bg-blue-500/20 rounded-full animate-pulse
                     ${i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                    }}
                />
            ))}
        </div>
    );
};

export default Page404;