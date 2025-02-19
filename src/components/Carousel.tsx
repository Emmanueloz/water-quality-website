"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

type CarouselProps = {
    modules: string[];
};

const items = [
    { id: 1, title: "Juegos", module: "games", image: "/img/juego.jpg" },
    { id: 2, title: "Materias", module: "materias", image: "/img/materia.jpg" },
    { id: 3, title: "Proyectos", module: "proyectos", image: "/img/proyecto.jpg" },
];

const Carousel = ({ modules }: CarouselProps) => {
    const newModules = items.filter(item => modules.includes(item.module));

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                effect="fade"
                className="rounded-lg overflow-hidden"
            >
                {newModules.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/${item.module}`}>
                            <motion.div
                                className="relative w-full h-[500px] flex items-center justify-center group overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.div
                                    className="absolute bottom-0 bg-black/60 text-white p-4 w-full text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                </motion.div>
                            </motion.div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
