import BreadCrumb from "@/components-assest/BreadCrumb";
import React from "react";

export const BookItemDetailsSkeleton = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      <div className=" flex flex-col lg:flex-row gap-y-10 mt-10">
        <div className=" w-[250px] h-[300px] lg:h-[310px] bg-slate-200 rounded-sm animate-pulse mx-auto"></div>
        <div className=" basis-3/5">
          <h1 className=" h-[120px] md:h-[50px] bg-slate-200 animate-pulse rounded-sm mb-3"></h1>
          <h2 className=" h-5 w-[200px] bg-slate-200 animate-pulse rounded-sm"></h2>
          <ul className=" h-6 w-[280px] bg-slate-200 animate-pulse rounded-sm my-5 "></ul>
          <h1 className=" md:hidden h-8 w-[150px] bg-slate-200 animate-pulse rounded-sm"></h1>
          <Table />
          <div className="flex flex-col md:flex-row md:items-center gap-y-5 md:gap-x-8">
            <div className=" w-[117px] h-[44px] rounded-sm bg-slate-200 animate-pulse "></div>
            <button className=" w-[150px] h-[44px] rounded-sm bg-slate-200 animate-pulse "></button>
          </div>
        </div>
      </div>
      <div className=" mt-14">
        <button
          disabled
          className=" w-[167px] h-12 bg-slate-200 rounded-sm animate-pulse "
        ></button>
        <div className=" h-[258px] bg-slate-200 rounded-sm animate-pulse"></div>
      </div>
      <CustomerReview />
    </div>
  );
};

export const StationeryItemDetailsSkeleton = () => {
  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-14">
      <BreadCrumb />
      <div className=" lg:mx-10 flex flex-col md:flex-row gap-y-10 md:gap-x-7 mt-10">
        <div className=" w-[230px] h-[280px] md:w-[350px] md:h-[350px] bg-slate-200 rounded-sm animate-pulse mx-auto"></div>
        <div className=" basis-3/5">
          <h1 className=" w-[80%] h-9 bg-slate-200 animate-pulse mb-2"></h1>
          <h2 className=" w-[250px] h-10 mb-5 bg-slate-200 animate-pulse rounded-sm"></h2>
          <h1 className=" w-[200px] h-8 mb-2 bg-slate-200 animate-pulse rounded-sm"></h1>
          <ul className=" h-28 bg-slate-200 animate-pulse rounded-sm"></ul>

          <div className=" flex flex-col lg:flex-row lg:items-center gap-y-5 lg:gap-x-8 mt-7 lg:mt-5">
            <div className=" w-[180px] h-11 bg-slate-200 animate-pulse rounded-sm"></div>
            <button className="md:inline md:w-[230px] h-11 bg-slate-200 animate-pulse rounded-sm"></button>
          </div>
        </div>
      </div>
      {/* <RelatedProduct /> */}
    </div>
  );
};

const Table = () => {
  return (
    <div className=" grid grid-cols-3 md:grid-cols-5 grid-rows-2 gap-2 my-8 ">
      <div className=" rounded-sm h-[42px] w-full bg-slate-200 animate-pulse"></div>
      <div className=" col-span-2 rounded-sm h-[42px] w-full bg-slate-200 animate-pulse"></div>
      <div className=" hidden md:block col-span-2 row-span-2 rounded-sm h-[92px] w-full bg-slate-200 animate-pulse "></div>
      <div className=" rounded-sm h-[42px] w-full bg-slate-200 animate-pulse"></div>
      <div className=" col-span-2 rounded-sm h-[42px] w-full bg-slate-200 animate-pulse"></div>
    </div>
  );
};

const CustomerReview = () => {
  return (
    <div className="mt-20">
      <div className=" flex justify-between items-center mb-4">
        <h1 className=" w-[212px] h-8 bg-slate-200 animate-pulse rounded-sm"></h1>
        <button className=" w-[137px] h-8 bg-slate-200 animate-pulse rounded-sm "></button>
      </div>

      <div className=" w-full h-10 bg-slate-200 animate-pulse rounded-sm "></div>

      <div className="mt-5">
        <Review />
        <Review />
      </div>
    </div>
  );
};

const Review = () => {
  return (
    <div className=" flex flex-col md:flex-row gap-2 md:gap-5 p-4 rounded-sm bg-c-gray mb-5 border border-black/5">
      <div className=" flex md:flex-col justify-between md:justify-normal basis-0 md:basis-1/4">
        <div>
          <h1 className=" w-[170px] h-6 bg-slate-200 animate-pulse rounded-sm mb-1"></h1>
          <p className=" w-[140px] h-4 bg-slate-200 animate-pulse rounded-sm md:mb-3"></p>
        </div>

        <div className="w-12 h-12 md:w-[150px] md:h-[150px] rounded-full bg-slate-200 animate-pulse"></div>
      </div>
      <div className=" basis-0 md:basis-3/4">
        <h1 className=" w-[230px] h-9 bg-slate-200 animate-pulse rounded-sm"></h1>
        <ul className=" w-[100px] h-5 bg-slate-200 animate-pulse rounded-sm mt-1 mb-2 md:mb-4"></ul>
        <div className=" h-28 md:h-auto bg-slate-200 md:bg-transparent animate-pulse rounded-sm md:rounded-none flex flex-col gap-y-1 md:gap-y-2 ">
          <p className=" hidden md:block w-1/3 h-6 bg-slate-200 animate-pulse rounded-sm"></p>
          <p className=" hidden md:block w-2/3 h-8 bg-slate-200 animate-pulse rounded-sm"></p>
          <p className=" hidden md:block w-full h-12 bg-slate-200 animate-pulse rounded-sm"></p>
        </div>
      </div>
    </div>
  );
};
