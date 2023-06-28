"use client";
import React, { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import useCarts from "@/lib-hook/useCarts";

const Cart = ({ color }) => {
  const { totalQuantity } = useCarts();
  return (
    <Link href={"/checkout/carts"} className=" relative">
      <BsCart4 size={24} color={color} />
      {
        <div className=" w-5 h-5 absolute -top-1 -right-3 bg-c-yellow rounded-full flex justify-center items-center">
          <p className=" font-lato text-xs">{totalQuantity}</p>
        </div>
      }
    </Link>
  );
};

export default Cart;
