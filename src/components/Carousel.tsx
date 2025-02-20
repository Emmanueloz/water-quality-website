"use client"
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

type CarouselProps = {
    modules: string[];
}

const items = [
    { id: 1, title: "Juegos", module: "games", image: "/public/img/juego.jpg" },
    { id: 2, title: "Materias", module: "materias", image: "/img/materia.jpg" },
    { id: 3, title: "Proyectos", module: "proyectos", image: "/img/proyecto.jpg" },
];

const Carousel = ({ modules }: CarouselProps) => {
    const itemsAlloweds = items.filter(item => modules.includes(item.module));

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
                {itemsAlloweds.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/${item.module}`}>
                            <div className="relative w-full h-[500px] flex items-center justify-center group">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 bg-black/50 text-white p-4 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                                </div>
                            </div>

                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}


export default Carousel;