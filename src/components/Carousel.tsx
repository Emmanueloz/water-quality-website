"use client"
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const items = [
    { id: 1, title: "Juegos", module: "games", image: "/img/juego.jpg" },
    { id: 2, title: "Materias", module: "profile", image: "/img/materia.jpg" },
    { id: 3, title: "Proyectos", module: "settings", image: "/img/proyecto.jpg" },
];

export default function Carousel() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="rounded-lg overflow-hidden"
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/${item.module}`}>
                            <div className="relative w-full h-[500px] flex items-center justify-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 bg-black/50 text-white p-4 w-full text-center">
                                    <h2 className="text-lg font-semibold text-white">
                                        {item.title}
                                    </h2>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
