import React, { useState } from "react";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { useCartStore } from "@/lib-store/cartStore";
import Link from "next/link";

const CartItem = ({ data }) => {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useCartStore((state) => state);
  const { id, title, image, price, quantity, slug, category } = data;

  const totalPricePerItem = price * quantity;

  const handleRemoveItem = () => {
    removeFromCart(id);
  };
  const handleDecrease = () => {
    decreaseCartQuantity(id);
  };
  const handleIncrease = () => {
    increaseCartQuantity(id);
  };

  return (
    <tr className=" w-full border-b border-c-gray-pale">
      <td className=" h-[140px] max-h-[130px] w-[20%] pt-5 pb-3 align-top md:align-middle ">
        <Image
          src={image}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full max-w-[80px] h-auto  "
          alt="book"
          priority
        />
      </td>

      <td className=" w-[70%] md:w-[45%] pt-5 pb-3 pl-5 md:pl-0 align-top md:align-middle ">
        <Link
          href={
            data.author
              ? `/category/${category}/${slug}`
              : `/stationery-gifts/${category}/${slug}`
          }
          className={" hover:underline"}
        >
          <h1 className=" font-josefin text-base md:text-lg font-medium ">
            {title}
          </h1>
        </Link>

        <ul className="flex items-center gap-x-1 md:gap-x-2 mb-1">
          <IoStar size={13} className=" text-c-yellow" />
          <IoStar size={13} className=" text-c-yellow" />
          <IoStar size={13} className=" text-c-yellow" />
          <IoStar size={13} className=" text-c-yellow" />
          <IoStarHalf size={13} className=" text-c-yellow" />
        </ul>

        {data.author && (
          <h2 className="md:font-medium text-xs md:text-base text-c-yellow2 italic tracking-wider font-lato ">
            {data.author} (Author)
          </h2>
        )}
        <h3 className=" text-sm md:text-lg font-lato mb-2 md:mb-0 opacity-80">
          Price - {price.toLocaleString()} Ks
        </h3>

        {/* For mobile view */}
        <div className=" md:hidden w-fit font-lato bg-c-gray-pale flex items-center rounded-md h-10 mb-3">
          <span
            onClick={handleDecrease}
            className=" text-xl w-9 text-center opacity-70 hover:opacity-100 cursor-pointer "
          >
            -
          </span>
          <h1 className=" w-10 text-center">{quantity}</h1>
          <span
            onClick={handleIncrease}
            className=" text-xl w-9 text-center opacity-70 hover:opacity-100 cursor-pointer"
          >
            +
          </span>
        </div>
        <h1 className=" md:hidden text-xl md:text-3xl font-lato font-medium  ">
          {totalPricePerItem.toLocaleString()} Ks
        </h1>
      </td>

      {/* For large screen (desktop) view */}
      <td className=" hidden md:table-cell w-[35%] pt-5 pb-3 pl-5 md:pl-0 align-top md:align-middle">
        <div className=" w-fit font-lato bg-c-gray-pale flex items-center rounded-md h-10 mb-3">
          <span
            onClick={handleDecrease}
            className=" text-xl w-9 text-center opacity-70 hover:opacity-100 cursor-pointer "
          >
            -
          </span>
          <h1 className=" w-10 text-center ">{quantity}</h1>
          <span
            onClick={handleIncrease}
            className=" text-xl w-9 text-center opacity-70 hover:opacity-100 cursor-pointer"
          >
            +
          </span>
        </div>
        <h1 className=" text-xl md:text-3xl font-lato font-medium  ">
          {totalPricePerItem.toLocaleString()} Ks
        </h1>
      </td>

      {/* Close icon*/}
      <td className=" w-[10%] md:w-[5%] pl-3 md:pl-0 pt-5 pb-3 align-top md:align-middle">
        <HiX
          onClick={handleRemoveItem}
          size={28}
          className={` w-5 h-5 md:w-7 md:h-7 mx-auto cursor-pointer`}
        />
      </td>
    </tr>
  );
};

export default CartItem;
