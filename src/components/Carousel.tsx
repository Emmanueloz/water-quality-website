"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const items = [
    { id: 1, title: "Juegos", image: "/img/Juegos.jpg" }, // Usa la ruta relativa
    { id: 2, title: "Materias", image: "/img/materia.jpg" },
    { id: 3, title: "Proyectos", image: "/img/proyecto.jpg" },

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
                <div className="relative w-full h-[500px] flex items-center justify-center"> {/* Aumenté la altura */}
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 bg-black/50 text-white p-4 w-full text-center">
                        {item.title}
                    </div>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
}