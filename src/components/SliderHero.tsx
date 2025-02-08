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
    id: "1",
    url: "/images/BitsWhite.png",
    title: "White Edition",
    desc: "A different experience of quality and design with the new version of our headphones!",
  },
  {
    id: "2",
    url: "/images/headphoneBits.png",
    title: "Classic Headphones",
    desc: "A different experience of quality and design with the new version of our headphones!",
  },
  {
    id: "3",
    url: "/images/headphoneBitsBlack.png",
    title: "Premium Black",
    desc: "A different experience of quality and design with the new version of our headphones!",
  },
  {
    id: "4",
    url: "/images/SoloRedBits.png",
    title: "Premium Red",
    desc: "A different experience of quality and design with the new version of our headphones!",
  },
];

const HeroSlider = () => {
  return (
    <div className="hidden lg:flex w-full h-[400px] bg-gray-200 overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        navigation={false}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {heroImages.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex items-center h-[400px]">
              {/* Image Container */}
              <div className="w-1/2 h-full">
                <Link href={"/"}>
                  <div className="relative w-full h-full">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      sizes="100%"
                      className="object-contain p-4 "
                      priority
                    />
                  </div>
                </Link>
              </div>
              {/* Text Container */}
              <div className="w-1/2 h-full p-6 flex flex-col justify-center items-center ">
                <h1 className="text-4xl font-bold text-gray-800">
                  {item.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2">{item.desc}</p>
                <Link href={"/shop"}>
                  <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
