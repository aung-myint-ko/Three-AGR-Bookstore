"use client";
import BreadCrumb from "@/components-assest/BreadCrumb";
import { InsideLoading } from "@/components-assest/Loading";
import { getOrdersDetailsById } from "@/lib-api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { FcApproval } from "react-icons/fc";

const OrderDetails = ({ orderId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["order-history-details", orderId],
    queryFn: () => getOrdersDetailsById(orderId),
  });

  if (isLoading) return <InsideLoading />;

  const orderedItems = data?.data.attributes.order_quantities.data;
  const subTotal = Number(data?.data.attributes.total);
  const tax = 50;
  const date = new Date(data?.data.attributes.publishedAt).toLocaleDateString(
    "en-Us",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
  const customerName = data?.data.attributes.user.data.attributes.username;
  const address = data?.data.attributes.address;
  const location = address?.split("\n");

  return (
    <div className=" overflow-hidden px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      <div className="pb-5 mt-5 md:mt-8 mb-2 border-b border-black/20 flex justify-between items-center">
        <div>
          <h1 className=" text-2xl md:text-4xl text-c-blue font-josefin font-semibold md:mb-3">
            Order #{orderId}
          </h1>
          <p className=" text-sm md:text-base font-lato font-light opacity-80">
            {date}
          </p>
        </div>
        <div className=" font-lato capitalize flex items-center gap-x-2">
          <FcApproval size={28} />
          delivered
        </div>
      </div>
      <div className=" mt-10 overflow-x-auto">
        <table className=" w-full overflow-auto">
          <thead>
            <tr className=" font-lato text-base md:text-lg border-y border-black/20 ">
              <th className=" py-2 text-left font-normal w-2/5 min-w-[150px]">
                Products
              </th>
              <th className="py-2 text-left font-normal w-1/5 min-w-[90px]">
                Price
              </th>
              <th className="py-2 text-left font-normal w-1/5 min-w-[90px]">
                Quantity
              </th>
              <th className="py-2 text-left font-normal w-1/5 min-w-[90px]">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {orderedItems &&
              orderedItems.map((item, index) => {
                const bookName = item.attributes.book.data?.attributes.title;
                const bookPrice = item.attributes.book.data?.attributes.price;
                const bookSlug = item.attributes.book.data?.attributes.slug;
                const bookCategory =
                  item.attributes.book.data?.attributes.categories.data[0]
                    .attributes.slug;
                const bookUrl = `/category/${bookCategory}/${bookSlug}`;

                const productName =
                  item.attributes.product.data?.attributes.name;
                const productPrice =
                  item.attributes.product.data?.attributes.price;
                const productSlug =
                  item.attributes.product.data?.attributes.slug;
                const productCategory =
                  item.attributes.product.data?.attributes.product_categories
                    .data[0].attributes.slug;
                const productUrl = `/stationery-gifts/${productCategory}/${productSlug}`;

                const quantity = item.attributes.quantity;

                return (
                  <tr
                    key={index}
                    className=" font-lato text-sm border-b border-black/20 opacity-80 "
                  >
                    <th className=" py-2 pr-1 text-left font-light w-2/5 ">
                      <Link
                        href={bookCategory ? bookUrl : productUrl}
                        className={"hover:underline hover:decoration-c-blue"}
                      >
                        {bookName ? bookName : productName}
                      </Link>
                    </th>
                    <th className="py-2 text-left font-light w-1/5">
                      {bookPrice
                        ? Number(bookPrice).toLocaleString()
                        : Number(productPrice).toLocaleString()}{" "}
                      Ks
                    </th>
                    <th className="py-2 text-left font-light w-1/5">
                      {quantity}
                    </th>
                    <th className="py-2 text-left font-light w-1/5">
                      {bookPrice
                        ? (Number(bookPrice) * quantity).toLocaleString()
                        : (Number(productPrice) * quantity).toLocaleString}{" "}
                      Ks
                    </th>
                  </tr>
                );
              })}
            {/* subtoal field */}
            <tr className=" font-lato text-base md:text-lg border-b border-black/20 ">
              <th colSpan={3} className="pt-4 pb-2 text-left font-normal ">
                Subtotal
              </th>
              <th className="py-2 text-left font-normal w-1/5">
                {subTotal.toLocaleString()} Ks
              </th>
            </tr>
            {/* tax field */}
            <tr className=" font-lato text-base md:text-lg border-b border-black/20 ">
              <th colSpan={3} className=" py-2 text-left font-normal ">
                Delivery & Tax
              </th>
              <th className="py-2 text-left font-normal w-1/5">{tax} Ks</th>
            </tr>
            {/* all total field */}
            <tr className=" font-lato text-base md:text-lg border-b border-black/20 ">
              <th colSpan={3} className=" py-2 text-left font-normal ">
                Total
              </th>
              <th className="py-2 text-left font-normal w-1/5">
                {(subTotal + tax).toLocaleString()} Ks
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-14 pb-10">
        <h1 className=" font-josefin text-xl mb-3">Shipping Address</h1>

        <div className=" flex gap-x-4 items-center  font-lato opacity-80 mb-1">
          <h1 className="w-[100px]">Reciver</h1>
          <h1 className="text-sm">{customerName}</h1>
        </div>

        <div className=" flex gap-x-4 font-lato opacity-80">
          <h1 className="w-[100px]">Location</h1>
          <h1 className="text-sm max-w-[250px]">
            {location && location.map((data) => data + ", ")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
