"use client";
import BreadCrumb from "@/components-assest/BreadCrumb";
import useCarts from "@/lib-hook/useCarts";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import CartItem from "./CartItem";
import { CartNav } from "./CheckoutNav";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";
import CartsSkeleton from "@/loading-skeletons/CartsSkeleton";

const Carts = () => {
  const router = useRouter();
  const { cartsData, isLoading, totalAmount, totalQuantity } = useCarts();

  console.log(isLoading, cartsData, totalQuantity);

  const submitCart = (e) => {
    setCookie("user-buying", "delivery");
    router.push("/checkout/delivery");
  };
  return (
    <>
      {isLoading ? (
        <CartsSkeleton />
      ) : cartsData.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className=" px-4 md:px-10 lg:px-36 xl:px-20 py-10 md:py-12 lg:py-14 md:pb-16">
          <BreadCrumb />
          <div className=" flex flex-col xl:flex-row mt-5 gap-y-10 md:gap-y-14 lg:gap-x-5">
            <div className=" basis-0 lg:basis-4/6">
              <CartNav />
              <table className=" grid gap-y-2 w-full border border-black/20 p-3 md:p-5 mt-6 max-h-[400px] overflow-y-auto">
                <tbody>
                  {cartsData.map((item, index) => (
                    <CartItem key={index} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className=" basis-0 lg:basis-2/6">
              <OrderSummary
                submitFunction={submitCart}
                url={"/checkout/delivery"}
                btn={"delivery"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Carts;
