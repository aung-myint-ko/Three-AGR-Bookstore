"use client";
import { useAuthStore } from "@/lib-store/authStore";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineHistory,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiX } from "react-icons/hi";

const PopOver = () => {
  const popoverRef = useRef();
  const iconRef = useRef();
  const [open, setOpen] = useState(false);
  const handleclick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const ClosePopover = (e) => {
      const element = e.target;
      if (
        iconRef.current.contains(element) ||
        !popoverRef.current.contains(element)
      ) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", ClosePopover);
    return () => document.body.removeEventListener("click", ClosePopover);
  }, []);

  return (
    <div className=" md:hidden relative">
      <button ref={iconRef} onClick={handleclick}>
        {open ? <HiX size={24} /> : <BsThreeDotsVertical size={24} />}
      </button>
      <div ref={popoverRef}>
        <Content open={open} />
      </div>
    </div>
  );
};

const Content = ({ open }) => {
  const router = useRouter();
  const { cleanUserId } = useAuthStore();

  const handleLogout = () => {
    router.push("/");
    cleanUserId();
    deleteCookie("user-buying");
  };

  return (
    <ul
      className={` ${
        open ? "flex" : "hidden"
      } z-40 flex-col gap-y-2 text-lg w-[230px] px-2 py-3 font-lato bg-white absolute top-18 right-0 border border-black/20 rounded`}
    >
      <Link
        href={"/account/profile"}
        className="flex items-center gap-x-3 rounded-sm px-3 py-1 bg-c-blue text-white"
      >
        <AiOutlineUser size={24} /> Profile
      </Link>
      <Link
        href={"/account/history"}
        className="flex items-center gap-x-3 rounded-sm px-2 py-1"
      >
        <AiOutlineHistory size={24} /> History
      </Link>
      <li
        onClick={handleLogout}
        className="flex items-center gap-x-3 rounded-sm px-2 py-1 text-red-600"
      >
        <AiOutlineLogout size={24} />
        Log Out
      </li>
    </ul>
  );
};

export default PopOver;
