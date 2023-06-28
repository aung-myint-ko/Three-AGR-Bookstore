import BreadCrumb from "@/components-assest/BreadCrumb";
import useCarts from "@/lib-hook/useCarts";
import useUser from "@/lib-hook/useUser";
import React from "react";

const CartsSkeleton = () => {
  const { cartsData } = useCarts();
  return (
    <div className=" px-4 md:px-10 lg:px-36 xl:px-20 py-10 md:py-12 lg:py-14 md:pb-16">
      <BreadCrumb />
      <div className=" flex flex-col xl:flex-row mt-5 gap-y-10 md:gap-y-14 lg:gap-x-5">
        <div className=" basis-0 lg:basis-4/6">
          <div className=" grid grid-cols-3 gap-x-4 items-center">
            <div className="  w-full h-10 lg:h-11 rounded-sm bg-slate-200 animate-pulse "></div>

            <div className="  w-full h-10 lg:h-11 rounded-sm bg-slate-200 animate-pulse "></div>

            <div className="  w-full h-10 lg:h-11 rounded-sm bg-slate-200 animate-pulse "></div>
          </div>
          <section className=" grid gap-y-2 w-full border border-black/20 p-2 md:p-5 mt-6 max-h-[400px] overflow-y-auto">
            {[0, 1, 2].map((item, index) => (
              <CartItemSkeleton key={index} data={item} />
            ))}
          </section>
        </div>
        <div className=" basis-0 lg:basis-2/6">
          <OrderSummarySkeleton />
        </div>
      </div>
    </div>
  );
};

const CartItemSkeleton = () => {
  return (
    <>
      <div className=" flex md:items-center gap-x-4 w-full md:h-[160px] p-3 md:p-5 bg-c-gray rounded-sm ">
        <div className=" max-w-[80px] h-[140px] max-h-[130px] w-[20%] rounded-sm bg-slate-200 animate-pulse  "></div>
        <div className=" w-[70%] md:w-[45%] ">
          <h1 className=" h-[45px] w-[180px] md:w-[280px] mb-1 rounded-sm bg-slate-200 animate-pulse"></h1>

          <ul className=" h-[13px] w-[80px] md:w-[120px] mb-1 rounded-sm bg-slate-200 animate-pulse"></ul>

          <h2 className="h-[15px] w-[100px] md:w-[180px] mb-1 rounded-sm bg-slate-200 animate-pulse "></h2>

          <h3 className="h-[25px] w-[80px] md:w-[120px] mb-2 md:mb-0 rounded-sm bg-slate-200 animate-pulse "></h3>

          {/* For mobile view */}
          <div className=" md:hidden w-[110px] h-7 mb-2 rounded-sm bg-slate-200 animate-pulse "></div>
          <h1 className=" md:hidden w-[130px] h-7 rounded-sm bg-slate-200 animate-pulse "></h1>
        </div>

        {/* For large screen (desktop) view */}
        <div className=" hidden md:flex flex-col justify-center w-[35%] ">
          <div className=" w-[110px] h-10 mb-3 rounded-sm bg-slate-200 animate-pulse"></div>
          <h1 className=" w-[130px] h-10 rounded-sm bg-slate-200 animate-pulse"></h1>
        </div>

        {/* close icon*/}
        <div className=" w-[10%] md:w-[5%] flex md:items-center">
          <div className=" w-7 h-7 rounded-sm bg-slate-200 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

const OrderSummarySkeleton = () => {
  return (
    <div className=" lg:sticky top-[206px] w-full lg:w-[90%] max-w-[450px] mx-auto lg:ml-auto bg-c-gray px-7 py-10">
      <h1 className=" w-[190px] h-9 rounded-sm bg-slate-200 animate-pulse mb-3"></h1>
      <div className=" gap-y-2 grid grid-cols-2 font-lato opacity-80 pb-5 border-b-2 border-black/40">
        <h2 className=" w-[70px] h-6 rounded-sm bg-slate-200 animate-pulse"></h2>
        <h2 className=" w-[20px] h-6 rounded-sm bg-slate-200 animate-pulse ml-auto"></h2>
        <h2 className="  w-[90px] h-6 rounded-sm bg-slate-200 animate-pulse "></h2>
        <h2 className="  w-[80px] h-6 rounded-sm bg-slate-200 animate-pulse ml-auto"></h2>
        <h2 className="  w-[120px] h-6 rounded-sm bg-slate-200 animate-pulse"></h2>
        <h2 className="w-[130px] h-6 rounded-sm bg-slate-200 animate-pulse ml-auto"></h2>
      </div>
      <div className=" grid grid-cols-2 font-lato font-medium text-2xl my-5">
        <h1 className=" w-[100px] md:w-[150px] h-10 rounded-sm bg-slate-200 animate-pulse"></h1>
        <h2 className=" w-[90px] md:w-[130px] h-10 rounded-sm bg-slate-200 animate-pulse ml-auto"></h2>
      </div>

      <div className=" flex justify-center">
        <button className=" w-[170px] h-11 rounded-sm bg-slate-200 animate-pulse"></button>
      </div>
    </div>
  );
};

export default CartsSkeleton;
