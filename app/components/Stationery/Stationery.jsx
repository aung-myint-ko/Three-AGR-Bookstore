"use client";
import React from "react";
import Link from "next/link";
import StationeryCard from "./StationeryCard";
import BreadCrumb from "@/components-assest/BreadCrumb";
import { StationeryCardSkeleton } from "@/loading-skeletons/CardSkeleton";
import { getStationeryByCategory } from "@/lib-api";
import { useQuery } from "@tanstack/react-query";

const Stationery = () => {
  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      <h1 className="font-josefin text-center font-bold text-2xl md:text-3xl mt-5 md:mb-1 ">
        Stationery & Gifts
      </h1>
      <p className="text-sm md:text-base text-center font-lato opacity-80 tracking-wide mb-5 md:mb-10">
        Here are ten of our best selling products. Explore yourself in the
        latest trends.
      </p>
      <div className="md:flex">
        <StationeryNav />
        <div className=" basis-0 md:basis-3/4 lg:basis-4/5 flex flex-col md:gap-y-14">
          {stationeryLists.categories.map((category, index) => {
            return (
              <CategorizedStationery
                key={index}
                name={category.name}
                slug={category.slug}
                url={category.url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StationeryNav = () => {
  return (
    <ul className=" hidden md:block md:basis-1/4 lg:basis-1/5 relative after:w-[1px] after:absolute after:top-0 after:right-0 after:h-full after:bg-black/20 ">
      <h1 className=" font-semibold font-josefin mb-4 text-xl">
        {stationeryLists.name}
      </h1>
      {stationeryLists.categories.map((category, index) => {
        return (
          <li key={index} className=" font-lato mb-2 ">
            <Link
              href={category.url}
              className="opacity-70 hover:opacity-100 hover:text-c-blue hover:underline hover:decoration-c-blue"
            >
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const CategorizedStationery = ({ name, slug, url }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["stationery-gifts", slug],
    queryFn: () => getStationeryByCategory(slug, 1, 5),
  });
  return (
    <div className=" md:pl-8">
      <div className=" mb-8 pb-8 border-b border-black/20">
        <div className=" flex justify-between items-center mb-5">
          <h1 className="font-lato text-xl font-medium italic">{name}</h1>
          <Link
            href={url}
            className="px-4 py-1 text-base rounded-sm bg-c-blue/90 text-white font-lato hover:shadow-md hover:bg-c-blue/100"
          >
            See More
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
          {isLoading
            ? [0, 1, 2, 3, 4].map((index) => (
                <StationeryCardSkeleton key={index} />
              ))
            : data?.data.map((item) => {
                return (
                  <StationeryCard
                    key={item.id}
                    id={item.id}
                    data={item.attributes}
                    truncateCount={15}
                  />
                );
              })}
          {}
        </div>
      </div>
    </div>
  );
};

const stationeryLists = {
  name: "Stationery & Gifts",
  categories: [
    {
      name: "Pen & Pencil",
      url: "/stationery-gifts/pen-and-pencil?page=1",
      slug: "pen-and-pencil",
    },
    {
      name: "Notebooks",
      url: "/stationery-gifts/notebooks?page=1",
      slug: "notebooks",
    },
    {
      name: "Cards & Postcards",
      url: "/stationery-gifts/cards-and-postcards?page=1",
      slug: "cards-and-postcards",
    },
    {
      name: "Painting Products",
      url: "/stationery-gifts/painting-products?page=1",
      slug: "painting-products",
    },
    {
      name: "Toy & Game",
      url: "/stationery-gifts/toy-and-game?page=1",
      slug: "toy-and-game",
    },
    {
      name: "Kid's Art & Craft",
      url: "/stationery-gifts/kid-art-and-craft?page=1",
      slug: "kid-art-and-craft",
    },
    {
      name: "Cloth Bags",
      url: "/stationery-gifts/cloth-bags?page=1",
      slug: "cloth-bags",
    },
    {
      name: "Home & Lifestyle",
      url: "/stationery-gifts/home-and-lifestyle?page=1",
      slug: "home-and-lifestyle",
    },
  ],
};
export default Stationery;
