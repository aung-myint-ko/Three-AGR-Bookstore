"use client";
import React from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Cart from "./Cart";
import Image from "next/image";
import useUser from "@/lib-hook/useUser";
import useInitialsName from "@/lib-hook/useInitialsName";

const TopBar = () => {
  const { userData } = useUser();

  const imageUrl = userData?.image?.formats?.thumbnail.url;

  const imageName = userData?.image?.name;

  const name = useInitialsName(userData?.username);

  return (
    <div className=" hidden md:flex items-center justify-between md:px-10 lg:px-20 py-1 bg-c-blue  ">
      {/* Account icon and login  */}
      {userData ? (
        <Link
          href={"/account/profile"}
          className=" w-9 h-9 rounded-full overflow-hidden"
        >
          {userData?.image ? (
            <>
              <Image
                src={imageUrl}
                width={0}
                height={0}
                sizes={"100vw"}
                alt={imageName}
                className={" w-full h-full bg-slate-300"}
              />
            </>
          ) : (
            <div className=" w-full h-full bg-orange-500 flex justify-center items-center">
              <h1 className=" text-white font-lato font-medium">
                {name?.length <= 1 ? name[0] : name[0] + name[1]}
              </h1>
            </div>
          )}
        </Link>
      ) : (
        <div className=" flex gap-2 items-center">
          <FaUserCircle size={36} color="#D9D9D9" />
          <div className=" w-[2px] h-5 bg-white"></div>
          <Link href={"/signin"}>
            <p className=" text-c-yellow underline font-lato font-semibold">
              Sign In
            </p>
          </Link>
        </div>
      )}

      {/* cart icon */}
      <Cart color={"#D9D9D9"} />
    </div>
  );
};

export default TopBar;
