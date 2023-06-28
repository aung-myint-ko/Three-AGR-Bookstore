"use client";
import BreadCrumb from "@/components-assest/BreadCrumb";
import React from "react";
import Input from "./Input";
import { DeliveryNav } from "./CheckoutNav";
import OrderSummary from "./OrderSummary";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useOrderStore } from "@/lib-store/orderStore";
import { useRouter } from "next/navigation";
import useCarts from "@/lib-hook/useCarts";
import { getCookie, setCookie } from "cookies-next";
import Loading from "@/components-assest/Loading";
import useMount from "@/lib-hook/useMount";

const schema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  apartmentNumber: Yup.string().required("Apartment number name is required"),
  street: Yup.string().required("Street is required"),
  township: Yup.string().required("Township is required"),
  state: Yup.string().required("State is required"),
});

const Delivery = () => {
  const router = useRouter();
  const isMounted = useMount();
  const { cartsData } = useCarts();
  const { setOrderSpecification } = useOrderStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const userBuyingCookie = getCookie("user-buying");

  if (!isMounted) {
    return <Loading />;
  }

  if (!userBuyingCookie) {
    router.push("/checkout/carts");
    return <Loading />;
  } else {
    if (cartsData <= 0 && userBuyingCookie == "cart") {
      router.push("/checkout/carts");
      return <Loading />;
    }
  }

  const submitDelivery = (e) => {
    setCookie("user-buying", "payment", {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });
    setOrderSpecification(e);
    router.push("/checkout/payment");
  };

  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14 md:pb-16">
      <BreadCrumb />
      <form
        onSubmit={handleSubmit(submitDelivery)}
        className=" flex flex-col lg:flex-row mt-5 gap-y-10 md:gap-y-14 lg:gap-x-5"
      >
        <div className=" basis-0 lg:basis-4/6">
          <DeliveryNav />
          <div className=" grid gap-y-2 w-full bg-c-gray-pale p-5 md:p-10 mt-6 ">
            <h1 className=" font-josefin text-2xl font-semibold mb-3">
              Delivery Address
            </h1>
            <div className=" grid grid-cols-1 md:grid-cols-2 font-lato gap-x-5 gap-y-4">
              {inputLists.map((inputList, index) => {
                return (
                  <Input
                    key={index}
                    title={inputList.title}
                    placeholder={inputList.placeholder}
                    colSpan={inputList.colSpan}
                    slug={inputList.slug}
                    register={register}
                    errors={errors}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className=" basis-0 lg:basis-2/6">
          <OrderSummary url={"/checkout/payment"} btn={"payment"} />
        </div>
      </form>
    </div>
  );
};

const inputLists = [
  {
    title: "first name",
    placeholder: "Enter your first name",
    colSpan: false,
    slug: "firstname",
  },
  {
    title: "last name",
    placeholder: "Enter your last name",
    colSpan: false,
    slug: "lastname",
  },
  {
    title: "phone number",
    placeholder: "Enter your phone number",
    colSpan: true,
    slug: "phoneNumber",
  },
  {
    title: "apt / suite",
    placeholder: "Enter your apartment number",
    colSpan: false,
    slug: "apartmentNumber",
  },
  {
    title: "street name",
    placeholder: "Enter your street name",
    colSpan: false,
    slug: "street",
  },
  {
    title: "Township",
    placeholder: "Enter your township",
    colSpan: false,
    slug: "township",
  },
  {
    title: "State",
    placeholder: "Enter your state",
    colSpan: false,
    slug: "state",
  },
];

export default Delivery;
