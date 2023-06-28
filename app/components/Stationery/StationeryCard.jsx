import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCart4, BsCheckLg } from "react-icons/bs";
import useTruncate from "@/lib-hook/useTruncate";
import { useCartStore } from "@/lib-store/cartStore";
import { useToastStore } from "@/lib-store/toastStore";

const StationeryCard = ({ id, data, truncateCount }) => {
  const [add, setAdd] = useState(false);
  const { addToCart } = useCartStore((state) => state);
  const { setToast } = useToastStore((state) => state);

  const { name, slug, price, image, product_categories } = data;
  const truncateName = useTruncate(name, truncateCount);
  const truncateNameForMobile = useTruncate(name, 15);
  const imgUrl = image.data.attributes.url;
  const imgName = image.data.attributes.name;
  const productCategory = product_categories?.data[0]?.attributes.slug;

  const handleAddToCart = () => {
    addToCart({
      book: false,
      stationery: true,
      id,
      title: name,
      slug,
      category: productCategory,
      image: imgUrl,
      price,
      quantity: 1,
    });
    setAdd(true);
    setToast({ status: "success", message: `${name} has been added to cart` });
  };

  return (
    <div className=" w-[90%] max-w-[180px] lg:max-w-[200px] mx-auto relative px-2 overflow-hidden group">
      <Link href={`/stationery-gifts/${productCategory}/${slug}`}>
        <div className=" flex justify-center items-center relative h-[150px] w-[150px] mx-auto  ">
          <Image
            src={imgUrl}
            width="0"
            height="0"
            sizes="100vw"
            className=" w-auto h-[90%] scale-95 group-hover:scale-100 transform transition duration-700"
            alt={imgName}
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

      <Link href={`/stationery-gifts/${productCategory}/${slug}`}>
        <div className=" text-center mt-3 ">
          <h1 className=" capitalize hidden md:block font-josefin text-sm md:text-base md:mb-1">
            {truncateName}
          </h1>
          <h1 className=" capitalize md:hidden font-josefin text-sm md:text-base md:mb-1">
            {truncateNameForMobile}
          </h1>

          <h1 className=" font-lato font-bold">{price.toLocaleString()} Ks</h1>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className={`${
          add ? "hidden" : "flex"
        } cursor-pointer absolute top-3 -right-full group-hover:right-3 w-10 h-10 rounded-full bg-c-blue/90 active:bg-c-blue justify-center items-center transition-all duration-300`}
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

export default StationeryCard;
