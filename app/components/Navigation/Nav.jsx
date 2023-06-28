"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AuthButtonMobile,
  NavLinkForDeskstop,
  NavLinkForMobile1,
  NavLinkForMobile2,
} from "./NavLink";
import Search from "./Search";
import Link from "next/link";
import Image from "next/image";
import Cart from "./Cart";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "@/public-images/logo.png";

const Nav = () => {
  const MenuRef = useRef();
  const [navOpen, setNavOpen] = useState(false);

  // Show nav link template based on the number - Total 4 NavTemplate [For Mobile]
  const [showSubNavNo, setShowSubNavNo] = useState(1);

  //Click hamburger icon, nav will open [For Mobile]
  const handleNavToOpen = () => {
    setNavOpen(true);
    document.body.style.overflow = "hidden";
  };

  //Click close icon, nav will close [For Mobile]
  const handleNavToClose = () => {
    setNavOpen(false);
    document.body.style.overflow = "auto";
  };

  // When user click outside area of the nav, nav will closed [For Mobile]
  useEffect(() => {
    const CloseNav = (e) => {
      const element = e.target;
      if (!MenuRef.current.contains(element)) {
        setNavOpen(false);
        document.body.style.overflow = "auto";
        setShowSubNavNo(1);
      }
    };
    document.body.addEventListener("click", CloseNav);
    return () => document.body.removeEventListener("click", CloseNav);
  }, []);

  return (
    <div className=" z-40 w-full px-4 py-1 md:px-10 lg:px-20 md:py-4 bg-c-gray flex justify-between items-center border-b border-slate-200 md:border-b-0 ">
      {/* hamburger menu */}
      <HiOutlineMenuAlt4
        onClick={handleNavToOpen}
        className="md:hidden"
        color="#082842"
        size={24}
      />

      {/* logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <div className=" w-[20px]  md:w-[30px] ">
          <Image
            src={Logo}
            alt="agr-logo"
            width={0}
            height={0}
            sizes={"100vw"}
          />
        </div>
        <h1 className=" tracking-wide font-roboto font-bold text-3xl md:text-4xl">
          AGR
        </h1>
      </Link>

      {/* Navigation panel for mobile screen */}
      <div
        className={`md:hidden z-30 fixed left-0 top-0 bg-black w-full duration-300 transition-all ${
          navOpen ? " opacity-50 h-full" : " opacity-0"
        }`}
      ></div>
      <div
        className={` z-40 overflow-hidden fixed top-0 w-[70%] h-full bg-c-gray transition-all ease-linear duration-300 ${
          navOpen ? "left-0" : "-left-full"
        } `}
        ref={MenuRef}
      >
        <MobileNavPanel1
          showSubNavNo={showSubNavNo}
          setShowSubNavNo={setShowSubNavNo}
          handleNavToClose={handleNavToClose}
        />
        <MobileNavPanel2
          showSubNavNo={showSubNavNo}
          setShowSubNavNo={setShowSubNavNo}
          handleNavToClose={handleNavToClose}
        />
        <MobileNavPanel3
          showSubNavNo={showSubNavNo}
          setShowSubNavNo={setShowSubNavNo}
          handleNavToClose={handleNavToClose}
        />
        <MobileNavPanel4
          showSubNavNo={showSubNavNo}
          setShowSubNavNo={setShowSubNavNo}
          handleNavToClose={handleNavToClose}
        />
      </div>

      {/* Navigation link tab for large screen(tablet / desktop) */}
      <NavLinkForDeskstop navLists={navLists} />

      <div className=" flex items-center gap-x-8">
        <Search />
        <div className=" md:hidden">
          <Cart color={"#082842"} />
        </div>
      </div>
    </div>
  );
};

