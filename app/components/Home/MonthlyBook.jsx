import React from "react";
import Image from "next/image";
import BookMonth from "@/public-images/bom.jpg";

const MonthlyBook = () => {
  return (
    <div className="px-4 sm:px-14 md:px-[100px] lg:px-[180px] py-10 md:py-14 bg-c-blue   ">
      <h1 className=" text-c-yellow text-center font-josefin font-bold text-2xl md:text-3xl mb-5 md:mb-3">
        Books Of The Month
      </h1>
      <div className="flex flex-col md:flex-row gap-y-5 md:gap-x-10 justify-center items-center">
        <div className=" w-[140px] md:w-[190px]  ">
          <Image
            src={BookMonth}
            width={0}
            height={0}
            sizes={"100vw"}
            alt="Book-Of-Month"
            className=" w-full"
          />
        </div>

        <div className=" md:w-[70%]">
          <h1 className=" text-white font-itim text-xl md:text-3xl mb-3 md:mb-5">
            "It's the possibility of having a dream come true that makes life
            interesting. There is always something left."
          </h1>
          <div className=" text-right">
            <h1 className="text-white font-itim text-xl md:text-3xl mb-1  ">
              J.K Rolin (Author)
            </h1>
            <p className=" text-c-yellow font-light font-lato text-sm ">
              Quotes from "Harry Potter" book
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyBook;
