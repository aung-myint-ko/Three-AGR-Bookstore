"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsCart4, BsCheckLg } from "react-icons/bs";
import Link from "next/link";
import useTruncate from "@/lib-hook/useTruncate";
import { useCartStore } from "@/lib-store/cartStore";
import { useToastStore } from "@/lib-store/toastStore";

const Card = ({ id, data, truncateCount = 20 }) => {
  const [add, setAdd] = useState(false);
  const { addToCart } = useCartStore((state) => state);
  const { setToast } = useToastStore((state) => state);

  const { title, image, price, author, slug, categories } = data;

  const truncateTitle = useTruncate(title, truncateCount);
  const truncateTitleForMobile = useTruncate(title, 17);

  const authorName = author.data.attributes.name;
  const imgUrl = image.data.attributes.url;
  const bookCategory = categories?.data[0]?.attributes.slug;

  const handleAddToCart = () => {
    addToCart({
      book: true,
      stationery: false,
      id,
      title,
      slug,
      category: bookCategory,
      image: imgUrl,
      author: authorName,
      price,
      quantity: 1,
    });

    setAdd(true);
    setToast({ status: "success", message: `${title} has been added to cart` });
  };

  return (
    <div className=" w-[90%] max-w-[180px] lg:max-w-[200px] mx-auto relative rounded-sm overflow-hidden group">
      <Link href={`/category/${bookCategory}/${slug}`}>
        <div className="flex justify-center items-center p-2 relative max-w-[150px] h-[200px] mx-auto bg-c-blue ">
          <Image
            src={imgUrl}
            width={"0"}
            height={"0"}
            sizes="100vw"
            className=" w-fit h-full scale-95 group-hover:scale-100 transform transition duration-700 mx-auto "
            alt={slug}
            priority
          />
          <div
            className={` ${
              add ? " opacity-100" : " opacity-0"
            } w-full h-full bg-black/40 absolute top-0 left-0 flex flex-col justify-center items-center transition-all duration-150 ease-linear `}
          >
            <BsCheckLg size={38} className=" text-white " />
            <p className=" font-lato text-sm text-c-gray ">Added</p>
          </div>
        </div>
      </Link>

      <Link href={`/category/${bookCategory}/${slug}`}>
        <div className=" text-center mt-3  ">
          <h1 className=" hidden md:block font-josefin text-sm md:text-base md:mb-1">
            {truncateTitle}
          </h1>
          <h1 className=" md:hidden  font-josefin text-sm md:text-base md:mb-1">
            {truncateTitleForMobile}
          </h1>
          <h2 className=" text-c-yellow2 italic font-lato font-light text-xs md:mb-1 tracking-wide">
            {authorName}
          </h2>
          <h1 className=" font-lato font-bold">{price.toLocaleString()} Ks</h1>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className={`${
          add ? "hidden" : "flex"
        } border border-c-yellow bg-c-blue cursor-pointer absolute top-3 -right-full group-hover:right-3 w-10 h-10 rounded-full active:bg-c-blue justify-center items-center transition-all duration-300`}
      >
        {add ? (
          <BsCheckLg size={24} className="text-white" />
        ) : (
          <BsCart4 size={24} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default Card;