const MobileNavPanel1 = ({
  showSubNavNo,
  setShowSubNavNo,
  handleNavToClose,
}) => {
  return (
    <div
      className={` absolute w-full ${
        showSubNavNo == 1
          ? " z-10 block left-0 ease-in duration-150"
          : " z-0 -left-full ease-in duration-150 "
      }`}
    >
      <div
        onClick={handleNavToClose}
        className="mb-4 text-c-blue  flex items-center gap-2 px-4 w-full h-[48px] border-b border-slate-300"
      >
        <HiX size={24} color="#082842" />
        <p className=" font-semibold">Close</p>
      </div>
      <ul>
        {navLists.map((navList, index) => {
          return (
            <NavLinkForMobile1
              key={index}
              name={navList.name}
              subNav={navList.subNav}
              setShowSubNavNo={setShowSubNavNo}
              url={navList.url}
              closeNav={handleNavToClose}
            />
          );
        })}
      </ul>
      <AuthButtonMobile closeNav={handleNavToClose} />
    </div>
  );
};
const MobileNavPanel2 = ({
  showSubNavNo,
  setShowSubNavNo,
  handleNavToClose,
}) => {
  const categories = navLists[0].subNav[0].categories;
  return (
    <div
      className={` absolute w-full ${
        showSubNavNo == 2
          ? " z-10 block right-0 ease-in duration-150"
          : " z-0 -right-full ease-in duration-150 "
      }`}
    >
      <div
        onClick={() => setShowSubNavNo(1)}
        className="mb-4 text-c-blue  flex items-center gap-2 px-4 w-full h-[48px] border-b border-slate-300"
      >
        <IoIosArrowBack size={24} color="#082842" />
        <p className=" font-semibold">Back</p>
      </div>
      <NavLinkForMobile2 categories={categories} closeNav={handleNavToClose} />
      <AuthButtonMobile closeNav={handleNavToClose} />
    </div>
  );
};
const MobileNavPanel3 = ({
  showSubNavNo,
  setShowSubNavNo,
  handleNavToClose,
}) => {
  const categories = navLists[0].subNav[1].categories;
  return (
    <div
      className={` absolute w-full ${
        showSubNavNo == 3
          ? " z-10 block right-0 ease-in duration-150"
          : " z-0 -right-full ease-in duration-150 "
      }`}
    >
      <div
        onClick={() => setShowSubNavNo(1)}
        className="mb-4 text-c-blue  flex items-center gap-2 px-4 w-full h-[48px] border-b border-slate-300"
      >
        <IoIosArrowBack size={24} color="#082842" />
        <p className=" font-semibold">Back</p>
      </div>

      <NavLinkForMobile2 categories={categories} closeNav={handleNavToClose} />
      <AuthButtonMobile closeNav={handleNavToClose} />
    </div>
  );
};
const MobileNavPanel4 = ({
  showSubNavNo,
  setShowSubNavNo,
  handleNavToClose,
}) => {
  const categories = navLists[0].subNav[2].categories;
  return (
    <div
      className={` absolute w-full ${
        showSubNavNo == 4
          ? " z-10 block right-0 ease-in duration-150"
          : " z-0 -right-full ease-in duration-150 "
      }`}
    >
      <div
        onClick={() => setShowSubNavNo(1)}
        className="mb-4 text-c-blue  flex items-center gap-2 px-4 w-full h-[48px] border-b border-slate-300"
      >
        <IoIosArrowBack size={24} color="#082842" />
        <p className=" font-semibold">Back</p>
      </div>
      <NavLinkForMobile2 categories={categories} closeNav={handleNavToClose} />
      <AuthButtonMobile closeNav={handleNavToClose} />
    </div>
  );
};

//Nav lists data
const navLists = [
  {
    name: "Category",
    subNav: [
      {
        name: "Top Categories",
        categories: [
          { name: "New Release", url: "/category/new-release?page=1" },
          {
            name: "Best Selling",
            url: "/category/best-selling?page=1",
          },
          {
            name: "Editor's Choice",
            url: "/category/editor-choice?page=1",
          },
          { name: "Exclusive", url: "/category/exclusive?page=1" },
        ],
      },
      {
        name: "Fiction",
        categories: [
          { name: "Thriller", url: "/category/thriller?page=1" },
          { name: "Crime", url: "/category/crime?page=1" },
          { name: "Romance", url: "/category/romance?page=1" },
          { name: "Humor", url: "/category/humor?page=1" },
          { name: "Adventure", url: "/category/adventure?page=1" },
          { name: "Historical", url: "/category/historical-fiction?page=1" },
          { name: "Mystery", url: "/category/mystery?page=1" },
          { name: "Myth & Legend", url: "/category/myth-and-legend?page=1" },
          { name: "Short Stories", url: "/category/short-stories?page=1" },
        ],
      },
      {
        name: "Non Fiction",
        categories: [
          {
            name: "Art & Photography",
            url: "/category/art-and-photography?page=1",
          },
          { name: "Biography", url: "/category/biography?page=1" },
          { name: "Bussiness", url: "/category/bussiness?page=1" },
          {
            name: "Computing & Technology",
            url: "/category/computing-and-technology?page=1",
          },
          {
            name: "Health & Lifestyle",
            url: "/category/health-and-lifestyle?page=1",
          },
          { name: "History", url: "/category/history?page=1" },
          {
            name: "Language & Educational",
            url: "/category/language-and-educational?page=1",
          },
          {
            name: "Politics & Social Science",
            url: "/category/politics-and-social-science?page=1",
          },
          { name: "Motivational", url: "/category/motivational?page=1" },
        ],
      },
    ],
    url: null,
  },
  {
    name: "Stationery & Gifts",
    subNav: null,
    url: "/stationery-gifts",
  },
  {
    name: "About",
    subNav: null,
    url: "/about",
  },
  {
    name: "Shop",
    subNav: null,
    url: "/shop",
  },
];

export default Nav;
