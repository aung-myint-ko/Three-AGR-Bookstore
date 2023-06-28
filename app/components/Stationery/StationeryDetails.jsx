"use client";
import BreadCrumb from "@/components-assest/BreadCrumb";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import StationeryCard from "./StationeryCard";
import { StationeryItemDetailsSkeleton } from "@/loading-skeletons/ItemDetailsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getStationeryByCategory, getStationeryDetailsBySlug } from "@/lib-api";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib-store/cartStore";
import { useToastStore } from "@/lib-store/toastStore";

const StationeryDetails = ({ stationerySlug, stationeryData }) => {
  const pathname = usePathname();
  const categoryByPathname = pathname.split("/").filter((value) => value);

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore((state) => state);
  const { setToast } = useToastStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stationery-gifts-details", stationerySlug],
    queryFn: () => getStationeryDetailsBySlug(stationerySlug),
    initialData: stationeryData,
  });

  const relatedProducts = useQuery({
    queryKey: ["stationery-gifts-details", categoryByPathname],
    queryFn: () => getStationeryByCategory(categoryByPathname, 1, 10),
  });

  if (isLoading) return <StationeryItemDetailsSkeleton />;

  if (isError) return <div>is Error ...</div>;

  const {
    name,
    price,
    description_lists,
    description,
    image,
    slug,
    product_categories,
  } = data?.data[0].attributes;

  const imgUrl = image?.data.attributes.url;
  const productCategory = product_categories?.data[0]?.attributes.slug;
  const descriptionArray = description?.split("\n");
  const descriptionListsArray = description_lists?.split("\n");

  const handleAddToCart = () => {
    addToCart({
      book: false,
      stationery: true,
      id: data?.data[0].id,
      title: name,
      slug,
      category: productCategory,
      image: imgUrl,
      price,
      quantity: Number(quantity),
    });

    setToast({ status: "success", message: `${name} has been added to cart` });
  };

  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      <div className=" lg:mx-10 md:flex gap-x-7 mt-10">
        <div className=" mb-10 md:mb-0 flex justify-center items-center basis-2/5 p-8 md:p-10 max-w-[300px] h-[300px] lg:max-w-[350px] lg:h-[350px] bg-c-gray-pale mx-auto ">
          <Image
            src={imgUrl}
            width="0"
            height="0"
            sizes="100vw"
            className=" w-auto h-full "
            alt="book"
            priority
          />
        </div>
        <div className=" basis-3/5">
          <h1 className=" font-josefin text-3xl font-bold mb-5">{name}</h1>
          <h2 className="  text-c-yellow2 text-4xl md:tracking-wider font-lato mb-5">
            {price.toLocaleString()} Ks
          </h2>
          <h1 className=" font-lato text-2xl font-medium mb-3">Description</h1>
          {description ? (
            <div className=" text-sm font-lato opacity-80 tracking-wide flex flex-col gap-y-3">
              {descriptionArray.map((text, index) => {
                return <p key={index}>{text}</p>;
              })}
            </div>
          ) : (
            <ul className=" ml-5 font-lato opacity-80 grid gap-y-1 list-disc tracking-wide">
              {descriptionListsArray.map((text, index) => {
                return <li key={index}>{text}</li>;
              })}
            </ul>
          )}

          <div className=" flex flex-col lg:flex-row lg:items-center gap-y-5 lg:gap-x-8 mt-7 lg:mt-8">
            <div className=" max-w-[180px] flex items-center font-lato rounded-sm border border-c-yellow2 ">
              <h1 className=" bg-c-yellow2 text-lg font-medium  px-6 py-2 text-white">
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
              className="md:inline font-lato font-medium text-lg px-8 py-2 rounded-sm text-white bg-c-blue/90 hover:bg-c-blue/100 hover:shadow "
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      {relatedProducts.data && (
        <RelatedProduct items={relatedProducts.data?.data} />
      )}
    </div>
  );
};

const RelatedProduct = ({ items }) => {
  return (
    <div className="stationery-card relative lg:px-20 mt-14 md:mt-20">
      <h1 className=" mb-4 font-josefin font-medium text-2xl">
        Related Products
      </h1>
      <div className="sm:px-10 lg:px-0">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            890: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          spaceBetween={0}
          slidesPerView={2}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <StationeryCard
                  id={item.id}
                  data={item.attributes}
                  truncateCount={15}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default StationeryDetails;
