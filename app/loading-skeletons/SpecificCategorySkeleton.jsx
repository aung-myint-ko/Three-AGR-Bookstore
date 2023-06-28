import BreadCrumb from "@/components-assest/BreadCrumb";
import React from "react";
import { Pagination } from "swiper";
import { BookCardSkeleton } from "./CardSkeleton";

const SpecificCategorySkeleton = ({ categorySlug }) => {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 md:py-14">
      <BreadCrumb />

      <div className=" my-5 md:my-7">
        <h1 className=" capitalize font-josefin font-bold text-2xl md:text-3xl mt-5 mb-2 md:mb-4 ">
          {categorySlug.replace(/-/g, " ").split(" ").join(" ")}
        </h1>
        <div
          className={`py-2 px-5 h-10 flex justify-between items-center bg-c-gray2 w-full `}
        ></div>
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-y-7 lg:gap-x-0">
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
      </div>
    </div>
  );
};

export default SpecificCategorySkeleton;
