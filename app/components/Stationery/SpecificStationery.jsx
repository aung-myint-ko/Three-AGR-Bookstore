"use client";
import React from "react";
import BreadCrumb from "@/components-assest/BreadCrumb";
import Pagination from "@/components-assest/Pagination";
import StationeryCard from "./StationeryCard";
import { getStationeryByCategory } from "@/lib-api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { StationeryCardSkeleton } from "@/loading-skeletons/CardSkeleton";

const SpecificStationery = ({ stationerySlug, stationeryData }) => {
  const pageParams = useSearchParams();
  const pageNo = pageParams.get("page");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["specific-stationery-gifts", stationerySlug, pageNo],
    queryFn: () => getStationeryByCategory(stationerySlug, pageNo, 10),
    initialData: stationeryData,
  });

  if (isError) return <div>is Error ...</div>;

  const categorizedProducts = data?.data;
  const pagination = data?.meta.pagination;

  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      <div className=" my-5 md:my-7">
        <h1 className=" capitalize font-josefin font-bold text-2xl md:text-3xl mt-5 mb-2 md:mb-4 ">
          {stationerySlug.replace(/-/g, " ").split(" ").join(" ")}
        </h1>
        <Pagination
          page={pagination?.page}
          pageSize={pagination?.pageSize}
          pageCount={pagination?.pageCount}
          total={pagination?.total}
        />
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <StationeryCardSkeleton key={index} />
            ))
          : categorizedProducts.map((product) => {
              return (
                <StationeryCard
                  key={product.id}
                  id={product.id}
                  data={product.attributes}
                  truncateCount={20}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SpecificStationery;
