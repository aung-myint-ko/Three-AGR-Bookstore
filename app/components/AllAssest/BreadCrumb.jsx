"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const BreadCrumb = () => {
  const path = usePathname();
  const pathLists = path.split("/").filter((value) => value);
  if (
    pathLists.length >= 3 &&
    (pathLists[0] === "category" || pathLists[0] === "stationery-gifts")
  ) {
    pathLists[pathLists.length - 1] = "";
  }
  return (
    <ul className=" font-lato text-xs md:text-base flex items-center gap-x-1">
      <li className="flex items-center">
        <Link href={"/"} className=" opacity-70 hover:opacity-100 ">
          Home
        </Link>
        <IoIosArrowForward className="opacity-50 w-4 h-4 md:w-5 md:h-5 mt-[1px] md:mt-[5px]" />
      </li>

      {pathLists.map((pathList, index) => {
        const routeTo = `/${pathLists.slice(0, index + 1).join("/")}`;
        const isLast = index === pathLists.length - 1;

        return isLast ? (
          <li key={index}>
            <p className=" text-c-blue capitalize">{pathList}</p>
          </li>
        ) : (
          <li key={index} className=" flex items-center">
            <Link
              href={`${routeTo}`}
              className=" capitalize opacity-70 hover:opacity-100  "
            >
              {pathList}
            </Link>
            <IoIosArrowForward className="opacity-50 w-4 h-4 md:w-5 md:h-5 mt-[1px] md:mt-[5px]" />
          </li>
        );
      })}
    </ul>
  );
};

export default BreadCrumb;
