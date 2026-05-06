"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { FaRegNewspaper } from 'react-icons/fa6';

const news = [
  {
    id: 1,
    title: "Accréditation ISO 15189 du Centre de Biologie Al Wifak",
    date: "23-12-2023",
    description: "Nous sommes fiers d’annoncer que le Centre de Biologie Al Wifak vient d’être accrédité selon la norme internationale ISO 15189.",
    image: "/CBW/images/news_1.png"
  },
  {
    id: 2,
    title: "Disponibilité du test de la serologie de la Rougeole",
    date: "07-02-2025",
    description: "La rougeole est une maladie virale très contagieuse et grave qui se transmet par voie aérienne et qui peut entraîner des complications.",
    image: "/CBW/images/news_2.png"
  },
  {
    id: 3,
    title: "Engagement qualité confirmé",
    date: "08-06-2023",
    description: "Premier laboratoire certifié ISO9001 dans la ville de Témara, Le Centre de Biologie Al Wifak a réussi brillamment son audit.",
    image: "/CBW/images/news_3.png"
  }
];

export default function NewsSlider() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-theme-sm overflow-hidden h-full flex flex-col min-h-[400px]">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <FaRegNewspaper className="text-[#8dc549] text-lg" />
        <h3 className="font-bold text-gray-800 dark:text-white uppercase tracking-wide">Actualités</h3>
      </div>
      <div className="flex-1 relative p-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-full rounded-xl pb-10"
          style={{
             "--swiper-theme-color": "#8dc549",
             "--swiper-navigation-size": "20px",
          } as any}
        >
          {news.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="relative h-40 w-full shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <span className="text-xs font-semibold text-[#8dc549] mb-2">{item.date}</span>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
