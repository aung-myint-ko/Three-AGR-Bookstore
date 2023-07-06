"use client";
import React from "react";
import Card from "./Card";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { useQuery } from "@tanstack/react-query";
import { getBooksByCategory } from "@/lib-api";
import { BookCardSkeleton } from "@/loading-skeletons/CardSkeleton";

const BestSelling = ({ bestSellings }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["book-status", "best-selling"],
    queryFn: () => getBooksByCategory("best-selling", 1, 10),
    initialData: bestSellings,
  });

  if (isError) return <div>is Error ...</div>;

  const bestSellingBooks = data?.data;

  return (
    <div className=" py-10 md:py-14 ">
      <h1 className=" text-center font-josefin font-bold text-2xl md:text-3xl md:mb-2">
        Best Selling Books
      </h1>
      <p className=" px-4 md:px-20 text-sm md:text-base text-center font-lato opacity-80 tracking-wide">
        Here are ten of our best selling books. Explore yourself in the latest
        trends.
      </p>
      <div className="book-card relative px-8 md:px-20 mt-5 md:mt-8 z-10 ">
        {isLoading ? (
          <div className=" grid grid-cols-5 gap-x-5 ">
            {[0, 1, 2, 3, 4].map((index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              890: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            spaceBetween={10}
            slidesPerView={2}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper -z-10 "
          >
            {bestSellingBooks.map((book) => {
              return (
                <SwiperSlide key={book.id}>
                  <Card
                    id={book.id}
                    data={book.attributes}
                    truncateCount={20}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default BestSelling;
