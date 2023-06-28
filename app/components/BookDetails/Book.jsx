"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoStar, IoStarHalf } from "react-icons/io5";
import CustomerReview from "./CustomerReview";
import BreadCrumb from "@/components-assest/BreadCrumb";
import { BookItemDetailsSkeleton } from "@/loading-skeletons/ItemDetailsSkeleton";
import { useCartStore } from "@/lib-store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { getBooksDetailsBySlug } from "@/lib-api";
import { useToastStore } from "@/lib-store/toastStore";
import { Link } from "react-scroll";

const Book = ({ slug }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore((state) => state);
  const { setToast } = useToastStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books-details", slug],
    queryFn: () => getBooksDetailsBySlug(slug),
  });

  if (isLoading) return <BookItemDetailsSkeleton />;

  if (isError) return <h1>Error...</h1>;

  const {
    title,
    author,
    price,
    page,
    published,
    description,
    image,
    reviews,
    categories,
  } = data.data[0].attributes;

  const imgUrl = image.data.attributes.url;
  const authorName = author.data.attributes.name;
  const category = categories?.data[0]?.attributes.slug;
  const descriptionArray = description.split("\n");

  const handleAddToCart = () => {
    addToCart({
      book: true,
      stationery: false,
      id: data.data[0].id,
      title,
      slug,
      category,
      image: imgUrl,
      author: authorName,
      price,
      quantity: Number(quantity),
    });
    setToast({ status: "success", message: `${title} has been added to cart` });
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      <div className=" md:flex mt-10">
        <div className=" mb-10 md:mb-0 max-w-[250px] h-[300px] lg:h-[310px] flex justify-center items-center p-8 md:p-10 basis-2/5 bg-c-gray-pale mx-auto ">
          <Image
            src={imgUrl}
            width="0"
            height="0"
            sizes="100vw"
            className=" w-auto h-full"
            alt="book"
            priority
          />
        </div>
        <div className=" basis-3/5">
          <h1 className=" font-josefin text-2xl md:text-3xl font-bold mb-1">
            {title}
          </h1>
          <h2 className="  text-c-yellow2 text-xl italic font-medium tracking-wider font-lato">
            {authorName} (Author)
          </h2>
          <ul className="flex items-center gap-x-3 mt-5 mb-6">
            <IoStar size={24} className=" text-c-yellow" />
            <IoStar size={24} className=" text-c-yellow" />
            <IoStar size={24} className=" text-c-yellow" />
            <IoStar size={24} className=" text-c-yellow" />
            <IoStarHalf size={24} className=" text-c-yellow" />
            <Link
              to="review"
              spy={true}
              smooth={true}
              offset={-138}
              duration={500}
              className={
                "underline cursor-pointer ml-5 opacity-70 hover:opacity-100 "
              }
            >
              {reviews.data.length} Reviews
            </Link>
          </ul>

          <h1 className=" md:hidden text-3xl font-semibold">
            {price.toLocaleString()} Ks
          </h1>

          <Table pages={page} price={price} published={published} />

          <div className="flex flex-col md:flex-row md:items-center gap-y-5 md:gap-x-8">
            <div className=" max-w-[180px] flex items-center rounded-sm border border-c-yellow2 font-lato ">
              <h1 className=" bg-c-yellow2 text-lg font-semibold  px-6 py-2 text-white">
                Quantity
              </h1>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="tel"
                maxLength={3}
                className="p-2 w-14 text-xl text-center outline-none"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="px-8 py-2 rounded-sm font-lato font-medium text-lg text-white bg-c-blue/90 hover:bg-c-blue hover:shadow "
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className=" mt-20">
        <button
          disabled
          className=" font-josefin font-medium text-2xl px-8 py-2 text-white bg-c-blue/90"
        >
          Overview
        </button>
        <div className=" max-h-96 p-5 border border-c-blue/60 opacity-80 font-lato overflow-auto flex flex-col gap-y-3">
          {descriptionArray.map((text, index) => {
            return <p key={index}>{text}</p>;
          })}
        </div>
      </div>
      <CustomerReview
        bookTitle={title}
        bookSlug={slug}
        bookImage={imgUrl}
        bookId={data.data[0].id}
      />
    </div>
  );
};

const Table = ({ pages, published, price }) => {
  const formatedPublished = new Date(published).toLocaleDateString("en-Us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className=" grid grid-cols-3 md:grid-cols-5 grid-rows-2 border border-black/20 my-8 font-lato">
      <div className=" text-base border border-black/20 p-2 font-semibold">
        Page
      </div>
      <div className="col-span-2 border border-black/20 p-2 opacity-80">
        {pages}
      </div>
      <div className=" hidden col-span-2 row-span-2 border border-black/20 md:flex justify-center items-center text-c-yellow2 font-semibold text-4xl p-2">
        {price.toLocaleString()} Ks
      </div>
      <div className="text-base border border-black/20 p-2 font-semibold">
        Published
      </div>
      <div className=" border col-span-2  border-black/20 p-2 opacity-80">
        {formatedPublished}
      </div>
    </div>
  );
};

export default Book;
