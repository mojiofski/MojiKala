"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const heroImages = [
  {
    id: "3",
    url: "/images/BitsWhite.png",
    title: "White Edition",
    desc: "asdsadadadadadadadsadsadadadadsadsadsadsadsadsadadsadsadadadaadadadaasda",
  },
  {
    id: "4",
    url: "/images/headphoneBits.png",
    title: "Classic Headphones",
    desc: "asdsadadadadadadadsadsadadadadsadsadsadsadsadsadadsadsadadadaadadadaasda",
  },
  {
    id: "5",
    url: "/images/headphoneBitsBlack.png",
    title: "Premium Black",
    desc: "asdsadadadadadadadsadsadadadadsadsadsadsadsadsadadsadsadadadaadadadaasda",
  },
];

const HeroSlider = () => {
  return (
    <div className="hidden lg:flex w-full max-w-[1000px] mx-auto h-[400px] bg-gray-300 rounded-lg overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {heroImages.map((item) => (
          <SwiperSlide key={item.id} className="relative flex items-center h-[400px] ">
            <div className="relative w-1/2 h-[400px] bg-red-200">
              <Link href={"/"}>
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-contain p-4 "
                />
              </Link>
            </div>
            <div className="w-1/2 h-full p-6 flex flex-col justify-center ">
              <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>
              <p className="text-gray-600 mt-2">
                تجربه‌ای متفاوت از کیفیت و طراحی با نسخه‌ی جدید هدفون‌های ما!
              </p>
              <Link href={"/shop"}>
                <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                  مشاهده محصولات
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
