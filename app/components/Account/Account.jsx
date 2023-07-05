"use client";
import BreadCrumb from "@/components-assest/BreadCrumb";
import React from "react";
import AccountNav from "./AccountNav";
import Profile from "./Profile";
import { AiOutlineLogout } from "react-icons/ai";
import History from "./History";
import PopOver from "./PopOver";
import { useAuthStore } from "@/lib-store/authStore";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import useUser from "@/lib-hook/useUser";
import Loading from "@/components-assest/Loading";

const Account = ({ profile }) => {
  const router = useRouter();
  const { userData, isLoading } = useUser();
  const { cleanUserId } = useAuthStore();

  const handleLogout = () => {
    router.push("/");
    cleanUserId();
    deleteCookie("user-buying");
  };

  if (!isLoading && !userData) {
    router.push("/signin");
    return <Loading />;
  }

  if (isLoading) return <Loading />;

  return (
    <div className=" px-4 md:px-10 lg:px-20 pt-10 pb-20 md:pt-12 md:pb-24 lg:pt-14 lg:pb-28 ">
      <BreadCrumb />
      <div className="mt-5 md:mt-8 pb-3 md:pb-5 mb-2 border-b border-black/20 bg-white z-10 flex items-center justify-between">
        <h1 className=" text-2xl md:text-4xl text-c-blue font-josefin font-bold">
          My Account
        </h1>
        <PopOver />
        <button
          onClick={handleLogout}
          className=" hidden md:flex justify-center items-center gap-x-2 text-lg px-5 py-2 rounded-sm text-white bg-c-blue/90 font-medium font-lato hover:shadow-md hover:bg-c-blue/100"
        >
          Logout
          <AiOutlineLogout size={24} />
        </button>
      </div>
      <div className=" mt-8 md:flex md:justify-between md:gap-x-10">
        <AccountNav />
        {profile ? <Profile /> : <History />}
      </div>
    </div>
  );
};

export default Account;
