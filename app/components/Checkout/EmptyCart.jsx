import React from "react";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import BreadCrumb from "@/components-assest/BreadCrumb";

const EmptyCart = () => {
  return (
    <div className=" px-4 md:px-20 py-10 md:pt-14 md:pb-16">
      <BreadCrumb />
      <div className=" py-20 w-full flex flex-col justify-center items-center">
        <BsCart4
          className={
            " w-[100px] h-[100px] md:w-[150px] md:h-[150px] text-c-blue/60 mb-5 md:mb-8"
          }
        />
        <h1 className=" text-center font-josefin text-3xl md:text-4xl font-medium mb-1">
          Shopping Cart Is Empty
        </h1>
        <p className=" text-center text-sm md:text-base font-lato opacity-80 tracking-wide mb-5 md:mb-8">
          You have no items in your shopping cart.
        </p>
        <Link
          href={"/"}
          className=" rounded-sm font-lato font-medium text-lg px-8 py-2 text-white bg-c-blue/90 hover:bg-c-blue hover:shadow tracking-wide "
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
