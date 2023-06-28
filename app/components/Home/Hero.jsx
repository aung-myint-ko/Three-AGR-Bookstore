"use client";
import React from "react";
import Image from "next/image";
import BookTemplate1 from "@/public-images/banner1.png";
import BookTemplate2 from "@/public-images/banner2.jpg";
import BookTemplate3 from "@/public-images/banner3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Hero = () => {
  return (
    <>
      <Swiper
        style={{
          "--swiper-pagination-color": "#FFA800",
        }}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-[250px] md:h-[400px] lg:h-[510px] "
      >
        <SwiperSlide className="  relative w-full h-[250px] md:h-[400px] lg:h-[510px]">
          <Image src={BookTemplate1} alt="book-store" fill priority />
        </SwiperSlide>
        <SwiperSlide className="  relative w-full h-[250px] md:h-[400px] lg:h-[510px]">
          <Image src={BookTemplate2} alt="book-store" fill priority />
        </SwiperSlide>
        <SwiperSlide className="  relative w-full h-[250px] md:h-[400px] lg:h-[510px]">
          <Image src={BookTemplate3} alt="book-store" fill priority />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Hero;
