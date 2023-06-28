"use client";
import React from "react";
import BreadCrumb from "@/components-assest/BreadCrumb";
import Pagination from "@/components-assest/Pagination";
import Card from "@/components-home/Card";
import { useQuery } from "@tanstack/react-query";
import { getBooksByCategory } from "@/lib-api";
import { useSearchParams } from "next/navigation";
import { BookCardSkeleton } from "@/loading-skeletons/CardSkeleton";
import Error from "@/components-assest/Error";

const SpecificCategory = ({ categorySlug }) => {
  const pageParams = useSearchParams();
  const pageNo = pageParams.get("page");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["book-category", categorySlug],
    queryFn: () => getBooksByCategory(categorySlug, pageNo),
  });

  if (isError) return <Error />;

  const categorizedBooks = data ? data?.data : [];

  const pagination = data?.meta.pagination;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 md:py-14">
      <BreadCrumb />

      <div className=" my-5 md:my-7">
        <h1 className=" capitalize font-josefin font-bold text-2xl md:text-3xl mt-5 mb-2 md:mb-4 ">
          {categorySlug.replace(/-/g, " ").split(" ").join(" ")}
        </h1>
        <Pagination
          page={pagination?.page}
          pageSize={pagination?.pageSize}
          pageCount={pagination?.pageCount}
          total={pagination?.total}
        />
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-y-7 lg:gap-x-0">
        {isLoading
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <BookCardSkeleton key={index} />
            ))
          : categorizedBooks.map((book) => {
              return (
                <Card
                  key={book.id}
                  id={book.id}
                  data={book.attributes}
                  truncateCount={20}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SpecificCategory;
