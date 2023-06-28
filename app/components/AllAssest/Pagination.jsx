"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Pagination = ({ page = 1, pageSize = 0, pageCount = 1, total = 0 }) => {
  const pathname = usePathname();
  return (
    <div
      className={`py-2 px-5 flex justify-between items-center bg-c-gray2 w-full `}
    >
      <p className=" font-lato tracking-wide ">
        {total == 0 ? 0 : (page - 1) * pageSize + 1} -{" "}
        {Math.min(page * pageSize, total)} of {total} Books
      </p>

      <div className=" flex items-center gap-x-5">
        {page <= 1 ? (
          <IoIosArrowBack
            size={24}
            className={`text-c-blue cursor-not-allowed opacity-30 `}
          />
        ) : (
          <Link href={`${pathname}?page=${page - 1}`}>
            <IoIosArrowBack
              size={24}
              className={`text-c-blue cursor-pointer opacity-95 hover:opacity-100 `}
            />
          </Link>
        )}

        {total == 0 || page === pageCount ? (
          <IoIosArrowForward
            size={24}
            className={`text-c-blue cursor-not-allowed opacity-30 `}
          />
        ) : (
          <Link href={`${pathname}?page=${page + 1}`}>
            <IoIosArrowForward
              size={24}
              className={`text-c-blue cursor-pointer opacity-80 hover:opacity-100 `}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export const PaginationForSearch = ({
  currentPage = 1,
  setCurrentPage,
  pageSize = 0,
  pageCount = 1,
  total = 0,
  query,
}) => {
  const pathname = usePathname();
  return (
    <div
      className={`py-2 px-5 flex justify-between items-center bg-c-gray2 w-full `}
    >
      <p className=" font-lato tracking-wide ">
        {total == 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
        {Math.min(currentPage * pageSize, total)} of {total} Books
      </p>
      <div className=" flex items-center gap-x-5">
        {currentPage <= 1 ? (
          <IoIosArrowBack
            size={24}
            className={`text-c-blue cursor-not-allowed opacity-30 `}
          />
        ) : (
          <Link
            onClick={() => setCurrentPage(currentPage - 1)}
            href={`${pathname}?${query}=${currentPage - 1}`}
          >
            <IoIosArrowBack
              size={24}
              className={`text-c-blue cursor-pointer opacity-95 hover:opacity-100 `}
            />
          </Link>
        )}

        {total == 0 || currentPage == pageCount ? (
          <IoIosArrowForward
            size={24}
            className={`text-c-blue cursor-not-allowed opacity-30 `}
          />
        ) : (
          <Link
            onClick={() => setCurrentPage(currentPage + 1)}
            href={`${pathname}?${query}=${currentPage + 1}`}
          >
            <IoIosArrowForward
              size={24}
              className={`text-c-blue cursor-pointer opacity-80 hover:opacity-100 `}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export const PaginationForReviews = ({
  page = 1,
  pageSize = 0,
  pageCount = 1,
  total = 0,
  setPageNo,
}) => {
  return (
    <div
      className={`py-2 px-5 flex justify-between items-center bg-c-gray2 w-full `}
    >
      <p className=" font-lato tracking-wide ">
        {total == 0 ? 0 : (page - 1) * pageSize + 1} -{" "}
        {Math.min(page * pageSize, total)} of {total} Reviews
      </p>
      <div className=" flex items-center gap-x-5">
        {page <= 1 ? (
          <IoIosArrowBack
            size={24}
            className={`text-c-blue cursor-not-allowed opacity-30 `}
          />
        ) : (
          <IoIosArrowBack
            onClick={() => setPageNo(page - 1)}
            size={24}
            className={`text-c-blue cursor-pointer opacity-95 hover:opacity-100 `}
          />
        )}

        {total == 0 || page === pageCount ? (
          <IoIosArrowForward
            size={24}
            className={`text-c-blue cursor-not-allowed opacity-30 `}
          />
        ) : (
          <IoIosArrowForward
            onClick={() => setPageNo(page + 1)}
            size={24}
            className={`text-c-blue cursor-pointer opacity-80 hover:opacity-100 `}
          />
        )}
      </div>
    </div>
  );
};
export default Pagination;
