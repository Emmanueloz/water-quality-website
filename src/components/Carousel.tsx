"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

type CarouselProps = {
  modules: string[];
};

const items = [
  { id: 1, title: "Juegos", module: "games", image: "/img/juego.jpg" },
  { id: 2, title: "Materias", module: "materias", image: "/img/materia.jpg" },
  {
    id: 3,
    title: "Proyectos",
    module: "proyectos",
    image: "/img/proyecto.jpg",
  },
];

const Carousel = ({ modules }: CarouselProps) => {
  const itemsAlloweds = items.filter((item) => modules.includes(item.module));

  return (
    <div className="w-full max-w-4xl mx-auto px-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        effect="fade"
        loop
        className="rounded-lg overflow-hidden"
      >
        {itemsAlloweds.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/${item.module}`} className="block">
              <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[55vh] flex items-center justify-center group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-0 bg-black/60 text-white p-3 sm:p-4 md:p-5 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h2 className="text-sm sm:text-lg md:text-xl font-bold">
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
};

export default Carousel;
