"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import Logo from "@/public-images/logo.png";
import * as Collapsible from "@radix-ui/react-collapsible";
import { IoIosArrowDown } from "react-icons/io";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className=" px-4 md:px-10 lg:px-20 py-10  bg-c-gray2">
      <div className=" md:flex justify-between items-center mb-7">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-x-2 mb-3 md:mb-0">
          <div className=" w-[50px] md:w-[30px] ">
            <Image
              src={Logo}
              alt="agr-logo"
              width={0}
              height={0}
              sizes={"100vw"}
            />
          </div>
          <h1 className=" font-roboto text-c-blue font-bold text-5xl md:text-4xl tracking-wide">
            AGR
          </h1>
        </Link>
        <p className=" md:hidden font-lato text-xs opacity-70 tracking-wide mb-5">
          Waterstones began in 1982 under the aegis of its founder, Tim
          Waterstone. Over the decades that have followed, we have grown to
          become an icon of the British cultural landscape, employing over 3000
          superb booksellers across over 280 bookshops.
        </p>
        <div className=" flex items-center gap-x-4">
          <h1 className=" text-xl font-medium opacity-80">Follow Us</h1>
          <span className=" bg-c-blue w-[1px] h-7"></span>
          <div className="flex items-center gap-2 ">
            <Link href={"/"}>
              <FaFacebookSquare
                size={28}
                className=" opacity-80 hover:opacity-100 hover:text-c-blue "
              />
            </Link>
            <Link href={"/"}>
              <FaInstagramSquare
                size={28}
                className=" opacity-80 hover:opacity-100 hover:text-c-blue "
              />
            </Link>
            <Link href={"/"}>
              <FaTwitterSquare
                size={28}
                className=" opacity-80 hover:opacity-100 hover:text-c-blue "
              />
            </Link>
            <Link href={"/"}>
              <FaWhatsappSquare
                size={28}
                className=" opacity-80 hover:opacity-100 hover:text-c-blue "
              />
            </Link>
          </div>
        </div>
      </div>
      {/* Footer navigation links for mobile */}
      {FooterDetails.map((footerDetail, index) => {
        return (
          <CollapsibleFooter
            key={index}
            name={footerDetail.name}
            subNav={footerDetail.subNav}
          />
        );
      })}

      {/* Footer navigation links for desktop */}
      <div className=" hidden md:flex gap-x-4  ">
        <div className=" basis-1/4">
          <h1 className="font-bold font-josefin text-lg mb-2">
            {FooterDetails[0].name}
          </h1>
          {FooterDetails[0].subNav.map((nav, index) => {
            return (
              <li key={index} className="mt-1 font-lato list-none">
                <Link
                  href={nav.url}
                  className="opacity-80 hover:opacity-100 hover:text-c-blue hover:underline hover:decoration-c-blue"
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </div>
        <div className=" basis-1/4">
          <h1 className="font-bold font-josefin text-lg mb-2">
            {FooterDetails[1].name}
          </h1>
          {FooterDetails[1].subNav.map((nav, index) => {
            return (
              <li key={index} className="mt-1 font-lato list-none ">
                <Link
                  href={nav.url}
                  className="opacity-80 hover:opacity-100 hover:text-c-blue hover:underline hover:decoration-c-blue"
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </div>
        <div className=" basis-1/2">
          <h1 className="font-bold font-josefin text-lg mb-2">
            {FooterDetails[2].name}
          </h1>
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-6 gap-x-6">
            {FooterDetails[2].subNav.map((nav, index) => {
              return (
                <li key={index} className="mt-1 text-sm font-lato list-none ">
                  <Link
                    href={nav.url}
                    className="opacity-80 hover:opacity-100 hover:text-c-blue hover:underline hover:decoration-c-blue"
                  >
                    {nav.name}
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>

      <span className=" hidden md:block h-[1px] bg-black/40 my-5"></span>
      <p className="tracking-wide font-lato text-xs md:text-lg opacity-70 mt-7">
        Copyright © {currentYear} Logo Inc. All rights reserved.
      </p>
    </div>
  );
};

const CollapsibleFooter = ({ name, subNav }) => {
  return (
    <>
      <Collapsible.Root
        className=" md:hidden py-2 mb-3 "
        type="single"
        collapsible="true"
      >
        <Collapsible.Trigger className="CollapsibleTrigger font-lato pb-3 border-b border-black/40 w-full flex items-center justify-between ">
          {name}
          <IoIosArrowDown
            className="CollapsibleChevron"
            size={24}
            color={"#0f0f0fcf"}
          />
        </Collapsible.Trigger>
        {subNav.map((nav, index) => {
          return (
            <Collapsible.Content
              key={index}
              className=" font-lato opacity-70 text-sm mt-2 "
            >
              <Link href={nav.url}>{nav.name}</Link>
            </Collapsible.Content>
          );
        })}
      </Collapsible.Root>
    </>
  );
};

export default Footer;

const FooterDetails = [
  {
    name: "Navigation",
    subNav: [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
      { name: "Shop", url: "/" },
      { name: "Contact Us", url: "/" },
      { name: "Stationery", url: "/stationery-gifts" },
    ],
  },
  {
    name: "Legal",
    subNav: [
      { name: "Terms & Condition", url: "/" },
      { name: "Privacy Policy", url: "/" },
      { name: "Cookie Policy", url: "/" },
      { name: "Sitemap", url: "/" },
      { name: "My Account", url: "/" },
    ],
  },
  {
    name: "Categories",
    subNav: [
      { name: "Thriller", url: "/category/thriller?page=1" },
      { name: "Crime", url: "/category/crime?page=1" },
      { name: "Romance", url: "/category/romance?page=1" },
      { name: "Humor", url: "/category/humor?page=1" },
      { name: "Adventure", url: "/category/adventure?page=1" },
      { name: "Historical", url: "/category/historical-fiction?page=1" },
      { name: "Mystery", url: "/category/mystery?page=1" },
      { name: "Myth & Legend", url: "/category/myth-and-legend?page=1" },
      { name: "Short Stories", url: "/category/short-stories?page=1" },
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
];
