"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaginationForSearch } from "@/components-assest/Pagination";
import Card from "@/components-home/Card";
import StationeryCard from "@/components-stationery/StationeryCard";
import BreadCrumb from "@/components-assest/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { getProductByParams } from "@/lib-api";
import { BookCardSkeleton } from "@/loading-skeletons/CardSkeleton";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const { data, isLoading } = useQuery({
    queryKey: ["search-params", search],
    queryFn: () => getProductByParams(search),
  });
  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 md:py-12 lg:py-14">
      <BreadCrumb />
      {data?.length <= 0 ? (
        <NoResults query={search} />
      ) : (
        <>
          <h1 className=" text-center font-josefin text-2xl md:text-3xl font-bold my-2 tracking-wide">
            Search Result For &quot;{search}&quot;
          </h1>
          <SearchResultsByProducts
            products={data}
            query={search}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

const SearchResultsByProducts = ({ products, query, isLoading }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(Number(page));
  const itemsPerPage = 10;

  // Calculate the indexes of the items to display based on the current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the products array to get the items for the current page
  const currentProducts = products?.slice(startIndex, endIndex);

  const pageCount = Math.ceil(products?.length / itemsPerPage);
  return (
    <div className="pt-5 pb-10">
      <div className=" mb-5 md:mb-7">
        <PaginationForSearch
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
          pageSize={itemsPerPage}
          total={products?.length}
          query={`query=${query}&page`}
        />
      </div>
      <div className=" grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-y-7 lg:gap-x-0">
        {isLoading
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <BookCardSkeleton key={index} />
            ))
          : currentProducts?.map((product, index) => {
              if (product.attributes.author) {
                return <Card key={index} data={product.attributes} />;
              } else {
                return (
                  <StationeryCard
                    key={index}
                    id={product.id}
                    data={product.attributes}
                    truncateCount={15}
                  />
                );
              }
            })}
      </div>
    </div>
  );
};

const NoResults = ({ query }) => {
  return (
    <div className=" px-4 font-lato w-full h-[calc(100vh-94px)] md:h-[400px] flex flex-col justify-center items-center ">
      <h1 className=" text-center font-medium text-2xl md:text-4xl mb-2">
        Your Search Returns No Results.
      </h1>
      <p className=" text-center opacity-70 ">
        Search results for &quot;{query}&quot;
      </p>
    </div>
  );
};

export default SearchResults;
