"use client";
const heroImages = [
  {
    id: "1",
    url: "/images/iphone_12_pro_apple-wallpaper-1366x768.jpg",
  },
  {
    url: "/images/iphone_14_pro_gold_smartphone-wallpaper-1366x768.jpg",
    id: "2",
  },
  {
    id: "3",
    url: "/images/apple_iphone_14_pro_smartphone-wallpaper-1366x768.jpg",
  },
  {
    id: "4",
    url: "/images/iphone_14_pro_white_smartphone-wallpaper-1366x768.jpg",
  },
  {
    id: "5",
    url: "/images/samsung_galaxy_s23_and_s23_plus_smartphones-wallpaper-1366x768.jpg",
  },
];

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const SliderHero = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="hidden lg:flex flex-col w-full ">
      <Slider {...settings}>
        {heroImages.map((src, index) => (
          <div key={index} className="relative w-full h-[400px]">
            <Image
              src={src.url}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderHero;
