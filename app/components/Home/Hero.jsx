"use client";
import React from "react";
import Image from "next/image";
import BookTemplate1 from "@/public-images/banner1.jpg";
import BookTemplate1Mb from "@/public-images/banner1-mb.jpg";

import BookTemplate2 from "@/public-images/banner2.jpg";
import BookTemplate2Mb from "@/public-images/banner2-mb.jpg";

import BookTemplate3 from "@/public-images/banner3.jpg";
import BookTemplate3Mb from "@/public-images/banner3-mb.jpg";

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
        className="w-full h-[300px] sm:h-[400px] lg:h-[510px] "
      >
        <SwiperSlide className="  relative w-full h-[300px] sm:h-[400px] lg:h-[510px]">
          <Image
            src={BookTemplate1}
            className={` hidden sm:block`}
            alt="book-store"
            fill
            priority
          />
          <Image
            src={BookTemplate1Mb}
            className={` block sm:hidden`}
            alt="book-store"
            fill
            priority
          />
        </SwiperSlide>
        <SwiperSlide className="  relative w-full h-[300px] sm:h-[400px] lg:h-[510px]">
          <Image
            src={BookTemplate2}
            className={` hidden sm:block`}
            alt="book-store"
            fill
            priority
          />
          <Image
            src={BookTemplate2Mb}
            className={` block sm:hidden`}
            alt="book-store"
            fill
            priority
          />
        </SwiperSlide>
        <SwiperSlide className="  relative w-full h-[300px] sm:h-[400px] lg:h-[510px]">
          <Image
            src={BookTemplate3}
            className={` hidden sm:block`}
            alt="book-store"
            fill
            priority
          />
          <Image
            src={BookTemplate3Mb}
            className={` block sm:hidden`}
            alt="book-store"
            fill
            priority
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Hero;
