import React from "react";
import useCarts from "@/lib-hook/useCarts";
import useUser from "@/lib-hook/useUser";

const OrderSummary = ({ submitFunction = null, url, btn }) => {
  const { userData: user } = useUser();
  const { totalAmount, totalQuantity } = useCarts();

  const tax = 50;
  const orderTotal = totalAmount + tax;
  return (
    <div className=" lg:sticky top-[206px] w-full lg:w-[90%] max-w-[450px] mx-auto lg:ml-auto bg-c-gray-pale px-7 py-10">
      <h1 className=" font-josefin text-2xl font-semibold mb-3">
        Order Summary
      </h1>
      <div className=" grid grid-cols-2 font-lato opacity-80 pb-5 border-b-2 border-black/40">
        <h2 className=" font-medium">Items</h2>
        <h2 className=" text-right text-xl">{totalQuantity}</h2>
        <h2 className=" font-medium">Subtotal</h2>
        <h2 className=" text-right text-xl">
          {totalAmount.toLocaleString()} Ks
        </h2>
        <h2 className=" font-medium">Estimated Tax</h2>
        <h2 className=" text-right text-xl">{tax.toLocaleString()} Ks</h2>
      </div>
      <div className=" grid grid-cols-2 font-lato font-medium text-2xl my-6">
        <h1>Order Total</h1>
        <h2 className=" text-right">{orderTotal.toLocaleString()} Ks</h2>
      </div>

      <div className=" flex justify-center">
        {submitFunction ? (
          user ? (
            <button
              onClick={submitFunction}
              type="submit"
              className=" rounded-sm uppercase font-lato font-medium text-lg px-8 py-2 text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
            >
              {btn ? `next : ${btn}` : "Submit Order"}
            </button>
          ) : (
            <button
              disabled
              type="submit"
              className=" rounded-sm uppercase font-lato font-medium text-lg px-8 py-2 text-white bg-c-blue/60  "
            >
              {btn ? `next : ${btn}` : "Submit Order"}
            </button>
          )
        ) : user ? (
          <button
            type="submit"
            className=" rounded-sm uppercase font-lato font-medium text-lg px-8 py-2 text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
          >
            {btn ? `next : ${btn}` : "Submit Order"}
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className=" rounded-sm uppercase font-lato font-medium text-lg px-8 py-2 text-white bg-c-blue/60"
          >
            {btn ? `next : ${btn}` : "Submit Order"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
