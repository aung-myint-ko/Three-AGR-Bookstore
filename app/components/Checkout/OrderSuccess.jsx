"use client";
import { getOrdersDetailsById } from "@/lib-api";
import { useJwtDecode } from "@/lib-hook/useJwt";
import { useQuery } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FcOk } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCartStore } from "@/lib-store/cartStore";
import Error from "@/components-assest/Error";

const OrderSuccess = ({ slug }) => {
  const router = useRouter();
  const { cleanCart } = useCartStore();
  const { id: orderId } = useJwtDecode(slug);

  useEffect(() => {
    cleanCart();
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-order", orderId],
    queryFn: () => getOrdersDetailsById(orderId),
  });

  const customerName = data?.data.attributes.user.data?.attributes.username;
  const customerPhone = data?.data.attributes.phone;
  const customerAddress = data?.data.attributes.address;
  const totalAmount = data?.data.attributes.total;
  const orderItems = data?.data.attributes.order_quantities.data;

  const location = customerAddress?.split("\n");

  const submitOrderSuccess = () => {
    setCookie("user-buying", "cart", {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });
    router.push("/");
  };
  return (
    <>
      {isLoading ? (
        <div className=" z-50 absolute w-full h-screen top-0 left-0 px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14 md:pb-16 bg-white flex justify-center items-center">
          <AiOutlineLoading3Quarters size={40} className=" animate-spin" />
        </div>
      ) : (
        <div className=" z-50 absolute w-full top-0 left-0 px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14 md:pb-16 bg-white">
          <h1 className=" flex items-center gap-3 font-josefin text-3xl md:text-4xl font-semibold mb-5">
            <FcOk size={80} className={" w-16 h-16 md:w-20 md:h-20"} /> Your
            order has been placed
          </h1>
          <div className=" grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 gap-5 mb-6">
            <div className=" p-3 md:p-5 rounded-lg border border-black/20 ">
              <p className=" opacity-80 font-lato font-medium ">
                Please kindly show your order number when you arrive at counter.
                Read more about how to add authentication providers. Your order
                will get within 24 hours
              </p>
            </div>
            <div className=" lg:row-span-3 p-3 md:p-5 rounded-lg border border-black/20 ">
              <div className=" max-h-[285px] overflow-auto">
                <table className=" w-full">
                  <tbody>
                    {orderItems &&
                      orderItems.map((item, index) => {
                        return (
                          <TotalCartListItem
                            key={index}
                            data={item.attributes}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>

              <div className=" font-lato text-xl font-medium flex justify-between pt-5 border-t border-b/20">
                <h1>Total (Include Tax - 50 Ks)</h1>
                <h2>{(Number(totalAmount) + 50).toLocaleString()} Ks</h2>
              </div>
            </div>
            <div className=" lg:row-span-2 p-3 md:p-5 rounded-lg border border-black/20 ">
              <h1 className=" font-josefin text-xl font-semibold mb-3">
                Customer Details
              </h1>
              <div className=" opacity-90 w-[70%] grid grid-cols-3 text-sm font-lato mb-5">
                <label>Name</label>
                <p className="col-span-2">{customerName}</p>
                <label>Phone</label>
                <p className="col-span-2">{customerPhone}</p>
              </div>
              <h1 className=" font-josefin font-semibold mb-2 opacity-90">
                Shipping Address
              </h1>
              <h1 className="text-sm max-w-[270px] opacity-80 font-lato">
                {location && location.map((data) => data + ", ")}
              </h1>
            </div>
          </div>
          <button
            onClick={submitOrderSuccess}
            className=" mx-auto flex items-center gap-1 pl-6 pr-8 py-2 rounded-sm font-lato font-medium text-lg text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
          >
            <IoIosArrowBack size={20} /> Back To Home
          </button>
        </div>
      )}
    </>
  );
};

const TotalCartListItem = ({ data }) => {
  const { book, product, quantity } = data;
  const bookName = book.data?.attributes.title;
  const bookPrice = book.data?.attributes.price;
  const author = book.data?.attributes.author.data.attributes.name;
  const bookImage = book.data?.attributes.image.data.attributes.url;

  const productName = product.data?.attributes.name;
  const productPrice = product.data?.attributes.price;
  const productImage = product.data?.attributes.image.data.attributes.url;

  return (
    <tr className=" w-full">
      <td className=" w-[15%] pb-3 md:align-middle ">
        <Image
          src={bookImage ? bookImage : productImage}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full max-w-[60px] h-auto p-2 rounded-md bg-c-gray border border-black/10 "
          alt={bookName ? bookName : productName}
          priority
        />
      </td>
      <td className=" w-[45%] pl-2 md:pl-0 pb-3 md:align-middle ">
        <h1 className=" font-josefin text-sm font-medium ">
          {bookName ? bookName : productName}
        </h1>
        {author && (
          <h2 className="text-xs text-c-yellow2 italic tracking-wider font-lato ">
            {author} (Author)
          </h2>
        )}
      </td>
      <td className=" w-[10%] pb-3 md:align-middle  text-center">
        <h1 className=" text-base font-lato font-medium">{quantity}</h1>
      </td>
      <td className="w-[20%] pb-3 md:align-middle">
        <h1 className=" text-right text-base font-lato font-medium">
          {bookPrice
            ? Number(bookPrice).toLocaleString() + " Ks"
            : Number(productPrice).toLocaleString() + " Ks"}
        </h1>
      </td>
    </tr>
  );
};

export default OrderSuccess;
