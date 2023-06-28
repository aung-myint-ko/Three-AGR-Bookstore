"use client";
import useUser from "@/lib-hook/useUser";
import Link from "next/link";
import React from "react";

const History = () => {
  const { userData } = useUser();
  const orders = userData?.orders;

  return (
    <div className=" basis-0 md:basis-5/6">
      <h1 className=" font-josefin text-xl md:text-2xl font-medium mb-3">
        Order History
      </h1>

      {orders.length > 0 ? (
        <table className=" w-full">
          <thead>
            <tr className=" font-lato text-base md:text-lg border-y border-black/20 ">
              <th className=" py-2 text-left font-normal w-1/4">Order</th>
              <th className="py-2 text-left font-normal w-1/4">Date</th>
              <th className="py-2 text-left font-normal w-1/4">
                Payment Method
              </th>
              <th className="py-2 text-left font-normal w-1/4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => {
                const date = new Date(order.publishedAt).toLocaleDateString(
                  "en-Us",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                );
                return (
                  <tr
                    key={index}
                    className=" font-lato text-sm border-b border-black/20 opacity-80 "
                  >
                    <th className=" py-2 text-left font-light w-1/4">
                      <Link
                        href={`account/history/${order.id}`}
                        className={"hover:underline hover:decoration-c-blue "}
                      >
                        #{index + 1}
                      </Link>
                    </th>
                    <th className="py-2 text-left font-light w-1/4">{date}</th>
                    <th className="py-2 text-left font-light w-1/4">
                      {order.payment_method}
                    </th>
                    <th className="py-2 text-left font-light w-1/4">
                      {order.total.toLocaleString()} Ks
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <EmptyHistory />
      )}
    </div>
  );
};

const EmptyHistory = () => {
  return (
    <div className=" w-full mt-5 h-[300px] flex justify-center items-center bg-c-gray">
      <h1 className=" opacity-80 text-lg md:text-xl font-lato">
        You have not made any orders yet.
      </h1>
    </div>
  );
};

export default History;
