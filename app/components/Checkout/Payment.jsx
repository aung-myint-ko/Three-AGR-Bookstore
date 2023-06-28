"use client";
import BreadCrumb from "@/components-assest/BreadCrumb";
import React, { useState } from "react";
import Input from "./Input";
import { PaymentNav } from "./CheckoutNav";
import OrderSummary from "./OrderSummary";
import Paypal from "@/public-images/paypal.png";
import Master from "@/public-images/master.png";
import Visa from "@/public-images/visa.png";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/lib-store/orderStore";
import { useCartStore } from "@/lib-store/cartStore";
import { useMutation } from "@tanstack/react-query";
import { postOrdersByUserId } from "@/lib-api";
import { useJwtEncode } from "@/lib-hook/useJwt";
import useUser from "@/lib-hook/useUser";
import { getCookie, setCookie } from "cookies-next";
import useCarts from "@/lib-hook/useCarts";
import Loading from "@/components-assest/Loading";
import useMount from "@/lib-hook/useMount";

//Form validation
const schema = Yup.object({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  nameOnCard: Yup.string().required("Name on card is required"),
  expiration: Yup.string()
    .required("Expiration is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{4}$/, "Invalid expiration date"),
  cvc: Yup.string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "CVC must be 3 digits"),
});

const Payment = () => {
  const router = useRouter();
  const isMounted = useMount();
  const { address, phone } = useOrderStore();
  const { cartsData, totalAmount } = useCarts();
  const { userData } = useUser();
  const userBuyingCookie = getCookie("user-buying");

  const location = `${address.apt}\n${address.street}\n${address.township}\n${address.state}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: postOrdersByUserId,
    onError: (error) => {},
    onSuccess: (data, variables, context) => {
      const slug = useJwtEncode(data.data.id);
      setCookie("user-buying", "success", {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });
      router.push(`/checkout/ordersuccess/${slug}`);
    },
  });

  if (!isMounted) {
    return <Loading />;
  }

  if (!userBuyingCookie || userBuyingCookie == "cart") {
    router.push("/checkout/carts");
    return <Loading />;
  } else {
    if (userBuyingCookie == "delivery") {
      router.push("/checkout/delivery");
      return <Loading />;
    }
  }

  const submitPayment = () => {
    mutation.mutate({
      cart: cartsData,
      total: totalAmount,
      userId: userData.id,
      phone,
      address: location,
    });
  };

  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14 md:pb-16">
      <BreadCrumb />
      <form
        onSubmit={handleSubmit(submitPayment)}
        className=" flex flex-col lg:flex-row mt-5 gap-y-10 md:gap-y-14 lg:gap-x-5"
      >
        <div className=" basis-0 lg:basis-4/6">
          <PaymentNav />
          <div className=" grid gap-y-2 w-full bg-c-gray-pale p-5 md:p-10 mt-6 ">
            <h1 className=" font-josefin text-2xl font-semibold mb-2">
              Payment Details
            </h1>
            <div className=" flex gap-x-20 font-lato italic mb-5">
              <div className="">
                <input
                  type="radio"
                  name="payment"
                  id="card"
                  value={"card"}
                  className=" after:w-4 after:h-4 after:bg-c-blue"
                />
                <label htmlFor="card" className=" text-sm md:text-base">
                  Pay with cards
                </label>
                <div className=" flex gap-2 mt-1">
                  <PaymentIcon image={Master} />
                  <PaymentIcon image={Visa} />
                </div>
              </div>
              <div className="">
                <input
                  type="radio"
                  name="payment"
                  id="paypal"
                  value={"paypal"}
                  className=" after:w-4 after:h-4 after:bg-c-blue"
                />
                <label htmlFor="paypal" className=" text-sm md:text-base">
                  Pay with PayPal
                </label>
                <div className=" flex gap-2 mt-1">
                  <PaymentIcon image={Paypal} />
                </div>
              </div>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 font-lato gap-x-5 gap-y-4 mb-5">
              {paymentLists.map((paymentList, index) => {
                return (
                  <Input
                    key={index}
                    title={paymentList.title}
                    placeholder={paymentList.placeholder}
                    colSpan={paymentList.colSpan}
                    slug={paymentList.slug}
                    register={register}
                    errors={errors}
                  />
                );
              })}
            </div>
            <p className=" italic font-lato font-medium text-sm opacity-80 ">
              Note : The delivery fee may change depending on the township
            </p>
          </div>
        </div>
        <div className=" basis-0 lg:basis-2/6">
          <OrderSummary url={"/checkout/order"} />
        </div>
      </form>
    </div>
  );
};

const PaymentIcon = ({ image }) => {
  return (
    <div className=" flex justify-center items-center w-14 h-8 p-1 border border-black/40 bg-white rounded">
      <Image
        src={image}
        width={0}
        height={0}
        alt={"payment"}
        className={`w-8`}
      />
    </div>
  );
};

const paymentLists = [
  {
    title: "Card Number",
    placeholder: "Enter your card number",
    colSpan: false,
    slug: "cardNumber",
  },
  {
    title: "Name On Card",
    placeholder: "Enter your card number",
    colSpan: false,
    slug: "nameOnCard",
  },
  {
    title: "Expiration",
    placeholder: "MM/YY",
    colSpan: false,
    slug: "expiration",
  },
  {
    title: "CVC",
    placeholder: "Enter CVC number",
    colSpan: false,
    slug: "cvc",
  },
];

export default Payment;
